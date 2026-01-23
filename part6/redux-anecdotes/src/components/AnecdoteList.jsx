import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => (
      anecdote.content.toLowerCase().includes(
        filter.toLowerCase()
      )
    ))
  })
  const dispatch = useDispatch()

  return(
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList