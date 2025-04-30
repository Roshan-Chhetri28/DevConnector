import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../actions/profile'
import Spinner from '../components/layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {

  useEffect(() => {
    getCurrentProfile()
  }, [])


  return (
    loading && profile === null ?
      <Spinner /> :
      <>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fa-solid fa-user'> Welcome {user && user.name}</i>
        </p>
        {
          profile !== null ?
            <>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div className='my-2'>
                <button onClick={() => deleteAccount()} className="btn btn-danger">
                  <i className="fa-solid fa-user-minus">Delete Account</i>
                </button>
              </div>
            </>
            :
            <>
              <p>You have not yet setup profile please set up first </p>
              <Link to='/create-profile' className='btn btn-primary'>
                create profile
              </Link>
            </>
        }
      </>
  )

}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapSateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapSateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
