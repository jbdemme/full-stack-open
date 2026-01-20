const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      loginWith(page, 'asdfghjkl', 'SEKRET')
      await expect(page.getByText('Jonathan logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'asdfghjkl', 'wrong')
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'asdfghjkl', 'SEKRET')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'E2E title', 'E2E author', 'E2E URL')

      await expect(
        page.getByText('a new blog E2E title by E2E author added')
      ).toBeVisible()

      await expect(
        page.locator('#blogList > div')
          .filter({ hasText: 'E2E title' })
          .filter({ hasText: 'E2E author' })
      ).toBeVisible()
    })
    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog 1', 'Linus Torvald', 'www.fake1.com')
        await createBlog(page, 'Blog 2', 'ThePrimagen', 'www.fake2.com')
      })

      test('a specific blog can be liked', async ({ page }) => {
        const blogElement = page.getByText(/Blog 1/i).locator('..')

        await blogElement.getByRole('button', { name: /view/i }).click()

        await blogElement.getByRole('button', { name: /like/i }).click()
        await expect(blogElement.getByText('likes')).toContainText('1')
      })
    })
  })
})
