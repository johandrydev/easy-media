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
  return (
    <div className='easy-form-control'>
      <label className="easy-label" htmlFor={name}>{label}</label>
      <input className="easy-input" placeholder={placeholder} name={name} {...props} {...(register && register(name, rules))} />
    </div>
  )
}
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  rules: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string
}
