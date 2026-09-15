document.addEventListener("DOMContentLoaded", function () {
  var blocks = document.querySelectorAll(".highlight");
  if (!blocks.length) return;

  var ICON_COPY =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var ICON_CHECK =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var RESET_MS = 2000;

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

  function makeButton(pre) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = ICON_COPY;

    var timer = null;

    btn.addEventListener("click", function () {
      copyText(pre.innerText)
        .then(function () {
          btn.innerHTML = ICON_CHECK;
          btn.classList.add("copied");
          btn.setAttribute("aria-label", "Copied");
        })
        .catch(function () {
          btn.classList.add("copy-failed");
          btn.setAttribute("aria-label", "Copy failed");
        })
        .finally(function () {
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.innerHTML = ICON_COPY;
            btn.classList.remove("copied", "copy-failed");
            btn.setAttribute("aria-label", "Copy code");
          }, RESET_MS);
        });
    });

    return btn;
  }

  blocks.forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre || block.querySelector(".code-copy-btn")) return;
    block.appendChild(makeButton(pre));
  });
});
