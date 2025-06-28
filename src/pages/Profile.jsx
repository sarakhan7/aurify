import React, { useState, useEffect } from 'react'
import { useAuth } from '../App'
import { getUserProfile, updateUserProfile } from '../utils/firestore'
import Navbar from '../components/Navbar'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    occupation: '',
    company: '',
    experience: 'beginner',
    goals: []
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: true,
    practiceReminders: true,
    weeklyReports: true
  })

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    if (!user) return
    try {
      setLoading(true)
      const userProfile = await getUserProfile(user.uid)
      if (userProfile) {
        setProfile(userProfile)
        setFormData({
          firstName: userProfile.firstName || '',
          lastName: userProfile.lastName || '',
          bio: userProfile.bio || '',
          location: userProfile.location || '',
          occupation: userProfile.occupation || '',
          company: userProfile.company || '',
          experience: userProfile.experience || 'beginner',
          goals: userProfile.goals || []
        })
        setPreferences(userProfile.preferences || {
          notifications: true,
          emailUpdates: true,
          practiceReminders: true,
          weeklyReports: true
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      setMessage('Error loading profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return
    try {
      setSaving(true)
      setMessage('')
      await updateUserProfile(user.uid, {
        ...formData,
        preferences
      })
      setMessage('✅ Profile updated successfully!')
      await loadProfile() // Reload to get updated data
    } catch (error) {
      console.error('Error saving profile:', error)
      let msg = '❌ Error saving profile.'
      if (error && error.code && error.code.includes('permission')) {
        msg += ' (Check your Firestore security rules: user may not have write access to their profile document.)'
      } else if (error && error.message) {
        msg += ' ' + error.message
      }
      setMessage(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addGoal = () => {
    const newGoal = prompt('Enter a new goal:')
    if (newGoal && newGoal.trim()) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }))
    }
  }

  const removeGoal = (index) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }))
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  const formatTime = (minutes) => {
    if (!minutes) return '0 min'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="card p-8 text-center">
            <div className="loading-spinner mb-4"></div>
            <p className="text-lg text-white">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Profile</h1>
            <p className="text-purple-200 mb-4">Manage your account and preferences</p>
            {/* Tabs */}
            <div className="flex justify-center mb-4 gap-2">
              {[
                { id: 'profile', label: '👤 Profile' },
                { id: 'stats', label: '📊 Statistics' },
                { id: 'settings', label: '⚙️ Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'} text-base`}
                  style={{ minWidth: 120 }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-center ${
                message.includes('✅')
                  ? 'bg-green-500/20 border border-green-500 text-green-300'
                  : 'bg-red-500/20 border border-red-500 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input w-full"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input w-full"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="input w-full"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
                {/* Professional Info */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Professional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="input w-full"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Occupation</label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="input w-full"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="input w-full"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-1">Experience Level</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="input w-full"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Goals Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Communication Goals</h3>
                  <button
                    onClick={addGoal}
                    className="btn btn-secondary"
                  >
                    + Add Goal
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.goals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                      <span className="text-white">{goal}</span>
                      <button
                        onClick={() => removeGoal(index)}
                        className="btn btn-ghost text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {formData.goals.length === 0 && (
                    <p className="text-purple-300 text-center py-4">No goals set yet. Add your first goal!</p>
                  )}
                </div>
              </div>
              {/* Save Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="btn btn-primary px-8 py-3 text-lg"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="card p-6 mb-8">
              {profile?.stats ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-purple-900/30 rounded-lg p-6 text-center border border-purple-700/50">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {profile.stats.totalSessions || 0}
                    </div>
                    <div className="text-purple-200">Total Sessions</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-6 text-center border border-purple-700/50">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {formatTime(profile.stats.totalPracticeTime || 0)}
                    </div>
                    <div className="text-purple-200">Practice Time</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-6 text-center border border-purple-700/50">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {profile.stats.averageScore || 0}%
                    </div>
                    <div className="text-purple-200">Average Score</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-6 text-center border border-purple-700/50">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {profile.stats.streakDays || 0}
                    </div>
                    <div className="text-purple-200">Day Streak</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Statistics Yet</h3>
                  <p className="text-purple-200">Start practicing to see your progress!</p>
                </div>
              )}
              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/50">
                  <div className="text-purple-200">
                    <p><strong>Last Practice:</strong> {formatDate(profile?.stats?.lastPracticeDate)}</p>
                    <p><strong>Member Since:</strong> {formatDate(profile?.createdAt)}</p>
                    <p><strong>Plan:</strong> <span className="capitalize">{profile?.plan || 'free'}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="card p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
                    <div>
                      <div className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-purple-300 text-sm">
                        {key === 'notifications' && 'Receive browser notifications'}
                        {key === 'emailUpdates' && 'Get email updates about your progress'}
                        {key === 'practiceReminders' && 'Daily practice reminders'}
                        {key === 'weeklyReports' && 'Weekly progress reports'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-purple-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
                    </label>
                  </div>
                ))}
              </div>
              {/* Save Settings */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="btn btn-primary px-8 py-3 text-lg"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 