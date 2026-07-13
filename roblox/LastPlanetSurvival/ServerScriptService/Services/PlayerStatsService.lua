local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Config = require(Shared:WaitForChild("Config"))

local PlayerStatsService = {}
PlayerStatsService._statsByPlayer = {}
PlayerStatsService._accumulatorByPlayer = {}
PlayerStatsService._statsChangedRemote = nil

local function clamp(value, minValue, maxValue)
    return math.max(minValue, math.min(maxValue, value))
end

function PlayerStatsService:Init(remotesFolder)
    self._statsChangedRemote = remotesFolder:WaitForChild("StatsChanged")
end

function PlayerStatsService:CreateForPlayer(player)
    self._statsByPlayer[player] = {
        Health = Config.Player.MaxHealth,
        Hunger = Config.Player.MaxHunger,
        Thirst = Config.Player.MaxThirst,
    }
    self._accumulatorByPlayer[player] = 0
    self:_pushStats(player)
end

function PlayerStatsService:RemoveForPlayer(player)
    self._statsByPlayer[player] = nil
    self._accumulatorByPlayer[player] = nil
end

function PlayerStatsService:ApplyCharacterDefaults(character)
    local humanoid = character:WaitForChild("Humanoid")
    humanoid.WalkSpeed = Config.Player.DefaultWalkSpeed
    humanoid.JumpPower = Config.Player.DefaultJumpPower
end

function PlayerStatsService:GetStats(player)
    return self._statsByPlayer[player]
end

function PlayerStatsService:GetStatsForClient(player)
    local stats = self._statsByPlayer[player]
    if not stats then
        return nil
    end

    return {
        Health = stats.Health,
        Hunger = stats.Hunger,
        Thirst = stats.Thirst,
        MaxHealth = Config.Player.MaxHealth,
        MaxHunger = Config.Player.MaxHunger,
        MaxThirst = Config.Player.MaxThirst,
    }
end

function PlayerStatsService:_pushStats(player)
    local stats = self._statsByPlayer[player]
    if not stats then
        return
    end

    self._statsChangedRemote:FireClient(player, self:GetStatsForClient(player))
end

function PlayerStatsService:_applyStarvingDamage(player, deltaTime)
    local character = player.Character
    if not character then
        return
    end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then
        return
    end

    local damage = Config.Player.DamagePerSecondWhenStarving * deltaTime
    humanoid:TakeDamage(damage)
end

function PlayerStatsService:Tick(deltaTime)
    for _, player in ipairs(Players:GetPlayers()) do
        local stats = self._statsByPlayer[player]
        if not stats then
            continue
        end

        stats.Hunger = clamp(stats.Hunger - (Config.Player.HungerDrainPerSecond * deltaTime), 0, Config.Player.MaxHunger)
        stats.Thirst = clamp(stats.Thirst - (Config.Player.ThirstDrainPerSecond * deltaTime), 0, Config.Player.MaxThirst)

        if stats.Hunger <= 0 or stats.Thirst <= 0 then
            self:_applyStarvingDamage(player, deltaTime)
        end

        local character = player.Character
        if character then
            local humanoid = character:FindFirstChildOfClass("Humanoid")
            if humanoid then
                stats.Health = clamp(humanoid.Health, 0, Config.Player.MaxHealth)
            end
        end

        self._accumulatorByPlayer[player] += deltaTime
        if self._accumulatorByPlayer[player] >= 0.25 then
            self._accumulatorByPlayer[player] = 0
            self:_pushStats(player)
        end
    end
end

function PlayerStatsService:StartHeartbeat()
    RunService.Heartbeat:Connect(function(deltaTime)
        self:Tick(deltaTime)
    end)
end

return PlayerStatsService
