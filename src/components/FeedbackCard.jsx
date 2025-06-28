import React from 'react'

const FeedbackCard = ({ feedback, transcript }) => {
  return (
    <div className="feedback-container">
      {/* GPT Feedback */}
      <div className="feedback-section">
        <h3 className="text-xl font-bold mb-0 gradient-text">AI Feedback</h3>
        <div className="feedback-content card">
          <div className="feedback-header">
            <span style={{fontSize: '1.5rem', marginRight: '8px'}}>🤖</span>
            <span className="font-semibold">GPT-4 Analysis</span>
          </div>
          <div className="feedback-text" style={{
            lineHeight: '1.6',
            color: '#e5e7eb',
            marginTop: '12px'
          }}>
            {feedback || "Your feedback will appear here after recording and analysis."}
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="transcript-section">
        <h3 className="text-xl font-bold mb-0 gradient-text">Transcript</h3>
        <div className="transcript-content card">
          <div className="transcript-header">
            <span style={{fontSize: '1.5rem', marginRight: '8px'}}>📝</span>
            <span className="font-semibold">Whisper Transcription</span>
          </div>
          <textarea 
            className="transcript-textarea"
            value={transcript || "Your transcript will appear here after recording."}
            readOnly
            style={{
              width: '100%',
              minHeight: '120px',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '12px',
              color: '#e5e7eb',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              resize: 'vertical',
              marginTop: '12px'
            }}
          />
        </div>
      </div>

      {/* Action Items */}
      {feedback && (
        <div className="action-items-section">
          <h3 className="text-lg font-bold mb-0 gradient-text">Key Takeaways</h3>
          <div className="action-items card">
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: '#e5e7eb'
              }}>
                <span style={{color: '#10b981', marginRight: '8px'}}>✅</span>
                Practice speaking at a slower pace
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: '#e5e7eb'
              }}>
                <span style={{color: '#10b981', marginRight: '8px'}}>✅</span>
                Reduce filler words like "um" and "uh"
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: '#e5e7eb'
              }}>
                <span style={{color: '#10b981', marginRight: '8px'}}>✅</span>
                Structure your response with clear points
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackCard 