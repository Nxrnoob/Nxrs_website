document.addEventListener("DOMContentLoaded", function () {
  var article = document.querySelector(".post");
  if (!article) return;

  function articleMetrics() {
    var rect = article.getBoundingClientRect();
    var top = rect.top + window.scrollY;
    var height = rect.height;
    return {
      start: top - 80,
      end: top + height - window.innerHeight,
    };
  }

  var start = 0;
  var end = 0;
  var ticking = false;
  var bar = null;

  function update() {
    ticking = false;
    var scrollY = window.scrollY;
    var range = end - start;
    var progress = range > 0 ? (scrollY - start) / range : 0;
    progress = Math.min(1, Math.max(0, progress));

    bar.style.transform = "scaleX(" + progress + ")";

    var inReadingRange = scrollY > start && scrollY < end;
    bar.classList.toggle("is-visible", inReadingRange);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  function init() {
    var metrics = articleMetrics();
    if (metrics.end - metrics.start <= 0) return;

    start = metrics.start;
    end = metrics.end;

    bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      var m = articleMetrics();
      start = m.start;
      end = m.end;
      onScroll();
    });

    update();
  }

  init();
});
