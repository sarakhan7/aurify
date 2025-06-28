import React from 'react'

const AuthButtons = ({ onGoogle, onGitHub, onApple, onEmail }) => (
  <div className="flex flex-col gap-md">
    <button className="btn btn-primary animate-glow" onClick={onGoogle} type="button">
      <span style={{marginRight: 8}}>🔗</span> Continue with Google
    </button>
    <button className="btn btn-primary animate-glow" onClick={onGitHub} type="button">
      <span style={{marginRight: 8}}>🐙</span> Continue with GitHub
    </button>
    <button className="btn btn-primary animate-glow" onClick={onApple} type="button">
      <span style={{marginRight: 8}}></span> Continue with Apple
    </button>
    <button className="btn btn-secondary" onClick={onEmail} type="button">
      <span style={{marginRight: 8}}>✉️</span> Continue with Email
    </button>
  </div>
)

export default AuthButtons 