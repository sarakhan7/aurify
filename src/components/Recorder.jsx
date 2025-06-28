import React, { useState, useRef, useEffect } from 'react'

const Recorder = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [transcript, setTranscript] = useState('')
  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(prev => prev + finalTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        onRecordingComplete(blob, transcript)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setTranscript('')

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to record your speech.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="recorder-container">
      <div className="recorder-ui">
        {/* Waveform Placeholder */}
        <div className="waveform-container">
          <div className="waveform-placeholder">
            {isRecording ? (
              <div className="waveform-animation">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar"
                    style={{
                      height: `${Math.random() * 60 + 20}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="waveform-idle">
                <span style={{fontSize: '3rem', opacity: 0.3}}>🎤</span>
                <p style={{color: '#ccc', marginTop: '8px'}}>Click record to start</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Transcript Preview */}
        {isRecording && transcript && (
          <div className="live-transcript" style={{
            background: 'rgba(45, 27, 105, 0.3)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            margin: '1rem 0',
            maxHeight: '100px',
            overflowY: 'auto',
            fontSize: '0.875rem',
            color: '#e5e7eb'
          }}>
            <strong>Live Transcript:</strong> {transcript}
          </div>
        )}

        {/* Timer */}
        <div className="timer-display">
          <span className="timer-text" style={{
            fontSize: '2rem',
            fontFamily: 'monospace',
            color: isRecording ? '#a855f7' : '#fff',
            fontWeight: 'bold'
          }}>
            {formatTime(recordingTime)}
          </span>
        </div>

        {/* Record Button */}
        <button
          className={`record-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'disabled' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: 'none',
            background: isRecording 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
              : 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isRecording 
              ? '0 0 30px rgba(239, 68, 68, 0.5)' 
              : '0 0 20px rgba(168, 85, 247, 0.3)',
            opacity: isProcessing ? 0.6 : 1
          }}
        >
          {isRecording ? '⏹️' : '🎙️'}
        </button>

        {/* Status */}
        <div className="recording-status">
          {isRecording && (
            <div className="recording-indicator animate-pulse" style={{color: '#ef4444', fontWeight: 'bold'}}>
              ● RECORDING
            </div>
          )}
          {isProcessing && (
            <div className="processing-indicator animate-pulse" style={{color: '#a855f7', fontWeight: 'bold'}}>
              ⏳ Analyzing...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recorder 