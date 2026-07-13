# Last Planet Survival (Roblox Lua)

Sis aplankas yra **1 etapo** prototipas tavo zaidimui:

1. Zaidejo sistema (movement + survival stat'ai)
2. Resursu rinkimas
3. Paprastas inventorius su ribotu slot'u skaiciumi

## Kaip susideti i Roblox Studio

1. Atidaryk Roblox Studio projekta.
2. Sukurk (arba naudok esamus) servisus:
   - `ReplicatedStorage`
   - `ServerScriptService`
   - `StarterPlayer/StarterPlayerScripts`
3. Nukopijuok failus is sio aplanko i atitinkamas vietas:
   - `ReplicatedStorage/Shared/*` -> `ReplicatedStorage/Shared`
   - `ServerScriptService/Main.server.lua` -> `ServerScriptService`
   - `ServerScriptService/Services/*` -> `ServerScriptService/Services`
   - `StarterPlayer/StarterPlayerScripts/*` -> `StarterPlayerScripts`

## Reikalingi resursu node'ai pasaulyje

Kad rinkimas veiktu, pasaulyje sukurk modelius arba part'us ir:

1. Uzdėk `CollectionService` taga: `ResourceNode`
2. Uzdėk atributo lauka `ResourceType` su viena reiksme:
   - `Tree`
   - `Rock`
   - `Mineral`

Pvz. medis:
- Part pavadinimas: `Tree01`
- Tag: `ResourceNode`
- Attribute: `ResourceType = "Tree"`

Serveris automatiskai:
- pridės `ProximityPrompt`
- leis rinkti resursa
- pridės item'us i inventoriu
- po issekimo atstatys node po `RespawnTime`

## Kodo struktura

- `Config.lua` - bendri balansavimo nustatymai (stat'ai, inventory, resursai)
- `ItemDefinitions.lua` - item'u aprasymai
- `PlayerStatsService.lua` - hunger/thirst/health valdymas serveryje
- `InventoryService.lua` - slot'ai, stack'ai, item'u pridejimas
- `ResourceService.lua` - gather logika nuo `ResourceNode` objektu
- `Main.server.lua` - sujungia servisus ir RemoteEvents
- `ClientInit.client.lua` - sukuria HUD ir klauso serverio atnaujinimu

## Naudojami RemoteEvents

Visi RemoteEvents kuriami automate `ReplicatedStorage/Remotes`:

- `StatsChanged` - serveris -> klientas
- `InventoryChanged` - serveris -> klientas
- `RequestInitialData` - klientas -> serveris

## Kas toliau (2 etapas)

Kai noresi, galime prideti:
- crafting receptu sistema
- base building placement sistema (wall/storage/turret)
- day/night cikla ir enemy wave spawn
- multiplayer komandos / party logika
