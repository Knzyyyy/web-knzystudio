import { test, expect } from '@playwright/test';

for (const width of [320, 375, 768, 1440]) {
  test(`alur pesanan dan layout pada lebar ${width}px`, async ({ page }, testInfo) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((element) => { const rect = element.getBoundingClientRect(); return rect.width > 0 && rect.right > innerWidth + 1; }).map((element) => `${element.tagName}.${element.className}: ${element.getBoundingClientRect().right}`));
    expect(overflow).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    await page.getByRole('button', { name: 'Buka pesan kecilmu' }).click();
    await expect(page.getByText('dear, you.')).toBeVisible();
    await page.getByRole('button', { name: 'Racik hadiahmu' }).click();
    await expect(page.getByRole('radio', { name: /Custom/ })).toBeChecked();
    await page.getByRole('checkbox', { name: /Ekstra galeri/ }).check();
    await page.getByRole('checkbox', { name: /Opening video/ }).check();
    await expect(page.locator('.summary-total strong')).toHaveText('Rp105.000');
    await expect(page.locator('.summary-total')).toContainText('Rp52.500');
    await page.getByRole('textbox', { name: /ADA CERITA/ }).fill('Untuk anniversary kedua, tema pink & krem 💕');
    await page.getByRole('button', { name: 'Kirim pesanan ke WhatsApp' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('#order-message')).toHaveValue(/Total estimasi: Rp105\.000/);
    await expect(page.locator('#order-message')).toHaveValue(/pink & krem 💕/);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await page.getByRole('radio', { name: /Anniversary/ }).check();
    await expect(page.getByRole('checkbox', { name: /Surat cinta/ })).toBeDisabled();
    await expect(page.locator('.summary-total strong')).toHaveText('Rp75.000');
    await page.getByText('Aku nggak paham coding, bisa pesan?', { exact: true }).click();
    await expect(page.getByText(/Bisa banget. Kamu cukup pilih/)).toBeVisible();
    if (width === 375) {
      await page.getByRole('button', { name: 'Buka menu' }).click();
      await expect(page.getByRole('navigation')).toBeVisible();
      await page.getByRole('navigation').getByRole('link', { name: 'Katalog', exact: true }).click();
      await expect(page.getByRole('navigation')).not.toBeVisible();
    }
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`storefront-${width}.png`), fullPage: true });
  });
}
