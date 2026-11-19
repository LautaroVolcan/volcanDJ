"""Builds the press kit PDFs (EN and ES) from presskit/template.html.

Usage (from the repo root):
    pip install playwright segno && playwright install chromium
    python3 presskit/build.py

Output: assets/presskit/LautaroVolcan-PressKit-EN.pdf and -ES.pdf
"""
import asyncio
import pathlib
import segno
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "presskit"
SITE = "https://lautarovolcan.github.io/volcanDJ/"

MIXES = [
    ("Tech House #1", {"en": "Tech house", "es": "Tech house"}, "https://soundcloud.com/lautarovolcan/tech-house-1"),
    ("Melodic House #1", {"en": "Melodic house", "es": "Melodic house"}, "https://soundcloud.com/lautarovolcan/melodic-house-1"),
    ("Deep House #2", {"en": "Deep house", "es": "Deep house"}, "https://soundcloud.com/lautarovolcan/deep-house-2"),
    ("Deep House #1", {"en": "Deep house", "es": "Deep house"}, "https://soundcloud.com/lautarovolcan/deep-house-session-1"),
]
VIDEOS = [
    ("Live session #1", "https://www.youtube.com/watch?v=7vkOglBB7mk&t=1500s", "youtube.com/watch?v=7vkOglBB7mk"),
    ("Live session #2", "https://www.youtube.com/watch?v=L5LTvuj2zEo", "youtube.com/watch?v=L5LTvuj2zEo"),
]

T = {
    "en": {
        "lang": "en",
        "kicker": "Press kit",
        "role": "DJ based in Barcelona",
        "genres": ["Tech house", "House", "Techno", "Nu disco", "Ambient"],
        "about": "About",
        "short_label": "Short bio for listings and flyers",
        "short": "Lautaro Volcan is the DJ project of Lautaro Ferrandi, an Argentine-Spanish DJ based in Barcelona. "
                 "His sets move through tech house, house, techno and nu disco, with ambient passages that give the room space to breathe.",
        "long_label": "In his words",
        "long": [
            "I'm drawn to tech house, house, techno, nu disco and ambient, and I focus on building atmospheres that connect with the room. "
            "I pick tracks for their groove, their vocals and their rhythmic patterns, and dig into what makes each one work to build sets people share together.",
            "I like sets that move across styles. I've played clubs and events in different countries, reading each crowd and each venue as it comes.",
            "Ambient is where the introspective side comes in: it lets me fold quieter, emotional passages into a mix without losing the floor.",
        ],
        "listen": "Listen and watch",
        "mixes": "Mixes on SoundCloud",
        "videos": "Sets on video",
        "scan": "Scan or tap to open",
        "book": "Bookings",
        "book_lede": "For bookings, collaborations and press, write to:",
        "links": "Find me",
        "website": "Website",
        "photos": "Press photos",
        "photos_note": "High-resolution photos are available on request.",
    },
    "es": {
        "lang": "es",
        "kicker": "Press kit",
        "role": "DJ con base en Barcelona",
        "genres": ["Tech house", "House", "Techno", "Nu disco", "Ambient"],
        "about": "Sobre mí",
        "short_label": "Bio corta para agendas y flyers",
        "short": "Lautaro Volcan es el proyecto como DJ de Lautaro Ferrandi, DJ argentino-español con base en Barcelona. "
                 "Sus sets recorren el tech house, el house, el techno y el nu disco, con pasajes de ambient que le dan aire a la pista.",
        "long_label": "En primera persona",
        "long": [
            "Me apasionan el tech house, el house, el techno, el nu disco y el ambient, y me dedico a crear atmósferas que conecten con el público. "
            "Elijo los tracks por su groove, sus voces y sus patrones rítmicos, y busco qué hace funcionar a cada uno para construir sets que se disfruten en conjunto.",
            "Me gustan los sets que cruzan estilos. He tocado en clubes y eventos de distintos países, leyendo cada público y cada espacio.",
            "El ambient es mi lado más introspectivo: me permite sumar pasajes más tranquilos y emotivos a una mezcla sin perder la pista.",
        ],
        "listen": "Escuchar y ver",
        "mixes": "Mixes en SoundCloud",
        "videos": "Sets en video",
        "scan": "Escanea o toca para abrir",
        "book": "Contrataciones",
        "book_lede": "Para contrataciones, colaboraciones y prensa, escríbeme a:",
        "links": "Dónde encontrarme",
        "website": "Sitio web",
        "photos": "Fotos de prensa",
        "photos_note": "Fotos en alta resolución disponibles a pedido.",
    },
}


def qr(url: str) -> str:
    return segno.make(url, error="m").svg_inline(dark="#1C0A0C", light=None, scale=4, border=0, omitsize=True)


def build_html(lang: str) -> str:
    t = T[lang]
    tpl = (ROOT / "presskit" / "template.html").read_text(encoding="utf-8")
    mixes = "\n".join(
        f'''<a class="card gloss" href="{url}">
              <span class="qr">{qr(url)}</span>
              <span class="card__txt"><strong>{title}</strong><span>{genre[lang]}</span><em>{url.replace("https://", "")}</em></span>
            </a>'''
        for title, genre, url in MIXES
    )
    videos = "\n".join(
        f'''<a class="card gloss" href="{url}">
              <span class="qr">{qr(url)}</span>
              <span class="card__txt"><strong>{title}</strong><span>YouTube</span><em>{short}</em></span>
            </a>'''
        for title, url, short in VIDEOS
    )
    repl = {
        "{{lang}}": t["lang"],
        "{{kicker}}": t["kicker"],
        "{{role}}": t["role"],
        "{{genres}}": "".join(f"<li>{g}</li>" for g in t["genres"]),
        "{{about}}": t["about"],
        "{{short_label}}": t["short_label"],
        "{{short}}": t["short"],
        "{{long_label}}": t["long_label"],
        "{{long}}": "".join(f"<p>{p}</p>" for p in t["long"]),
        "{{listen}}": t["listen"],
        "{{mixes_title}}": t["mixes"],
        "{{videos_title}}": t["videos"],
        "{{scan}}": t["scan"],
        "{{mixes}}": mixes,
        "{{videos}}": videos,
        "{{book}}": t["book"],
        "{{book_lede}}": t["book_lede"],
        "{{links}}": t["links"],
        "{{website}}": t["website"],
        "{{site}}": SITE,
        "{{site_short}}": SITE.replace("https://", "").rstrip("/"),
        "{{site_qr}}": qr(SITE),
        "{{photos}}": t["photos"],
        "{{photos_note}}": t["photos_note"],
    }
    for k, v in repl.items():
        tpl = tpl.replace(k, v)
    return tpl


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for lang in ("en", "es"):
            html_path = ROOT / "presskit" / f"_build-{lang}.html"
            html_path.write_text(build_html(lang), encoding="utf-8")
            page = await browser.new_page()
            await page.goto(html_path.as_uri(), wait_until="networkidle")
            await page.evaluate("document.fonts.ready")
            pdf = OUT / f"LautaroVolcan-PressKit-{lang.upper()}.pdf"
            await page.pdf(path=str(pdf), format="A4", print_background=True, prefer_css_page_size=True)
            html_path.unlink()
            print("wrote", pdf.relative_to(ROOT), round(pdf.stat().st_size / 1024), "KB")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
