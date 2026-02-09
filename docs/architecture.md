# Architecture

## Source layout

New development will live under `src/` with clear entrypoints that mirror future build steps:

- `src/topcoat-2026.css` is the root entrypoint and declares the layer order used across the design system.
- `src/tokens/` houses design tokens (colors, typography, spacing, etc.) that will feed every theme.
- `src/base/` contains base element styles shared across themes.

Additional layers (`components`, `utilities`, `overrides`) will be introduced as parity work progresses.

## Mapping to existing outputs

The legacy production stylesheets remain in `css/` and are the current source of truth for shipped builds:

- `css/topcoat-desktop-light.css` and `css/topcoat-desktop-dark.css`
- `css/topcoat-mobile-light.css` and `css/topcoat-mobile-dark.css`

The new `src/` tree is intended to eventually compile into those same outputs (and their minified variants) once parity is achieved. Until then, the legacy `css/` files are left untouched to avoid regressions; changes should only land in `src/` until a full migration plan is complete.
