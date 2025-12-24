import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, onChange}) => {
  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({
  onSubmit, 
  newName, 
  onChangeName, 
  newNumber, 
  onChangeNumber
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={onChangeName}
        />
      </div>
      <div>
        number: 
        <input 
          value={newNumber}
          onChange={onChangeNumber}
        />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  )
}

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter)) {
          return (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          )
        }
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        id: String(persons.length + 1),
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addEntry}
        newName={newName}
        onChangeName={handleNameChange}
        newNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App