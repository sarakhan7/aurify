// Firestore Utilities for Aurify
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { app } from './firebase'

export const db = getFirestore(app)

// Save a practice session to Firestore
export const savePracticeSession = async (sessionData) => {
  try {
    const docRef = await addDoc(collection(db, 'practice_sessions'), {
      ...sessionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    console.log('Session saved with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving session:', error)
    throw new Error('Failed to save practice session')
  }
}

// Get all practice sessions for a user
export const getUserSessions = async (userId) => {
  try {
    const sessionsQuery = query(
      collection(db, 'practice_sessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(sessionsQuery)
    const sessions = []
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    return sessions
  } catch (error) {
    console.error('Error fetching sessions:', error)
    throw new Error('Failed to fetch practice sessions')
  }
}

// Get a specific practice session by ID
export const getSessionById = async (sessionId) => {
  try {
    const sessionQuery = query(
      collection(db, 'practice_sessions'),
      where('__name__', '==', sessionId)
    )
    
    const querySnapshot = await getDocs(sessionQuery)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data()
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching session:', error)
    throw new Error('Failed to fetch session')
  }
}

// Delete a practice session
export const deleteSession = async (sessionId) => {
  try {
    await deleteDoc(doc(db, 'practice_sessions', sessionId))
    console.log('Session deleted:', sessionId)
  } catch (error) {
    console.error('Error deleting session:', error)
    throw new Error('Failed to delete session')
  }
}

// Get user statistics
export const getUserStats = async (userId) => {
  try {
    const sessions = await getUserSessions(userId)
    
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        averageScores: { clarity: 0, confidence: 0, engagement: 0, structure: 0 },
        totalPracticeTime: 0,
        favoriteScenario: null,
        improvementTrend: 'neutral'
      }
    }
    
    // Calculate total sessions
    const totalSessions = sessions.length
    
    // Calculate average scores
    const totalScores = sessions.reduce((acc, session) => {
      if (session.scores) {
        acc.clarity += session.scores.clarity || 0
        acc.confidence += session.scores.confidence || 0
        acc.engagement += session.scores.engagement || 0
        acc.structure += session.scores.structure || 0
      }
      return acc
    }, { clarity: 0, confidence: 0, engagement: 0, structure: 0 })
    
    const averageScores = {
      clarity: Math.round(totalScores.clarity / totalSessions),
      confidence: Math.round(totalScores.confidence / totalSessions),
      engagement: Math.round(totalScores.engagement / totalSessions),
      structure: Math.round(totalScores.structure / totalSessions)
    }
    
    // Calculate total practice time (estimate based on word count)
    const totalPracticeTime = sessions.reduce((acc, session) => {
      const wordCount = session.wordCount || 0
      // Estimate: 150 words per minute
      return acc + Math.round(wordCount / 150)
    }, 0)
    
    // Find favorite scenario
    const scenarioCounts = sessions.reduce((acc, session) => {
      const scenario = session.scenario || 'unknown'
      acc[scenario] = (acc[scenario] || 0) + 1
      return acc
    }, {})
    
    const favoriteScenario = Object.keys(scenarioCounts).reduce((a, b) => 
      scenarioCounts[a] > scenarioCounts[b] ? a : b
    )
    
    // Calculate improvement trend (compare recent vs older sessions)
    const recentSessions = sessions.slice(0, Math.min(5, sessions.length))
    const olderSessions = sessions.slice(-Math.min(5, sessions.length))
    
    const recentAvg = recentSessions.reduce((acc, session) => {
      if (session.scores) {
        return acc + (session.scores.clarity + session.scores.confidence + 
                     session.scores.engagement + session.scores.structure) / 4
      }
      return acc
    }, 0) / recentSessions.length
    
    const olderAvg = olderSessions.reduce((acc, session) => {
      if (session.scores) {
        return acc + (session.scores.clarity + session.scores.confidence + 
                     session.scores.engagement + session.scores.structure) / 4
      }
      return acc
    }, 0) / olderSessions.length
    
    let improvementTrend = 'neutral'
    if (recentAvg > olderAvg + 5) improvementTrend = 'improving'
    else if (recentAvg < olderAvg - 5) improvementTrend = 'declining'
    
    return {
      totalSessions,
      averageScores,
      totalPracticeTime,
      favoriteScenario,
      improvementTrend
    }
  } catch (error) {
    console.error('Error calculating user stats:', error)
    throw new Error('Failed to calculate user statistics')
  }
}

// Update session with additional data
export const updateSession = async (sessionId, updates) => {
  try {
    // Note: Firestore doesn't have a direct update method for documents without knowing the path
    // This would require restructuring or using a different approach
    console.log('Update session:', sessionId, updates)
    // For now, we'll just log the update
    // TODO: Implement proper update functionality
  } catch (error) {
    console.error('Error updating session:', error)
    throw new Error('Failed to update session')
  }
} 