const Person = require('./models/Person')
const api = require('express').Router()

api.get('/', (request, response) => {
  Person.find({}).then(persons =>
    response.json(persons)
  )
})

api.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

api.post('/', (request, response, next) => {
  const body = prepareForSave(request.body)

  Person.findOne({ name: body.name })
    .then(person => {
      if (person) {
        response
          .status(409)
          .json({
            error:
              `Name must be unique. '${body.name}' is already in the phonebook`
          })
      }
      else {
        const newPerson = new Person({
          name: body.name,
          number: body.number,
          date: new Date(),
        })

        newPerson.save()
          .then(savedPerson => {
            response.status(201).json(savedPerson)
          })
          .catch(error => {
            next(error)
          })
      }
    })
})

api.put('/:id', (request, response, next) => {

  const { name, number } = prepareForSave(request.body)

  // mongoose model validation skips 'required' constraints in updates
  if (!name)
    return response.status(400).json({
      error: 'Person validation failed: name: Name is required' })

  if (!number)
    return response.status(400).json({
      error: 'Person validation failed: number: Number is required' })

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.status(200).json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})

api.delete('/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
})

const prepareForSave = (body) => {
  body.number = body.number
    ? body.number.replace(/\s/g, '')
    : null

  return body
}

module.exports = api

