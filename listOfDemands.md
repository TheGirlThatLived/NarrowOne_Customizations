## Quality of Life improvements & bug fixes
- [ ] 3rd Person Camera (not to confuse with 2nd Person Camera used for spectating) - The camera is swaying from left to right, player model often appearing in front of crosshair obstructing view. Camera needs to be fixed to position behind player character, and crosshair adjusted for the aim offset that occurs in this camera mode (preferably aiming point being in the center of screen same as for 1st person, to not confuse 3rd party HUD crosshairs).
- [ ] 3rd Person Raycasts collide with team-specific colliders causing arrows to fly in wrong directions (https://discord.com/channels/519477170964267008/1275455977268973599/1275455977268973599)
- [ ] Shop: New items in shop should receive "NEW!" badges, to disappear after player hovers mouse over them or clicks on them for "confirm purchase" window to appear (not requiring buying). (https://discord.com/channels/519477170964267008/1195365763696042036/1195365763696042036)
- [ ] Shop: Sort by stats (https://discord.com/channels/519477170964267008/1195365763696042036/1248079955519082566)
- In-game chat:
  - [ ] Messages stored locally instead of disappearing after 4sec, ability to block users locally (blocked users stored in IndexedDB by their UserIDs (their unique public identifier derived from AccountID in a private-public key fashion and stored on server)).
  - [ ] Chat available in Squad menu (before map load)
- [ ] More separate and distinctive audio cues for in-game events. (https://discord.com/channels/519477170964267008/1238898904624402543/1238898904624402543)
- [ ] Create Squad: add list box for selecting map to play on (including map versions).
- [ ] Create Squad: fix squad leader being able to select team affiliations (overrule matchmaking's auto-team balancing on match start?).
- [ ] Squad: Transfer Leadership button (leaving match as leader without making the ongoing game stop) (https://discord.com/channels/519477170964267008/1246868840822997133/1246868840822997133)
- M8M6 Lobby fixes - being a special lobby it is, it should employ different ruleset:
  - [ ] **No** Squad Leader, lobbies start automatically and end when there are no players in the lobby. Player joining will trigger the game to start in a random ongoing lobby.
  - [ ] Maps aren't chosen randomly or by other players - they are picked sequentially by a playlist.
  - [ ] Players can switch teams (incl. becoming Spectator) by themselves at anytime and during ongoing match.
  - [ ] Players AFK for longer than 15sec get moved to Spectators team instead of being kicked off the lobby.

## Balance changes
- [ ] Bow1 "Scout" weapon class should be either removed, remade into something new (to not waste skin purchases), or headshotting ability taken away from it for balance purposes.
- [ ] LOAD Stats rebalance: +5 LOAD is too much, affecting all bows. (https://discord.com/channels/519477170964267008/1250335189670952960/1250335189670952960)
- [ ] ATK/ARM/STUN Stats rebalance: STUN is being useless most of time (thanks to Poosting), and less LOAD available would mean more stats spent on ATK.
- [ ] Bloodlust improvement idea: owerwriting its current mechanic completely, in favor of being able to kick-start REGEN process, skipping the cooldown. But the requirement would be to have +X amount of Bloodlust at minimum, and Bloodlusted gear would have no REGEN stats and generally less TOTAL stats than other gear in same category. X = 9, maybe? So as a result, Bloodlust would encourage getting kills to regenerate health, instead of hiding behind a wall to get heals - kinda like recent Doom games do (But to obtain enough Bloodlust, you'd have to give up plenty of other stats).
^This could also be a new separate stat, if Bloodlust should remain only a gimmic. Either way this mechanic has a potential to balance out 1v4 lobbies, but there's also a risk of tipping the balance off, if in 1v4 scenario the bigger team is 1 decent player and 3 peaceful teammates just feeding kills to opponent.
- [ ] CTF Flag Return Timer: After the first 2 minutes of the match, the Flag Return Timer should increase to 5sec at minimum, then not increase, so the match doesn't eventually turn into a flag relay rush. This will help with long games, because a lot of its length is contributed to flag pushes being innefficient for first half of the game until the return timer increases. (https://discord.com/channels/519477170964267008/1251646801023340584/1251646801023340584)
- [ ] Delayed "Enemy Flag Carrier" Icon. (https://discord.com/channels/519477170964267008/1248076458673569903/1248076458673569903)
#### Melee
- [ ] Light Poke weapons are overpowered (poosting and Heavy Blade-comparable damage).
- [ ] Heavy Poke weapons need rebalance.
- [ ] Heavy Blunt with +3 ATK and more should have the ability to completely stun someone in place for a whole second.

## Big changes
- [ ] Server browser
- [ ] Special "always online" lobby codes with custom rulesets (gravity adjustment, limited map playlist, health pack spawning on maps and no REGEN, Free for All gamemode, ...) (https://discord.com/channels/519477170964267008/1270943449352376432/1270943449352376432)
- [ ] (?) Elo balances (https://discord.com/channels/519477170964267008/1272594235249655808/1272594235249655808)
