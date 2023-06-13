import Input from './Input'

const Filter = ({ state, onFilterChange }) =>
  <Input
    id='filter'
    label='filter by name'
    state={state}
    onStateChange={onFilterChange} />

export default Filter