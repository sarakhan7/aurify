import React, { useState } from 'react';
import { useAuth } from '../App';
import { db } from '../utils/firestore';
import { doc, setDoc } from 'firebase/firestore';

const Upgrade = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('');

  const handleUpgrade = async () => {
    if (!user) {
      setStatus('Please log in to upgrade.');
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid), { plan: 'pro' }, { merge: true });
      setStatus('🎉 Upgrade successful! You are now Pro.');
    } catch (err) {
      setStatus('Error upgrading. Please try again.');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Upgrade to Pro</h2>
      <p>Unlock all premium features for free (demo mode).</p>
      <button className="btn btn-primary" onClick={handleUpgrade}>Upgrade Now</button>
      {status && <div style={{ marginTop: 16, color: '#a855f7' }}>{status}</div>}
    </div>
  );
};

export default Upgrade; 