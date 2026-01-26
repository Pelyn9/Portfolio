import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import './Admin.css'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return (window.location.href = '/admin')
      setUser(user)

      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      setProjects(projectsData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin'
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
  }

  if (loading) return <p className="loading">Loading...</p>

  return (
    <div className="admin-container dark-mode">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="email">Logged in as: {user.email}</p>
        <div className="header-buttons">
          <button className="back-btn" onClick={() => window.location.href = '/'}>
            ← Back to Home
          </button>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="projects-section">
        <div className="section-header">
          <h2>Projects</h2>
          <button className="add-btn" onClick={() => window.location.href = '/admin/new-project'}>
            + Add New Project
          </button>
        </div>

        <div className="projects-grid">
          {projects.map(p => (
            <div className="project-card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-actions">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="live-btn">
                  View Live
                </a>
                <button onClick={() => window.location.href = `/admin/edit-project/${p.id}`} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteProject(p.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>Profile</h2>
        <button className="edit-profile-btn" onClick={() => window.location.href = '/admin/profile'}>
          Edit Profile
        </button>
      </section>
    </div>
  )
}
