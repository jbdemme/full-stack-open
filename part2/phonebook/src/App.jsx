import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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