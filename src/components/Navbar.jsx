import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'

const Navbar = () => {
  const { user, auth } = useAuth()

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav
      className="flex items-center"
      style={{
        background: 'var(--midnight-purple)',
        boxShadow: 'var(--glow)',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        minHeight: 64,
      }}
    >
      <div className="container flex items-center gap-lg h-16">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-2xl gradient-text"
          style={{
            marginRight: 'var(--spacing-xl)',
            letterSpacing: '0.04em',
            textShadow: '0 0 8px var(--glow-purple)',
            fontFamily: 'inherit',
            transition: 'text-shadow 0.2s',
          }}
        >
          Aurify
        </Link>
        {/* Nav Links */}
        {user && (
          <>
            <Link to="/dashboard" className="text-base font-medium text-off-white" style={{marginRight: 'var(--spacing-lg)'}}>Dashboard</Link>
            <Link to="/results" className="text-base font-medium text-off-white" style={{marginRight: 'var(--spacing-lg)'}}>Results</Link>
            <Link to="/practice" className="text-base font-medium text-off-white" style={{marginRight: 'var(--spacing-lg)'}}>Practice</Link>
            <Link to="/pricing" className="btn btn-secondary animate-glow" style={{marginRight: 'var(--spacing-lg)'}}>Upgrade</Link>
            <Link to="/profile" style={{marginRight: 'var(--spacing-lg)'}}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--glow-purple)',
                    boxShadow: '0 0 8px var(--glow-purple)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'var(--accent-purple)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: '2px solid var(--glow-purple)',
                    boxShadow: '0 0 8px var(--glow-purple)',
                  }}
                >
                  {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-secondary animate-glow"
              style={{marginRight: 0}}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar 