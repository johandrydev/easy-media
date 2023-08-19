import PropTypes from 'prop-types'

export function Card ({ title, content, date, name }) {
  return (
    <article>
      <header>{title}</header>
      <p>{content}</p>
      <footer className='easy-card-footer'>
        <span className='date-card'>{date}</span>
        <span className='name-card'>{name}</span>
      </footer>
    </article>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
