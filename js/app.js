/* 香水地圖 Parfum Map — 主程式
 * 地圖層寫成 MapView 模組（目前使用 Leaflet），之後可替換成 CSSMap 等其他地圖。 */
(function () {
  "use strict";

  const PERFUMES = window.PERFUMES || [];
  const CITIES = window.CITIES || {};
  const FAMILIES = window.FAMILIES || {};
  const TIERS = [["top", "前調", "開場 0–15 分鐘"], ["middle", "中調", "核心 15 分–3 小時"], ["base", "後調", "餘韻 3 小時以上"]];

  // ---------- 工具 ----------
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const allNotes = (p) => [...new Set([...p.notes.top, ...p.notes.middle, ...p.notes.base])];
  const colorOf = (p) => FAMILIES[p.family] || "#999";
  const cityOf = (p) => CITIES[p.city] || { name: p.city, country: "", lat: 0, lng: 0 };

  PERFUMES.forEach((p) => { p._notes = allNotes(p); });

  /** 示意瓶身（無圖片或圖片載入失敗時使用） */
  function bottleSVG(p) {
    const c = colorOf(p);
    return `<svg viewBox="0 0 60 80" aria-hidden="true">
      <ellipse cx="30" cy="78" rx="24" ry="2" fill="#000" opacity=".12"/>
      <rect x="22" y="1" width="16" height="13" fill="#111"/>
      <rect x="26" y="14" width="8" height="4" fill="#6b6b68"/>
      <rect x="9" y="18" width="42" height="59" fill="#2a2926"/>
      <rect x="9" y="34" width="42" height="43" fill="${c}" opacity=".55"/>
      <rect x="12" y="21" width="3" height="52" fill="#fff" opacity=".18"/>
      <rect x="17" y="42" width="26" height="18" fill="#e6e5e1"/>
      <rect x="21" y="47" width="18" height="1.5" fill="#111"/>
      <rect x="23" y="52" width="14" height="1" fill="#555"/>
    </svg>`;
  }
  function imageHTML(p) {
    if (!p.image) return bottleSVG(p);
    return `<img src="${esc(p.image)}" alt="${esc(p.brand + " " + p.name)}" loading="lazy" data-fallback="${esc(p.id)}">`;
  }
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.dataset.fallback) {
      const p = PERFUMES.find((x) => x.id === img.dataset.fallback);
      if (p) img.outerHTML = bottleSVG(p);
    }
  }, true);

  // ---------- 相似度 ----------
  const jaccard = (a, b) => {
    const A = new Set(a), B = new Set(b);
    const inter = [...A].filter((x) => B.has(x)).length;
    const uni = new Set([...A, ...B]).size;
    return uni ? inter / uni : 0;
  };
  /** 香料 55%、感覺 30%、同香調家族 15% */
  function similarity(a, b) {
    return 0.55 * jaccard(a._notes, b._notes) + 0.30 * jaccard(a.moods, b.moods) + 0.15 * (a.family === b.family ? 1 : 0);
  }
  const pct = (s) => Math.round(Math.min(1, s / 0.6) * 100); // 將分數映射為較直覺的百分比
  function similarTo(p, n = 5) {
    return PERFUMES.filter((x) => x.id !== p.id)
      .map((x) => ({ p: x, s: similarity(p, x) }))
      .sort((a, b) => b.s - a.s).slice(0, n);
  }

  // ---------- 狀態 ----------
  const state = { q: "", city: "", sort: "relevance", families: new Set(), moods: new Set(), notes: new Set(), similarId: null, activeId: null };

  function textScore(p, q) {
    if (!q) return 1;
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    let score = 0;
    for (const t of terms) {
      let hit = 0;
      if ((p.name + " " + p.brand).toLowerCase().includes(t)) hit = 3;
      else if (p._notes.some((n) => n.includes(t))) hit = 2;
      else if (p.moods.some((m) => m.includes(t)) || p.family.includes(t)) hit = 2;
      else if ((p.perfumer + " " + p.description + " " + cityOf(p).name + cityOf(p).country + (cityOf(p).continent || "")).toLowerCase().includes(t)) hit = 1;
      if (!hit) return 0;
      score += hit;
    }
    return score;
  }

  function compute() {
    const base = state.similarId ? PERFUMES.find((x) => x.id === state.similarId) : null;
    let rows = PERFUMES.map((p) => ({ p, t: textScore(p, state.q), s: base ? similarity(base, p) : 0 }))
      .filter(({ p, t }) =>
        t > 0 &&
        (!base || p.id !== base.id) &&
        (!state.city || (state.city.startsWith("c:") ? cityOf(p).continent === state.city.slice(2) : p.city === state.city)) &&
        (!state.families.size || state.families.has(p.family)) &&
        [...state.moods].every((m) => p.moods.includes(m)) &&
        [...state.notes].every((n) => p._notes.includes(n)));

    const bySort = {
      name: (a, b) => a.p.name.localeCompare(b.p.name),
      "year-desc": (a, b) => b.p.year - a.p.year,
      "year-asc": (a, b) => a.p.year - b.p.year,
      relevance: (a, b) => b.t - a.t || a.p.brand.localeCompare(b.p.brand)
    };
    rows.sort(base && state.sort === "relevance" ? (a, b) => b.s - a.s : bySort[state.sort]);
    return { rows, base };
  }

  // ---------- 渲染：篩選器 ----------
  function countBy(fn) {
    const m = new Map();
    PERFUMES.forEach((p) => [].concat(fn(p)).forEach((k) => m.set(k, (m.get(k) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }

  function renderFilterOptions() {
    const sel = $("#city");
    const continents = countBy((p) => cityOf(p).continent || "其他");
    const cities = countBy((p) => p.city);
    sel.innerHTML = `<option value="">全部地區</option>` +
      `<optgroup label="洲">${continents.map(([c, n]) => `<option value="c:${esc(c)}">${esc(c)}（${n}）</option>`).join("")}</optgroup>` +
      `<optgroup label="城市">${cities.map(([k, n]) => `<option value="${esc(k)}">${esc(CITIES[k]?.name || k)}・${esc(CITIES[k]?.country || "")}（${n}）</option>`).join("")}</optgroup>`;

    $("#families").innerHTML = Object.keys(FAMILIES)
      .filter((f) => PERFUMES.some((p) => p.family === f))
      .map((f) => `<button class="chip" data-family="${esc(f)}"><span class="dot" style="background:${FAMILIES[f]}"></span>${esc(f)}</button>`).join("");

    $("#moods").innerHTML = countBy((p) => p.moods)
      .map(([m]) => `<button class="chip" data-mood="${esc(m)}">${esc(m)}</button>`).join("");

    $("#note-list").innerHTML = countBy((p) => p._notes).map(([n]) => `<option value="${esc(n)}">`).join("");

    $("#legend").innerHTML = Object.entries(FAMILIES)
      .filter(([f]) => PERFUMES.some((p) => p.family === f))
      .map(([f, c]) => `<span><i style="background:${c}"></i>${esc(f)}</span>`).join("");
  }

  function syncFilterUI() {
    document.querySelectorAll("[data-family]").forEach((b) => b.classList.toggle("is-on", state.families.has(b.dataset.family)));
    document.querySelectorAll("#moods [data-mood]").forEach((b) => b.classList.toggle("is-on", state.moods.has(b.dataset.mood)));
    const picked = [
      ...[...state.families].map((v) => `<button class="chip is-on" data-family="${esc(v)}">${esc(v)} ✕</button>`),
      ...[...state.moods].map((v) => `<button class="chip is-on" data-mood="${esc(v)}">${esc(v)} ✕</button>`),
      ...[...state.notes].map((v) => `<button class="chip is-on" data-rm-note="${esc(v)}">${esc(v)} ✕</button>`)
    ];
    $("#picked").innerHTML = picked.join("");
    const hasAny = state.q || state.city || picked.length;
    $("#active-bar").hidden = !hasAny;
    [["families", state.families.size], ["moods", state.moods.size], ["notes", state.notes.size]].forEach(([k, n]) => {
      const span = document.querySelector(`[data-acc="${k}"] span`);
      span.textContent = span.textContent.replace(/（\d+）$/, "") + (n ? `（${n}）` : "");
    });
  }

  // ---------- 渲染：館藏 ----------
  function render() {
    const { rows, base } = compute();
    syncFilterUI();

    const banner = $("#similar-banner");
    if (base) {
      banner.hidden = false;
      banner.innerHTML = `<span>Similar to 相似於：${esc(base.brand)} ${esc(base.name)}</span><button class="text-btn" data-clear-similar>✕ Cancel</button>`;
    } else banner.hidden = true;

    $("#count").textContent = `${rows.length} perfumes`;
    $("#grid").innerHTML = rows.length ? rows.map(({ p, s }) => `
      <button class="card" role="listitem" data-open="${esc(p.id)}">
        <div class="thumb">${imageHTML(p)}${base ? `<span class="badge">${pct(s)}%</span>` : ""}</div>
        <div class="info">
          <span class="brand-name">${esc(p.brand)}</span>
          <span class="name">${esc(p.name)}</span>
          <span class="notes">Notes: ${p._notes.slice(0, 4).map(esc).join("、")}</span>
          <span class="fam">${esc(p.family)} &amp; ${esc(p.moods[0] || "")}</span>
          <span class="more">${esc(cityOf(p).name)} · See notes ›</span>
        </div>
      </button>`).join("")
      : `<div class="empty">No results · 找不到符合的香水，試試放寬條件</div>`;

    MapView.update(rows.map((r) => r.p));
  }

  // ---------- 詳細頁 ----------
  function openDetail(id) {
    const p = PERFUMES.find((x) => x.id === id);
    if (!p) return;
    state.activeId = id;
    const c = cityOf(p);
    const sims = similarTo(p, 5);
    const pyramid = TIERS.map(([k, label, hint]) => `
      <div class="tier">
        <b>${label}<small>${hint}</small></b>
        <div class="chips">${p.notes[k].map((n) => `<button class="note-chip" data-find-note="${esc(n)}" title="找含有「${esc(n)}」的香水">${esc(n)}</button>`).join("")}</div>
      </div>`).join("");

    $("#detail-body").innerHTML = `
      <div class="d-hero">${imageHTML(p)}</div>
      <div class="d-title">
        <div class="d-brand">${esc(p.brand)}</div>
        <h2 id="d-name">${esc(p.name)}</h2>
        <p class="d-desc">${esc(p.description)}</p>
      </div>
      <div class="d-facts">
        <div><small>Family 香調家族</small>${esc(p.family)}</div>
        <div><small>Origin 發源地</small>${esc(c.name)}・${esc(c.country)}</div>
        <div><small>Year 年份</small>${esc(p.year)}</div>
        <div><small>Perfumer 調香師</small>${esc(p.perfumer)}</div>
      </div>

      <div class="d-section-title">Mood 感覺</div>
      <div class="d-block"><div class="chips" style="justify-content:center">${p.moods.map((m) => `<button class="chip" data-find-mood="${esc(m)}">${esc(m)}</button>`).join("")}</div></div>

      <div class="d-section-title">Notes 香調金字塔</div>
      ${pyramid}

      <div class="d-section-title">Similar scents 相似味道</div>
      ${sims.map(({ p: x, s }) => {
        const shared = x._notes.filter((n) => p._notes.includes(n)).slice(0, 3);
        return `<button class="sim-item" data-open="${esc(x.id)}">
          <span class="ic">${x.image ? `<img src="${esc(x.image)}" alt="" loading="lazy" data-fallback="${esc(x.id)}">` : bottleSVG(x)}</span>
          <span class="tx"><span class="s">${esc(x.brand)}</span><span class="n">${esc(x.name)}</span>
          <span class="s">${shared.length ? "共同：" + shared.map(esc).join("、") : "感覺相近"}</span></span>
          <span class="pct">${pct(s)}%</span>
        </button>`;
      }).join("")}
      <button class="block-btn dark" data-similar="${esc(p.id)}">Find similar in library · 在圖書館找相似 ›</button>
      <button class="block-btn" data-locate="${esc(p.id)}">View on map · 在地圖上看 ${esc(c.name)} ›</button>`;
    $("#detail").hidden = false;
    $(".detail-panel").scrollTop = 0;
    MapView.highlight(id);
  }
  function closeDetail() { $("#detail").hidden = true; state.activeId = null; MapView.highlight(null); }

  // ---------- 地圖模組（Leaflet） ----------
  const MapView = (() => {
    let map, cluster, markers = new Map();
    function jitter(p) { // 同城市多支香水時，微幅分散位置避免完全重疊
      let h = 0; for (const ch of p.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      const a = (h % 360) * Math.PI / 180, r = 0.004 + (h % 7) * 0.0012;
      const c = cityOf(p);
      return [c.lat + Math.sin(a) * r, c.lng + Math.cos(a) * r * 1.4];
    }
    function init() {
      if (!window.L) { $("#map").innerHTML = `<p style="padding:20px">地圖載入失敗，請確認網路連線。</p>`; return; }
      map = L.map("map", { worldCopyJump: true, zoomControl: true }).setView([35, 20], 2);
      // 底圖：Esri 淺灰畫布（免 API key）。正式商用上線前請確認 Esri 使用條款，或改用自己的圖磚金鑰。
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
        maxZoom: 16
      }).addTo(map);
      cluster = L.markerClusterGroup({
        showCoverageOnHover: false, maxClusterRadius: 45, spiderfyOnMaxZoom: true,
        iconCreateFunction: (cl) => {
          const n = cl.getChildCount(), size = 32 + Math.min(16, n);
          return L.divIcon({ html: `<div class="cluster" style="width:${size}px;height:${size}px">${n}</div>`, className: "", iconSize: [size, size] });
        }
      });
      PERFUMES.forEach((p) => {
        const icon = L.divIcon({ className: "", html: `<div class="pin"><span style="background:${colorOf(p)}"></span></div>`, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12] });
        const m = L.marker(jitter(p), { icon, title: `${p.brand} ${p.name}` });
        m.bindPopup(`<div class="pop"><div class="b">${esc(p.brand)}</div><div class="n">${esc(p.name)}</div>
          <div class="c">${esc(p.family)}・${esc(cityOf(p).name)}</div><button data-open="${esc(p.id)}">See notes ›</button></div>`);
        m.on("mouseover", () => document.querySelector(`.card[data-open="${p.id}"]`)?.classList.add("is-hover"));
        m.on("mouseout", () => document.querySelector(`.card[data-open="${p.id}"]`)?.classList.remove("is-hover"));
        markers.set(p.id, m);
      });
      map.addLayer(cluster);
    }
    function update(list) {
      if (!cluster) return;
      cluster.clearLayers();
      cluster.addLayers(list.map((p) => markers.get(p.id)).filter(Boolean));
    }
    function highlight(id) {
      markers.forEach((m, k) => m.getElement()?.firstElementChild?.classList.toggle("is-active", k === id));
    }
    function locate(id) {
      const m = markers.get(id); if (!m) return;
      if (!cluster.hasLayer(m)) cluster.addLayer(m);
      cluster.zoomToShowLayer(m, () => m.openPopup());
    }
    function invalidate() { map && setTimeout(() => map.invalidateSize(), 50); }
    return { init, update, highlight, locate, invalidate };
  })();

  // ---------- 事件 ----------
  let qTimer;
  $("#q").addEventListener("input", (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 150); });
  $("#city").addEventListener("change", (e) => { state.city = e.target.value; render(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  document.querySelectorAll("[data-acc]").forEach((h) => h.addEventListener("click", () => {
    const body = $("#acc-" + h.dataset.acc); body.hidden = !body.hidden; h.setAttribute("aria-expanded", String(!body.hidden));
  }));
  $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#note-input").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const v = e.target.value.trim();
    if (v && PERFUMES.some((p) => p._notes.includes(v))) { state.notes.add(v); e.target.value = ""; render(); }
  });
  $("#note-input").addEventListener("change", (e) => { // 從下拉建議選取
    const v = e.target.value.trim();
    if (v && PERFUMES.some((p) => p._notes.includes(v))) { state.notes.add(v); e.target.value = ""; render(); }
  });
  $("#reset").addEventListener("click", () => {
    Object.assign(state, { q: "", city: "", similarId: null });
    state.families.clear(); state.moods.clear(); state.notes.clear();
    $("#q").value = ""; $("#city").value = ""; render();
  });

  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("is-active", x === t));
    $(".layout").dataset.view = t.dataset.view; MapView.invalidate();
  }));

  function showLibrary() {
    const view = $(".layout").dataset.view;
    if (view === "map") document.querySelector('.tab[data-view="split"]').click();
    $(".library").scrollIntoView({ behavior: "smooth" });
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open],[data-family],[data-mood],[data-rm-note],[data-close],[data-similar],[data-clear-similar],[data-find-note],[data-find-mood],[data-locate]");
    if (!t) return;
    const d = t.dataset;
    if (d.open) openDetail(d.open);
    else if (d.family) { state.families.has(d.family) ? state.families.delete(d.family) : state.families.add(d.family); render(); }
    else if (d.mood) { state.moods.has(d.mood) ? state.moods.delete(d.mood) : state.moods.add(d.mood); render(); }
    else if (d.rmNote) { state.notes.delete(d.rmNote); render(); }
    else if ("close" in d) closeDetail();
    else if (d.similar) { state.similarId = d.similar; state.sort = "relevance"; $("#sort").value = "relevance"; closeDetail(); render(); showLibrary(); }
    else if ("clearSimilar" in d) { state.similarId = null; render(); }
    else if (d.findNote) { state.notes.add(d.findNote); closeDetail(); render(); showLibrary(); }
    else if (d.findMood) { state.moods.add(d.findMood); closeDetail(); render(); showLibrary(); }
    else if (d.locate) { const id = d.locate; closeDetail(); if ($(".layout").dataset.view === "library") document.querySelector('.tab[data-view="split"]').click(); MapView.locate(id); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#detail").hidden) closeDetail(); });

  // ---------- 啟動 ----------
  renderFilterOptions();
  MapView.init();
  render();
})();
