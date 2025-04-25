import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {
    email,
    password
  } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()

    const body = {

      email,
      password
    }
    try {
      const config = {
        headers: {
          'Content-Type': "application/json"
        }
      }

      const res = await axios.post('http://localhost:5000/api/auth', body, config)
      console.log(res.data)
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <section className="container">
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e => { onSubmit(e) }}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}

export default Login
