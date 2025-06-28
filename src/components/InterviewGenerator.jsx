import React, { useState } from 'react'
import { generateInterviewQuestions } from '../utils/api'

const InterviewGenerator = ({ onQuestionsGenerated, onClose }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [role, setRole] = useState('software-engineer')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleGenerateQuestions = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const questions = await generateInterviewQuestions(jobDescription, resume, role)
      onQuestionsGenerated(questions)
    } catch (error) {
      console.error('Error generating questions:', error)
      setError('Failed to generate questions. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const roleOptions = [
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'designer', label: 'Designer' },
    { value: 'general', label: 'General' }
  ]

  return (
    <div className="interview-generator card" style={{
      background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 26, 26, 0.9) 100%)',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div className="generator-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 className="text-2xl font-bold gradient-text mb-0">🤖 AI Interview Question Generator</h2>
        <button 
          onClick={onClose}
          className="btn btn-ghost"
          style={{fontSize: '1.5rem'}}
        >
          ✕
        </button>
      </div>

      <div className="generator-content">
        <p className="text-base mb-0" style={{color: '#ccc', marginBottom: '2rem'}}>
          Enter the job description and your background to get personalized interview questions tailored to your specific role.
        </p>

        {/* Role Selection */}
        <div className="form-group" style={{marginBottom: '1.5rem'}}>
          <label className="form-label" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#e5e7eb'
          }}>
            Role Type *
          </label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
              fontSize: '1rem'
            }}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Description */}
        <div className="form-group" style={{marginBottom: '1.5rem'}}>
          <label className="form-label" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#e5e7eb'
          }}>
            Job Description *
          </label>
          <textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here... Include requirements, responsibilities, and company information."
            className="form-textarea"
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Resume/Background */}
        <div className="form-group" style={{marginBottom: '2rem'}}>
          <label className="form-label" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#e5e7eb'
          }}>
            Your Background (Optional)
          </label>
          <textarea 
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Briefly describe your experience, skills, and background. This helps generate more relevant questions."
            className="form-textarea"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message" style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#fca5a5'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Generate Button */}
        <div className="generator-actions" style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button 
            onClick={handleGenerateQuestions}
            disabled={isGenerating || !jobDescription.trim()}
            className="btn btn-primary"
            style={{
              fontSize: '1.1rem',
              padding: '1rem 2rem',
              opacity: isGenerating || !jobDescription.trim() ? 0.6 : 1,
              cursor: isGenerating || !jobDescription.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? (
              <>
                <span className="loading-spinner" style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                Generating Questions...
              </>
            ) : (
              '🤖 Generate Questions'
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="btn btn-secondary"
            style={{fontSize: '1.1rem', padding: '1rem 2rem'}}
          >
            Cancel
          </button>
        </div>

        {/* Info Box */}
        <div className="info-box" style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1.5rem',
          fontSize: '0.875rem',
          color: '#c4b5fd'
        }}>
          <strong>💡 Tip:</strong> The more detailed your job description, the better the AI can generate relevant questions. Include specific technologies, responsibilities, and company culture details.
        </div>
      </div>
    </div>
  )
}

export default InterviewGenerator 