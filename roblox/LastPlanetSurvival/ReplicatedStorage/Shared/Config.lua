local Config = {}

Config.Player = {
    MaxHealth = 100,
    MaxHunger = 100,
    MaxThirst = 100,
    HungerDrainPerSecond = 0.4,
    ThirstDrainPerSecond = 0.7,
    DamagePerSecondWhenStarving = 4,
    DefaultWalkSpeed = 16,
    DefaultJumpPower = 50,
}

Config.Inventory = {
    MaxSlots = 12,
    MaxStackPerSlot = 50,
}

Config.ResourceNodes = {
    Tree = {
        ResourceItemId = "Wood",
        MaxHealth = 5,
        GatherAmount = 2,
        RespawnTime = 25,
    },
    Rock = {
        ResourceItemId = "Stone",
        MaxHealth = 7,
        GatherAmount = 2,
        RespawnTime = 30,
    },
    Mineral = {
        ResourceItemId = "Mineral",
        MaxHealth = 10,
        GatherAmount = 1,
        RespawnTime = 40,
    },
}

return Config
