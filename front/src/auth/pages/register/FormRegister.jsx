import { useForm } from 'react-hook-form'
import { FormInput } from '../../components/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerRequest } from '../../../services/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorAlert, successAlert } from '../../../services/sweetalert'

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string()
    .required()
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

export function FormRegister () {
  const [error, setError] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const navidate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    const { passwordConfirmation, ...rest } = data
    registerRequest(rest)
      .then((resp) => {
        navidate('/auth/login')
        successAlert({ text: resp.message })
      })
      .catch((error) => {
        setError(error.message)
        errorAlert({ text: error.message })
      })
  })

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        name='name'
        label='Full Name'
        placeholder='Johandry Mora'
        register={register}
        error={errors.name && errors.name.message}
      />
      <FormInput
        name='email'
        label='Email'
        placeholder='johandry@contact.com'
        register={register}
        error={errors.email && errors.email.message}
      />
      <FormInput
        name='password'
        type='password'
        label='Password'
        placeholder='********'
        register={register}
        error={errors.password && errors.password.message}
      />
      <FormInput
        name='passwordConfirmation'
        type='password'
        label='Confirm Password'
        placeholder='********'
        register={register}
        error={errors.password && errors.password.message}
      />
      <button className='m-t-10 btn-primary' type='submit'>SIGN UP</button>
      <div className='text-center'>
        <span className='footer-text danger-text'>{error}</span>
      </div>
    </form>
  )
}
