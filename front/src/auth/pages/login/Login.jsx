import { useForm } from 'react-hook-form'
import { FormInput } from '../../../components/molecules/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { loginRequest } from '../../../services/auth'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required()
}).required()

export function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('submitting...', data)
    loginRequest(data)
      .then((response) => {
        console.log('response', response)
      })
      .catch((error) => {
        console.log('error', error)
      })
  })

  return (
    <section>
      <main>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <FormInput
            name='email'
            label='Email'
            placeholder='example@email.com'
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
          <button type='submit'>Submit</button>
        </form>
      </main>
    </section>
  )
}
