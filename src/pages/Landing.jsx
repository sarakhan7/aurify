import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="section flex flex-col items-center justify-center text-center" style={{minHeight: '70vh'}}>
          <h1 className="gradient-text text-5xl font-bold animate-fade-in" style={{marginBottom: '1.5rem'}}>Your AI Communication Coach</h1>
          <p className="text-xl font-medium mb-0 animate-fade-in" style={{color: '#ccc', marginBottom: '2.5rem'}}>Practice interviews, meetings, and public speaking. Get instant, AI-powered feedback.</p>
          <a href="/auth" className="btn btn-primary animate-glow" style={{fontSize: '1.25rem', padding: '1rem 2.5rem'}}>Try Aurify Today</a>
        </section>

        {/* About Section */}
        <section id="about" className="section container animate-fade-in" style={{textAlign: 'center', margin: '0 auto', maxWidth: 800, padding: '3rem 0 2rem 0'}}>
          <h2 className="text-3xl font-bold mb-0 gradient-text" style={{marginBottom: '1.2rem'}}>About Us</h2>
          <p className="text-lg mt-0" style={{color: '#ccc', marginBottom: '1.5rem', lineHeight: 1.7}}>
            <b>Aurify</b> is your personal AI-powered communication coach, designed to help you become a more confident, clear, and engaging speaker. Whether you're preparing for interviews, public speaking, or everyday conversations, Aurify uses advanced AI to analyze your speech, provide instant feedback, and track your progress over time.<br /><br />
            Our platform combines real-time speech recognition, natural language processing, and actionable insights to empower you to communicate your best self—anytime, anywhere.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem'}}>
            <div style={{minWidth: 180}}>
              <span style={{fontSize: '2.2rem'}}>🤖</span>
              <div style={{color: '#a855f7', fontWeight: 600, marginTop: 8}}>AI-Powered Feedback</div>
            </div>
            <div style={{minWidth: 180}}>
              <span style={{fontSize: '2.2rem'}}>🎤</span>
              <div style={{color: '#a855f7', fontWeight: 600, marginTop: 8}}>Speech Practice</div>
            </div>
            <div style={{minWidth: 180}}>
              <span style={{fontSize: '2.2rem'}}>📈</span>
              <div style={{color: '#a855f7', fontWeight: 600, marginTop: 8}}>Progress Tracking</div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section container animate-fade-in" style={{textAlign: 'center', margin: '0 auto', maxWidth: 800, padding: '2rem 0 2rem 0'}}>
          <h2 className="text-2xl font-semibold mb-0 gradient-text" style={{marginBottom: '1.2rem'}}>Our Mission</h2>
          <p className="text-base mt-0" style={{color: '#ccc', fontSize: '1.15rem', lineHeight: 1.7}}>
            <b>Empowering everyone to communicate with clarity and confidence, anywhere.</b><br /><br />
            We believe that great communication is a superpower. Our mission is to make world-class speaking and presentation skills accessible to all—regardless of background, experience, or resources. With Aurify, you can practice, improve, and shine in every conversation.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="section container animate-fade-in">
          <h2 className="text-2xl font-semibold mb-0 gradient-text">How Aurify Works</h2>
          <div className="grid grid-3 mt-0">
            <div className="card">
              <h3 className="text-xl font-bold mb-0">1. Record</h3>
              <p className="text-base mt-0">Choose a scenario and record your answer or speech.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-0">2. Analyze</h3>
              <p className="text-base mt-0">Aurify transcribes and analyzes your speech using AI (Whisper + GPT-4).</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-0">3. Feedback</h3>
              <p className="text-base mt-0">Get instant, actionable feedback and scores for clarity, confidence, and more.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section container animate-fade-in">
          <h2 className="text-2xl font-semibold mb-0 gradient-text">Features</h2>
          <div className="grid grid-4 mt-0">
            <div className="card">
              <h4 className="text-lg font-bold mb-0">🎙️ Recording</h4>
              <p className="text-base mt-0">Practice your speech or answer in any scenario.</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-0">📝 Whisper Transcription</h4>
              <p className="text-base mt-0">Accurate, fast speech-to-text powered by OpenAI Whisper.</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-0">🤖 GPT-4 Feedback</h4>
              <p className="text-base mt-0">Personalized, actionable feedback on your communication.</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-0">🎯 Scenario Mode</h4>
              <p className="text-base mt-0">Interview, standup, sales pitch, and custom practice modes.</p>
            </div>
          </div>
        </section>

        {/* Plugin Teaser Section */}
        <section className="section container animate-fade-in" style={{textAlign: 'center', margin: '0 auto', maxWidth: 700, padding: '2.5rem 0'}}>
          <h2 className="text-2xl font-semibold mb-0 gradient-text" style={{marginBottom: '1.2rem'}}>Coming Soon: Aurify Live Plugin</h2>
          <div className="card" style={{maxWidth: 480, margin: '0 auto', padding: '2rem 1.5rem', boxShadow: '0 4px 32px #a855f733'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 10}}>
              <span style={{fontSize: '2.2rem'}}>🧩</span>
              <span className="font-semibold text-lg" style={{fontSize: '1.25rem', color: '#a855f7'}}>Zoom & Chrome Plugin</span>
            </div>
            <p className="text-base mt-0" style={{color: '#ccc', marginBottom: 18}}>Real-time feedback overlay, emoji tone indicators, and plugin toolbar for live meetings.</p>
            <div className="glass" style={{padding: '1.2rem', borderRadius: 14, marginTop: 8, width: '100%', textAlign: 'center', background: 'rgba(45,27,105,0.18)', boxShadow: '0 2px 16px #a855f722'}}>
              <span className="animate-pulse" style={{fontSize: '1.3rem', color: '#ef4444', fontWeight: 600, marginBottom: 8, display: 'block'}}>🔴 Live Mode (Mock UI)</span>
              <div style={{display: 'flex', justifyContent: 'center', gap: 10, margin: '10px 0'}}>
                <span style={{fontSize: '1.3rem'}}>😊</span>
                <span style={{fontSize: '1.3rem'}}>😐</span>
                <span style={{fontSize: '1.3rem'}}>😮</span>
                <span style={{fontSize: '1.3rem'}}>🤔</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 10}}>
                <button className="btn btn-secondary btn-sm" style={{fontSize: '0.95rem', minWidth: 80}}>Mute</button>
                <button className="btn btn-secondary btn-sm" style={{fontSize: '0.95rem', minWidth: 80}}>End</button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* Removed the big contact us button as requested */}

      </main>
      {/* Footer */}
      <footer className="section text-center text-sm" style={{color: '#aaa', borderTop: '1px solid #2d1b69', marginTop: 32}}>
        <div>
          © 2025 Aurify &nbsp;|&nbsp; <a href="mailto:sara@aurify.app" style={{color: '#a855f7'}}>Contact Us</a> &nbsp;|&nbsp; 
          <Link to="/terms" style={{color: '#a855f7'}}>Terms</Link> &nbsp;|&nbsp; 
          <Link to="/privacy" style={{color: '#a855f7'}}>Privacy</Link>
        </div>
      </footer>
    </>
  )
}

export default Landing 