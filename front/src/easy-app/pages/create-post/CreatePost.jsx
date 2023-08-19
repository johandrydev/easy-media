import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FormInput } from '../../components/FormInput'
import { Card } from '../../components/Card'
import { FormTextArea } from '../../components/FormTextArea'
import { useUserStore } from '../../../stores/user.store'
import { createPost } from '../../../services/publications'
import { errorAlert, successAlert } from '../../../services/sweetalert'

const schema = yup.object({
  title: yup.string().required(),
  message: yup.string().required()
}).required()

const initialValues = {
  title: '',
  message: ''
}
export function CreatePost () {
  const user = useUserStore(state => state.user)
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  })
  const { title, message } = watch()
  const handlePost = async (data) => {
    await createPost(data)
      .then(response => {
        successAlert({ text: response.message })
        setValue('title', '')
        setValue('message', '')
      })
      .catch(error => {
        console.log(error)
        errorAlert({ text: error.message })
      })
  }

  // give me the implementation of a debounce to search the data
  const onSubmit = handleSubmit(handlePost)

  return (
    <section className='easy-section'>
      <header className='easy-header'>
        <h1>Create message</h1>
        <form className='easy-form' onSubmit={onSubmit}>
          <FormInput
            name='title'
            type='text'
            label='Title message'
            placeholder='Your post title'
            register={register}
            error={errors.title && errors.title.message}
          />
          <FormTextArea
            name='message'
            type='text'
            label='Message'
            placeholder='Create a message to share with your friends'
            register={register}
            error={errors.title && errors.title.message}
          />
          <button className='m-t-10 btn-primary' type='submit'>SHARE</button>
        </form>
      </header>
      <main className='easy-main'>
        <Card
          title={title || 'Your post title'}
          content={message || 'Create a message to share with your friends'}
          date={new Date().toLocaleDateString()}
          name={user?.data?.user?.name}
        />
      </main>
    </section>
  )
}
