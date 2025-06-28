import React from 'react'

const ScoreMeter = ({ scores }) => {
  const { clarity = 0, confidence = 0, engagement = 0, structure = 0 } = scores

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981' // Green
    if (score >= 60) return '#f59e0b' // Yellow
    return '#ef4444' // Red
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Work'
  }

  const metrics = [
    { key: 'clarity', label: 'Clarity', score: clarity, icon: '💬' },
    { key: 'confidence', label: 'Confidence', score: confidence, icon: '💪' },
    { key: 'engagement', label: 'Engagement', score: engagement, icon: '🎯' },
    { key: 'structure', label: 'Structure', score: structure, icon: '📋' }
  ]

  return (
    <div className="score-meter-container">
      <h3 className="text-xl font-bold mb-0 gradient-text">Your Scores</h3>
      <div className="score-grid">
        {metrics.map(metric => (
          <div key={metric.key} className="score-item">
            <div className="score-header">
              <span className="score-icon" style={{fontSize: '1.5rem'}}>{metric.icon}</span>
              <span className="score-label font-semibold">{metric.label}</span>
            </div>
            <div className="score-value" style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: getScoreColor(metric.score)
            }}>
              {metric.score}/100
            </div>
            <div className="score-meter">
              <div className="meter-background" style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div className="meter-fill" style={{
                  width: `${metric.score}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${getScoreColor(metric.score)} 0%, ${getScoreColor(metric.score)}80 100%)`,
                  borderRadius: '4px',
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>
            <div className="score-label-text" style={{
              fontSize: '0.875rem',
              color: getScoreColor(metric.score),
              fontWeight: '500',
              marginTop: '4px'
            }}>
              {getScoreLabel(metric.score)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreMeter 