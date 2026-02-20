import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should redirect to default locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/ko')
  })

  test('should render home page', async ({ page }) => {
    await page.goto('/ko')
    await expect(page).toHaveTitle(/Web Template/)
  })

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/ko')
    await page.getByText('대시보드').first().click()
    await expect(page).toHaveURL('/ko/dashboard')
  })

  test('should switch to English locale', async ({ page }) => {
    await page.goto('/ko')
    await page.goto('/en')
    await expect(page).toHaveURL('/en')
  })
})
