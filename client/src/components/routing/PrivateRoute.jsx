import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const PrivateRoute = ({ auth: { isAuthenticated, loading }, children }) => {
  if (!isAuthenticated && !loading) {
    // redirect to /login if not logged in
    return <Navigate to="/login" replace />;
  }
  // otherwise render whatever children were passed
  return children;
};



PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
