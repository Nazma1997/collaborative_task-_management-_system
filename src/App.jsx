import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import './App.css'
import Navbar from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import AllTasks from './components/tasks/AllTasks';
import CreateTasks from './components/tasks/CreateTask';
import Teams from './components/teams/Teams';
import Dashboard from './components/teams/Dashboard';
import Profile from './components/Profile';
// import Teams from './components/teams/Teams';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/create-tasks" element={<CreateTasks />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task-dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
