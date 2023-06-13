const Input = ({ id, label, state, onStateChange }) => {
  const onChange = (event) =>
    onStateChange(event.target.value)

  return(
    <div>
      <label htmlFor={ id }>{ label }</label>
      &nbsp;&nbsp;
      <input id={ id } value={state} onChange={onChange} />
    </div>
  )
}

export default Input