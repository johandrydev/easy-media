import { AuthTemplate } from '../../components/AuthTemplate'
import { FormRegister } from './FormRegister'

export function Register () {
  return (
    <AuthTemplate
      title="Sign Up"
      message="Already have an account?"
      link='Login'
      route='/auth/login'
    >
      <FormRegister />
    </AuthTemplate>
  )
}
