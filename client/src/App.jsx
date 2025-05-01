import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './dashboard/Dashboard';


// @import Redux
import { Provider } from 'react-redux'
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <section className="container">
          <Alert />
          <Routes>


            {/* public route */}
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />


            {/* Private route */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/create-profile" element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            } />
            <Route path="/edit-profile" element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } />
            <Route path="/add-experience" element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            } />
            <Route path="/add-education" element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            } />

          </Routes>
        </section>
      </Router>
    </Provider>
  )
};

export default App;
