Moderating Pelican Party Discord I found it hard keeping track of good suggestions and bug reports, so I've tried to compile my favorite picks into a "demands list" - been playing this game daily for 2 years, I could really use some improvements 😅

__Demands that start with "(?)"__ are unfinished writings, so shouldn't be considered yet.

## Quality of Life improvements & bug fixes
- [ ] 3rd Person Camera (not to confuse with 2nd Person Camera used for spectating) - The camera is swaying from left to right, player model often appearing in front of crosshair obstructing view. Camera needs to be fixed to position behind player character, and crosshair adjusted for the aim offset that occurs in this camera mode (preferably aiming point being in the center of screen same as for 1st person, to not confuse 3rd party HUD crosshairs).
- [ ] 3rd Person Raycasts collide with team-specific colliders causing arrows to fly in wrong directions (https://discord.com/channels/519477170964267008/1275455977268973599/1275455977268973599)
- [ ] More separate and distinctive audio cues for in-game events. (https://discord.com/channels/519477170964267008/1238898904624402543/1238898904624402543)
- [ ] Scoreboard: Display timer for ongoing match length (https://discord.com/channels/519477170964267008/1100127426236924064/1100127426236924064)
  - [ ] and display ping of each player (https://discord.com/channels/519477170964267008/1095050694630842488/1095050694630842488)
#### Shop
- [ ] Shop: Move "Arrow" category into "Bow" category - benefits presets, allows for different arrows per bow in same preset (https://discord.com/channels/519477170964267008/1311093312739999844/1311093312739999844)
- [ ] Shop: New items in shop should receive "NEW!" badges, to disappear after player hovers mouse over them or clicks on them for "confirm purchase" window to appear (not requiring buying). (https://discord.com/channels/519477170964267008/1195365763696042036/1195365763696042036)
- [ ] Shop: Make the character in preview screen slowly revolve around when mouse doesn't hover in its window. For better equipment preview. (https://discord.com/channels/519477170964267008/1248192828543205438/1248192828543205438)
- [ ] Shop>Photo mode: A rotation argument, to rotate the character.
- [ ] Preset renaming. (Shop: https://discord.com/channels/519477170964267008/1152934589828968468/1152934589828968468 In-game: https://discord.com/channels/519477170964267008/1152934589828968468/1161642544183132220)
- [ ] (?) Shop: Sort by stats (https://discord.com/channels/519477170964267008/1195365763696042036/1248079955519082566)
#### Squads
- [ ] Create Squad: add list box for selecting map to play on (including map versions).
- [ ] Create Squad: fix squad leader being able to select team affiliations (overrule matchmaking's auto-team balancing on match start?). (https://discord.com/channels/519477170964267008/1226181257013104670/1226181257013104670)
- [ ] Squad: Transfer Leadership button (leaving match as leader without making the ongoing game stop) (https://discord.com/channels/519477170964267008/1246868840822997133/1246868840822997133)
- [ ] "Squad" tag in scoreboard should also show for players that aren't in squad (so they know when something's off - why).
#### In-game chat
  - [ ] Messages stored locally instead of disappearing after 4sec, ability to block users locally (blocked users stored in IndexedDB by their UserIDs (their unique public identifier derived from AccountID in a private-public key fashion and stored on server)).
  - [ ] Chat available in Squad menu (before map load)
#### M8M6 Lobby fixes - being a special lobby it is, it should employ different ruleset
- [ ] "Always Online Lobby" - This type of lobbies stop when all players leave, then starts by joining a random ongoing match when anyone tries to join this lobby (attempts to make its own match only after reaching specific player threshold):
  - [ ] **No** Squad Leader, lobbies start automatically and end when there are no players in the lobby. Player joining will trigger the game to start in a random ongoing lobby.
  - [ ] Maps aren't chosen randomly or by other players - they are picked sequentially by a playlist.
  - [ ] Players can switch teams (incl. becoming Spectator) by themselves at anytime and during ongoing match.
  ^ Should all players in squad leave, map will be skipped
  - [ ] Players AFK for longer than 15sec get moved to Spectators team instead of being kicked off the lobby.

## Balance changes
- [ ] Bow1 "Scout" weapon class should be either removed, remade into something new (to not waste skin purchases), or headshotting ability taken away from it for balance purposes.
- [ ] LOAD Stats rebalance: +5 LOAD is too much, affecting all bows. (https://discord.com/channels/519477170964267008/1250335189670952960/1250335189670952960)
- [ ] ATK/ARM/STUN Stats rebalance: STUN is being useless most of time (thanks to Poosting), and less LOAD available would mean more stats spent on ATK.
- [ ] Bloodlust improvement idea: owerwriting its current mechanic completely, in favor of being able to kick-start REGEN process, skipping the cooldown. But the requirement would be to have +X amount of Bloodlust at minimum, and Bloodlusted gear would have no REGEN stats and generally less TOTAL stats than other gear in same category. X = 9, maybe? So as a result, Bloodlust would encourage getting kills to regenerate health, instead of hiding behind a wall to get heals - kinda like recent Doom games do (But to obtain enough Bloodlust, you'd have to give up plenty of other stats).
^This could also be a new separate stat, if Bloodlust should remain only a gimmic. Either way this mechanic has a potential to balance out 1v4 lobbies, but there's also a risk of tipping the balance off, if in 1v4 scenario the bigger team is 1 decent player and 3 peaceful teammates just feeding kills to opponent.
- [ ] CTF Flag Return Timer: After the first 2 minutes of the match, the Flag Return Timer should increase to 5sec at minimum, then not increase, so the match doesn't eventually turn into a flag relay rush. This will help with long games, because a lot of its length is contributed to flag pushes being innefficient for first half of the game until the return timer increases. (https://discord.com/channels/519477170964267008/1251646801023340584/1251646801023340584)
- [ ] Delayed "Enemy Flag Carrier" Icon. (https://discord.com/channels/519477170964267008/1248076458673569903/1248076458673569903)
- [ ] (?) Bow6 "Defender" Buffs (https://discord.com/channels/519477170964267008/1073481754582732861/1073481754582732861)
- [x] Bow5 "Support" balance (Once Bow1 gets balanced, Bow5 should effectively replace it) (https://discord.com/channels/519477170964267008/1178208961195941948/1178467599458242631)
#### Melee
- [ ] Light Poke weapons are overpowered (poosting and Heavy Blade-comparable damage). (https://discord.com/channels/519477170964267008/1220853547030155395/1280691861291401246)
  - [ ] Add massive cooldown for simply missing a target (similar to Light Blunt)? - then 90-180 poost remains purely for parkour sake (reaching edges), but it can't be spammed to escape fights for scum a flag. Might need a deploy delay too, to make up for Heavy Poke's charging animation and thus making them both more equal to each other.
- [ ] Heavy Blade: I like Light Blunts very much for how they punish missed swings by longer cooldown animation, and rewards sequential hits greatly. Heavy Blade feels boring in comparison, but if swing charging was a thing for extra damage/stun, but without Heavy Blunt's movement slow-down while charged - it'd reward better timings instead of just mashing attack button.
- [ ] Heavy Poke weapons need rebalance. (https://discord.com/channels/519477170964267008/1192179212161908817/11921792121619088170)
- [ ] Heavy Blunt with +3 ATK and more should have the ability to completely stun someone in place for a whole second.
- [ ] Frying Pan to make a different hit sound (optionally to also play this hitsound to damaged player) (https://www.myinstants.com/en/instant/tf2-frying-pan/)
#### Map critique
- [ ] Towers v1 & v2 (https://discord.com/channels/519477170964267008/1208120631120494643/1208120631120494643) (https://discord.com/channels/519477170964267008/1166942167231627324/1166942167231627324)
- [ ] Castles v1
~~- [ ] Flags on some maps can't be captured without jumping, where it can be fixed by adding a simple slope at one point on the map (Forts v2; Tombs v1+2; Graveyard) (https://discord.com/channels/519477170964267008/1308607568859496510/1308614287136391238) - This improvememnt empowers Guests that don't know the jump button, but also hurts them by not forcing them to learn to jump. Most of the maps can be played without jump already so maybe it'd be ok to fix just for the sake of map design?~~

## Big changes
- [ ] Key binds in settings for shoot, weapon switch, etc. (Key binds-related changes exclusive to PC players) (https://discord.com/channels/519477170964267008/1019965016075665471/1019965016075665471)
  - [ ] Zoom Keybind, so bows can be fired without resetting zoom if wanted (eg. Bow3 long range gameplay: player repeatedly holds and lets go of fire, while keeping zoom button held to remain at full zoom) (https://discord.com/channels/519477170964267008/1089949203192627251/1089949203192627251)
  - [ ] Equip Bow; Equip Melee keybinds, and asmall visual SVG indicator of whether Melee or Bow is equipped (benefits players with weapon viewmodel disabled) (https://discord.com/channels/519477170964267008/1095779280560078938/1095779280560078938)
  - [ ] Kill Bind (https://discord.com/channels/519477170964267008/1118502743036936214/1118502743036936214)
- [ ] Stricter dealing with lagging players - instead of appearing as they stop mid-air, then speedrun through half the map, those players will be somehow reset/rolled-back, or forcefully respawned and eventually kicked if their network issue persists.
- [ ] Server browser
- [ ] Special "always online" lobby codes with custom rulesets (gravity adjustment, limited map playlist, health pack spawning on maps and no REGEN, Free for All gamemode, ...) (https://discord.com/channels/519477170964267008/1270943449352376432/1270943449352376432)
- [ ] (?) Elo balances (https://discord.com/channels/519477170964267008/1272594235249655808/1272594235249655808)
- [ ] Duels - players can send duel requests to other players in the same lobby and make coin bets. Should oppponent accept the request, game deducts bet amount of coins from his account (if it can't do it, the duel is rejected). Both players have a "duel" icon appearing on scoreboard and visible to everyone. After 3rd flag is captured, whoever killed the other duelist more, wins the bet amount. If draw - both duelists receive half of the bag. In addition, player can duel his teammate - then, the duel is won by whoever gets more total kills on opponents counted from the duel accept moment (https://discord.com/channels/519477170964267008/1307901713751216128/1308099291247808643).
  - [ ] To comfortably cast Duel requests, it'd be best if it was by clicking a name on the scoreboard, for which the scoreboard keybind would need to be changed into "press to toggle" instead of "hold to show".
    - [ ] Next to Make Duel Request, it could also present "Block User", that prevents in-chat messages and incoming Duel Requests. Or clicking on username on scoreboard could pop-up a window with their stats (games played/won, kills, Elo, etc.), then the aforementioned buttons below it.
- [ ] Tutorial - Preferably, for the "first time playthrough", the "Loading Screen" map would turn out playable before loading any online lobby, and players can learn to jump, shoot, weapon switch and some flag capturing tips. (I'm open to write a tutorial scenario if wanted).
  - [ ] Gear Testing grounds - If that tutorial map had some brainless-bots spawning at designated areas for punching, this "Tutorial" map could also have unlocked shop for gear testing (other requested feature).
