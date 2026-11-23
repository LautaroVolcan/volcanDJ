# Lautaro Volcan — DJ website

Personal site for Lautaro Volcan: mixes, videos, bio and booking contact.
Live at https://volcan.lautaroferrandi.com (GitHub Pages, DNS on Cloudflare).
Designed and built by Lautaro Ferrandi. All rights reserved (see `LICENSE`).

Plain HTML, CSS and JavaScript. No build step and no dependencies.

```
index.html            page
assets/css/main.css   styles
assets/js/main.js     header, video dialog and the custom SoundCloud player
assets/fonts/         self-hosted fonts (SIL OFL)
assets/img/           photos and icons
assets/presskit/      press kit PDFs (EN, ES) linked from the Booking section
presskit/             source of the press kit (template + build script)
```

## Adding a mix

1. On SoundCloud, open the track → Share → Embed. Copy the number after `tracks/` in the embed code.
2. In `index.html`, copy one `<li>` inside `<ol class="crate">` and change:
   - `data-track` → the track number
   - `data-url` → the track's SoundCloud link
   - `data-genre` (shown on the deck's LCD) and the visible title
3. The first item in the list is the one loaded on the deck when the page opens.

Duration, artwork and waveform are read from SoundCloud automatically.

## Local preview

```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Press kit

The PDFs are generated from `presskit/template.html`. Texts, mixes and videos live in `presskit/build.py`.

```
pip install playwright segno && playwright install chromium
python3 presskit/build.py
```
