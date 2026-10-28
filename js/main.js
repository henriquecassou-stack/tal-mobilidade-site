/* TAL Mobilidade Urbana — interações
   Os dados vêm de js/config.js (window.TAL). */
(function () {
  "use strict";

  const cfg = window.TAL;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const brl = (v, dec = 0) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: dec, maximumFractionDigits: dec });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- WhatsApp ---------- */
  const waHref = (msg) =>
    cfg.whatsapp.numero
      ? `https://wa.me/${cfg.whatsapp.numero}?text=${encodeURIComponent(msg)}`
      : cfg.whatsapp.link;

  let toastTimer;
  function toast(text) {
    const t = $("#toast");
    t.textContent = text;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 4200);
  }

  // Sem número cadastrado, o link "wa.me/message" não aceita texto:
  // copiamos a mensagem para o cliente só colar.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-wa]");
    if (!a) return;
    const msg = a.dataset.waMsg === "calc" ? calcMessage() : a.dataset.waText || cfg.whatsapp.mensagemPadrao;
    a.href = waHref(msg);
    if (!cfg.whatsapp.numero && a.dataset.waText && navigator.clipboard) {
      navigator.clipboard.writeText(msg).then(() => toast("Mensagem copiada! É só colar no WhatsApp ⚡")).catch(() => {});
    }
  });
  $$("[data-wa]").forEach((a) => { if (!a.dataset.waMsg) a.href = waHref(cfg.whatsapp.mensagemPadrao); });

  /* ---------- Ilustração de scooter (usada enquanto não há foto) ---------- */
  function scooterSVG(color, variant = "retro") {
    const chopper = variant === "chopper";
    const tw = chopper ? 24 : 14;
    const r = chopper ? 52 : 52;
    const ol = 'stroke="rgba(255,255,255,.22)" stroke-width="1.5"';
    const wheel = (cx) => `
      <g>
        <circle cx="${cx}" cy="318" r="${r}" fill="none" stroke="#23262C" stroke-width="${tw}"/>
        <circle cx="${cx}" cy="318" r="${r + tw / 2}" fill="none" stroke="#C9CED6" stroke-opacity=".35" stroke-width="1.2"/>
        <circle cx="${cx}" cy="318" r="${r - tw / 2 - 1}" fill="#0B0C0E"/>
        <circle cx="${cx}" cy="318" r="28" fill="none" stroke="#3A3F47" stroke-width="3" stroke-dasharray="4 5"/>
        <circle cx="${cx}" cy="318" r="15" fill="#9AA1AB"/><circle cx="${cx}" cy="318" r="6" fill="#2A2E35"/>
      </g>`;
    const bolt = `<path d="M262 232 250 254h8l-4 14 13-20h-8l4-16z" fill="#38E8FF"/>`;
    const lamp = (x, y) => `
      <circle cx="${x}" cy="${y}" r="28" fill="#38E8FF" opacity=".18"/>
      <circle cx="${x}" cy="${y}" r="17" fill="#0B0C0E" stroke="#C9CED6" stroke-width="3"/>
      <circle cx="${x}" cy="${y}" r="10" fill="#E9FBFF"/>`;

    const body = chopper
      ? `
        <path d="M165 318 300 296" stroke="#2A2E35" stroke-width="14" stroke-linecap="round"/>
        <path d="M88 300C88 262 128 234 196 230L340 224C366 248 384 276 404 298L404 310H92Z" fill="${color}" ${ol}/>
        <path d="M112 262C136 244 182 238 250 236" stroke="#fff" stroke-opacity=".3" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M108 226C110 196 160 190 204 198C228 180 290 180 330 200L332 226Z" fill="#15171B" ${ol}/>
        <path d="M404 298 446 104" stroke="#8D949E" stroke-width="12" stroke-linecap="round"/>
        <path d="M446 104 495 318" stroke="#8D949E" stroke-width="10" stroke-linecap="round"/>
        <path d="M410 84C430 96 470 96 500 80" stroke="#C9CED6" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M444 270C462 236 530 236 552 268" stroke="#C9CED6" stroke-width="8" fill="none" stroke-linecap="round"/>
        ${lamp(470, 128)}
        <path d="M250 246 238 268h8l-4 14 13-20h-8l4-16z" fill="#38E8FF"/>`
      : `
        <path d="M165 318 300 300" stroke="#2A2E35" stroke-width="12" stroke-linecap="round"/>
        <path d="M92 300C84 250 118 212 180 206L304 202C322 236 336 270 360 292L364 304H96Z" fill="${color}" ${ol}/>
        <path d="M118 246C140 226 186 218 246 218" stroke="#fff" stroke-opacity=".38" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="86" y="256" width="10" height="16" rx="3" fill="#FF5470"/>
        <path d="M300 290H436L444 306H292Z" fill="#1C1F25" ${ol}/>
        <path d="M408 304C416 252 428 196 448 138H474C464 196 456 252 454 304Z" fill="${color}" ${ol}/>
        <path d="M462 150 495 318" stroke="#8D949E" stroke-width="9" stroke-linecap="round"/>
        <path d="M438 270C460 238 532 238 556 270L542 276C522 254 470 254 452 278Z" fill="${color}" ${ol}/>
        <path d="M454 150 462 108" stroke="${color}" stroke-width="14" stroke-linecap="round"/>
        <path d="M418 112 522 102" stroke="#C9CED6" stroke-width="7" stroke-linecap="round"/>
        <path d="M432 108 422 76" stroke="#C9CED6" stroke-width="3"/><ellipse cx="420" cy="68" rx="11" ry="8" fill="#1C1F25" stroke="#C9CED6" stroke-width="2"/>
        <path d="M146 208C146 188 188 180 250 182C296 184 320 192 322 208Z" fill="#15171B" ${ol}/>
        ${lamp(470, 124)}
        ${bolt}
        ${variant === "cesta" ? `
          <g stroke="${color}" stroke-width="3" fill="none">
            <rect x="490" y="122" width="62" height="44" rx="6"/>
            <path d="M502 122v44M514 122v44M526 122v44M538 122v44M490 144h62"/>
          </g>` : ""}`;

    return `<svg viewBox="40 40 560 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="330" cy="380" rx="250" ry="9" fill="#000" opacity=".55"/>
      ${wheel(165)}${wheel(495)}${body}
    </svg>`;
  }

  /* ---------- Catálogo ---------- */
  const PH = '<span class="ph">[A definir]</span>';

  function modelCard(m) {
    const name = m.nome ? esc(m.nome) : '<span class="ph" style="font-size:1rem">[Nome do modelo — a definir]</span>';
    const power = m.potencia ? `${m.potencia.toLocaleString("pt-BR")} W` : PH;
    const range = m.autonomia ? esc(m.autonomia) : PH;
    const batt = m.bateria ? esc(m.bateria) : PH;
    const media = m.foto
      ? `<img src="${esc(m.foto)}" alt="Scooter elétrica ${esc(m.nome || m.nomeWhats)}" loading="lazy" decoding="async" width="800" height="600">`
      : scooterSVG(m.cor, m.ilustracao);
    const price = m.preco
      ? `<div class="price"><small>à vista</small><b>${brl(m.preco, 2)}</b></div>`
      : `<div class="price price--ask"><small>Preço</small><b>Consulte condições</b></div>`;
    const tags = [m.estilo, m.potencia ? `w${m.potencia}` : ""].filter(Boolean).join(" ");
    const msg = `Olá, TAL! Quero essa: ${m.nomeWhats} ⚡ Pode me passar valores e condições?`;

    return `
      <article class="card${m.destaque ? " card--feature" : ""}" style="--c:${m.cor}" data-tags="${tags}">
        <div class="card__media${m.foto ? " card__media--photo" : ""}"${m.foto && m.fotoAspecto ? ` style="--ar:${m.fotoAspecto}"` : ""}>
          <div class="badges">
            ${m.oferta ? '<span class="badge badge--offer">Oferta</span>' : ""}
            ${m.destaque ? '<span class="badge">Mais procurada</span>' : ""}
            ${!m.foto ? '<span class="badge badge--ph">Foto em breve</span>' : ""}
          </div>
          ${media}
          ${m.potencia || m.autonomiaMax ? `
          <div class="card__over" aria-hidden="true">
            ${m.potencia ? `<div><b>${m.potencia}</b><small>watts</small></div>` : ""}
            ${m.autonomiaMax ? `<div><b>${m.autonomiaMax}</b><small>km por carga</small></div>` : ""}
          </div>` : ""}
        </div>
        <div class="card__body">
          <div>
            ${m.apelido ? `<p class="card__nick">${esc(m.apelido)}</p>` : ""}
            <h3 class="card__name">${name}</h3>
          </div>
          <p class="card__desc">${esc(m.descricao)}</p>
          <dl class="specs">
            <div><dt>Potência</dt><dd>${power}</dd></div>
            <div><dt>Autonomia</dt><dd>${range}</dd></div>
            <div><dt>Bateria</dt><dd>${batt}</dd></div>
          </dl>
          <div class="card__foot">
            ${price}
            <a class="btn btn--accent" data-wa data-wa-text="${esc(msg)}" href="${esc(waHref(msg))}" target="_blank" rel="noopener">Quero essa</a>
          </div>
        </div>
      </article>`;
  }

  const grid = $("#modelGrid");
  grid.innerHTML = cfg.modelos.map(modelCard).join("");

  $$(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      $$(".chip").forEach((c) => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-pressed", c === chip); });
      $$(".card", grid).forEach((card) => {
        const show = f === "todos" || card.dataset.tags.split(" ").includes(f);
        card.classList.toggle("is-hidden", !show);
        card.classList.remove("is-entering");
        if (show && !reduced) { void card.offsetWidth; card.classList.add("is-entering"); }
      });
    })
  );

  /* ---------- Calculadora ---------- */
  const c = cfg.calculadora;
  const km = $("#kmDia"), dias = $("#diasMes"), gasto = $("#gasto");
  km.value = c.padrao.kmPorDia; dias.value = c.padrao.diasPorMes; gasto.value = c.padrao.gastoMensal;
  const refModel = cfg.modelos.find((m) => m.id === c.modeloReferenciaId && m.preco);
  let last = { eco: 0 };

  function fill(input) {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty("--p", p + "%");
  }

  function calc() {
    const kmMes = +km.value * +dias.value;
    const custoEl = kmMes * c.consumoKwhPorKm * c.tarifaKwh;
    const eco = Math.max(0, +gasto.value - custoEl);
    last = { eco, kmMes };

    $("#kmDiaOut").textContent = `${km.value} km`;
    $("#diasMesOut").textContent = `${dias.value} dias`;
    $("#gastoOut").textContent = `${brl(+gasto.value)}/mês`;
    $("#ecoMes").textContent = brl(eco);
    $("#ecoAno").textContent = brl(eco * 12);
    $("#custoEletrica").textContent = `${brl(custoEl, 2)}/mês`;
    $("#custoKm").textContent = brl(c.consumoKwhPorKm * c.tarifaKwh, 2);

    const pb = $("#payback");
    if (refModel && eco > 0) {
      const meses = Math.ceil(refModel.preco / eco);
      pb.innerHTML = `Nesse ritmo, a economia equivale ao valor de uma scooter de <strong>${brl(refModel.preco, 2)}</strong> em cerca de <strong>${meses} ${meses === 1 ? "mês" : "meses"}</strong>.`;
    } else if (eco === 0) {
      pb.textContent = "Informe quanto você gasta hoje para ver a economia.";
    } else pb.textContent = "";
    [km, dias, gasto].forEach(fill);
  }
  function calcMessage() {
    return `Olá, TAL! Fiz a conta no site: rodo ${km.value} km por dia e posso economizar cerca de ${brl(last.eco)} por mês. Quero conhecer os modelos ⚡`;
  }
  [km, dias, gasto].forEach((i) => i.addEventListener("input", calc));
  calc();

  /* ---------- Clientes ---------- */
  $("#gallery").innerHTML = cfg.galeria
    .map((g) =>
      g.foto
        ? `<figure class="frame has-img reveal"><img src="${esc(g.foto)}" alt="${esc(g.legenda)}" loading="lazy" decoding="async"><figcaption>${esc(g.legenda)}</figcaption></figure>`
        : `<figure class="frame reveal" data-label="${esc(g.legenda)}"></figure>`
    ).join("");

  $("#quotes").innerHTML = cfg.depoimentos
    .map((d) => `<blockquote class="quote reveal"><p>${esc(d.texto)}</p><footer><b>${esc(d.nome)}</b> · ${esc(d.modelo)}</footer></blockquote>`)
    .join("");

  /* ---------- Loja ---------- */
  $("#hours").innerHTML = cfg.loja.horarios
    .map((h) => `<li><span>${esc(h.dias)}</span><span${h.horas.includes("A definir") ? ' class="ph"' : ""}>${esc(h.horas)}</span></li>`)
    .join("");
  [["#fotoFachada", cfg.loja.fotoFachada, "Fachada da loja TAL Mobilidade Elétrica em Pinhais"],
   ["#fotoShowroom", cfg.loja.fotoShowroom, "Showroom da TAL com scooters elétricas"]].forEach(([sel, src, alt]) => {
    if (!src) return;
    const f = $(sel);
    f.classList.add("has-img");
    f.innerHTML = `<img src="${esc(src)}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  /* ---------- Header + menu ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger"), nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Reveal + contadores ---------- */
  function countUp(el) {
    const end = +el.dataset.count;
    if (reduced || end === 0) { el.textContent = end.toLocaleString("pt-BR"); return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("pt-BR");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        if (el.dataset.count !== undefined) countUp(el);
        else el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal, [data-count]").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("in"));
  }

  $("#ano").textContent = new Date().getFullYear();
})();
