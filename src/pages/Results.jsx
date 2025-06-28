import React from 'react'
import Navbar from '../components/Navbar'

const Results = () => (
  <>
    <Navbar />
    <main className="flex flex-col items-center justify-center" style={{minHeight: '80vh'}}>
      <h1 className="gradient-text text-3xl font-bold">Results</h1>
      <p className="text-lg" style={{color: '#ccc'}}>This is a placeholder for the Results page.</p>
    </main>
  </>
)

export default Results 