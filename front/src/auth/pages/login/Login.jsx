import { AuthTemplate } from '../../components/AuthTemplate'
import { FormLogin } from './FormLogin'

export function Login () {
  return (
    <AuthTemplate
      title="Sign In"
      message="Don't have an account?"
      link='Sign up here'
      route='/auth/register'
    >
      <FormLogin />
    </AuthTemplate>
  )
}
