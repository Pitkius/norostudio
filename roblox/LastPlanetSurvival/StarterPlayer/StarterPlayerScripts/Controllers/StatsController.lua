local Players = game:GetService("Players")

local StatsController = {}
StatsController._label = nil

function StatsController:Init(screenGui)
    local frame = Instance.new("Frame")
    frame.Name = "StatsPanel"
    frame.Size = UDim2.fromOffset(240, 110)
    frame.Position = UDim2.fromOffset(16, 16)
    frame.BackgroundColor3 = Color3.fromRGB(18, 18, 24)
    frame.BackgroundTransparency = 0.2
    frame.Parent = screenGui

    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -12, 0, 22)
    title.Position = UDim2.fromOffset(6, 4)
    title.BackgroundTransparency = 1
    title.Font = Enum.Font.GothamBold
    title.TextSize = 14
    title.TextColor3 = Color3.fromRGB(220, 240, 255)
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Text = "Survival Stats"
    title.Parent = frame

    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, -12, 1, -28)
    label.Position = UDim2.fromOffset(6, 24)
    label.BackgroundTransparency = 1
    label.Font = Enum.Font.Code
    label.TextSize = 14
    label.TextColor3 = Color3.fromRGB(230, 230, 230)
    label.TextXAlignment = Enum.TextXAlignment.Left
    label.TextYAlignment = Enum.TextYAlignment.Top
    label.Text = "Laukiama duomenu..."
    label.Parent = frame

    self._label = label
end

function StatsController:OnStatsChanged(statsData)
    if not self._label or not statsData then
        return
    end

    local healthMax = statsData.MaxHealth or 100
    local hungerMax = statsData.MaxHunger or 100
    local thirstMax = statsData.MaxThirst or 100

    self._label.Text = string.format(
        "Health: %d / %d\nHunger: %d / %d\nThirst: %d / %d",
        math.floor(statsData.Health or 0),
        math.floor(healthMax),
        math.floor(statsData.Hunger or 0),
        math.floor(hungerMax),
        math.floor(statsData.Thirst or 0),
        math.floor(thirstMax)
    )
end

return StatsController
