document.addEventListener("DOMContentLoaded", function () {
  var post = document.querySelector(".post");
  if (!post || document.querySelector(".reader-utils")) return;

  var ICON_TOP =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
  var ICON_LINK =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
  var ICON_CHECK =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var RESET_MS = 1400;

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var cluster = document.createElement("div");
  cluster.className = "reader-utils";

  var copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.setAttribute("aria-label", "Copy page link");
  copyBtn.innerHTML = ICON_LINK;

  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = ICON_TOP;

  cluster.appendChild(copyBtn);
  cluster.appendChild(topBtn);
  document.body.appendChild(cluster);

  var revertTimer = null;
  var ticking = false;

  function update() {
    ticking = false;
    cluster.classList.toggle(
      "is-visible",
      window.scrollY > window.innerHeight * 1.5
    );
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  copyBtn.addEventListener("click", function () {
    copyText(window.location.href)
      .then(function () {
        copyBtn.innerHTML = ICON_CHECK;
        copyBtn.classList.add("system-copied");
        copyBtn.setAttribute("aria-label", "Link copied");
      })
      .catch(function () {
        copyBtn.setAttribute("aria-label", "Copy failed");
      })
      .finally(function () {
        clearTimeout(revertTimer);
        revertTimer = setTimeout(function () {
          copyBtn.innerHTML = ICON_LINK;
          copyBtn.classList.remove("system-copied");
          copyBtn.setAttribute("aria-label", "Copy page link");
        }, RESET_MS);
      });
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
});
