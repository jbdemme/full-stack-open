const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = page.getByText('Log in to application')
    const loginButton = page.getByRole('button', {name: /log in/i})
    await expect(loginText).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
})