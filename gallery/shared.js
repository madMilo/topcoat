(() => {
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme");
  const dirParam = params.get("dir");
  const html = document.documentElement;
  const body = document.body;

  const theme = themeParam || html.dataset.theme || "desktop-light";
  const dir = dirParam || html.getAttribute("dir") || "ltr";

  html.dataset.theme = theme;
  html.setAttribute("dir", dir);
  body.dataset.theme = theme;

  const themeMap = {
    "desktop-light": "../css/topcoat-desktop-light.css",
    "desktop-dark": "../css/topcoat-desktop-dark.css",
    "mobile-light": "../css/topcoat-mobile-light.css",
    "mobile-dark": "../css/topcoat-mobile-dark.css"
  };

  const stylesheet = document.querySelector('[data-test="theme-stylesheet"]');
  if (stylesheet) {
    stylesheet.setAttribute("href", themeMap[theme] || themeMap["desktop-light"]);
  }
})();
