import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// @import Redux
import { Provider } from 'react-redux'
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <section className="components">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </Router>
  </Provider>
);

export default App;
