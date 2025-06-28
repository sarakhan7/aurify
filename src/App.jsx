import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from './utils/firebase'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Results from './pages/Results'
import Practice from './pages/Practice'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Simple test component
const TestPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f0b3f 0%, #000000 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{color: '#a855f7', marginBottom: '1rem', fontSize: '3rem'}}>🎉 Aurify is Working!</h1>
        <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '1.2rem'}}>The app is loading successfully!</p>
        <div style={{
          background: 'rgba(45, 27, 105, 0.3)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #7c3aed'
        }}>
          <p style={{color: '#fff', margin: '0.5rem 0'}}>✅ React is working</p>
          <p style={{color: '#fff', margin: '0.5rem 0'}}>✅ Firebase is initialized</p>
          <p style={{color: '#fff', margin: '0.5rem 0'}}>✅ Routing is set up</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const auth = getAuth(app)

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user')
        setUser(user)
        setLoading(false)
      }, (error) => {
        console.error('Auth error:', error)
        setError(error.message)
        setLoading(false)
      })

      return unsubscribe
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      setError(error.message)
      setLoading(false)
    }
  }, [])

  const authValue = {
    user,
    auth,
    setUser
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f0b3f 0%, #000000 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{color: '#ef4444', marginBottom: '1rem'}}>⚠️ Error Loading App</h1>
          <p style={{color: '#ccc', marginBottom: '1rem'}}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🔄 Reload App
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f0b3f 0%, #000000 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(168, 85, 247, 0.3)',
            borderTop: '4px solid #7c3aed',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{fontSize: '1.2rem'}}>Loading Aurify...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App 