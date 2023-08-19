import { NavLink, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/user.store'
import logo from '../../assets/logo-black 1.png'

export function Navbar () {
  const setLogout = useUserStore((state) => state.setLogout)
  const navigate = useNavigate()

  const onLogout = () => {
    setLogout()
    navigate('/auth/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-items">
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`}
              to="/all-posts"
            >
              All Publications
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`}
              to="/my-posts"
            >
              My Publications
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`}
              to="/create-post"
            >
              Create Publication
            </NavLink>
          </div>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            <button
              className="nav-item nav-link lgout-btn"
              onClick={onLogout}
            >
              Logout
              <img className='nav-img' src={logo} alt="Easy Media" />
            </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}
