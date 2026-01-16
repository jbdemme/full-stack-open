import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('title and author are visible at first, but url and likes are not', async () => {
    const blog = {
      title: 'Test blog title',
      author: 'Test author',
      url: 'www.test-blog.com',
      likes: 6,
    }

    render(<Blog blog={blog} />)

    const propertiesToCheck = ['title', 'author', 'url', 'likes']
    const elements = {}

    propertiesToCheck.forEach(key => {
      elements[key] = screen.getByText(blog[key], { exact: false })
    })


    expect(elements.title).toBeVisible()
    expect(elements.author).toBeVisible()
    expect(elements.url).not.toBeVisible()
    expect(elements.likes).not.toBeVisible()
  })

  test('url and likes are shown when button is clicked', async () => {
    const blog = {
      title: 'Test blog title',
      author: 'Test author',
      url: 'www.test-blog.com',
      likes: 6,
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText(blog.url, { exact: false })
    const likes = screen.getByText(blog.likes, { exact: false })

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('like button double click calls onLike twice', async () => {
    const blog = {
      title: 'Test blog title',
      author: 'Test author',
      url: 'www.test-blog.com',
      likes: 6,
    }

    const mockLike = vi.fn()

    render(<Blog blog={blog} onLike={mockLike} />)

    const user = userEvent.setup()
    const viewButton = screen.getByRole('button', { name: /view/i })
    await user.click(viewButton)
    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})