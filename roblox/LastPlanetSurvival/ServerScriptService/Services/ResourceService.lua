local CollectionService = game:GetService("CollectionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Config = require(Shared:WaitForChild("Config"))

local ResourceService = {}
ResourceService._inventoryService = nil
ResourceService._resourceState = {}
ResourceService._inventoryChangedRemote = nil

local RESOURCE_TAG = "ResourceNode"

local function getNodeConfig(nodeModel)
    local nodeType = nodeModel:GetAttribute("ResourceType")
    if not nodeType then
        return nil
    end

    return Config.ResourceNodes[nodeType]
end

local function ensurePrompt(nodeModel)
    local prompt = nodeModel:FindFirstChild("GatherPrompt")
    if prompt and prompt:IsA("ProximityPrompt") then
        return prompt
    end

    local targetPart = nodeModel:IsA("BasePart") and nodeModel or nodeModel:FindFirstChildWhichIsA("BasePart")
    if not targetPart then
        return nil
    end

    local newPrompt = Instance.new("ProximityPrompt")
    newPrompt.Name = "GatherPrompt"
    newPrompt.ActionText = "Rinkti"
    newPrompt.ObjectText = "Resursas"
    newPrompt.HoldDuration = 0.4
    newPrompt.MaxActivationDistance = 10
    newPrompt.RequiresLineOfSight = false
    newPrompt.Parent = targetPart
    return newPrompt
end

function ResourceService:Init(remotesFolder, inventoryService)
    self._inventoryService = inventoryService
    self._inventoryChangedRemote = remotesFolder:WaitForChild("InventoryChanged")

    for _, node in ipairs(CollectionService:GetTagged(RESOURCE_TAG)) do
        self:RegisterNode(node)
    end

    CollectionService:GetInstanceAddedSignal(RESOURCE_TAG):Connect(function(node)
        self:RegisterNode(node)
    end)
end

function ResourceService:RegisterNode(node)
    if self._resourceState[node] then
        return
    end

    local nodeConfig = getNodeConfig(node)
    if not nodeConfig then
        warn(("Resource node %s has no valid ResourceType attribute."):format(node:GetFullName()))
        return
    end

    self._resourceState[node] = {
        Health = nodeConfig.MaxHealth,
        IsRespawning = false,
    }

    local prompt = ensurePrompt(node)
    if not prompt then
        warn(("Resource node %s has no BasePart for prompt."):format(node:GetFullName()))
        return
    end

    prompt.ObjectText = node:GetAttribute("ResourceType") or "Resursas"
    prompt.Triggered:Connect(function(player)
        self:Gather(player, node, prompt)
    end)
end

function ResourceService:Gather(player, node, prompt)
    local state = self._resourceState[node]
    if not state or state.IsRespawning then
        return
    end

    local nodeConfig = getNodeConfig(node)
    if not nodeConfig then
        return
    end

    local ok = self._inventoryService:AddItem(player, nodeConfig.ResourceItemId, nodeConfig.GatherAmount)
    if not ok then
        return
    end

    state.Health -= 1
    self._inventoryChangedRemote:FireClient(player, self._inventoryService:ExportForClient(player))

    if state.Health > 0 then
        return
    end

    state.IsRespawning = true
    prompt.Enabled = false
    node:SetAttribute("IsDepleted", true)

    -- Vizualiai paslepiame node, kad matytusi jog jis istustintas.
    if node:IsA("BasePart") then
        node.Transparency = 0.85
        node.CanCollide = false
    else
        for _, descendant in ipairs(node:GetDescendants()) do
            if descendant:IsA("BasePart") then
                descendant.Transparency = 0.85
                descendant.CanCollide = false
            end
        end
    end

    task.delay(nodeConfig.RespawnTime, function()
        if not node or not node.Parent then
            self._resourceState[node] = nil
            return
        end

        state.Health = nodeConfig.MaxHealth
        state.IsRespawning = false
        node:SetAttribute("IsDepleted", false)
        prompt.Enabled = true

        if node:IsA("BasePart") then
            node.Transparency = 0
            node.CanCollide = true
        else
            for _, descendant in ipairs(node:GetDescendants()) do
                if descendant:IsA("BasePart") then
                    descendant.Transparency = 0
                    descendant.CanCollide = true
                end
            end
        end
    end)
end

return ResourceService
