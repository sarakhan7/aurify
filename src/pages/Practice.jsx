import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../App'
import Navbar from '../components/Navbar'
import Recorder from '../components/Recorder'
import ScoreMeter from '../components/ScoreMeter'
import FeedbackCard from '../components/FeedbackCard'
import LoadingOverlay from '../components/LoadingOverlay'
import InterviewGenerator from '../components/InterviewGenerator'
import { enhancedSpeechAnalysis, generateEnhancedFeedback, getDailyQuote } from '../utils/api'
import { savePracticeSession } from '../utils/firestore'

const Practice = () => {
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [isQuestionVisible, setIsQuestionVisible] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [scores, setScores] = useState({})
  const [feedback, setFeedback] = useState('')
  const [transcript, setTranscript] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [streak, setStreak] = useState(0)
  const [dailyQuote, setDailyQuote] = useState(null)
  const [analysisDetails, setAnalysisDetails] = useState({})
  const [saveStatus, setSaveStatus] = useState('')
  const [showInterviewGenerator, setShowInterviewGenerator] = useState(false)
  const [customQuestions, setCustomQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const countdownRef = useRef(null)

  // Load daily quote on component mount
  useEffect(() => {
    const loadDailyQuote = async () => {
      try {
        const quote = await getDailyQuote()
        setDailyQuote(quote)
      } catch (error) {
        console.error('Error loading daily quote:', error)
      }
    }
    
    loadDailyQuote()
  }, [])

  const mockQuestions = {
    'tech-interview': [
      "Tell me about a challenging project you worked on.",
      "How do you handle working with difficult team members?",
      "What's your approach to learning new technologies?",
      "Describe a time when you had to debug a complex issue.",
      "How do you stay updated with industry trends?",
      "What's your experience with agile development?",
      "How do you prioritize tasks when everything seems urgent?",
      "Tell me about a time you had to explain technical concepts to non-technical people."
    ],
    'standup': [
      "What did you accomplish yesterday?",
      "What are you working on today?",
      "Are there any blockers preventing your progress?",
      "How can the team help you move forward?",
      "What's your biggest challenge this week?",
      "What's one thing you learned recently?",
      "How are you feeling about the current sprint?",
      "What's your plan for the upcoming milestone?"
    ],
    'sales-pitch': [
      "What problem does your product solve?",
      "How does your solution compare to competitors?",
      "What's your unique value proposition?",
      "How do you handle customer objections?",
      "What's your pricing strategy?",
      "How do you measure success with clients?",
      "What's your follow-up process?",
      "How do you build trust with prospects?"
    ],
    'public-speaking': [
      "What's the main message you want your audience to remember?",
      "How do you engage with your audience during presentations?",
      "What's your strategy for handling nervousness?",
      "How do you structure your presentations for maximum impact?",
      "What techniques do you use to maintain audience attention?",
      "How do you handle difficult questions from the audience?",
      "What's your approach to storytelling in presentations?",
      "How do you adapt your speaking style for different audiences?"
    ]
  }

  const getRandomQuestion = () => {
    const allQuestions = Object.values(mockQuestions).flat()
    return allQuestions[Math.floor(Math.random() * allQuestions.length)]
  }

  const getQuoteBasedQuestion = () => {
    if (dailyQuote) {
      return `Reflect on this quote: "${dailyQuote.quote}" - ${dailyQuote.author}. How does this relate to your personal or professional life?`
    }
    return getRandomQuestion()
  }

  const getCustomQuestion = () => {
    if (customQuestions.length > 0) {
      return customQuestions[currentQuestionIndex]
    }
    return getRandomQuestion()
  }

  const handleQuestionsGenerated = (questions) => {
    setCustomQuestions(questions)
    setCurrentQuestionIndex(0)
    setShowInterviewGenerator(false)
    setCurrentQuestion(questions[0] || getRandomQuestion())
    setIsQuestionVisible(true)
    setCountdown(30)
    setIsCountdownActive(true)
    setShowResults(false)
    setScores({})
    setFeedback('')
    setTranscript('')
    setAnalysisDetails({})
    setSaveStatus('')
  }

  const startNewPractice = () => {
    if (customQuestions.length > 0) {
      // Use custom questions if available
      setCurrentQuestion(getCustomQuestion())
    } else {
      setCurrentQuestion(getQuoteBasedQuestion())
    }
    setIsQuestionVisible(true)
    setCountdown(30) // 30 seconds to prepare
    setIsCountdownActive(true)
    setShowResults(false)
    setScores({})
    setFeedback('')
    setTranscript('')
    setAnalysisDetails({})
    setSaveStatus('')
  }

  const nextCustomQuestion = () => {
    if (currentQuestionIndex < customQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setCurrentQuestion(customQuestions[currentQuestionIndex + 1])
      setIsQuestionVisible(true)
      setCountdown(30)
      setIsCountdownActive(true)
      setShowResults(false)
      setScores({})
      setFeedback('')
      setTranscript('')
      setAnalysisDetails({})
      setSaveStatus('')
    }
  }

  const startRecording = () => {
    setIsCountdownActive(false)
    setIsRecording(true)
    setCountdown(0)
  }

  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (isCountdownActive && countdown === 0) {
      setIsCountdownActive(false)
      startRecording()
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current)
      }
    }
  }, [isCountdownActive, countdown])

  const handleRecordingComplete = async (audioBlob, transcriptText) => {
    setIsProcessing(true)
    setShowResults(false)
    
    try {
      // Use the real transcript
      setTranscript(transcriptText || "No speech detected. Please try recording again.")
      
      // Enhanced speech analysis with Hugging Face APIs
      const analysis = await enhancedSpeechAnalysis(transcriptText)
      
      // Generate enhanced feedback
      const feedbackText = generateEnhancedFeedback(analysis, 'practice')
      
      setScores(analysis.scores)
      setFeedback(feedbackText)
      setAnalysisDetails({
        sentiment: analysis.sentiment,
        language: analysis.language,
        wordCount: analysis.wordCount,
        fillerCount: analysis.fillerCount
      })
      
      setShowResults(true)
      setStreak(prev => prev + 1)
    } catch (error) {
      console.error('Error processing recording:', error)
      alert('Error processing your recording. Please try again.')
    } finally {
      setIsProcessing(false)
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
        scenario: 'practice',
        question: currentQuestion,
        scores,
        feedback,
        transcript,
        analysisDetails,
        timestamp: new Date().toISOString()
      }
      
      await savePracticeSession(sessionData)
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
        return '💾 Save Session'
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <Navbar />
      {isProcessing && <LoadingOverlay message="Analyzing your practice session with AI..." />}
      
      <main className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <div className="practice-header">
          <h1 className="text-3xl font-bold gradient-text mb-0">Practice Mode</h1>
          <p className="text-lg mt-0" style={{color: '#ccc'}}>Challenge yourself with random questions, daily inspiration, or AI-generated interview questions</p>
          
          {/* Streak Counter */}
          <div className="streak-counter" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            padding: '0.5rem 1rem',
            marginTop: '1rem'
          }}>
            <span style={{color: '#a855f7', fontWeight: 'bold'}}>🔥 Streak: {streak} sessions</span>
          </div>
        </div>

        {/* Daily Quote Section */}
        {dailyQuote && (
          <div className="quote-section card" style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}>
            <div style={{textAlign: 'center'}}>
              <h3 className="text-lg font-bold gradient-text mb-0">💭 Today's Inspiration</h3>
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

        <div className="practice-content">
          {/* Practice Options */}
          {!isQuestionVisible && !isRecording && !showResults && (
            <div className="practice-options" style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              marginBottom: '2rem'
            }}>
              {/* Random Practice */}
              <div className="practice-option card text-center" style={{
                background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                padding: '2rem'
              }}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎯</div>
                <h3 className="text-xl font-bold gradient-text mb-0">Random Practice</h3>
                <p className="text-base mt-0" style={{color: '#ccc', marginBottom: '1.5rem'}}>
                  Get random questions or reflect on today's quote. Perfect for general practice.
                </p>
                <button 
                  onClick={startNewPractice}
                  className="btn btn-primary"
                  style={{fontSize: '1rem', padding: '0.75rem 1.5rem'}}
                >
                  🚀 Start Random Practice
                </button>
              </div>

              {/* AI Interview Generator */}
              <div className="practice-option card text-center" style={{
                background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                padding: '2rem'
              }}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🤖</div>
                <h3 className="text-xl font-bold gradient-text mb-0">AI Interview Questions</h3>
                <p className="text-base mt-0" style={{color: '#ccc', marginBottom: '1.5rem'}}>
                  Generate personalized interview questions based on job descriptions and your background.
                </p>
                <button 
                  onClick={() => setShowInterviewGenerator(true)}
                  className="btn btn-secondary"
                  style={{fontSize: '1rem', padding: '0.75rem 1.5rem'}}
                >
                  🤖 Generate Questions
                </button>
              </div>
            </div>
          )}

          {/* Custom Questions Progress */}
          {customQuestions.length > 0 && isQuestionVisible && (
            <div className="custom-questions-progress card" style={{
              marginBottom: '2rem',
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 className="text-lg font-bold gradient-text mb-0">AI-Generated Questions</h4>
                  <p className="text-sm mt-0" style={{color: '#ccc'}}>
                    Question {currentQuestionIndex + 1} of {customQuestions.length}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  {customQuestions.map((_, index) => (
                    <div 
                      key={index}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: index <= currentQuestionIndex ? '#a855f7' : 'rgba(168, 85, 247, 0.3)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Interview Generator Modal */}
          {showInterviewGenerator && (
            <div className="interview-modal-overlay">
              <div className="interview-generator-modal">
                <InterviewGenerator 
                  onQuestionsGenerated={handleQuestionsGenerated}
                  onClose={() => setShowInterviewGenerator(false)}
                />
              </div>
            </div>
          )}

          {/* Question Display */}
          {isQuestionVisible && currentQuestion && (
            <div className="question-section card" style={{marginBottom: '2rem'}}>
              <h3 className="text-xl font-bold gradient-text mb-0">Your Practice Question</h3>
              <div className="question-content" style={{
                background: 'rgba(45, 27, 105, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '1rem',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#e5e7eb'
              }}>
                {currentQuestion}
              </div>
            </div>
          )}

          {/* Countdown Timer */}
          {isCountdownActive && (
            <div className="countdown-section card text-center" style={{marginBottom: '2rem'}}>
              <h3 className="text-lg font-bold mb-0">Prepare Your Response</h3>
              <div className="countdown-timer" style={{
                fontSize: '3rem',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                color: countdown <= 10 ? '#ef4444' : '#a855f7',
                margin: '1rem 0'
              }}>
                {formatTime(countdown)}
              </div>
              <p className="text-base" style={{color: '#ccc'}}>
                {countdown <= 10 ? 'Time to start recording!' : 'Think about your response...'}
              </p>
            </div>
          )}

          {/* Recording Section */}
          {isRecording && (
            <div className="recording-section card" style={{marginBottom: '2rem'}}>
              <h3 className="text-lg font-bold mb-0 gradient-text">Record Your Response</h3>
              <p className="text-base mt-0" style={{color: '#ccc', marginBottom: '1.5rem'}}>
                Click record and answer the question above
              </p>
              
              <div className="recorder-wrapper" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '250px'
              }}>
                <Recorder 
                  onRecordingComplete={handleRecordingComplete}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          )}

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
                <div style={{display: 'flex', gap: '1rem'}}>
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
                  
                  {customQuestions.length > 0 && currentQuestionIndex < customQuestions.length - 1 ? (
                    <button 
                      onClick={nextCustomQuestion}
                      className="btn btn-primary"
                      style={{fontSize: '0.875rem'}}
                    >
                      ➡️ Next Question
                    </button>
                  ) : (
                    <button 
                      onClick={startNewPractice}
                      className="btn btn-primary"
                      style={{fontSize: '0.875rem'}}
                    >
                      🔄 Practice Again
                    </button>
                  )}
                </div>
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

export default Practice 