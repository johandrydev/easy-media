import { Link } from 'react-router-dom'
import logo from '../../assets/profileAuth.png'
import PropTypes from 'prop-types'

export function AuthTemplate ({ title, message, link, route, children }) {
  return (
    <section>
      <main>
        <img src={logo} alt='Easy Media' />
        <h1>Easy Media</h1>
        <h2 className='text-cian'>Now, share is easy</h2>
        <h3>{title}</h3>
        {children}
        <footer>
          <span className="text-gris footer-text">{message}</span><Link to={route} className="text-cian footer-text">{link}</Link>
        </footer>
      </main>
    </section>
  )
}
AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
  route: PropTypes.string
}
