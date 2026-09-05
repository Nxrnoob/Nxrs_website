document.addEventListener("DOMContentLoaded", function () {
  var ICON_COPY =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var ICON_CHECK =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var RESET_MS = 1400;
  var MARGIN = 8;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy-selection-btn";
  btn.setAttribute("aria-label", "Copy selected text");
  btn.innerHTML =
    ICON_COPY + '<span class="copy-selection-label">Copy</span>';
  btn.style.visibility = "hidden";
  document.body.appendChild(btn);

  var hideTimer = null;
  var currentText = "";
  var ticking = false;
  var lastPointer = { x: 0, y: 0 };
  var hasPointer = false;
  var pointerDown = false;
  var lastRect = null;

  function inEditable(node) {
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        var tag = node.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          node.isContentEditable
        ) {
          return true;
        }
      }
      node = node.parentNode;
    }
    return false;
  }

  function hide() {
    btn.classList.remove("is-visible");
    clearTimeout(hideTimer);
  }

  function positionAtCursor() {
    var w = btn.offsetWidth;
    var h = btn.offsetHeight;
    var left = lastPointer.x + 14;
    var top = lastPointer.y + 18;

    if (left + w > window.innerWidth - MARGIN) {
      left = lastPointer.x - w - 14;
    }
    if (top + h > window.innerHeight - MARGIN) {
      top = lastPointer.y - h - 12;
    }

    left = Math.min(Math.max(MARGIN, left), window.innerWidth - w - MARGIN);
    top = Math.min(Math.max(MARGIN, top), window.innerHeight - h - MARGIN);

    btn.style.left = left + "px";
    btn.style.top = top + "px";
  }

  function positionAtSelection(rect) {
    var left = rect.left + rect.width / 2 - btn.offsetWidth / 2;
    left = Math.min(
      Math.max(MARGIN, left),
      window.innerWidth - btn.offsetWidth - MARGIN
    );

    var top = rect.top - btn.offsetHeight - 8;
    if (top < MARGIN) {
      top = rect.bottom + 8;
    }

    btn.style.left = left + "px";
    btn.style.top = top + "px";
  }

  function update() {
    ticking = false;

    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0 || pointerDown) {
      if (!pointerDown) hide();
      return;
    }

    var text = sel.toString();
    if (!text.trim() || inEditable(sel.anchorNode)) {
      hide();
      return;
    }

    var rect = sel.getRangeAt(0).getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      hide();
      return;
    }

    currentText = text;
    lastRect = rect;

    if (hasPointer) {
      positionAtCursor();
    } else {
      positionAtSelection(rect);
    }

    btn.style.visibility = "visible";
    btn.classList.add("is-visible");
  }

  function onSelectionChange() {
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

  btn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
  });

  btn.addEventListener("click", function () {
    copyText(currentText)
      .then(function () {
        btn.innerHTML =
          '<span class="sys-label">System</span>' +
          '<span class="sys-msg">「 COPIED +1 」</span>';
        btn.classList.add("system-copied");
        btn.setAttribute("aria-label", "Copied");
        if (hasPointer) {
          positionAtCursor();
        } else if (lastRect) {
          positionAtSelection(lastRect);
        }
      })
      .catch(function () {
        btn.innerHTML =
          ICON_CHECK + '<span class="copy-selection-label">Failed</span>';
        btn.classList.add("copied");
        btn.setAttribute("aria-label", "Copy failed");
      })
      .finally(function () {
        hideTimer = setTimeout(function () {
          btn.innerHTML =
            ICON_COPY + '<span class="copy-selection-label">Copy</span>';
          btn.classList.remove("copied", "system-copied");
          btn.setAttribute("aria-label", "Copy selected text");
          hide();
        }, RESET_MS);
      });
  });

  document.addEventListener("pointermove", function (e) {
    lastPointer.x = e.clientX;
    lastPointer.y = e.clientY;
    hasPointer = true;
  }, { passive: true });

  document.addEventListener("pointerdown", function (e) {
    if (btn.contains(e.target)) return;
    pointerDown = true;
    hide();
  }, true);

  document.addEventListener("pointerup", function (e) {
    pointerDown = false;
    if (!btn.contains(e.target)) {
      onSelectionChange();
    }
  }, true);

  document.addEventListener("selectionchange", onSelectionChange);

  window.addEventListener("scroll", hide, { passive: true });
  window.addEventListener("resize", hide);
});
