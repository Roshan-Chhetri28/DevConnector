import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
const ProfileExperience = ({ experience: {
    company,
    title,
    location,
    from,
    to,
    description

} }) => {
    return (

        <div className=''>
            <h3 className="text-dark"> {company}</h3>
            <p>{moment(from).format("YYYY/MM/DD")} - {to ? moment(to).format("YYYY/MM/DD") : "Now"}</p>
            <p><strong>Position: </strong>{title}</p>

            {/* <p>
                <strong>Description: </strong>{description?{description}:<>No description provided</>}
            </p> */}

        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
