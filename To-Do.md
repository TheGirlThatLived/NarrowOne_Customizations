**Next up:**
- Violent Glass
    - [ ] Add breathing(?) and walking animations to character cards
    - [ ] Custom Crosshairs
    > `const svgURL = (svgURL) => URL.createObjectURL(new Blob([svgURL], {type: 'image/svg+xml'}));`
    > 
    > `const greenDot = svgURL(`<svg xmlns="https://www."></svg>`);`
    > 
    > `<img src="${greenDot}">`
    - [ ] Declare "TheHoly" animation (reference: <https://www.youtube.com/watch?v=Ty_cXtdzKKc>)
    - [ ] Un-disable this by default: `<button class="dialog-button blueNight wrinkledPaper" disabled="" style="--wrinkled-paper-seed: 68970;">Shat</button>`
    - [ ] Glassify the Main Menu buttons and hidden sub-menus (personal stats; squad window), set zoom to  100% and override UI menus scaling.
    > https://discord.com/channels/519477170964267008/1302074751510118510/1318390165798129785
    > 
    > https://discord.com/channels/519477170964267008/1302074751510118510/1322249011184537660
    - [ ] Glassify the HP bar
    - [ ] HP Bar: Tape it together better, so the elements don't slide away for different screen resolutions
    > Since you have rotated elements and are trying to base some of the dimensions/positions on screen width and some on screen height, that isn't going to work. Instead, you can try basing relative sizes of everything on the same value. A good value to pick is probably screen's vertical height. So instead of "height: 50%", use "50vh". And instead of "width: 50%", use "88.88vh" (which is 50 * 16/9). Switching everything to this approach seems to fix most elements in place without affecting the looks.
- Health Bar Percentage.js
    - [x] Place the Text% inside "health-ui-heart"
    - [x] Adjust the text font size and visibility on heart background
    - [ ] ~~(?) Color the heart icon by player's team color~~
    - [ ] Color the diamond borders
    - [x] (?) Color the "HP % Text" depending on its "HP" (0-20%, 20-80%, 80%-100%)
```
/* Team 3 - Cyan color */
.flag-score-item:nth-of-type(1) .flag-score-point-el.returned .center-dot:nth-of-type(3) {
  --team-color: #ff00f7; / Team 3 color (blue) /
  fill: var(--team-color);
  stroke: var(--team-color);
}
/* Team 6 - Purple color (6th center-dot) */
.flag-score-item:nth-of-type(2) .flag-score-point-el.returned .center-dot:nth-of-type(3) {
  --team-color: cyan; / Team 6 color (purple) */
  fill: var(--team-color);
  stroke: var(--team-color);
}
```
