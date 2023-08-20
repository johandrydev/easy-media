import PropTypes from 'prop-types'

export function Card ({ content, date, name, children }) {
  return (
    <article>
      <header>{children}</header>
      <p>{content}</p>
      <footer className='easy-card-footer'>
        <span className='date-card'>{date}</span>
        <span className='name-card'>{name}</span>
      </footer>
    </article>
  )
}
Card.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node
}
