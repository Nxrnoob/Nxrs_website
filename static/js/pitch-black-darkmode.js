document.addEventListener('DOMContentLoaded', function() {
  var darkThemeCss = document.getElementById('dark-theme');
  function updateDarkModeClass() {
    if (!darkThemeCss.disabled) {
      document.body.classList.add('darkmode-active');
    } else {
      document.body.classList.remove('darkmode-active');
    }
  }
  // Initial check
  updateDarkModeClass();
  // Listen for theme toggle events
  var toggles = document.querySelectorAll('.dark-theme-toggle');
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      // Wait a tick for the theme to update
      setTimeout(updateDarkModeClass, 10);
    });
  });
}); 