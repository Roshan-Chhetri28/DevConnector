import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>

    <section className="components">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  </Router>
);

export default App;
