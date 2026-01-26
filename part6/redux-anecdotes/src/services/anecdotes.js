const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed fetching anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({content, votes: 0}),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('failed creating new anecdote')
  }

  return await response.json()
}

const update = async (newAnecdote, id) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(newAnecdote),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('failed updating anecdote')
  }

  return await response.json()
}

export default { getAll, createNew, update }