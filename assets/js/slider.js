(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  if (!window.gsap) return;

  function initCoverflow() {
    const stage = document.querySelector(".coverflow__stage");
    const track = document.querySelector("[data-coverflow]");
    const cards = gsap.utils.toArray("[data-card]");
    if (!stage || !track || cards.length < 3) return;

    // ===== Ajustes del look (tocás estos valores y listo) =====
    // Detectar si es móvil (pantalla menor a 768px)
    const isMobile = window.innerWidth < 768;
    
    const cfg = {
      xStep: isMobile ? 280 : 590,  // separación horizontal - más juntas en móvil
      zStep: 160,          // profundidad por nivel
      rotY: 20,            // rotación por nivel (grados)
      centerScale: 1.12,   // escala del centro
      sideScaleDrop: 0.50, // cuánto achica por nivel
      fadeDrop: 1.22,      // cuánto baja opacidad por nivel
      autoSpeed: isMobile ? 3.5 : 6.2  // segundos por card - más rápido en móvil
    };

    const N = cards.length;
    const wrapIndex = gsap.utils.wrap(0, N);
    const wrapDelta = gsap.utils.wrap(-N / 2, N / 2);

    // playhead continuo (puede ser decimal)
    const playhead = { i: 0 };

    // Render de posiciones (el corazón del coverflow)
    function render() {
      const base = playhead.i;

      cards.forEach((card, idx) => {
        // delta relativo (centrado)
        const raw = idx - base;
        const d = wrapDelta(raw);            // queda en rango [-N/2, N/2]
        const ad = Math.abs(d);

        const x = d * cfg.xStep;
        const z = -ad * cfg.zStep;
        const ry = -d * cfg.rotY;

        const scale = Math.max(0.55, cfg.centerScale - ad * cfg.sideScaleDrop);
        
        // Opacidad más agresiva - ocultar completamente tarjetas lejanas
        let alpha = 1 - ad * cfg.fadeDrop;
        
        // Si está más lejos de 1.5 posiciones, opacidad = 0
        if (ad > 1.5) {
          alpha = 0;
        } else {
          alpha = Math.max(0.12, alpha);
        }

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x,
          z,
          rotationY: ry,
          rotationZ: 0,
          scale,
          autoAlpha: alpha,
          transformOrigin: "50% 50%",
          zIndex: Math.round(100 - ad * 10)
        });
      });
    }

    // Estado inicial
    render();

    // ===== Loop infinito suave =====
    const autoTween = gsap.to(playhead, {
      i: "+=" + N,
      duration: N * cfg.autoSpeed,
      ease: "none",
      repeat: -1,
      modifiers: {
        i: (v) => String(parseFloat(v) % N)
      },
      onUpdate: render
    });

    // ===== Prev / Next =====
    const prevBtn = document.querySelector("[data-cf-prev]");
    const nextBtn = document.querySelector("[data-cf-next]");
    let resumeTimer = null;

    function nudge(dir) {
      // frena momentáneamente el autoplay y hace snap al "siguiente" entero
      gsap.to(autoTween, { timeScale: 0, duration: 0.15 });

      const target = Math.round(playhead.i) + dir;
      gsap.to(playhead, {
        i: target,
        duration: 0.65,
        ease: "power3.inOut",
        modifiers: { i: (v) => String(parseFloat(v) % N) },
        onUpdate: render,
        onComplete: () => {
          clearTimeout(resumeTimer);
          resumeTimer = setTimeout(() => gsap.to(autoTween, { timeScale: 1, duration: 0.25 }), 900);
        }
      });
    }

    prevBtn?.addEventListener("click", () => nudge(-1));
    nextBtn?.addEventListener("click", () => nudge(1));

    // (opcional) teclado
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") nudge(-1);
      if (e.key === "ArrowRight") nudge(1);
    });
  }

  initCoverflow();
})();
