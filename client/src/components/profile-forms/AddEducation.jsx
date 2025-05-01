import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'
const AddEducation = ({ addEducation }) => {

    const navigate = useNavigate()

    const [formData, setFromData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData


    const onChange = (e) => setFromData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        addEducation(formData, navigate)
    }





    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={e => onChange(e)}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={e => onChange(e)}

                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" value={fieldofstudy}
                        onChange={e => onChange(e)} name="fieldofstudy" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" value={from}
                        onChange={e => onChange(e)} name="from" />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" checked={current} value={current} onChange={e => {
                            setFromData({ ...formData, current: !current })
                            toggleDisabled(toDateDisabled => !toDateDisabled)
                        }} name="current" /> Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" value={to}
                        onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} name="to" />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        value={description}
                        onChange={e => onChange(e)}
                        placeholder="Program Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" href="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(AddEducation)
