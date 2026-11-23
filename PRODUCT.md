# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences carry equal weight, and the site must serve each one completely:

- **Bookers and collaborators.** Club bookers, event promoters, collaborators and press deciding whether to book or feature Lautaro Volcan. They need to hear him quickly, understand his range and identity, and reach him with a press kit in hand.
- **Listeners and fans.** People who heard him play or found him on Instagram, SoundCloud or YouTube and want to listen to more sets.

Both arrive on any device, often on a phone from a social link.

## Product Purpose

The personal one-page site of Lautaro Volcan, the DJ project of Lautaro Ferrandi, an Argentine-Spanish DJ based in Barcelona. It gathers his mixes, filmed sets, bio and booking contact in one place. Success means a booker leaves able to judge his sound and contact him, and a listener stays to play a full mix.

## Positioning

The site behaves like a DJ setup: mixes load from a "crate" onto a "deck" with a platter, an LCD readout and a waveform you can scrub, and videos play on two decks with a mixer between them. You listen to the set on the site itself, not through a stack of generic embeds. The musical identity covers tech house, house, techno, nu disco and ambient, with sets that move across styles and ambient passages that give the room space to breathe.

## Operating Context

- Live at https://volcan.lautaroferrandi.com on GitHub Pages, with DNS on Cloudflare (`CNAME`, `.nojekyll`).
- Mixes are added by hand in `index.html` (`<ol class="crate">`). Duration, artwork and waveform are read from SoundCloud at runtime, and the first item loads on the deck.
- Press kit PDFs (EN, ES) are generated from `presskit/template.html` and `presskit/build.py` with Playwright, then linked from Booking.
- Language toggle EN/ES, remembered in `localStorage`. First visits follow `?lang`, then the browser's preferred languages, then English. All strings live in the `I18N` table in `assets/js/main.js`.
- Local preview: `python3 -m http.server 8000`.

## Capabilities and Constraints

- **No build, no dependencies.** Plain HTML, CSS and JavaScript that deploys as-is to GitHub Pages.
- **EN + ES parity.** Every visible string, `aria-label` and alt text exists in both English and Spanish. The press kit ships in both languages.
- **Media stays hosted elsewhere.** Audio streams from SoundCloud (Widget API, with a visible fallback to the stock widget when the browser blocks playback). Video embeds from YouTube. No self-hosted audio or video.
- **Real photos only.** Use only the existing photography of Lautaro. No stock or generated images of him.
- Fonts are self-hosted under their licenses (SIL OFL, GUST). Third-party terms for SoundCloud and YouTube apply.
- All rights reserved (`LICENSE`). Credit line: "Designed and built by Lautaro Ferrandi".

## Brand Commitments

- Name: **Lautaro Volcan** (DJ name). Legal or personal name: Lautaro Ferrandi.
- Voice: first person, plain and warm, about the room and the crowd. Signature line: "I shape minimal beats, deep grooves and dark ambiances into immersive sonic journeys."
- Genres as stated: Tech house, Melodic house, Deep house (what the mixes cover today). The bio says the sets are heading into techno, nu disco and ambient; keep that framed as direction, not as existing sets.
- Existing identity assets: the "LV" mark, the icon set in `assets/img/`, and the photography described below.

## Evidence on Hand

- Mixes on SoundCloud (soundcloud.com/lautarovolcan): Tech House #1, Melodic House #1, Deep House #1, Deep House #2.
- Two filmed sets on YouTube: Melodic House Mix Vol.1 and Deep House Mix Vol.1 (titled "… with Lautaro Volcan" on YouTube). Both play from the start.
- Photos: hero at the decks at home in red and amber light with a lava lamp (`assets/img/hero-*`), a portrait with an orange star of light over one eye (`assets/img/portrait-*`), and an about image (`assets/img/about-*`).
- Press kit PDFs in `assets/presskit/`. High-resolution press photos are available on request.
- Socials: Instagram, SoundCloud and YouTube.
- **Absent, do not fabricate:** named venues, events, residencies, cities, lineups, testimonials, follower or play counts, releases or labels. The bio's "clubs and events in different countries" stays unnamed.

## Product Principles

1. **Let them hear it first.** Listening is the proof. Keep a mix one action away for both bookers and fans.
2. **Serve both visitors in full.** Never trade the booker's path (bio, range, press kit, contact) for the listener's, or the other way around.
3. **Truth over hype.** Claim only what is real. Absent credentials stay absent.
4. **Two languages, one experience.** Spanish is never a second-class translation.
5. **Simple to keep up.** Adding a mix or editing copy stays a hand edit to static files.

## Accessibility & Inclusion

Custom media controls stay operable by keyboard and screen reader (labelled buttons, the waveform as a slider with value text, live LCD status). Respect `prefers-reduced-motion`. Keep the skip link to the mixes.
