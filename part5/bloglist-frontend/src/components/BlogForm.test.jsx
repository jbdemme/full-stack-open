import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, vi } from 'vitest'

describe('<BlogForm />', () => {
  test('event handler is called with right details when adding blog', async () => {
    const blog = {
      title: 'Test blog title',
      author: 'Test author',
      url: 'www.test-blog.com',
    }

    const eventHandler = vi.fn()

    render(<BlogForm createBlog={eventHandler}/>)

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)


    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    const createButton = await screen.findByRole('button', { name: /create/i })
    await user.click(createButton)

    expect(eventHandler.mock.calls).toHaveLength(1)

    expect(eventHandler.mock.calls[0][0]).toStrictEqual(blog)

  })
})

