const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Jonathan',
        username: 'asdfghjkl',
        password: 'SEKRET',
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = page.getByText('Log in to application')
    const loginButton = page.getByRole('button', {name: /log in/i})
    await expect(loginText).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('asdfghjkl')
      await page.getByLabel('password').fill('SEKRET')

      await page.getByRole('button', { name: /log in/i }).click()

      await expect(page.getByText('Jonathan logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('asdfghjkl')
      await page.getByLabel('password').fill('wrong')

      await page.getByRole('button', { name: /log in/i }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})