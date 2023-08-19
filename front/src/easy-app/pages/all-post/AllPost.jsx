import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FormInput } from '../../components/FormInput'
import { getPosts } from '../../../services/publications'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import emptyIcon from '../../../assets/empty_icon.png'

// validate date not in the future (yup)
const schema = yup.object({
  date: yup.date().notRequired().max(new Date(), 'Date not in the future'),
  title: yup.string().notRequired()
}).required()

export function AllPost () {
  const [posts, setPosts] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handlePost = async (data) => {
    await getPosts(data)
      .then(response => setPosts(response.data))
      .catch(error => console.log(error))
  }

  // give me the implementation of a debounce to search the data
  const onSubmit = handleSubmit(handlePost)

  useEffect(() => {
    handlePost()
  }, [])

  return (
    <section>
      <header className='easy-header'>
        <h1>All Publications</h1>
        <form className='easy-form' onSubmit={onSubmit}>
          <FormInput
            name='title'
            label='Words to Search?'
            placeholder='Title post'
            register={register}
            error={errors.title && errors.title.message}
          />
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
            title={title}
            content={message}
            date={date}
            name={user?.name}
          />
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
