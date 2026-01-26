import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useParams } from 'react-router-dom'
import './ProjectForm.css'

export default function ProjectForm() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      supabase.from('projects').select('*').eq('id', id).single()
        .then(({ data }) => {
          if (data) {
            setTitle(data.title)
            setDescription(data.description)
            setLink(data.link)
          }
        })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let file_url = null
    if (file) {
      const { data, error } = await supabase.storage.from('projects').upload(`${Date.now()}_${file.name}`, file)
      if (error) return alert(error.message)
      file_url = supabase.storage.from('projects').getPublicUrl(data.path).publicUrl
    }

    if (id) {
      await supabase.from('projects').update({ title, description, link, file_url }).eq('id', id)
    } else {
      await supabase.from('projects').insert({ title, description, link, file_url })
    }

    setLoading(false)
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="project-form-container">
      <button className="back-btn" onClick={() => window.location.href = '/admin/dashboard'}>
        ← Back to Dashboard
      </button>

      <h2>{id ? 'Edit Project' : 'Add New Project'}</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Project Description" required />
        <input value={link} onChange={e => setLink(e.target.value)} placeholder="Live Link" />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">{loading ? 'Saving...' : 'Save Project'}</button>
      </form>
    </div>
  )
}
