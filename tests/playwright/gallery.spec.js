const { test, expect } = require('@playwright/test');

const themes = ['desktop-light', 'desktop-dark', 'mobile-light', 'mobile-dark'];
const directions = ['ltr', 'rtl'];
const viewports = [
  { name: 'mobile', width: 360, height: 640 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 }
];

const pages = [
  { name: 'button-bar', path: 'button-bar.html' },
  { name: 'button-bar-large', path: 'button-bar-large.html' },
  { name: 'button', path: 'button.html' },
  { name: 'button-quiet', path: 'button-quiet.html' },
  { name: 'button-large', path: 'button-large.html' },
  { name: 'button-large-quiet', path: 'button-large-quiet.html' },
  { name: 'button-cta', path: 'button-cta.html' },
  { name: 'button-cta-large', path: 'button-cta-large.html' },
  { name: 'checkbox', path: 'checkbox.html' },
  { name: 'icon-button', path: 'icon-button.html' },
  { name: 'icon-button-quiet', path: 'icon-button-quiet.html' },
  { name: 'icon-button-large', path: 'icon-button-large.html' },
  { name: 'icon-button-large-quiet', path: 'icon-button-large-quiet.html' },
  { name: 'notification', path: 'notification.html' },
  { name: 'radio-button', path: 'radio-button.html' },
  { name: 'range', path: 'range.html' },
  { name: 'search-input', path: 'search-input.html' },
  { name: 'search-input-large', path: 'search-input-large.html' },
  { name: 'switch', path: 'switch.html' },
  { name: 'tab-bar', path: 'tab-bar.html' },
  { name: 'text-input', path: 'text-input.html' },
  { name: 'text-input-large', path: 'text-input-large.html' },
  { name: 'textarea', path: 'textarea.html' },
  { name: 'textarea-large', path: 'textarea-large.html' }
];

for (const viewport of viewports) {
  test.describe(`gallery snapshots (${viewport.name})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const { name, path } of pages) {
      for (const theme of themes) {
        for (const dir of directions) {
          test(`${name} | ${theme} | ${dir}`, async ({ page }) => {
            await page.goto(`${path}?theme=${theme}&dir=${dir}`);
            const component = page.locator('[data-test="component"]');
            await expect(component).toBeVisible();
            await expect(component).toHaveScreenshot(
              `${name}-${theme}-${dir}-${viewport.name}.png`
            );
          });
        }
      }
    }
  });
}

test('focus outline is visible on primary button', async ({ page }) => {
  await page.goto('button.html?theme=desktop-light&dir=ltr');
  const button = page.locator('[data-test="primary-button"]');
  await button.focus();
  const focusStyles = await button.evaluate((element) => {
    const styles = window.getComputedStyle(element);
    return {
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth,
      boxShadow: styles.boxShadow
    };
  });

  const hasOutline =
    focusStyles.outlineStyle !== 'none' && focusStyles.outlineWidth !== '0px';
  const hasShadow = focusStyles.boxShadow && focusStyles.boxShadow !== 'none';

  expect(hasOutline || hasShadow).toBeTruthy();
});
