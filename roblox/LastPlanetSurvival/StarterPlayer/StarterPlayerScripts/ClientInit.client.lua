local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local localPlayer = Players.LocalPlayer
local playerGui = localPlayer:WaitForChild("PlayerGui")

local remotesFolder = ReplicatedStorage:WaitForChild("Remotes")
local statsChangedRemote = remotesFolder:WaitForChild("StatsChanged")
local inventoryChangedRemote = remotesFolder:WaitForChild("InventoryChanged")
local requestInitialDataRemote = remotesFolder:WaitForChild("RequestInitialData")

local controllersFolder = script.Parent:WaitForChild("Controllers")
local StatsController = require(controllersFolder:WaitForChild("StatsController"))
local InventoryController = require(controllersFolder:WaitForChild("InventoryController"))
local GatherController = require(controllersFolder:WaitForChild("GatherController"))

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "SurvivalHUD"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

StatsController:Init(screenGui)
InventoryController:Init(screenGui)
GatherController:Init()

statsChangedRemote.OnClientEvent:Connect(function(statsData)
    StatsController:OnStatsChanged(statsData)
end)

inventoryChangedRemote.OnClientEvent:Connect(function(inventoryData)
    InventoryController:OnInventoryChanged(inventoryData)
end)

-- Paprasome serverio atsiusti pradine bukle prisijungus.
requestInitialDataRemote:FireServer()
