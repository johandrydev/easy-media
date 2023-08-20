import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FormInput } from '../../components/FormInput'
import { getOwnPosts } from '../../../services/publications'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import emptyIcon from '../../../assets/empty_icon.png'
import { debounce } from '../../../services/request'

const schema = yup.object({
  date: yup.date().notRequired().max(new Date(), 'Date not in the future')
}).required()

export function MyPost () {
  const [posts, setPosts] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handlePost = debounce(async (data) => {
    if (data?.date) {
      data.date = data.date ? new Date(data.date).toISOString() : null
    }
    await getOwnPosts(data)
      .then(response => setPosts(response.data))
      .catch(error => console.log(error))
  })

  // give me the implementation of a debounce to search the data
  const onSubmit = handleSubmit(handlePost)

  useEffect(() => {
    handlePost()
  }, [])

  return (
    <section className='easy-section'>
      <header className='easy-header'>
        <h1>My Publications</h1>
        <form className='easy-form' onChange={onSubmit}>
          <FormInput
            name='date'
            type='date'
            label='Date Select'
            placeholder='Select a date'
            register={register}
            error={errors.date && errors.date.message}
          />
        </form>
      </header>
      <main className='easy-main'>
        {posts.map(({ _id, title, message, date, user }) => (
          <Card
            key={_id}
            content={message}
            date={date}
            name={user?.name}
          >
            {title}
          </Card>
        ))}
        {posts.length === 0 && (
          <div className='easy-empty'>
            <img src={emptyIcon} alt='empty' />
            <p>Nothing to see here</p>
          </div>
        )}
      </main>
    </section>
  )
}
