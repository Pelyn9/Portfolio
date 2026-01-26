import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProjectForm from './pages/ProjectForm'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/new-project" element={<ProjectForm />} />
        <Route path="/admin/edit-project/:id" element={<ProjectForm />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
