const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]


const url =
  `mongodb+srv://fullstack:${password}@cluster0.lxyzjdg.mongodb.net/phonebookApp?
  appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const generateId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  const person = new Person({
    id: generateId(),
    name: newName,
    number: newNumber
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}