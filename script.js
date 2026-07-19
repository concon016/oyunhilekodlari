// Anasayfa oyun arama
(function () {
  var input = document.getElementById("gameSearch");
  if (!input) return;
  var cards = document.querySelectorAll(".game-card");
  input.addEventListener("input", function () {
    var q = input.value.trim().toLocaleLowerCase("tr");
    cards.forEach(function (card) {
      var name = card.dataset.name.toLocaleLowerCase("tr");
      card.style.display = name.indexOf(q) !== -1 ? "" : "none";
    });
  });
})();

// Platform sekmeleri
(function () {
  var tabs = document.querySelectorAll(".platform-tab-btn");
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      document.querySelectorAll(".platform-panel").forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });
})();

// Kod içi arama
(function () {
  var input = document.getElementById("codeSearch");
  if (!input) return;
  input.addEventListener("input", function () {
    var q = input.value.trim().toLocaleLowerCase("tr");
    document.querySelectorAll(".code-row").forEach(function (row) {
      var text = row.dataset.search.toLocaleLowerCase("tr");
      row.classList.toggle("hidden", q.length > 0 && text.indexOf(q) === -1);
    });
  });
})();

// PS4/PS5 tuş dizilerini kontrolcü butonu görseline çevir
(function () {
  var codes = document.querySelectorAll("#panel-ps .code-row .code");
  if (!codes.length) return;

  var CAP = "#2b2b2f";

  function face(symbol) {
    return '<svg viewBox="0 0 28 28" width="26" height="26"><circle cx="14" cy="14" r="13" fill="' + CAP + '"/>' + symbol + "</svg>";
  }
  function dpad(pathD) {
    return '<svg viewBox="0 0 28 28" width="26" height="26"><rect x="1" y="1" width="26" height="26" rx="7" fill="' + CAP + '"/><path d="' + pathD + '" fill="#fff"/></svg>';
  }
  function shoulder(label) {
    return '<svg viewBox="0 0 40 26" width="34" height="22"><rect x="1" y="1" width="38" height="24" rx="6" fill="' + CAP + '"/><text x="20" y="17" font-size="12" font-weight="700" fill="#fff" text-anchor="middle" font-family="Arial, sans-serif">' + label + "</text></svg>";
  }

  var map = {
    Triangle: face('<path d="M14 8 L19.6 18.2 L8.4 18.2 Z" fill="none" stroke="#22c55e" stroke-width="2" stroke-linejoin="round"/>'),
    Circle:   face('<circle cx="14" cy="14" r="5.6" fill="none" stroke="#f43f5e" stroke-width="2"/>'),
    X:        face('<path d="M10 10 L18 18 M18 10 L10 18" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>'),
    Square:   face('<rect x="9.2" y="9.2" width="9.6" height="9.6" fill="none" stroke="#ec4899" stroke-width="2"/>'),
    Left:  dpad("M17 9 L11 14 L17 19 Z"),
    Right: dpad("M11 9 L17 14 L11 19 Z"),
    Up:    dpad("M9 17 L14 11 L19 17 Z"),
    Down:  dpad("M9 11 L14 17 L19 11 Z"),
    L1: shoulder("L1"), L2: shoulder("L2"), R1: shoulder("R1"), R2: shoulder("R2")
  };

  codes.forEach(function (el) {
    var tokens = el.textContent.split(",").map(function (t) { return t.trim(); });
    var html = tokens.map(function (tok) {
      var icon = map[tok] || shoulder(tok);
      return '<span class="btn-chip" title="' + tok + '">' + icon + "</span>";
    }).join("");
    el.innerHTML = '<span class="btn-seq">' + html + "</span>";
  });
})();

// Kopyala butonu
(function () {
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = btn.dataset.code;
      navigator.clipboard.writeText(code).then(function () {
        var orig = btn.textContent;
        btn.textContent = "Kopyalandı ✓";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  });
})();
