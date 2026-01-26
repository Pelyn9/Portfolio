import { useState } from 'react'
import { supabase } from '../supabase'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) alert(error.message)
    else window.location.href = '/admin/dashboard'
  }

  const handleReset = async () => {
    if (!email) return alert('Enter your email first')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/admin',
    })
    if (error) alert(error.message)
    else alert('Password reset link sent to your email 📩')
  }

  const goBack = () => {
    window.location.href = '/' // landing page
  }

  return (
    <div className="login-container dark-mode">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p className="forgot" onClick={handleReset}>Forgot password?</p>
        <button type="button" className="back-btn" onClick={goBack}>
          ← Back to Landing Page
        </button>
      </form>
    </div>  
  )
}
