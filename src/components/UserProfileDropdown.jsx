import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { getUserProfile } from '../utils/firestore'

const UserProfileDropdown = () => {
  const { user, auth } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid)
          setUserProfile(profile)
        } catch (error) {
          console.error('Error loading profile:', error)
        }
      }
    }
    
    loadProfile()
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getDisplayName = () => {
    if (userProfile?.firstName) {
      return `${userProfile.firstName} ${userProfile.lastName || ''}`.trim()
    }
    return user?.displayName || user?.email?.split('@')[0] || 'User'
  }

  const getInitials = () => {
    const name = getDisplayName()
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700/30 transition-colors"
      >
        <div className="user-avatar" style={{
          width: 36, 
          height: 36, 
          borderRadius: '50%', 
          overflow: 'hidden', 
          border: '2px solid #7c3aed', 
          boxShadow: '0 0 8px #7c3aed'
        }}>
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={getDisplayName()} 
              style={{width: '100%', height: '100%', objectFit: 'cover'}} 
            />
          ) : (
            <div className="avatar-placeholder flex items-center justify-center" style={{
              width: '100%', 
              height: '100%', 
              background: '#2d1b69', 
              color: '#fff', 
              fontWeight: 700, 
              fontSize: '0.9rem'
            }}>
              {getInitials()}
            </div>
          )}
        </div>
        <span className="text-white text-sm font-medium hidden md:block">
          {getDisplayName()}
        </span>
        <svg 
          className={`w-4 h-4 text-purple-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-purple-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-purple-700/50 z-50">
          {/* User Info */}
          <div className="p-4 border-b border-purple-700/50">
            <div className="flex items-center gap-3">
              <div className="user-avatar" style={{
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                overflow: 'hidden', 
                border: '2px solid #7c3aed', 
                boxShadow: '0 0 8px #7c3aed'
              }}>
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={getDisplayName()} 
                    style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                  />
                ) : (
                  <div className="avatar-placeholder flex items-center justify-center" style={{
                    width: '100%', 
                    height: '100%', 
                    background: '#2d1b69', 
                    color: '#fff', 
                    fontWeight: 700, 
                    fontSize: '1.1rem'
                  }}>
                    {getInitials()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">
                  {getDisplayName()}
                </div>
                <div className="text-purple-300 text-sm truncate">
                  {user?.email}
                </div>
                {userProfile?.plan && (
                  <div className="text-xs text-purple-400 mt-1">
                    {userProfile.plan === 'pro' ? '⭐ Pro Plan' : 'Free Plan'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {userProfile?.stats && (
            <div className="p-4 border-b border-purple-700/50">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-400">
                    {userProfile.stats.totalSessions || 0}
                  </div>
                  <div className="text-xs text-purple-300">Sessions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400">
                    {userProfile.stats.averageScore || 0}%
                  </div>
                  <div className="text-xs text-purple-300">Avg Score</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400">
                    {userProfile.stats.streakDays || 0}
                  </div>
                  <div className="text-xs text-purple-300">Streak</div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-700/50 rounded-md transition-colors"
            >
              <span>👤</span>
              <span>Profile Settings</span>
            </Link>
            
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-700/50 rounded-md transition-colors"
            >
              <span>🎯</span>
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/results"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-700/50 rounded-md transition-colors"
            >
              <span>📊</span>
              <span>Results History</span>
            </Link>
            
            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-700/50 rounded-md transition-colors"
            >
              <span>⭐</span>
              <span>Upgrade Plan</span>
            </Link>
            
            <div className="border-t border-purple-700/50 my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-md transition-colors w-full text-left"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfileDropdown 