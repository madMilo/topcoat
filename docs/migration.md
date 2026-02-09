# Migration guide

## Naming decision

We will **keep existing `.topcoat-*` class names** and introduce **new utilities under `.tc-u-*`**. This keeps legacy consumers stable while allowing incremental adoption of shorter, utility-focused names.

## Compatibility options

1. **Legacy-only**
   - Continue using `.topcoat-*` classes with no changes required.
2. **Hybrid**
   - Use existing `.topcoat-*` components alongside new `.tc-u-*` utilities.
3. **Utility-first**
   - Prefer `.tc-u-*` for layout/spacing helpers, while leaving component classes as `.topcoat-*`.

## Naming conversions

### Components (no rename)

| Legacy class | New class |
| --- | --- |
| `.topcoat-button` | _unchanged_ |
| `.topcoat-text-input` | _unchanged_ |
| `.topcoat-list` | _unchanged_ |

### Utilities (new namespace)

All new utilities use the `.tc-u-*` prefix to avoid collisions and signal their helper role.

| Utility intent | Class name | Example usage |
| --- | --- | --- |
| Margin/padding | `.tc-u-m*`, `.tc-u-p*` | `<div class="tc-u-mt-2">` |
| Text alignment | `.tc-u-text-center` | `<div class="tc-u-text-center">` |
| Display/visibility | `.tc-u-hidden`, `.tc-u-inline` | `<span class="tc-u-hidden">` |

## Migration steps

1. **Keep existing markup** using `.topcoat-*` classes for components.
2. **Introduce utilities gradually** by adding `.tc-u-*` classes where needed.
3. **Avoid renaming components** until/if a dedicated component namespace is added in the future.

## Validation (no `.topcoat-*` allowed)

There is **no compatibility layer** for `.topcoat-*` going forward, so any usage should be treated as an error.

**Local check (run before committing):**

```sh
rg --line-number "\\.topcoat-" src/ demo/ css/
```

Expected failure message when matches are found:

```
Found legacy .topcoat- usage. Remove or replace with .tc-u-*.
```

**CI check (required):**

- Run the same `rg` command in CI against `src/`, `demo/`, and compiled CSS (e.g., `css/`).
- Fail the job if any match is returned with the message above, so regressions are blocked early.

## Rationale

- **Backward compatibility**: no breaking changes for existing users.
- **Clarity**: utility classes are clearly separated from components.
- **Incremental adoption**: teams can adopt utilities without refactoring component usage.
