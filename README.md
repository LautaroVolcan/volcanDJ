# Lautaro Volcan — DJ website

Personal site for Lautaro Volcan: mixes, bio and booking contact.
Designed and built by Lautaro Ferrandi. All rights reserved (see `LICENSE`).

Plain HTML, CSS and JavaScript. No build step and no dependencies.

```
index.html            page
assets/css/main.css   styles
assets/js/main.js     header, video dialog and the custom SoundCloud player
assets/fonts/         self-hosted fonts (SIL OFL)
assets/img/           photos and icons
```

## Adding a mix

1. On SoundCloud, open the track → Share → Embed. Copy the number after `tracks/` in the embed code.
2. In `index.html`, copy one `<li>` inside `<ol class="crate">` and change:
   - `data-track` → the track number
   - `data-url` → the track's SoundCloud link
   - `data-genre` and the two visible texts (title and genre)
3. The first item in the list is the one loaded on the deck when the page opens.

Duration, artwork and waveform are read from SoundCloud automatically.

## Local preview

```
python3 -m http.server 8000
```
Then open http://localhost:8000.
