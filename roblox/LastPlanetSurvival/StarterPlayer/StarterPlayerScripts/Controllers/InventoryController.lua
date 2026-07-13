local InventoryController = {}
InventoryController._label = nil

function InventoryController:Init(screenGui)
    local frame = Instance.new("Frame")
    frame.Name = "InventoryPanel"
    frame.Size = UDim2.fromOffset(300, 230)
    frame.Position = UDim2.new(0, 16, 1, -246)
    frame.BackgroundColor3 = Color3.fromRGB(16, 24, 16)
    frame.BackgroundTransparency = 0.2
    frame.Parent = screenGui

    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -12, 0, 22)
    title.Position = UDim2.fromOffset(6, 4)
    title.BackgroundTransparency = 1
    title.Font = Enum.Font.GothamBold
    title.TextSize = 14
    title.TextColor3 = Color3.fromRGB(210, 255, 210)
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Text = "Inventory"
    title.Parent = frame

    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, -12, 1, -28)
    label.Position = UDim2.fromOffset(6, 24)
    label.BackgroundTransparency = 1
    label.Font = Enum.Font.Code
    label.TextSize = 13
    label.TextColor3 = Color3.fromRGB(230, 230, 230)
    label.TextXAlignment = Enum.TextXAlignment.Left
    label.TextYAlignment = Enum.TextYAlignment.Top
    label.Text = "Laukiama inventoriaus..."
    label.TextWrapped = false
    label.Parent = frame

    self._label = label
end

function InventoryController:OnInventoryChanged(inventoryData)
    if not self._label or not inventoryData then
        return
    end

    local lines = {}
    table.insert(lines, ("Slots: %d"):format(inventoryData.MaxSlots or 0))
    table.insert(lines, "--------------------")

    for slotIndex = 1, (inventoryData.MaxSlots or 0) do
        local slot = inventoryData.Slots and inventoryData.Slots[slotIndex]
        if slot then
            table.insert(lines, ("%02d. %s x%d"):format(slotIndex, slot.Name or slot.ItemId, slot.Amount or 0))
        else
            table.insert(lines, ("%02d. [tuscia]"):format(slotIndex))
        end
    end

    self._label.Text = table.concat(lines, "\n")
end

return InventoryController
