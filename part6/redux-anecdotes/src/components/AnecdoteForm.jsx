import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(appendAnecdote(content))
    dispatch(setNotification(`You created a new anecdote: '${content}'`), 5)
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content"/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm