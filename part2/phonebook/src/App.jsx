import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: '1',
      name: 'Arto Hellas'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        id: String(persons.length + 1),
        name: newName
      }

      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}

export default App