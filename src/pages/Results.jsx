import React, { useState, useEffect } from 'react'
import { useAuth } from '../App'
import Navbar from '../components/Navbar'
import ScoreMeter from '../components/ScoreMeter'
import FeedbackCard from '../components/FeedbackCard'
import { getUserSessions, deleteSession } from '../utils/firestore'

const Results = () => {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState('')

  // Load user sessions from Firestore
  useEffect(() => {
    const loadSessions = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const userSessions = await getUserSessions(user.uid)
        setSessions(userSessions)
      } catch (error) {
        console.error('Error loading sessions:', error)
        setError('Failed to load your practice history. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [user])

  const handleDeleteSession = async (sessionId) => {
    if (!confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      return
    }

    setDeleteStatus('deleting')
    
    try {
      await deleteSession(sessionId)
      setSessions(prev => prev.filter(session => session.id !== sessionId))
      if (selectedSession?.id === sessionId) {
        setSelectedSession(null)
      }
      setDeleteStatus('deleted')
      
      // Reset status after 2 seconds
      setTimeout(() => setDeleteStatus(''), 2000)
    } catch (error) {
      console.error('Error deleting session:', error)
      setDeleteStatus('error')
      alert('Failed to delete session. Please try again.')
      
      // Reset status after 2 seconds
      setTimeout(() => setDeleteStatus(''), 2000)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScenarioName = (scenarioId) => {
    const scenarios = {
      'tech-interview': 'Tech Interview',
      'standup': 'Standup Meeting',
      'sales-pitch': 'Sales Pitch',
      'public-speaking': 'Public Speaking',
      'practice': 'Practice Session',
      'custom': 'Custom Scenario'
    }
    return scenarios[scenarioId] || scenarioId
  }

  const getAverageScore = (scores) => {
    if (!scores) return 0
    const values = Object.values(scores)
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getSessionDuration = (session) => {
    // Estimate duration based on word count (150 words per minute)
    const wordCount = session.analysisDetails?.wordCount || session.transcript?.split(' ').length || 0
    const minutes = Math.round(wordCount / 150)
    const seconds = Math.round((wordCount / 150 - minutes) * 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container" style={{paddingTop: '2rem'}}>
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Loading your practice history...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container" style={{paddingTop: '2rem'}}>
          <div className="text-center">
            <div style={{color: '#ef4444', fontSize: '3rem', marginBottom: '1rem'}}>⚠️</div>
            <h2 className="text-xl font-bold mb-0">Error Loading History</h2>
            <p style={{color: '#ccc', marginTop: '0.5rem'}}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{marginTop: '1rem'}}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <div className="results-header">
          <h1 className="text-3xl font-bold gradient-text mb-0">Your Practice History</h1>
          <p className="text-lg mt-0" style={{color: '#ccc'}}>Review your past sessions and track your progress</p>
        </div>

        {selectedSession ? (
          <div className="session-detail">
            <div className="session-detail-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div>
                <h2 className="text-2xl font-bold gradient-text mb-0">
                  {getScenarioName(selectedSession.scenario)}
                </h2>
                <p className="text-base mt-0" style={{color: '#ccc'}}>
                  {formatDate(selectedSession.timestamp || selectedSession.createdAt)} • Duration: {getSessionDuration(selectedSession)}
                </p>
                {selectedSession.question && (
                  <p className="text-sm mt-0" style={{color: '#a855f7', fontStyle: 'italic'}}>
                    Question: "{selectedSession.question}"
                  </p>
                )}
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  onClick={() => handleDeleteSession(selectedSession.id)}
                  className="btn btn-ghost"
                  style={{color: '#ef4444'}}
                  disabled={deleteStatus === 'deleting'}
                >
                  {deleteStatus === 'deleting' ? '🗑️ Deleting...' : '🗑️ Delete'}
                </button>
                <button 
                  onClick={() => setSelectedSession(null)}
                  className="btn btn-ghost"
                >
                  ← Back to List
                </button>
              </div>
            </div>

            <div className="session-detail-content" style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
            }}>
              <ScoreMeter scores={selectedSession.scores} />
              <FeedbackCard 
                feedback={selectedSession.feedback} 
                transcript={selectedSession.transcript} 
              />
            </div>

            {/* Analysis Details */}
            {selectedSession.analysisDetails && (
              <div className="analysis-details card" style={{
                marginTop: '2rem',
                background: 'rgba(45, 27, 105, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}>
                <h3 className="text-lg font-bold gradient-text mb-0">🔍 AI Analysis Details</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  {selectedSession.analysisDetails.sentiment && (
                    <div>
                      <strong style={{color: '#a855f7'}}>Sentiment:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {selectedSession.analysisDetails.sentiment.label} ({Math.round(selectedSession.analysisDetails.sentiment.score * 100)}%)
                      </span>
                    </div>
                  )}
                  {selectedSession.analysisDetails.language && (
                    <div>
                      <strong style={{color: '#a855f7'}}>Language:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {selectedSession.analysisDetails.language.label.toUpperCase()} ({Math.round(selectedSession.analysisDetails.language.score * 100)}%)
                      </span>
                    </div>
                  )}
                  {selectedSession.analysisDetails.wordCount && (
                    <div>
                      <strong style={{color: '#a855f7'}}>Word Count:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {selectedSession.analysisDetails.wordCount} words
                      </span>
                    </div>
                  )}
                  {selectedSession.analysisDetails.fillerCount !== undefined && (
                    <div>
                      <strong style={{color: '#a855f7'}}>Filler Words:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {selectedSession.analysisDetails.fillerCount} detected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="sessions-list">
            {sessions.length === 0 ? (
              <div className="empty-state card text-center">
                <span style={{fontSize: '4rem', opacity: 0.3}}>📊</span>
                <h3 className="text-xl font-bold mt-0">No practice sessions yet</h3>
                <p style={{color: '#ccc'}}>Start practicing to see your results here!</p>
                <a href="/dashboard" className="btn btn-primary" style={{marginTop: '1rem'}}>
                  🎙️ Start Practicing
                </a>
              </div>
            ) : (
              <div className="sessions-grid">
                {sessions.map(session => (
                  <div 
                    key={session.id} 
                    className="session-card card hover-lift"
                    onClick={() => setSelectedSession(session)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="session-card-header" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 className="text-lg font-bold mb-0">{getScenarioName(session.scenario)}</h3>
                        <p className="text-sm mt-0" style={{color: '#ccc'}}>
                          {formatDate(session.timestamp || session.createdAt)}
                        </p>
                        {session.question && (
                          <p className="text-xs mt-0" style={{color: '#a855f7', fontStyle: 'italic'}}>
                            "{session.question.substring(0, 50)}..."
                          </p>
                        )}
                      </div>
                      <div className="session-duration" style={{
                        background: 'rgba(168, 85, 247, 0.2)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        color: '#a855f7'
                      }}>
                        {getSessionDuration(session)}
                      </div>
                    </div>

                    <div className="session-scores" style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      {session.scores && Object.entries(session.scores).map(([key, score]) => (
                        <div key={key} className="score-preview" style={{textAlign: 'center'}}>
                          <div className="score-value" style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: getScoreColor(score)
                          }}>
                            {score}
                          </div>
                          <div className="score-label" style={{
                            fontSize: '0.75rem',
                            color: '#ccc',
                            textTransform: 'capitalize'
                          }}>
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="session-summary" style={{
                      fontSize: '0.875rem',
                      color: '#ccc',
                      lineHeight: '1.4'
                    }}>
                      {session.feedback ? 
                        session.feedback.substring(0, 100) + '...' : 
                        'No feedback available'
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default Results 