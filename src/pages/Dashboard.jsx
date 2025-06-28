import React, { useState, useEffect } from 'react'
import { useAuth } from '../App'
import Navbar from '../components/Navbar'
import ScenarioDropdown from '../components/ScenarioDropdown'
import Recorder from '../components/Recorder'
import ScoreMeter from '../components/ScoreMeter'
import FeedbackCard from '../components/FeedbackCard'
import LoadingOverlay from '../components/LoadingOverlay'
import { enhancedSpeechAnalysis, generateEnhancedFeedback, getDailyQuote } from '../utils/api'
import { savePracticeSession, getUserProfile, updateUserStats } from '../utils/firestore'

const Dashboard = () => {
  const { user } = useAuth()
  const [selectedScenario, setSelectedScenario] = useState('tech-interview')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState('')
  const [scores, setScores] = useState({})
  const [feedback, setFeedback] = useState('')
  const [transcript, setTranscript] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [dailyQuote, setDailyQuote] = useState(null)
  const [analysisDetails, setAnalysisDetails] = useState({})
  const [saveStatus, setSaveStatus] = useState('')
  const [userProfile, setUserProfile] = useState(null)

  // Load daily quote and user profile on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load daily quote
        const quote = await getDailyQuote()
        setDailyQuote(quote)
        
        // Load user profile
        if (user) {
          const profile = await getUserProfile(user.uid)
          setUserProfile(profile)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    
    loadData()
  }, [user])

  const handleRecordingComplete = async (audioBlob, transcriptText) => {
    setIsProcessing(true)
    setShowResults(false)
    
    try {
      // Step 1: Use the real transcript
      setTranscript(transcriptText || "No speech detected. Please try recording again.")
      
      // Step 2: Enhanced speech analysis with Hugging Face APIs
      setProcessingStep('Analyzing your communication with AI...')
      const analysis = await enhancedSpeechAnalysis(transcriptText)
      
      // Step 3: Generate enhanced feedback
      setProcessingStep('Generating personalized feedback...')
      const feedbackText = generateEnhancedFeedback(analysis, selectedScenario)
      
      setScores(analysis.scores)
      setFeedback(feedbackText)
      setAnalysisDetails({
        sentiment: analysis.sentiment,
        language: analysis.language,
        wordCount: analysis.wordCount,
        fillerCount: analysis.fillerCount
      })
      
      // Show results
      setShowResults(true)
    } catch (error) {
      console.error('Error processing recording:', error)
      alert('Error processing your recording. Please try again.')
    } finally {
      setIsProcessing(false)
      setProcessingStep('')
    }
  }

  const handleSaveToHistory = async () => {
    if (!user) {
      alert('Please log in to save your session.')
      return
    }

    setSaveStatus('saving')
    
    try {
      const sessionData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        scenario: selectedScenario,
        scores,
        feedback,
        transcript,
        analysisDetails,
        timestamp: new Date().toISOString()
      }
      
      await savePracticeSession(sessionData)
      
      // Update user stats
      if (userProfile) {
        const newStats = await updateUserStats(user.uid, {
          scores,
          duration: Math.round(transcript.split(' ').length / 150) // Estimate duration in minutes
        })
        setUserProfile(prev => prev ? { ...prev, stats: newStats } : null)
      }
      
      setSaveStatus('saved')
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      console.error('Error saving session:', error)
      setSaveStatus('error')
      alert('Failed to save session. Please try again.')
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return '💾 Saving...'
      case 'saved':
        return '✅ Saved!'
      case 'error':
        return '❌ Error'
      default:
        return '💾 Save to History'
    }
  }

  const getSaveButtonStyle = () => {
    switch (saveStatus) {
      case 'saving':
        return { opacity: 0.7, cursor: 'not-allowed' }
      case 'saved':
        return { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
      case 'error':
        return { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }
      default:
        return {}
    }
  }

  const formatTime = (minutes) => {
    if (!minutes) return '0 min'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <>
      <Navbar />
      {isProcessing && <LoadingOverlay message={processingStep} />}
      
      <main className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <div className="dashboard-header">
          <h1 className="text-3xl font-bold gradient-text mb-0">
            Welcome back, {userProfile?.firstName || user?.displayName || 'User'}!
          </h1>
          <p className="text-lg mt-0" style={{color: '#ccc'}}>Ready to practice your communication skills?</p>
        </div>

        {/* User Stats Section */}
        {userProfile?.stats && (
          <div className="stats-section card" style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}>
            <h3 className="text-lg font-bold gradient-text mb-4">📊 Your Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {userProfile.stats.totalSessions || 0}
                </div>
                <div className="text-sm text-purple-200">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {formatTime(userProfile.stats.totalPracticeTime || 0)}
                </div>
                <div className="text-sm text-purple-200">Practice Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {userProfile.stats.averageScore || 0}%
                </div>
                <div className="text-sm text-purple-200">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {userProfile.stats.streakDays || 0}
                </div>
                <div className="text-sm text-purple-200">Day Streak</div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Quote Section */}
        {dailyQuote && (
          <div className="quote-section card" style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}>
            <div style={{textAlign: 'center'}}>
              <h3 className="text-lg font-bold gradient-text mb-0">💭 Daily Inspiration</h3>
              <blockquote style={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: '#e5e7eb',
                margin: '1rem 0',
                lineHeight: '1.6'
              }}>
                "{dailyQuote.quote}"
              </blockquote>
              <cite style={{
                color: '#a855f7',
                fontWeight: '500'
              }}>
                — {dailyQuote.author}
              </cite>
            </div>
          </div>
        )}

        <div className="dashboard-content">
          {/* Scenario Selection */}
          <div className="scenario-section card" style={{marginBottom: '2rem'}}>
            <ScenarioDropdown 
              selectedScenario={selectedScenario}
              onScenarioChange={setSelectedScenario}
            />
          </div>

          {/* Recording Section */}
          <div className="recording-section card" style={{marginBottom: '2rem'}}>
            <h2 className="text-2xl font-bold gradient-text mb-0">Record Your Practice</h2>
            <p className="text-base mt-0" style={{color: '#ccc', marginBottom: '1.5rem'}}>
              Click the record button and start speaking. We'll analyze your communication using AI and provide personalized feedback.
            </p>
            
            <div className="recorder-wrapper" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px'
            }}>
              <Recorder 
                onRecordingComplete={handleRecordingComplete}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="results-section">
              <div className="results-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 className="text-2xl font-bold gradient-text mb-0">Your AI Analysis Results</h2>
                <button 
                  onClick={handleSaveToHistory}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.875rem',
                    ...getSaveButtonStyle()
                  }}
                  disabled={saveStatus === 'saving'}
                >
                  {getSaveButtonText()}
                </button>
              </div>

              {/* Analysis Details */}
              {analysisDetails.sentiment && (
                <div className="analysis-details card" style={{
                  marginBottom: '1.5rem',
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
                    <div>
                      <strong style={{color: '#a855f7'}}>Sentiment:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {analysisDetails.sentiment.label} ({Math.round(analysisDetails.sentiment.score * 100)}%)
                      </span>
                    </div>
                    <div>
                      <strong style={{color: '#a855f7'}}>Language:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {analysisDetails.language.label.toUpperCase()} ({Math.round(analysisDetails.language.score * 100)}%)
                      </span>
                    </div>
                    <div>
                      <strong style={{color: '#a855f7'}}>Word Count:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {analysisDetails.wordCount} words
                      </span>
                    </div>
                    <div>
                      <strong style={{color: '#a855f7'}}>Filler Words:</strong>
                      <span style={{color: '#e5e7eb', marginLeft: '0.5rem'}}>
                        {analysisDetails.fillerCount} detected
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="results-grid" style={{
                display: 'grid',
                gap: '2rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
              }}>
                {/* Scores */}
                <div className="scores-section">
                  <ScoreMeter scores={scores} />
                </div>

                {/* Feedback */}
                <div className="feedback-section">
                  <FeedbackCard feedback={feedback} transcript={transcript} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Dashboard 