import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '../App'
import AuthButtons from '../components/AuthButtons'
import Navbar from '../components/Navbar'

const Auth = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [showEmail, setShowEmail] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGitHub = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, new GithubAuthProvider())
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApple = () => {
    setError('Apple login coming soon!')
  }

  const handleEmail = () => {
    setShowEmail(true)
    setError('')
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center" style={{minHeight: '80vh'}}>
        <div className="card" style={{maxWidth: 400, width: '100%'}}>
          <h2 className="gradient-text text-2xl font-bold text-center mb-0">Sign In to Aurify</h2>
          {error && <div className="text-center text-sm" style={{color: '#f87171', margin: '8px 0'}}>{error}</div>}
          {!showEmail ? (
            <AuthButtons 
              onGoogle={handleGoogle} 
              onGitHub={handleGitHub} 
              onApple={handleApple} 
              onEmail={handleEmail} 
            />
          ) : (
            <form className="flex flex-col gap-md mt-0" onSubmit={handleEmailAuth}>
              <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button className="btn btn-primary animate-glow" type="submit" disabled={loading}>{isSignup ? 'Sign Up' : 'Sign In'}</button>
              <button className="btn btn-ghost" type="button" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowEmail(false)}>Back</button>
            </form>
          )}
        </div>
      </main>
    </>
  )
}

export default Auth 