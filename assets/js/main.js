/* 4 Hundred Garage — interacciones y animaciones */
(function () {
  'use strict';

  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      document.body.style.overflow = abierto ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('abierto');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Barra de progreso de lectura ---------- */
  var progreso = document.querySelector('.progreso');
  if (progreso) {
    var pintarProgreso = function () {
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      var pct = alto > 0 ? (window.scrollY / alto) * 100 : 0;
      progreso.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', pintarProgreso, { passive: true });
    window.addEventListener('resize', pintarProgreso);
    pintarProgreso();
  }

  /* ---------- Estelas de velocidad del hero ---------- */
  var lienzo = document.querySelector('.hero-lineas');
  if (lienzo && !sinMovimiento) {
    var ctx = lienzo.getContext('2d');
    var ancho = 0, alto = 0, estelas = [], anim = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var medir = function () {
      ancho = lienzo.offsetWidth; alto = lienzo.offsetHeight;
      lienzo.width = ancho * dpr; lienzo.height = alto * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    var nueva = function (fuera) {
      return {
        x: fuera ? ancho + Math.random() * ancho : Math.random() * ancho,
        y: Math.random() * alto,
        largo: 60 + Math.random() * 220,
        vel: 2.2 + Math.random() * 7,
        alfa: 0.05 + Math.random() * 0.3,
        rojo: Math.random() > 0.62
      };
    };

    var dibujar = function () {
      ctx.clearRect(0, 0, ancho, alto);
      for (var i = 0; i < estelas.length; i++) {
        var e = estelas[i];
        var g = ctx.createLinearGradient(e.x, 0, e.x + e.largo, 0);
        var color = e.rojo ? '254,6,20' : '255,255,255';
        g.addColorStop(0, 'rgba(' + color + ',0)');
        g.addColorStop(0.5, 'rgba(' + color + ',' + e.alfa + ')');
        g.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = e.rojo ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(e.x + e.largo, e.y);
        ctx.stroke();
        e.x -= e.vel;
        if (e.x + e.largo < 0) estelas[i] = nueva(true);
      }
      anim = requestAnimationFrame(dibujar);
    };

    var arrancar = function () {
      medir();
      estelas = [];
      var cantidad = ancho < 700 ? 22 : 42;
      for (var i = 0; i < cantidad; i++) estelas.push(nueva(false));
      if (anim) cancelAnimationFrame(anim);
      dibujar();
    };

    arrancar();
    var temporizador;
    window.addEventListener('resize', function () {
      clearTimeout(temporizador);
      temporizador = setTimeout(arrancar, 200);
    });
    var heroVisible = true;
    var frenar = function () { if (anim) { cancelAnimationFrame(anim); anim = null; } };
    var seguir = function () { if (!anim && heroVisible && !document.hidden) dibujar(); };
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) frenar(); else seguir();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        heroVisible = en[0].isIntersecting;
        if (heroVisible) seguir(); else frenar();
      }).observe(lienzo);
    }
  }

  /* ---------- Faro que sigue al puntero ---------- */
  var hero = document.querySelector('.hero');
  var luz = document.querySelector('.hero-luz');
  if (hero && luz && !sinMovimiento && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      luz.style.transform = 'translate(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px) translate(-50%,-50%)';
    });
  }

  /* ---------- Contadores ---------- */
  function contar(el) {
    var destino = parseFloat(el.dataset.contador);
    var dec = parseInt(el.dataset.decimales || '0', 10);
    var pre = el.dataset.pre || '';
    var post = el.dataset.post || '';
    if (sinMovimiento) { el.textContent = pre + destino.toFixed(dec) + post; return; }
    var duracion = 1600, inicio = null;
    function paso(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (destino * suave).toFixed(dec) + post;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  /* ---------- Revelado al hacer scroll ---------- */
  /* secciones que se animan sin tocar el HTML */
  document.querySelectorAll('.franja, .cta, .marquesina, .footer-grid, .hero-int .contenedor')
    .forEach(function (el) { el.classList.add('aparece'); });

  /* las tarjetas de servicios del inicio se observan de a una,
     así la animación corre recién cuando cada tarjeta llega a pantalla */
  document.querySelectorAll('.grid-servicios').forEach(function (g) {
    g.classList.remove('aparece');
    g.querySelectorAll('.tarjeta').forEach(function (t) { t.classList.add('t-solo'); });
  });

  /* marquesinas: solo animan mientras se ven */
  if ('IntersectionObserver' in window) {
    var obsMarq = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var pistaM = en.target.querySelector('.marquesina-pista');
        if (pistaM) pistaM.style.animationPlayState = en.isIntersecting ? 'running' : 'paused';
      });
    });
    document.querySelectorAll('.marquesina').forEach(function (mq) { obsMarq.observe(mq); });
  }

  var animables = document.querySelectorAll('.aparece, .gauge, .t-solo, [data-contador]');
  if ('IntersectionObserver' in window && animables.length) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('visible');
        if (el.hasAttribute('data-contador')) contar(el);
        obs.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px' });
    animables.forEach(function (el) { obs.observe(el); });
  } else {
    animables.forEach(function (el) {
      el.classList.add('visible');
      if (el.hasAttribute('data-contador')) contar(el);
    });
  }

  /* ---------- Parallax suave de las fotos ---------- */
  var fotos = document.querySelectorAll('.partido-img img');
  if (fotos.length && !sinMovimiento && window.innerWidth > 980) {
    var ticking = false;
    var moverFotos = function () {
      fotos.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var centro = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = 'translateY(' + (centro * -18).toFixed(2) + 'px) scale(1.06)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(moverFotos); }
    }, { passive: true });
    moverFotos();
  }



  /* ---------- Slideshow de trabajos ---------- */
  var show = document.querySelector('[data-show]');
  if (show) {
    var slidesS = [].slice.call(show.querySelectorAll('.show-slide'));
    var puntosS = show.querySelector('.show-puntos');
    var idxS = 0, autoS = null;

    slidesS.forEach(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', 'Ir al trabajo ' + (i + 1));
      d.addEventListener('click', function () { irS(i); relanzarS(); });
      puntosS.appendChild(d);
    });
    var botonesS = [].slice.call(puntosS.children);

    function irS(i) {
      idxS = (i + slidesS.length) % slidesS.length;
      slidesS.forEach(function (el, j) { el.classList.toggle('activo', j === idxS); });
      botonesS.forEach(function (b, j) { b.classList.toggle('activo', j === idxS); });
    }
    function relanzarS() {
      if (autoS) clearInterval(autoS);
      if (!sinMovimiento) autoS = setInterval(function () { irS(idxS + 1); }, 4200);
    }
    show.querySelector('.show-prev').addEventListener('click', function () { irS(idxS - 1); relanzarS(); });
    show.querySelector('.show-next').addEventListener('click', function () { irS(idxS + 1); relanzarS(); });
    show.addEventListener('mouseenter', function () { if (autoS) clearInterval(autoS); });
    show.addEventListener('mouseleave', relanzarS);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (autoS) clearInterval(autoS); } else relanzarS();
    });
    irS(0); relanzarS();
  }

  /* ---------- Formulario de contacto (Vercel + Resend) ---------- */
  var form = document.querySelector('form[data-form="contacto"]');
  if (form) {
    var aviso = form.querySelector('.aviso-form');
    var boton = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('[name="empresa"]').value) return; // honeypot
      var textoOriginal = boton.textContent;
      boton.disabled = true; boton.textContent = 'Enviando…';
      aviso.className = 'aviso-form';

      fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then(function (r) { if (!r.ok) throw new Error('fallo'); return r.json(); })
        .then(function () {
          aviso.className = 'aviso-form ok';
          aviso.textContent = '¡Listo! Recibimos tu consulta. Te respondemos a la brevedad por WhatsApp o mail.';
          form.reset();
        })
        .catch(function () {
          aviso.className = 'aviso-form error';
          aviso.textContent = 'No pudimos enviar el mensaje. Escribinos por WhatsApp al 11 5912-3836.';
        })
        .finally(function () { boton.disabled = false; boton.textContent = textoOriginal; });
    });
  }

  /* ---------- Año en el footer ---------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
