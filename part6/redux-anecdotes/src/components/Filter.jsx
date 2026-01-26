import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    console.log(filter)
    dispatch(changeFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default Filter