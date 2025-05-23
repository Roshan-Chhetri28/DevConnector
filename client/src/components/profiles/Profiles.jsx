import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './profileItem'
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <>
            {loading ?
                <Spinner /> :
                <>
                   <h1 className="large text-primary">Developers</h1>
                   <p className="lead">
                    <i className="fa fa-connectdevelop">{'  '}Browse and connect with developers</i>
                   </p>
                   <div className="profiles">
                    {
                        profiles.length>0?profiles.map(profile=>(
                            <ProfileItem key={profile._id} profile={profile}/>
                        )):<h4>No profiles found</h4>
                    }
                   </div>
                </>
            
        }
        </>

    )
}
Profiles.prototype = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
