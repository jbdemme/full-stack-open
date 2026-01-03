require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./modules/person')

const app = express()

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req, res) {return JSON.stringify(req.body)})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

//GET info about data
app.get('/info', (request, response) => {
  const requestTime = Date.now()
  const displayTime = new Date(requestTime).toString()

  Person.find({})
    .then(people => {
      response.send(
            `<div>
                Phonebook has info for ${people.length} people 
            </div>
            <div>
                ${displayTime}
            </div>`
        )
    })
})

//GET one specific person by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
})

//DELETE one specific person by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

// Add a new person
app.post('/api/persons', (request, response) => {
  const { name, number} = request.body

  if (!name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const newPerson = new Person({
    name: name,
    number: number
  })

  newPerson.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
})

//Update an existing person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number} = request.body

  if (!name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = number

      person.save().then(updatedPerson => {
        return response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name == 'CastError') {
    response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)    
})