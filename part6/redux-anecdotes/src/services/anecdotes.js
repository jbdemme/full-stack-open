const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed fetching anecdotes')
  }

  return await response.json()
}

export default { getAll }