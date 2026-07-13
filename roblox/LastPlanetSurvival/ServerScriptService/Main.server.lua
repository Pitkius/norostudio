local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local sharedFolder = ReplicatedStorage:FindFirstChild("Shared")
if not sharedFolder then
    sharedFolder = Instance.new("Folder")
    sharedFolder.Name = "Shared"
    sharedFolder.Parent = ReplicatedStorage
end

local remotesFolder = ReplicatedStorage:FindFirstChild("Remotes")
if not remotesFolder then
    remotesFolder = Instance.new("Folder")
    remotesFolder.Name = "Remotes"
    remotesFolder.Parent = ReplicatedStorage
end

local function ensureRemote(name)
    local remote = remotesFolder:FindFirstChild(name)
    if remote and remote:IsA("RemoteEvent") then
        return remote
    end

    local newRemote = Instance.new("RemoteEvent")
    newRemote.Name = name
    newRemote.Parent = remotesFolder
    return newRemote
end

local statsChangedRemote = ensureRemote("StatsChanged")
local inventoryChangedRemote = ensureRemote("InventoryChanged")
local requestInitialDataRemote = ensureRemote("RequestInitialData")

local InventoryService = require(script.Services:WaitForChild("InventoryService"))
local PlayerStatsService = require(script.Services:WaitForChild("PlayerStatsService"))
local ResourceService = require(script.Services:WaitForChild("ResourceService"))

PlayerStatsService:Init(remotesFolder)
PlayerStatsService:StartHeartbeat()

ResourceService:Init(remotesFolder, InventoryService)

Players.PlayerAdded:Connect(function(player)
    InventoryService:CreateInventoryForPlayer(player)
    PlayerStatsService:CreateForPlayer(player)

    player.CharacterAdded:Connect(function(character)
        PlayerStatsService:ApplyCharacterDefaults(character)
    end)

    inventoryChangedRemote:FireClient(player, InventoryService:ExportForClient(player))
end)

Players.PlayerRemoving:Connect(function(player)
    InventoryService:RemoveInventoryForPlayer(player)
    PlayerStatsService:RemoveForPlayer(player)
end)

requestInitialDataRemote.OnServerEvent:Connect(function(player)
    statsChangedRemote:FireClient(player, PlayerStatsService:GetStatsForClient(player))
    inventoryChangedRemote:FireClient(player, InventoryService:ExportForClient(player))
end)
