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

// PS4/PS5 tuş dizilerini simgeye çevir
(function () {
  var codes = document.querySelectorAll("#panel-ps .code-row .code");
  if (!codes.length) return;
  var map = {
    Triangle: { icon: "△", cls: "btn-triangle" },
    Circle:   { icon: "○", cls: "btn-circle" },
    X:        { icon: "✕", cls: "btn-cross" },
    Square:   { icon: "□", cls: "btn-square" },
    Left:     { icon: "←", cls: "btn-dpad" },
    Right:    { icon: "→", cls: "btn-dpad" },
    Up:       { icon: "↑", cls: "btn-dpad" },
    Down:     { icon: "↓", cls: "btn-dpad" }
  };
  codes.forEach(function (el) {
    var tokens = el.textContent.split(",").map(function (t) { return t.trim(); });
    var html = tokens.map(function (tok) {
      var m = map[tok];
      if (m) return '<span class="btn-chip ' + m.cls + '" title="' + tok + '">' + m.icon + "</span>";
      return '<span class="btn-chip btn-shoulder">' + tok + "</span>";
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
