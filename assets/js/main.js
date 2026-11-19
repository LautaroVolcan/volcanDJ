/* Lautaro Volcan — site script
   Design and code © Lautaro Ferrandi. All rights reserved.
   No dependencies. The player drives SoundCloud's official Widget API
   (https://developers.soundcloud.com/docs/api/html5-widget). */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let player = null; // set once the deck is wired up

  /* ---------------- Language (English is the default) ---------------- */

  const I18N = {
    en: {
      title: "Lautaro Volcan — DJ",
      description: "Lautaro Volcan is an Argentine-Spanish DJ based in Barcelona playing tech house, house, techno, nu disco and ambient. Listen to his mixes and get in touch for bookings.",
      skip: "Skip to the mixes",
      backTop: "Lautaro Volcan, back to top",
      navLabel: "Main",
      navMixes: "Mixes", navVideos: "Videos", navAbout: "About", navBooking: "Booking",
      langLabel: "Language",
      heroAlt: "Lautaro behind the decks at home, lit in red and amber, with a lava lamp glowing beside him",
      lede: "I shape minimal beats, deep grooves and dark ambiances into immersive sonic journeys.",
      ctaListen: "Listen to the mixes",
      ctaWatch: "Watch a set",
      mixesIntro: "Recorded sessions from the booth. Pick one from the crate and it loads on the deck.",
      timeToggle: "Switch between elapsed and remaining time",
      wavePos: "Position in the mix",
      prev: "Previous mix", next: "Next mix", volume: "Volume",
      openSc: "Open on SoundCloud",
      fallback: "Your browser blocked playback from the custom player. Use the SoundCloud player below instead.",
      credit: "Audio streamed from",
      videosIntro: "Two sets on camera. Press play on a deck to watch it.",
      watchYt: "Watch on YouTube",
      aboutAlt: "Lautaro mixing on two decks in a red-lit room, seen from below",
      aboutTitle: "I'm Lautaro Ferrandi, and I play as Lautaro Volcan: an Argentine-Spanish DJ based in Barcelona.",
      about1: "I'm drawn to tech house, house, techno, nu disco and ambient, and I focus on building atmospheres that connect with the room. I pick tracks for their groove, their vocals and their rhythmic patterns, and dig into what makes each one work to build sets people share together.",
      about2: "I like sets that move across styles. I've played clubs and events in different countries, reading each crowd and each venue as it comes.",
      about3: "Ambient is where the introspective side comes in: it lets me fold quieter, emotional passages into a mix without losing the floor.",
      genres: "Genres",
      bookingTitle: "Bookings, collaborations and press",
      pkMain: "Download press kit", pkMainHref: "assets/presskit/LautaroVolcan-PressKit-EN.pdf",
      pkAlt: "Press kit en español", pkAltHref: "assets/presskit/LautaroVolcan-PressKit-ES.pdf", pkAltLang: "es",
      rights: "All rights reserved.",
      builtBy: "Designed and built by",
      // player and video decks
      st_ready: "Ready", st_loading: "Loading", st_playing: "Playing", st_paused: "Paused", st_offline: "Offline",
      chooseMix: "Choose a mix", unreachable: "SoundCloud is unreachable",
      elapsed: "Elapsed", remaining: "Remaining",
      of: (a, b) => `${a} of ${b}`,
      play: "Play", pause: "Pause",
      openTrack: (x) => `Open ${x} on SoundCloud`,
      playVideo: (x) => `Play ${x}`,
      close: "Close", fullscreen: "Full screen", exitFullscreen: "Exit full screen",
      videoPos: "Position in the video",
      videoError: "This video can't play here.",
    },
    es: {
      title: "Lautaro Volcan — DJ",
      description: "Lautaro Volcan es un DJ argentino-español con base en Barcelona: tech house, house, techno, nu disco y ambient. Escucha sus mixes y escríbele para contrataciones.",
      skip: "Saltar a los mixes",
      backTop: "Lautaro Volcan, volver arriba",
      navLabel: "Principal",
      navMixes: "Mixes", navVideos: "Videos", navAbout: "Sobre mí", navBooking: "Contacto",
      langLabel: "Idioma",
      heroAlt: "Lautaro en los platos en su casa, con luz roja y ámbar y una lámpara de lava encendida a su lado",
      lede: "Doy forma a beats minimalistas, grooves profundos y atmósferas oscuras para crear viajes sonoros envolventes.",
      ctaListen: "Escuchar los mixes",
      ctaWatch: "Ver un set",
      mixesIntro: "Sesiones grabadas desde la cabina. Elige una de la lista y se carga en el deck.",
      timeToggle: "Cambiar entre tiempo transcurrido y restante",
      wavePos: "Posición en el mix",
      prev: "Mix anterior", next: "Mix siguiente", volume: "Volumen",
      openSc: "Abrir en SoundCloud",
      fallback: "Tu navegador bloqueó la reproducción desde este reproductor. Usa el reproductor de SoundCloud que aparece debajo.",
      credit: "Audio en streaming desde",
      videosIntro: "Dos sets en cámara. Pulsa play en un deck para verlo.",
      watchYt: "Ver en YouTube",
      aboutAlt: "Lautaro mezclando en dos platos en una habitación con luz roja, visto desde abajo",
      aboutTitle: "Soy Lautaro Ferrandi y toco como Lautaro Volcan: DJ argentino-español con base en Barcelona.",
      about1: "Me apasionan el tech house, el house, el techno, el nu disco y el ambient, y me dedico a crear atmósferas que conecten con el público. Elijo los tracks por su groove, sus voces y sus patrones rítmicos, y busco qué hace funcionar a cada uno para construir sets que se disfruten en conjunto.",
      about2: "Me gustan los sets que cruzan estilos. He tocado en clubes y eventos de distintos países, leyendo cada público y cada espacio.",
      about3: "El ambient es mi lado más introspectivo: me permite sumar pasajes más tranquilos y emotivos a una mezcla sin perder la pista.",
      genres: "Géneros",
      bookingTitle: "Contrataciones, colaboraciones y prensa",
      pkMain: "Descargar press kit", pkMainHref: "assets/presskit/LautaroVolcan-PressKit-ES.pdf",
      pkAlt: "Press kit in English", pkAltHref: "assets/presskit/LautaroVolcan-PressKit-EN.pdf", pkAltLang: "en",
      rights: "Todos los derechos reservados.",
      builtBy: "Diseñado y desarrollado por",
      st_ready: "Listo", st_loading: "Cargando", st_playing: "Sonando", st_paused: "En pausa", st_offline: "Sin conexión",
      chooseMix: "Elige un mix", unreachable: "No se puede conectar con SoundCloud",
      elapsed: "Transcurrido", remaining: "Restante",
      of: (a, b) => `${a} de ${b}`,
      play: "Reproducir", pause: "Pausar",
      openTrack: (x) => `Abrir ${x} en SoundCloud`,
      playVideo: (x) => `Reproducir ${x}`,
      close: "Cerrar", fullscreen: "Pantalla completa", exitFullscreen: "Salir de pantalla completa",
      videoPos: "Posición en el video",
      videoError: "Este video no se puede reproducir aquí.",
    },
  };

  let lang = "en";
  const langListeners = [];
  const tr = (key, ...args) => {
    const v = I18N[lang][key] ?? I18N.en[key];
    return typeof v === "function" ? v(...args) : v;
  };

  function setLang(next, { persist = true } = {}) {
    lang = I18N[next] ? next : "en";
    document.documentElement.lang = lang;
    document.title = tr("title");
    $('meta[name="description"]')?.setAttribute("content", tr("description"));
    $$("[data-i18n]").forEach((el) => (el.textContent = tr(el.dataset.i18n)));
    $$("[data-i18n-attr]").forEach((el) =>
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":");
        el.setAttribute(attr, tr(key));
      })
    );
    $$("[data-lang-set]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langSet === lang)));
    if (persist) {
      try { localStorage.setItem("lang", lang); } catch (_) {}
      const url = new URL(location.href);
      if (lang === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
    langListeners.forEach((fn) => fn());
  }

  $$("[data-lang-set]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.langSet)));

  // ?lang=es in the link wins, then the visitor's last choice; otherwise English.
  const initialLang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && I18N[q]) return q;
    try { const saved = localStorage.getItem("lang"); if (saved && I18N[saved]) return saved; } catch (_) {}
    return "en";
  })();

  /* ---------------- Small page bits ---------------- */

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  const header = $(".top");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Video player ----------------
     Opens over the page. Uses YouTube's IFrame API with YouTube's own controls hidden;
     everything you see and press is ours. */
  const vdecks = $$("[data-vdeck]");
  const vp = {
    dialog: $("[data-vplayer]"),
    panel: $("[data-vp-panel]"),
    screen: $("[data-vp-screen]"),
    frameHost: $("[data-vp-frame]"),
    num: $("[data-vp-num]"),
    title: $("[data-vp-title]"),
    close: $("[data-vp-close]"),
    hit: $("[data-vp-toggle]"),
    play: $("[data-vp-play]"),
    cur: $("[data-vp-cur]"),
    dur: $("[data-vp-dur]"),
    wave: $("[data-vp-wave]"),
    canvas: $("[data-vp-canvas]"),
    hover: $("[data-vp-hover]"),
    vol: $("[data-vp-vol]"),
    fs: $("[data-vp-fs]"),
    msg: $("[data-vp-msg]"),
  };
  let yt = null;            // YT.Player
  let ytReady = null;       // Promise for the API
  let vDeck = null;         // deck currently open
  let vPlaying = false;
  let vTick = 0;
  let vPeaks = [];

  const fmtS = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
  };

  function loadYT() {
    if (window.YT?.Player) return Promise.resolve();
    if (ytReady) return ytReady;
    ytReady = new Promise((resolve, reject) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.onerror = () => { ytReady = null; reject(new Error("YouTube API failed")); };
      document.head.appendChild(s);
    });
    return ytReady;
  }

  function vSetPlaying(on) {
    vPlaying = on;
    vp.panel.classList.toggle("is-playing", on);
    const label = tr(on ? "pause" : "play");
    vp.play.setAttribute("aria-label", label);
    vp.hit.setAttribute("aria-label", label);
    clearInterval(vTick);
    if (on) vTick = setInterval(vRender, 250);
    vRender();
  }

  function vRender() {
    if (!yt?.getCurrentTime) return;
    const cur = yt.getCurrentTime() || 0;
    const dur = yt.getDuration() || 0;
    vp.cur.textContent = fmtS(cur);
    vp.dur.textContent = fmtS(dur);
    vp.wave.setAttribute("aria-valuenow", dur ? Math.round((cur / dur) * 100) : 0);
    vp.wave.setAttribute("aria-valuetext", tr("of", fmtS(cur), fmtS(dur)));
    vDraw(dur ? cur / dur : 0);
  }

  const vctx = vp.canvas.getContext("2d");
  function vDraw(ratio) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = vp.canvas.clientWidth, h = vp.canvas.clientHeight;
    if (!w || !h) return;
    if (vp.canvas.width !== Math.round(w * dpr)) { vp.canvas.width = Math.round(w * dpr); vp.canvas.height = Math.round(h * dpr); }
    vctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    vctx.clearRect(0, 0, w, h);
    const bar = 3, gap = 2, count = Math.floor(w / (bar + gap)), mid = h * 0.62, px = ratio * w;
    for (let k = 0; k < count; k++) {
      const v = vPeaks[Math.floor((k / count) * vPeaks.length)] || 0.3;
      const x = k * (bar + gap), up = Math.max(2, v * (mid - 2)), down = Math.max(1, v * (h - mid) * 0.8);
      const played = x + bar <= px;
      vctx.fillStyle = played ? "#F0A04B" : "rgba(243,221,212,.30)";
      vctx.fillRect(x, mid - up, bar, up);
      vctx.fillStyle = played ? "rgba(240,160,75,.35)" : "rgba(243,221,212,.10)";
      vctx.fillRect(x, mid + 1, bar, down);
    }
    vctx.fillStyle = "#F3DDD4";
    vctx.fillRect(Math.min(w - 2, px), 0, 2, h);
  }

  function vSeekRatio(r) {
    if (!yt?.getDuration) return;
    const d = yt.getDuration();
    if (!d) return;
    yt.seekTo(Math.min(1, Math.max(0, r)) * d, true);
    vRender();
  }

  function vToggle() {
    if (!yt?.getPlayerState) return;
    vPlaying ? yt.pauseVideo() : yt.playVideo();
  }

  function vShowMsg(on) {
    vp.msg.hidden = !on;
    if (on) {
      const url = `https://www.youtube.com/watch?v=${vDeck.dataset.videoId}`;
      vp.msg.innerHTML = `${tr("videoError")} <a href="${url}" target="_blank" rel="noopener">${tr("watchYt")}</a>`;
    }
  }

  async function openVideo(d) {
    if (player) player.pause();
    vDeck = d;
    vdecks.forEach((o) => o.classList.toggle("is-live", o === d));
    const { videoId: id, videoStart: start = 0, videoTitle: title } = d.dataset;
    vp.num.textContent = d.classList.contains("vdeck--2") ? "2" : "1";
    vp.title.textContent = title;
    vPeaks = fakePeaks(parseInt(id.replace(/\D/g, "") || "7", 10) + 13);
    vp.cur.textContent = fmtS(start);
    vp.dur.textContent = "0:00";
    vShowMsg(false);
    vp.dialog.showModal();
    vDraw(0);
    try {
      await loadYT();
    } catch (_) {
      vShowMsg(true);
      return;
    }
    if (vDeck !== d) return;
    if (yt) {
      yt.loadVideoById({ videoId: id, startSeconds: Number(start) });
      yt.setVolume(Number(vp.vol.value));
      return;
    }
    yt = new YT.Player(vp.frameHost, {
      host: "https://www.youtube-nocookie.com",
      videoId: id,
      playerVars: {
        autoplay: 1, controls: 0, disablekb: 1, fs: 0, rel: 0, iv_load_policy: 3,
        playsinline: 1, start: Number(start), modestbranding: 1, origin: location.origin,
      },
      events: {
        onReady: (e) => { e.target.setVolume(Number(vp.vol.value)); e.target.playVideo(); vRender(); },
        onStateChange: (e) => {
          const S = YT.PlayerState;
          if (e.data === S.PLAYING) vSetPlaying(true);
          else if (e.data === S.PAUSED || e.data === S.CUED) vSetPlaying(false);
          else if (e.data === S.ENDED) {
            vSetPlaying(false);
            yt.seekTo(Number(vDeck?.dataset.videoStart || 0), true);
            yt.pauseVideo();
          }
        },
        onError: () => vShowMsg(true),
      },
    });
  }

  function closeVideo() {
    try { yt?.pauseVideo(); } catch (_) {}
    vSetPlaying(false);
    vdecks.forEach((o) => o.classList.remove("is-live"));
    if (document.fullscreenElement) document.exitFullscreen?.();
  }

  vdecks.forEach((d) => $$("[data-video-play]", d).forEach((btn) => btn.addEventListener("click", () => openVideo(d))));
  vp.dialog?.addEventListener("close", closeVideo);
  vp.dialog?.addEventListener("click", (e) => { if (e.target === vp.dialog) vp.dialog.close(); });
  vp.close.addEventListener("click", () => vp.dialog.close());
  vp.hit.addEventListener("click", vToggle);
  vp.hit.addEventListener("dblclick", () => vp.fs.click());
  vp.play.addEventListener("click", vToggle);
  vp.vol.addEventListener("input", () => {
    vp.vol.style.setProperty("--v", `${vp.vol.value}%`);
    yt?.setVolume?.(Number(vp.vol.value));
  });
  vp.vol.style.setProperty("--v", `${vp.vol.value}%`);

  const vRatio = (e) => { const r = vp.wave.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
  vp.wave.addEventListener("pointerdown", (e) => { vp.wave.setPointerCapture(e.pointerId); vSeekRatio(vRatio(e)); });
  vp.wave.addEventListener("pointermove", (e) => {
    const r = Math.min(1, Math.max(0, vRatio(e)));
    vp.hover.style.left = `${r * 100}%`;
    vp.hover.dataset.t = yt?.getDuration ? fmtS(r * yt.getDuration()) : "";
    if (e.buttons && vp.wave.hasPointerCapture(e.pointerId)) vSeekRatio(r);
  });
  vp.dialog?.addEventListener("keydown", (e) => {
    if (!yt?.getCurrentTime || e.target === vp.vol) return;
    if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); vToggle(); }
    if (e.key === "k") vToggle();
    const step = { ArrowRight: 10, ArrowLeft: -10, l: 10, j: -10 }[e.key];
    if (step) { e.preventDefault(); yt.seekTo(yt.getCurrentTime() + step, true); vRender(); }
    if (e.key === "f") vp.fs.click();
  });

  if (!document.fullscreenEnabled) vp.fs.hidden = true;
  vp.fs.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else vp.panel.requestFullscreen?.();
  });
  document.addEventListener("fullscreenchange", () => {
    vp.fs.setAttribute("aria-label", tr(document.fullscreenElement ? "exitFullscreen" : "fullscreen"));
    requestAnimationFrame(vRender);
  });
  new ResizeObserver(() => vRender()).observe(vp.canvas);

  langListeners.push(() => {
    vdecks.forEach((d) => $$("[data-video-play]", d).forEach((b) => b.setAttribute("aria-label", tr("playVideo", d.dataset.videoTitle))));
    const label = tr(vPlaying ? "pause" : "play");
    vp.play.setAttribute("aria-label", label);
    vp.hit.setAttribute("aria-label", label);
    if (!vp.msg.hidden) vShowMsg(true);
  });

  // YouTube serves a tiny grey placeholder when a video has no max-res thumbnail; fall back to the HQ one.
  $$("[data-yt-thumb]").forEach((img) => {
    const fallback = () => {
      const hq = `https://i.ytimg.com/vi/${img.dataset.ytThumb}/hqdefault.jpg`;
      if (img.src !== hq) img.src = hq;
    };
    img.addEventListener("error", fallback);
    img.addEventListener("load", () => { if (img.naturalWidth <= 120) fallback(); });
    if (img.complete && img.naturalWidth && img.naturalWidth <= 120) fallback();
  });

  /* ---------------- Player ---------------- */

  const deck = $("[data-deck]");
  if (!deck) return;

  const ui = {
    platter: $("[data-platter]", deck),
    art: $("[data-art]", deck),
    state: $("[data-state]", deck),
    genre: $("[data-genre]", deck),
    title: $("[data-title]", deck),
    time: $("[data-time]", deck),
    timeMode: $("[data-time-mode]", deck),
    timeToggle: $("[data-time-toggle]", deck),
    wave: $("[data-wave]", deck),
    canvas: $("[data-wave-canvas]", deck),
    hover: $("[data-wave-hover]", deck),
    play: $("[data-play]", deck),
    prev: $("[data-prev]", deck),
    next: $("[data-next]", deck),
    volume: $("[data-volume]", deck),
    permalink: $("[data-permalink]", deck),
    fallback: $("[data-fallback]", deck),
    engine: $("[data-engine]", deck),
  };

  const tracks = $$("[data-track]").map((btn, i) => ({
    i,
    id: btn.dataset.track,
    url: btn.dataset.url,
    genre: btn.dataset.genre,
    title: $(".crate__title", btn).textContent.trim(),
    btn,
    lenEl: $("[data-len]", btn),
    iframe: null,
    widget: null,
    ready: false,
    duration: 0,
    pos: 0,
    art: "",
    peaks: null,
  }));

  let cur = null;
  let playing = false;
  let showRemaining = false;
  let volume = Number(ui.volume?.value ?? 80);
  let pendingPlay = null;
  let fallbackTimer = 0;
  let apiPromise = null;
  let engineStarted = false;

  /* ---- helpers ---- */

  const fmt = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
  };

  let stateKey = "ready";
  let titleKey = "chooseMix"; // used while no track title is shown
  const setState = (key) => { stateKey = key; ui.state.textContent = tr(`st_${key}`); };

  function loadApi() {
    if (window.SC?.Widget) return Promise.resolve();
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://w.soundcloud.com/player/api.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("SoundCloud API failed to load"));
      document.head.appendChild(s);
    });
    return apiPromise;
  }

  // Deterministic stand-in waveform, used only if SoundCloud's waveform data can't be read.
  function fakePeaks(seed, n = 400) {
    let x = Number(seed) % 2147483647 || 1;
    const rnd = () => ((x = (x * 48271) % 2147483647) / 2147483647);
    const out = [];
    let v = 0.5;
    for (let k = 0; k < n; k++) {
      v += (rnd() - 0.5) * 0.25;
      v = Math.min(1, Math.max(0.25, v));
      const t = k / n;
      const env = Math.min(1, t * 12, (1 - t) * 10); // fade in / out
      out.push(Math.max(0.08, (v * 0.75 + rnd() * 0.25) * (0.35 + 0.65 * env)));
    }
    return out;
  }

  async function loadPeaks(t, waveformUrl) {
    t.peaks = fakePeaks(t.id);
    if (!waveformUrl) return;
    try {
      const res = await fetch(waveformUrl.replace(/\.png(\?.*)?$/, ".json"));
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      const samples = data.samples || [];
      const max = data.height || Math.max(...samples, 1);
      if (samples.length > 10) {
        const n = 400;
        const step = samples.length / n;
        t.peaks = Array.from({ length: n }, (_, k) => {
          let peak = 0;
          for (let j = Math.floor(k * step); j < Math.floor((k + 1) * step); j++) peak = Math.max(peak, samples[j] || 0);
          return Math.max(0.06, peak / max);
        });
      }
    } catch (_) { /* keep stand-in */ }
    if (t === cur) drawWave();
  }

  /* ---- waveform drawing ---- */

  const ctx = ui.canvas.getContext("2d");
  let drawQueued = false;

  function drawWave() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => {
      drawQueued = false;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = ui.canvas.clientWidth;
      const h = ui.canvas.clientHeight;
      if (!w || !h) return;
      if (ui.canvas.width !== Math.round(w * dpr) || ui.canvas.height !== Math.round(h * dpr)) {
        ui.canvas.width = Math.round(w * dpr);
        ui.canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const peaks = cur?.peaks || fakePeaks(cur?.id || 7);
      const ratio = cur && cur.duration ? cur.pos / cur.duration : 0;
      const bar = 3, gap = 2;
      const count = Math.floor(w / (bar + gap));
      const mid = h * 0.62;                  // waveform above, reflection below
      const playedX = ratio * w;

      for (let k = 0; k < count; k++) {
        const v = peaks[Math.floor((k / count) * peaks.length)] || 0.1;
        const x = k * (bar + gap);
        const up = Math.max(2, v * (mid - 2));
        const down = Math.max(1, v * (h - mid) * 0.8);
        const played = x + bar <= playedX;
        ctx.fillStyle = played ? "#F0A04B" : "rgba(243,221,212,.30)";
        ctx.fillRect(x, mid - up, bar, up);
        ctx.fillStyle = played ? "rgba(240,160,75,.35)" : "rgba(243,221,212,.10)";
        ctx.fillRect(x, mid + 1, bar, down);
      }
      // playhead
      if (cur?.duration) {
        ctx.fillStyle = "#F3DDD4";
        ctx.fillRect(Math.min(w - 2, playedX), 0, 2, h);
      }
    });
  }

  new ResizeObserver(drawWave).observe(ui.canvas);

  /* ---- UI sync ---- */

  function renderTime() {
    if (!cur) return;
    const ms = showRemaining && cur.duration ? cur.duration - cur.pos : cur.pos;
    ui.time.textContent = (showRemaining && cur.duration ? "-" : "") + fmt(ms);
    ui.timeMode.textContent = tr(showRemaining ? "remaining" : "elapsed");
    const pct = cur.duration ? Math.round((cur.pos / cur.duration) * 100) : 0;
    ui.wave.setAttribute("aria-valuenow", pct);
    ui.wave.setAttribute("aria-valuetext", tr("of", fmt(cur.pos), fmt(cur.duration)));
  }

  function renderTrack() {
    if (!cur) return;
    deck.classList.add("has-track");
    ui.title.textContent = cur.title;
    ui.genre.textContent = cur.genre;
    ui.permalink.href = cur.url;
    ui.permalink.setAttribute("aria-label", tr("openTrack", cur.title));
    tracks.forEach((t) => t.btn.setAttribute("aria-current", t === cur ? "true" : "false"));
    if (cur.art) {
      ui.art.src = cur.art;
      ui.art.hidden = false;
    } else {
      ui.art.hidden = true;
      ui.art.removeAttribute("src");
    }
    $$("iframe", ui.engine).forEach((f) => f.classList.toggle("is-current", f === cur.iframe));
    renderTime();
    drawWave();
  }

  function setPlaying(on) {
    playing = on;
    deck.classList.toggle("is-playing", on);
    deck.classList.remove("is-loading");
    ui.play.setAttribute("aria-label", tr(on ? "pause" : "play"));
    setState(on ? "playing" : cur?.pos ? "paused" : "ready");
    if (on) {
      clearTimeout(fallbackTimer);
      ui.fallback.hidden = true;
    }
  }

  function showFallback() {
    deck.classList.add("show-engine");
    ui.fallback.hidden = false;
    deck.classList.remove("is-loading");
    setState("ready");
  }

  /* ---- engine: one hidden SoundCloud widget per mix ---- */

  function startEngine() {
    if (engineStarted) return apiPromise;
    engineStarted = true;
    return loadApi()
      .then(() => tracks.forEach(createWidget))
      .catch(() => {
        setState("offline");
        titleKey = "unreachable";
        ui.title.textContent = tr(titleKey);
      });
  }

  function createWidget(t) {
    const params = new URLSearchParams({
      url: `https://api.soundcloud.com/tracks/${t.id}`,
      color: "#b23730",
      auto_play: "false",
      hide_related: "true",
      show_comments: "false",
      show_user: "true",
      show_reposts: "false",
      show_teaser: "false",
      visual: "false",
    });
    const iframe = document.createElement("iframe");
    iframe.src = `https://w.soundcloud.com/player/?${params}`;
    iframe.allow = "autoplay";
    iframe.title = `${t.title} on SoundCloud`;
    iframe.loading = "eager";
    iframe.tabIndex = -1;
    ui.engine.appendChild(iframe);
    t.iframe = iframe;

    const w = SC.Widget(iframe);
    const E = SC.Widget.Events;
    t.widget = w;

    w.bind(E.READY, () => {
      t.ready = true;
      w.setVolume(volume);
      w.getCurrentSound((s) => {
        if (!s) return;
        t.duration = s.duration || t.duration;
        t.lenEl.textContent = fmt(t.duration);
        const art = s.artwork_url || s.user?.avatar_url || "";
        t.art = art.replace("-large", "-t500x500");
        loadPeaks(t, s.waveform_url);
        if (t === cur) renderTrack();
      });
      if (pendingPlay === t) {
        pendingPlay = null;
        play();
      }
    });

    w.bind(E.PLAY_PROGRESS, (e) => {
      t.pos = e.currentPosition;
      if (t === cur) { renderTime(); drawWave(); }
    });

    w.bind(E.PLAY, () => {
      if (vp.dialog?.open) vp.dialog.close();
      // If someone pressed play on a visible fallback widget, follow it.
      if (t !== cur) select(t.i, false);
      tracks.forEach((o) => o !== t && o.ready && o.widget.pause());
      setPlaying(true);
    });

    w.bind(E.PAUSE, () => { if (t === cur) setPlaying(false); });

    w.bind(E.FINISH, () => {
      if (t !== cur) return;
      t.pos = 0;
      setPlaying(false);
      const next = tracks[(t.i + 1) % tracks.length];
      if (next !== t) select(next.i, true);
    });
  }

  /* ---- transport ---- */

  function select(i, autoplay) {
    const t = tracks[i];
    if (!t) return;
    if (cur && cur !== t && cur.ready) cur.widget.pause();
    if (cur !== t) {
      cur = t;
      setPlaying(false);
    }
    renderTrack();
    if (autoplay) play();
  }

  function play() {
    if (!cur) select(0, false);
    startEngine();
    if (!cur.ready) {
      pendingPlay = cur;
      deck.classList.add("is-loading");
      setState("loading");
      return;
    }
    cur.widget.play();
    clearTimeout(fallbackTimer);
    // Some mobile browsers refuse to start audio inside an iframe from an outside button.
    // If nothing has started after a few seconds, reveal SoundCloud's own player.
    fallbackTimer = setTimeout(() => { if (!playing) showFallback(); }, 4000);
  }

  function pause() {
    pendingPlay = null;
    if (cur?.ready) cur.widget.pause();
    setPlaying(false);
  }

  function seekRatio(r) {
    if (!cur?.duration) return;
    const ms = Math.round(Math.min(1, Math.max(0, r)) * cur.duration);
    cur.pos = ms;
    if (cur.ready) cur.widget.seekTo(ms);
    renderTime();
    drawWave();
  }

  /* ---- events ---- */

  ui.play.addEventListener("click", () => (playing ? pause() : play()));
  ui.prev.addEventListener("click", () => {
    // Like a CDJ: first press goes back to the start, a second press goes to the previous mix.
    if (cur && cur.pos > 5000) return seekRatio(0);
    select((cur.i - 1 + tracks.length) % tracks.length, playing);
  });
  ui.next.addEventListener("click", () => select((cur.i + 1) % tracks.length, playing));

  tracks.forEach((t) =>
    t.btn.addEventListener("click", () => {
      if (t === cur) return playing ? pause() : play();
      select(t.i, true);
    })
  );

  ui.timeToggle.addEventListener("click", () => {
    showRemaining = !showRemaining;
    renderTime();
  });

  const ratioFromEvent = (e) => {
    const r = ui.wave.getBoundingClientRect();
    return (e.clientX - r.left) / r.width;
  };
  ui.wave.addEventListener("pointerdown", (e) => {
    if (!cur?.duration) return;
    ui.wave.setPointerCapture(e.pointerId);
    seekRatio(ratioFromEvent(e));
  });
  ui.wave.addEventListener("pointermove", (e) => {
    const r = Math.min(1, Math.max(0, ratioFromEvent(e)));
    ui.hover.style.left = `${r * 100}%`;
    ui.hover.dataset.t = cur?.duration ? fmt(r * cur.duration) : "";
    if (e.buttons && ui.wave.hasPointerCapture(e.pointerId)) seekRatio(r);
  });
  ui.wave.addEventListener("keydown", (e) => {
    if (!cur?.duration) return;
    const step = { ArrowRight: 10000, ArrowLeft: -10000, PageUp: 60000, PageDown: -60000 }[e.key];
    if (step) { e.preventDefault(); seekRatio((cur.pos + step) / cur.duration); }
    if (e.key === "Home") { e.preventDefault(); seekRatio(0); }
    if (e.key === "End") { e.preventDefault(); seekRatio(0.999); }
  });

  if (ui.volume) {
    const applyVol = () => {
      volume = Number(ui.volume.value);
      ui.volume.style.setProperty("--v", `${volume}%`);
      tracks.forEach((t) => t.ready && t.widget.setVolume(volume));
    };
    ui.volume.addEventListener("input", applyVol);
    applyVol();
  }

  // Warm up the widgets shortly before the section scrolls into view, so play is instant.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { startEngine(); io.disconnect(); }
    }, { rootMargin: "600px 0px" });
    io.observe(deck);
  } else {
    startEngine();
  }

  if (reducedMotion) ui.platter.style.animation = "none";

  // Let the video decks pause the music.
  player = { pause };

  // Re-label the player when the language changes.
  langListeners.push(() => {
    setState(stateKey);
    ui.play.setAttribute("aria-label", tr(playing ? "pause" : "play"));
    if (stateKey === "offline") ui.title.textContent = tr(titleKey);
    renderTrack();
  });
  select(0, false);
  setLang(initialLang, { persist: false });
})();
