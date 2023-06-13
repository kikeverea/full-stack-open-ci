import { render, screen } from '@testing-library/react'
import App from '../App'
import PhoneBook from '../components/PhoneBook'


describe('App component is rendered correctly', () => {

  beforeEach (() => {
    render(<App />)
  })

  it('Renders title', () =>
    expect(screen.getByText('Phonebook')).toBeDefined())

  it('Renders the filter input', () =>
    expect(screen.getByRole('textbox', { name: 'filter by name' })).toBeDefined())

  it('Renders the new phone number form', () => {
    expect(screen.getByText('Add new phone number')).toBeDefined()

    expect(screen.getByRole('textbox', { name: 'name' })).toBeDefined()
    expect(screen.getByRole('textbox', { name: 'phone' })).toBeDefined()

    expect(screen.getByRole('button', { name: 'add' })).toBeDefined()
  })

  it('Renders the phonebook', () => {
    expect(screen.getByText('Numbers')).toBeDefined()
  })
})

describe('Phonebook component is rendered correctly', () => {

  it('Renders a line entry for every person', () => {
    const persons = [
      { name: 'Jon Doe', number: '555-555-555' },
      { name: 'Jane Doe', number: '333-333-333' }
    ]
    render(<PhoneBook persons={persons}/>)

    expect(screen.getByText('Name', { exact: false })).toBeDefined()
    expect(screen.getByText('Phone Number', { exact: false })).toBeDefined()

    persons.forEach(person => {
      expect(screen.getByText(person.name)).toBeDefined()
      expect(screen.getByText(person.number)).toBeDefined()
    })

    expect(screen.getAllByRole('button', { name: 'delete' })).toHaveLength(persons.length)
  })

  it('Renders a message if phonebook is empty', () => {
    render(<PhoneBook persons={[]}/>)

    expect(screen.getByText('No phones listed')).toBeDefined()

    expect(() => screen.getByText('Name')).toThrow()
    expect(() => screen.getByText('Phone Number')).toThrow()
  })
})