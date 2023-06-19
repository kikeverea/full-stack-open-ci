const express = require('express')
const Person = require('./models/Person')
const router = require('./api')
const cors = require('cors')
const ENV = process.env.ENV || 'DEV'
const PORT = ENV === 'DEV' ? 3001 : 3000

const morgan = require('morgan')
const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'
morgan.token('body', req => {
  const person = req.body
  delete person.id
  return JSON.stringify(person)
})

const app = express()

if (ENV === 'DEV')
  app.use(cors())

app.use(express.json())

app.use(express.static('build'))
app.use('/api/persons', router)

app.use(morgan(morganFormat, {
  skip: req => req.method.toUpperCase() === 'POST'
}))
app.use(morgan(morganFormat, {
  skip: req => req.method.toUpperCase() !== 'POST'
}))

app.listen(PORT)

app.get('/info', (request, response) =>
  Person.countDocuments({})
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>`
      )
    })
    .catch(e => response.json(e))
)

const errorHandler = (error, request, response, next) => {
  console.log('ERROR', error)

  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'Malformed id' })
  }

  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
