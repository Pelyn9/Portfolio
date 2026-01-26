import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [school, setSchool] = useState('')
  const [skills, setSkills] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setName(data.name)
        setAbout(data.about)
        setSchool(data.school)
        setSkills(data.skills)
        setAvatar(data.avatar_url)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setLoading(true)

    let avatar_url = avatar
    if (avatar instanceof File) {
      const { data, error } = await supabase.storage.from('avatars').upload(`${Date.now()}_${avatar.name}`, avatar)
      if (error) return alert(error.message)
      avatar_url = supabase.storage.from('avatars').getPublicUrl(data.path).publicUrl
    }

    await supabase.from('profiles').upsert({ id: user.id, name, about, school, skills, avatar_url })
    setLoading(false)
    alert('Profile updated!')
  }

  if (!user) return <p className="loading">Loading...</p>

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => window.location.href = '/admin/dashboard'}>
        ← Back to Dashboard
      </button>

      <h2>Edit Profile</h2>
      <div className="profile-form">
        <div className="avatar-section">
          {avatar && <img src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)} alt="Avatar" />}
          <input type="file" onChange={e => setAvatar(e.target.files[0])} />
        </div>

        <div className="fields-section">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="About Me" />
          <input value={school} onChange={e => setSchool(e.target.value)} placeholder="School" />
          <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  )
}
