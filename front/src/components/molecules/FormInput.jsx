import PropTypes from 'prop-types'

export function FormInput ({
  name,
  placeholder,
  label,
  register,
  rules,
  error,
  ...props
}) {
  console.log('error', error)
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <input type="text" placeholder={placeholder} name={name} {...props} {...(register && register(name, rules))} />
      <span>{error}</span>
    </div>
  )
}
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  rules: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any)
}
