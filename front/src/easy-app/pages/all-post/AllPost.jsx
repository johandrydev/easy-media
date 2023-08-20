import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FormInput } from '../../components/FormInput'
import { getPosts } from '../../../services/publications'
import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import emptyIcon from '../../../assets/empty_icon.png'
import { debounce } from '../../../services/request'
import PropTypes from 'prop-types'

const schema = yup.object({
  title: yup.string()
})
export function AllPost () {
  const [posts, setPosts] = useState([])
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      date: null
    }
  })

  const handlePost = debounce(async (data) => {
    if (data?.date) {
      data.date = data.date ? new Date(data.date).toISOString() : null
    }
    await getPosts(data)
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
          <button className='m-t-10 btn-primary' type='submit'>SEARCH</button>
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
            <SearchResult results={title} searchText={watch().title} />
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

function SearchResult ({ results, searchText }) {
  const [res, setRes] = useState([])

  useEffect(() => {
    if (results) {
      const res = results.split(new RegExp(`(${searchText})`, 'gi'))
      setRes(res)
    }
  }, [results, searchText])

  return (
    <>
      {res?.map((part, index) => (
        part.toLowerCase() === searchText.toLowerCase()
          ? (<span key={index} className="highlight">{part}</span>)
          : (<span key={index}>{part}</span>)
      ))}
    </>
  )
}
SearchResult.propTypes = {
  results: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired
}
