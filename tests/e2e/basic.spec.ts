import { test, expect } from '@playwright/test'

test('home → converters → length m to ft', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Civil Calculation')).toBeVisible()
  await page.getByRole('link', { name: 'Browse Converters' }).click()
  await page.click('text=Length')
  await page.getByRole('link', { name: /Length/ }).click()
  await page.getByLabel('Value').fill('1')
  await page.getByLabel('From').selectOption({ label: /meter/ })
  await page.getByLabel('To').selectOption({ label: /foot/ })
  await expect(page.getByText('3.280')).toBeVisible()
})






