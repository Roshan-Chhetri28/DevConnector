import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth"
const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">Post
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fa-solid fa-user"></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fa-solid fa-right-from-bracket"></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers
        </Link>
      </li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'
        ><i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <>
          {isAuthenticated ? authLinks : guestLinks}
        </>)}
    </nav>
  )
}


NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logout })(NavBar)
