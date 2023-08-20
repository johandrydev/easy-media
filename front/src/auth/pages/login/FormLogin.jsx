import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { loginRequest } from '../../../services/auth'
import { useUserStore } from '../../../stores/user.store'
import { FormInput } from '../../components/FormInput'
import { errorAlert } from '../../../services/sweetalert'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8, 'Password must have at least 8 characters')
}).required()

export function FormLogin () {
  const setUser = useUserStore((state) => state.setUser)
  const [error, setError] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    loginRequest(data)
      .then(setUser)
      .catch((error) => {
        setError(error.message)
        errorAlert({ text: error.message })
      })
  })

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        name='email'
        label='Email'
        placeholder='example@email.com'
        autocomplete="off"
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
      <button className='m-t-10 btn-primary' type='submit'>SIGN IN</button>
      <div className='text-center'>
        <span className='footer-text danger-text'>{error}</span>
      </div>
    </form>
  )
}
