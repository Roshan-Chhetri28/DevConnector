import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { useParams, Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
    let param = useParams()
    useEffect(() => {
        getProfileById(param.id)
    }, [getProfileById, param.id])
    return (
        <>
            {
                profile === null || loading ?
                    <Spinner /> :
                    <>
                        <Link to='/profiles' className='btn btn-white'>
                            Go Back
                        </Link>

                        {

                            auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id &&
                            <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                        }
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2 " >
                                <h2 className="text-primary">Experience</h2>
                                {
                                    profile.experience.length>0?(profile.experience.map(experience=>{
                                        return <ProfileExperience key ={experience._id} experience={experience} />
                                    })):<h4>No Experience Credentials Provided</h4>
                                }
                            </div>
                            <div className="profile-edu bg-white p-2 " >
                                <h2 className="text-primary">Education</h2>
                                {
                                    profile.experience.length>0?(profile.education.map(education=>{
                                        return <ProfileEducation key ={education._id} education={education} />
                                    })):<h4>No Education Credentials Provided</h4>
                                }
                            </div>
                            {profile.githubusername&&(
                                <ProfileGithub username = {profile.githubusername}/>
                            )}
                        </div>
                    </>

            }

        </>
    )
}

Profile.propTypes = {
    getProfileBYId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile)
