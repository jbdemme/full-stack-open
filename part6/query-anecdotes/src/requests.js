const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to get anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(newAnecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }
  
  return await response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(updatedAnecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
  return await response.json()
}