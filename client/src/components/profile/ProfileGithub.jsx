import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'
const ProfileGithub = ({ username, getGithubRepos, repos = [
  {
    _id: 1,
    name: 'a'
  },
  {
    _id: 2,
    name: 'a'
  },
  {
    _id: 3,
    name: 'a'
  },
] }) => {
  // useEffect(()=>{
  //     getGithubRepos(username)
  // }, [getGithubRepos, username])

  return (
    <div className="profile-github">

      <h2 className="text-primary my-1">Github Repos</h2>

      {
        repos ===null?<Spinner/>:
        repos.map(repo => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <h4>
              {repo.name}
              {console.log(repo.name, repo._id)}
            </h4>
          </div>
        ))

      }
    </div>

  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
  repos: state.profile.repos
})
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
