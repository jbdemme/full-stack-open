import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { removeNotif, setNotif } from "../reducers/notificationReducer"

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

  const handleVote = anecdote => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotif(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotif()), 5000)
  }

  return(
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList