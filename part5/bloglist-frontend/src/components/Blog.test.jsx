import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, expect } from 'vitest'

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
})