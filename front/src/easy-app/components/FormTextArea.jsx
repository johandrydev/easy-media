import PropTypes from 'prop-types'

export function FormTextArea ({
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
      <textarea className="easy-input" cols="30" rows="4" placeholder={placeholder} name={name} {...props} {...(register && register(name, rules))} />
    </div>
  )
}
FormTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  rules: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any)
}
