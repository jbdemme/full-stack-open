const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to get anecdotes')
  }
  return await response.json()
}