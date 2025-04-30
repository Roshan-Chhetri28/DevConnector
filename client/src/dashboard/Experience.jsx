import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>{moment(exp.from).format("YYYY/MM/DD")} - {exp.to ? moment(exp.to).format("YYYY/MM/DD") : "Now"}</td>
            <td>
                <button className="btn btn-danger">Delete</button>
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
}

export default Experience
