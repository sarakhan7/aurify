import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const { user, auth } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="navbar" style={{background: 'rgba(31,11,63,0.85)', borderBottom: '1px solid #2d1b69', position: 'sticky', top: 0, zIndex: 100}}>
      <div className="container flex justify-between items-center" style={{height: '64px'}}>
        <Link to="/" className="navbar-logo gradient-text font-bold text-xl" style={{fontSize: '2rem', letterSpacing: '0.05em'}}>Aurify</Link>
        <div className="navbar-links flex gap-md items-center">
          {!user && (
            <>
              <a href="#about" className="nav-link text-base font-medium">About</a>
              <a href="#features" className="nav-link text-base font-medium">Features</a>
              <a href="#contact" className="nav-link text-base font-medium">Contact</a>
              <Link to="/auth" className="btn btn-primary animate-glow">Login</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="nav-link text-base font-medium">Dashboard</Link>
              <Link to="/results" className="nav-link text-base font-medium">Results</Link>
              <Link to="/practice" className="nav-link text-base font-medium">Practice</Link>
              <div className="user-menu flex items-center gap-sm">
                <div className="user-avatar" style={{width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #7c3aed', boxShadow: '0 0 8px #7c3aed'}}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div className="avatar-placeholder flex items-center justify-center" style={{width: '100%', height: '100%', background: '#2d1b69', color: '#fff', fontWeight: 700, fontSize: '1.1rem'}}>
                      {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="btn btn-ghost text-sm" style={{marginLeft: 8}}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 