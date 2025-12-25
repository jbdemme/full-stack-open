import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Persons = ({persons, filter, removePerson}) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter)) {
          return (
            <div key={person.id}>
              {person.name} {person.number}
              <button onClick={() => removePerson(person.id)}>
                delete
              </button>
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

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id != returnedPerson.id))
        })
    }
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

      <Persons 
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App