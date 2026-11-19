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

  /* ---------------- Small page bits ---------------- */

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  const header = $(".top");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Video dialog (YouTube, privacy-enhanced domain). Iframe is created on open and removed on close.
  const VIDEO_ID = "7vkOglBB7mk";
  const VIDEO_START = 1500;
  const dialog = $("[data-video]");
  const frame = $("[data-video-frame]");
  $$("[data-video-open]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (!dialog || typeof dialog.showModal !== "function") {
        window.open(`https://www.youtube.com/watch?v=${VIDEO_ID}&t=${VIDEO_START}s`, "_blank", "noopener");
        return;
      }
      if (player) player.pause();
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}?start=${VIDEO_START}&autoplay=1&rel=0"
        title="Lautaro Volcan live set" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      dialog.showModal();
    })
  );
  dialog?.addEventListener("close", () => (frame.innerHTML = ""));
  dialog?.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

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

  const setState = (text) => (ui.state.textContent = text);

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
    ui.timeMode.textContent = showRemaining ? "Remaining" : "Elapsed";
    const pct = cur.duration ? Math.round((cur.pos / cur.duration) * 100) : 0;
    ui.wave.setAttribute("aria-valuenow", pct);
    ui.wave.setAttribute("aria-valuetext", `${fmt(cur.pos)} of ${fmt(cur.duration)}`);
  }

  function renderTrack() {
    if (!cur) return;
    deck.classList.add("has-track");
    ui.title.textContent = cur.title;
    ui.genre.textContent = cur.genre;
    ui.permalink.href = cur.url;
    ui.permalink.setAttribute("aria-label", `Open ${cur.title} on SoundCloud`);
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
    ui.play.setAttribute("aria-label", on ? "Pause" : "Play");
    setState(on ? "Playing" : cur?.pos ? "Paused" : "Ready");
    if (on) {
      clearTimeout(fallbackTimer);
      ui.fallback.hidden = true;
    }
  }

  function showFallback() {
    deck.classList.add("show-engine");
    ui.fallback.hidden = false;
    deck.classList.remove("is-loading");
    setState("Ready");
  }

  /* ---- engine: one hidden SoundCloud widget per mix ---- */

  function startEngine() {
    if (engineStarted) return apiPromise;
    engineStarted = true;
    return loadApi()
      .then(() => tracks.forEach(createWidget))
      .catch(() => {
        setState("Offline");
        ui.title.textContent = "SoundCloud is unreachable";
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
      setState("Loading");
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

  // Let the video dialog pause the music.
  player = { pause };
  select(0, false);
})();
