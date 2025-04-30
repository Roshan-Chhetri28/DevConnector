import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { deleteExperience } from '../actions/profile'

const Experience = ({ experience, deleteExperience }) => {
    
    const experiences = (experience||[]).map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>{moment(exp.from).format("YYYY/MM/DD")} - {exp.to ? moment(exp.to).format("YYYY/MM/DD") : "Now"}</td>
            <td>
                <button onClick={() => {
                    
                    deleteExperience(exp._id)
                }} className="btn btn-danger">Delete</button>
                {console.log(experience)}
            </td>
        </tr>

    ))


    return (
        <>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}
Experience.defaultProps = {
    experience: [],
  };
export default connect(null, { deleteExperience })(Experience)