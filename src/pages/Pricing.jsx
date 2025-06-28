import React, { useState } from 'react';
import { useAuth } from '../App';
import { db } from '../utils/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Get started with the basics. Perfect for casual practice and trying out Aurify.',
    features: [
      'Unlimited random practice questions',
      'Daily inspiration quotes',
      'Basic AI feedback',
      'Session history (last 7 days)',
      'Email support',
    ],
    cta: 'Current Plan',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9/mo',
    description: 'Level up your communication with advanced AI feedback and more practice options.',
    features: [
      'Everything in Free',
      'AI-generated interview questions',
      'Advanced AI feedback & analytics',
      'Unlimited session history',
      'Export transcripts',
      'Priority email support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$19/mo',
    description: 'Unlock the full power of Aurify. For professionals and teams who want the best.',
    features: [
      'Everything in Pro',
      'Team collaboration features',
      'Personalized coaching reports',
      'Early access to new features',
      '1-on-1 onboarding call',
      'VIP support',
    ],
    cta: 'Upgrade to Elite',
    highlight: false,
  },
];

const Pricing = () => {
  const { user, userPlan, setUserPlan } = useAuth();
  const [status, setStatus] = useState('');
  const [loadingPlan, setLoadingPlan] = useState('');
  const navigate = useNavigate();

  const handleUpgrade = async (planId) => {
    if (!user) {
      setStatus('Please log in to upgrade.');
      return;
    }
    setLoadingPlan(planId);
    try {
      await setDoc(doc(db, 'users', user.uid), { plan: planId }, { merge: true });
      setUserPlan(planId);
      setStatus(`🎉 You are now on the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`);
    } catch (err) {
      setStatus('Error upgrading. Please try again.');
    }
    setLoadingPlan('');
  };

  return (
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/dashboard')} className="btn btn-ghost" style={{ marginBottom: 24 }}>
        ← Back to Dashboard
      </button>
      <h1 className="gradient-text text-4xl font-bold text-center mb-0">Choose Your Aurify Plan</h1>
      <p className="text-lg text-center" style={{ color: '#ccc', marginBottom: '2.5rem' }}>
        Unlock your full communication potential. Upgrade anytime—no credit card required in demo mode.
      </p>
      <div className="pricing-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginBottom: '2.5rem',
        maxWidth: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`card pricing-card${plan.highlight ? ' pricing-card-popular' : ''}`}
            style={{
              border: plan.highlight ? '2.5px solid #a855f7' : '1.5px solid rgba(168,85,247,0.2)',
              boxShadow: plan.highlight ? '0 0 32px 0 #a855f7aa' : 'var(--shadow-lg)',
              transform: plan.highlight ? 'scale(1.04)' : 'none',
              zIndex: plan.highlight ? 2 : 1,
              position: 'relative',
              padding: '2.5rem 2rem 2rem 2rem',
              minHeight: 480,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {plan.highlight && (
              <div style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'linear-gradient(90deg,#a855f7 0%,#7c3aed 100%)',
                color: '#fff',
                borderRadius: 8,
                padding: '0.25rem 0.75rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: 1,
                boxShadow: '0 2px 8px #a855f7aa',
              }}>
                Most Popular
              </div>
            )}
            <h2 className="text-2xl font-bold gradient-text mb-0" style={{ marginBottom: 8 }}>{plan.name}</h2>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#a855f7', marginBottom: 8 }}>{plan.price}</div>
            <p className="text-base" style={{ color: '#ccc', marginBottom: 18 }}>{plan.description}</p>
            <ul style={{ textAlign: 'left', margin: '0 0 1.5rem 0', padding: 0, listStyle: 'none' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ color: '#a855f7', fontSize: '1.2rem', marginRight: 8 }}>✔️</span>
                  <span style={{ color: '#e5e7eb' }}>{feature}</span>
                </li>
              ))}
            </ul>
            {userPlan === plan.id ? (
              <button className="btn btn-primary" style={{ opacity: 0.7, cursor: 'not-allowed' }} disabled>
                {plan.cta} (Current)
              </button>
            ) : (
              <button
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                onClick={() => handleUpgrade(plan.id)}
                disabled={loadingPlan === plan.id}
              >
                {loadingPlan === plan.id ? 'Upgrading...' : plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="features-section card" style={{ maxWidth: 900, margin: '0 auto', marginTop: 32, padding: '2rem' }}>
        <h3 className="text-xl font-bold gradient-text mb-0" id="features">Features Comparison</h3>
        <ul style={{ margin: '1.5rem 0 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
          <li><b>Random Practice:</b> All plans</li>
          <li><b>AI Interview Generator:</b> Pro & Elite</li>
          <li><b>Advanced AI Feedback:</b> Pro & Elite</li>
          <li><b>Team Collaboration:</b> Elite only</li>
          <li><b>VIP Support:</b> Elite only</li>
        </ul>
      </div>
      {status && <div style={{ marginTop: 24, textAlign: 'center', color: '#a855f7', fontWeight: 600 }}>{status}</div>}
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Pricing; 