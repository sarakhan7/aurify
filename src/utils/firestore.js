// Firestore Utilities for Aurify
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, doc, deleteDoc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
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

// User Profile Management
export const createUserProfile = async (userId, userData) => {
  try {
    const profileData = {
      uid: userId,
      email: userData.email || '',
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      plan: 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Profile fields
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      bio: '',
      location: '',
      occupation: '',
      company: '',
      experience: 'beginner', // beginner, intermediate, advanced
      goals: [],
      preferences: {
        notifications: true,
        emailUpdates: true,
        practiceReminders: true,
        weeklyReports: true
      },
      stats: {
        totalSessions: 0,
        totalPracticeTime: 0,
        averageScore: 0,
        streakDays: 0,
        lastPracticeDate: null
      }
    }

    await setDoc(doc(db, 'users', userId), profileData)
    console.log('User profile created:', userId)
    return profileData
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw new Error('Failed to create user profile')
  }
}

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return userDoc.data()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw new Error('Failed to fetch user profile')
  }
}

export const updateUserProfile = async (userId, updates) => {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await updateDoc(doc(db, 'users', userId), updateData)
    console.log('User profile updated:', userId)
    return true
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw new Error('Failed to update user profile')
  }
}

export const updateUserStats = async (userId, sessionData) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    const currentProfile = userDoc.data()
    const currentStats = currentProfile.stats || {}
    
    // Calculate new stats
    const newStats = {
      totalSessions: (currentStats.totalSessions || 0) + 1,
      totalPracticeTime: (currentStats.totalPracticeTime || 0) + (sessionData.duration || 0),
      averageScore: calculateNewAverage(currentStats.averageScore, currentStats.totalSessions, sessionData.scores),
      streakDays: calculateStreak(currentStats.lastPracticeDate),
      lastPracticeDate: new Date().toISOString()
    }

    await updateDoc(doc(db, 'users', userId), {
      stats: newStats,
      updatedAt: new Date().toISOString()
    })

    return newStats
  } catch (error) {
    console.error('Error updating user stats:', error)
    throw new Error('Failed to update user stats')
  }
}

const calculateNewAverage = (currentAvg, totalSessions, newScores) => {
  if (!newScores) return currentAvg || 0
  
  const newScore = (newScores.clarity + newScores.confidence + newScores.engagement + newScores.structure) / 4
  const currentTotal = (currentAvg || 0) * totalSessions
  const newTotal = currentTotal + newScore
  
  return Math.round(newTotal / (totalSessions + 1))
}

const calculateStreak = (lastPracticeDate) => {
  if (!lastPracticeDate) return 1
  
  const lastDate = new Date(lastPracticeDate)
  const today = new Date()
  const diffTime = Math.abs(today - lastDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  // If last practice was yesterday, increment streak
  if (diffDays === 1) {
    return 1 // This will be added to existing streak
  } else if (diffDays === 0) {
    return 0 // Same day, don't increment
  } else {
    return 1 // Reset streak
  }
} 