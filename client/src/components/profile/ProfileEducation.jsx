import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { connect } from 'react-redux'
const ProfileEducation = ({ education: {
    school,
    degree,
    to,
    from,
    fieldofstudy,
    description

} }) => {
    return (

        <div className=''>
            <h3 className="text-dark"> {school}</h3>
            <p>{moment(from).format("YYYY/MM/DD")} - {to ? moment(to).format("YYYY/MM/DD") : "Now"}</p>
            <p><strong>Position: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>
            <p>
                <strong>Description: </strong>{description ? { description } : <>No description provided</>}
            </p>

        </div>
    )
}

ProfileEducation.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileEducation
