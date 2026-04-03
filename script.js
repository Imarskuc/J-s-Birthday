/**
 * JOANNA 18 — NEO-BRUTALIST BIRTHDAY
 * ═══════════════════════════════════════
 * CUSTOMIZATION MAP (for Emanuel):
 * - Letter text      → #letterContent in index.html
 * - Memories         → #memoriesGrid in index.html
 * - Why special      → #specialList in index.html
 * - Spotify track    → SPOTIFY_EMBED_TRACK_ID + index.html iframe src
 * - Colors           → :root in styles.css
 */

/** Spotify track id from open.spotify.com/track/THIS_PART */
const SPOTIFY_EMBED_TRACK_ID = "2LlOeW5rVcvl3QcPNPcDus";

function spotifyEmbedSrc() {
  return `https://open.spotify.com/embed/track/${SPOTIFY_EMBED_TRACK_ID}?utm_source=generator&_=${Date.now()}`;
}

(function () {
  const landing = document.getElementById("landing");
  const shout = document.getElementById("emanuel-shout");
  const main = document.getElementById("main-content");
  const spotifyDock = document.getElementById("spotifyDock");
  const spotifyPlayer = document.getElementById("spotifyPlayer");
  const letterContent = document.getElementById("letterContent");
  const revealLetterBtn = document.getElementById("revealLetterBtn");
  const sendLoveBtn = document.getElementById("sendLoveBtn");
  const loveOverlay = document.getElementById("loveOverlay");
  const openCandleBtn = document.getElementById("openCandleBtn");
  const candleModal = document.getElementById("candleModal");
  const flameZone = document.getElementById("flameZone");
  const wishMsg = document.getElementById("wishMsg");
  const closeCandleModal = document.getElementById("closeCandleModal");

  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    return audioCtx;
  }

  function resumeAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  /** Simulated CLANK — short square burst */
  function playClank() {
    resumeAudio();
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.06);
    g.gain.setValueAtTime(0.28, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  }

  /** Load embed after landing tap — Spotify still needs one more tap on their green ▶ inside the iframe. */
  function showSpotifyAfterGesture() {
    if (!spotifyPlayer || !spotifyDock) return;
    spotifyDock.classList.add("visible");
    spotifyPlayer.src = spotifyEmbedSrc();
  }

  function unleash() {
    resumeAudio();
    showSpotifyAfterGesture();

    document.body.classList.add("shake-hard");
    document.body.classList.add("flash-pink");
    setTimeout(() => document.body.classList.remove("shake-hard"), 500);
    setTimeout(() => document.body.classList.remove("flash-pink"), 520);

    landing.classList.add("hidden");
    shout.classList.add("visible");
    main.classList.remove("is-hidden");
    main.classList.add("unleashed");

    window.setTimeout(() => {
      shout.classList.remove("visible");
    }, 900);
  }

  landing.addEventListener("click", unleash, { once: true });
  landing.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        unleash();
      }
    },
    { once: true }
  );

  revealLetterBtn.addEventListener("click", () => {
    playClank();
    letterContent.classList.remove("letter-pending");
    letterContent.classList.add("letter-revealed");
    revealLetterBtn.disabled = true;
    revealLetterBtn.textContent = "[ REVEALED. OBVIOUSLY. ]";
    revealLetterBtn.style.opacity = "0.7";
    const expand = () => letterContent.classList.add("expanded");
    letterContent.addEventListener("animationend", expand, { once: true });
    window.setTimeout(expand, 600);
  });

  function spawnPixelHearts() {
    const n = 96;
    const hearts = [];
    for (let i = 0; i < n; i++) {
      const h = document.createElement("div");
      h.className = "pixel-heart";
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 80;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 80;
      h.style.left = `${x}px`;
      h.style.top = `${y}px`;
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 10;
      hearts.push({
        el: h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
      });
      loveOverlay.appendChild(h);
    }

    const start = performance.now();
    function tick(now) {
      const t = (now - start) / 1000;
      hearts.forEach((o) => {
        o.life += 1;
        const px = parseFloat(o.el.style.left) + o.vx;
        const py = parseFloat(o.el.style.top) + o.vy;
        o.vy += 0.35;
        o.el.style.left = `${px}px`;
        o.el.style.top = `${py}px`;
        o.el.style.transform = `rotate(${o.life * 8}deg)`;
      });
      if (t < 2.2) requestAnimationFrame(tick);
      else {
        hearts.forEach((o) => o.el.remove());
      }
    }
    requestAnimationFrame(tick);
  }

  sendLoveBtn.addEventListener("click", () => {
    loveOverlay.classList.add("visible");
    spawnPixelHearts();
    window.setTimeout(() => {
      loveOverlay.classList.remove("visible");
    }, 2800);
  });

  function resetCandleModal() {
    wishMsg.classList.remove("visible");
    candleModal.classList.remove("open");
  }

  openCandleBtn.addEventListener("click", () => {
    wishMsg.classList.remove("visible");
    candleModal.classList.add("open");
  });

  closeCandleModal.addEventListener("click", resetCandleModal);

  function grantWish() {
    document.body.classList.add("flash-white");
    window.setTimeout(() => document.body.classList.remove("flash-white"), 450);
    wishMsg.classList.add("visible");
  }

  flameZone.addEventListener("click", grantWish);
  flameZone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      grantWish();
    }
  });

  candleModal.addEventListener("click", (e) => {
    if (e.target === candleModal) resetCandleModal();
  });

  landing.focus();
})();
