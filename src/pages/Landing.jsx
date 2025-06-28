import React from 'react'
import Navbar from '../components/Navbar'

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
        <section id="about" className="section container animate-fade-in">
          <h2 className="text-3xl font-bold mb-0 gradient-text">About Us</h2>
          <p className="text-lg mt-0" style={{color: '#ccc'}}>Aurify helps you become a more confident, clear, and engaging speaker—powered by the latest AI.</p>
        </section>

        {/* Mission Section */}
        <section className="section container animate-fade-in">
          <h2 className="text-2xl font-semibold mb-0 gradient-text">Our Mission</h2>
          <p className="text-base mt-0" style={{color: '#ccc'}}>Empowering everyone to communicate with clarity and confidence, anywhere.</p>
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
        <section className="section container animate-fade-in">
          <h2 className="text-2xl font-semibold mb-0 gradient-text">Coming Soon: Aurify Live Plugin</h2>
          <div className="card flex flex-col items-center justify-center" style={{maxWidth: 500, margin: '0 auto'}}>
            <div className="flex gap-md items-center mb-0">
              <span style={{fontSize: '2rem'}}>🧩</span>
              <span className="font-semibold text-lg">Zoom & Chrome Plugin</span>
            </div>
            <p className="text-base mt-0" style={{color: '#ccc'}}>Real-time feedback overlay, emoji tone indicators, and plugin toolbar for live meetings.</p>
            <div className="glass" style={{padding: '1rem', borderRadius: 12, marginTop: 8, width: '100%', textAlign: 'center'}}>
              <span className="animate-pulse" style={{fontSize: '1.5rem'}}>🔴 Live Mode (Mock UI)</span>
              <div className="flex gap-md justify-center mt-0" style={{marginTop: 8}}>
                <span style={{fontSize: '1.2rem'}}>😊</span>
                <span style={{fontSize: '1.2rem'}}>😐</span>
                <span style={{fontSize: '1.2rem'}}>😮</span>
                <span style={{fontSize: '1.2rem'}}>🤔</span>
              </div>
              <div className="flex gap-md justify-center mt-0" style={{marginTop: 8}}>
                <button className="btn btn-secondary btn-sm" style={{fontSize: '0.9rem'}}>Mute</button>
                <button className="btn btn-secondary btn-sm" style={{fontSize: '0.9rem'}}>End</button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section container animate-fade-in">
          <h2 className="text-2xl font-semibold mb-0 gradient-text">Contact Us</h2>
          <form className="card flex flex-col gap-md" style={{maxWidth: 500, margin: '0 auto'}}>
            <input className="input" type="text" placeholder="Your Name" required />
            <input className="input" type="email" placeholder="Your Email" required />
            <textarea className="input" placeholder="Your Message" rows={4} required></textarea>
            <button className="btn btn-primary animate-glow" type="submit">Send Message</button>
          </form>
          <div className="text-center text-sm mt-0" style={{color: '#aaa', marginTop: 16}}>
            Or email us: <a href="mailto:sara@aurify.app" style={{color: '#a855f7'}}>sara@aurify.app</a>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="section text-center text-sm" style={{color: '#aaa', borderTop: '1px solid #2d1b69', marginTop: 32}}>
        <div>© 2025 Aurify &nbsp;|&nbsp; <a href="mailto:sara@aurify.app" style={{color: '#a855f7'}}>sara@aurify.app</a> &nbsp;|&nbsp; <a href="#" style={{color: '#a855f7'}}>Terms</a> &nbsp;|&nbsp; <a href="#" style={{color: '#a855f7'}}>Privacy</a></div>
      </footer>
    </>
  )
}

export default Landing 