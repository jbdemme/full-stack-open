const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to get anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
  console.log(newAnecdote)
  const options = {
    method: 'POST',
    body: JSON.stringify(newAnecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(baseUrl, options)
  return await response.json()
}