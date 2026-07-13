local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Config = require(Shared:WaitForChild("Config"))
local ItemDefinitions = require(Shared:WaitForChild("ItemDefinitions"))

local InventoryService = {}
InventoryService._inventories = {}

local function createEmptyInventory()
    local slots = {}
    for i = 1, Config.Inventory.MaxSlots do
        slots[i] = nil
    end

    return {
        MaxSlots = Config.Inventory.MaxSlots,
        Slots = slots,
    }
end

function InventoryService:CreateInventoryForPlayer(player)
    self._inventories[player] = createEmptyInventory()
end

function InventoryService:RemoveInventoryForPlayer(player)
    self._inventories[player] = nil
end

function InventoryService:GetInventory(player)
    return self._inventories[player]
end

function InventoryService:AddItem(player, itemId, amount)
    local inventory = self._inventories[player]
    if not inventory then
        return false, "Inventory not found."
    end

    if not ItemDefinitions[itemId] then
        return false, "Unknown item."
    end

    local remaining = amount

    -- 1) Pirmiausia pildome jau esančius stack'us.
    for slotIndex = 1, inventory.MaxSlots do
        local slot = inventory.Slots[slotIndex]
        if slot and slot.ItemId == itemId and slot.Amount < Config.Inventory.MaxStackPerSlot then
            local freeSpace = Config.Inventory.MaxStackPerSlot - slot.Amount
            local moved = math.min(freeSpace, remaining)
            slot.Amount += moved
            remaining -= moved

            if remaining <= 0 then
                return true, nil
            end
        end
    end

    -- 2) Tada naudojame tuščius slot'us.
    for slotIndex = 1, inventory.MaxSlots do
        if inventory.Slots[slotIndex] == nil then
            local moved = math.min(Config.Inventory.MaxStackPerSlot, remaining)
            inventory.Slots[slotIndex] = {
                ItemId = itemId,
                Amount = moved,
            }
            remaining -= moved

            if remaining <= 0 then
                return true, nil
            end
        end
    end

    if remaining > 0 then
        return false, "Inventory full."
    end

    return true, nil
end

function InventoryService:ExportForClient(player)
    local inventory = self._inventories[player]
    if not inventory then
        return nil
    end

    local slots = table.create(inventory.MaxSlots)
    for slotIndex = 1, inventory.MaxSlots do
        local slot = inventory.Slots[slotIndex]
        if slot then
            slots[slotIndex] = {
                ItemId = slot.ItemId,
                Amount = slot.Amount,
                Name = ItemDefinitions[slot.ItemId].Name,
            }
        else
            slots[slotIndex] = nil
        end
    end

    return {
        MaxSlots = inventory.MaxSlots,
        Slots = slots,
    }
end

return InventoryService
