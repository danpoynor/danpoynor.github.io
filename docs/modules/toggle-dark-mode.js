const toggle = document.querySelector('.toggle-dark-mode');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const classes = document.documentElement.classList;
const pref_key = 'prefers_dark_mode';
const pref = localStorage.getItem(pref_key);
const dark = 'dark';
const light = 'light';
const default_theme = dark;
const messages = {
  showLight: 'Show light mode color scheme',
  showDark: 'Show dark mode color scheme'
}
let isActive = (default_theme === dark);

const activateTheme = (theme, clickTrigger = false) =>{
  classes.remove(dark, light);
  classes.add(theme);
  isActive = (theme === dark);
  toggle.setAttribute('aria-checked', isActive);
  toggle.setAttribute('title', isActive ? messages.showLight : messages.showDark);

  // NOTE: Currently theme-color is a Safari only feature (20211216)
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isActive ? '#19202e' : '#2b3750');
  }

  // Only save preference if user clicked the toggle
  clickTrigger ? localStorage.setItem(pref_key, isActive) : null;
};

export const init = () => {
  if (toggle) {
    // Check for local or system preference settings
    if (pref) {
      pref === 'true' ? activateTheme(dark) : activateTheme(light);
    } else {
      window.matchMedia(`(prefers-color-scheme: light)`).matches ? activateTheme(light) : activateTheme(default_theme);
    }

    // Detect theme change in browser or system prefs
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (ev) {
      const colorScheme = ev.matches ? "dark" : "light";
      activateTheme(colorScheme);
      localStorage.removeItem(pref_key);
    });

    toggle.addEventListener('click', () => {
      if (isActive) {
        activateTheme(light, true);
      } else {
        activateTheme(dark, true);
      }
    });
  } else {
    console.error('Dark mode toggle button not found.');
  }
};
