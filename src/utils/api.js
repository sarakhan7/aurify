// API Utilities for Aurify
// Free APIs: Hugging Face Inference API and Quotes API

// Hugging Face Inference API - Free tier: 30,000 requests/month
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models'

// Quotes API - Free tier: Unlimited requests
const QUOTES_API_URL = 'https://quotes.rest/qod'

// Hugging Face API Key - Get from environment variable or use fallback
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY || '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'

// Generate personalized interview questions using AI
export const generateInterviewQuestions = async (jobDescription, resume, role) => {
  try {
    // Create a prompt for generating interview questions
    const prompt = `Generate 5 specific interview questions for a ${role} position based on this job description and candidate background:

Job Description:
${jobDescription}

Candidate Background:
${resume}

Generate 5 relevant interview questions that would help assess the candidate's fit for this specific role. Focus on technical skills, experience, and behavioral scenarios. Format as a numbered list.`

    const response = await fetch(`${HUGGING_FACE_API_URL}/gpt2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          do_sample: true
        }
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate questions')
    }

    const result = await response.json()
    
    // Parse the generated text to extract questions
    const generatedText = result[0]?.generated_text || ''
    const questions = parseGeneratedQuestions(generatedText, role)
    
    return questions
  } catch (error) {
    console.error('Error generating interview questions:', error)
    // Fallback to template-based questions
    return generateFallbackQuestions(role, jobDescription)
  }
}

// Parse generated text to extract numbered questions
const parseGeneratedQuestions = (text, role) => {
  try {
    // Split by numbers and extract questions
    const lines = text.split('\n').filter(line => line.trim())
    const questions = []
    
    for (const line of lines) {
      // Look for numbered questions (1., 2., etc.)
      const match = line.match(/^\d+\.\s*(.+)/)
      if (match && match[1].trim().length > 10) {
        questions.push(match[1].trim())
      }
    }
    
    // If we found questions, return them
    if (questions.length > 0) {
      return questions.slice(0, 5) // Return max 5 questions
    }
    
    // Fallback: split by sentences and take first 5
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20)
    return sentences.slice(0, 5).map(s => s.trim())
  } catch (error) {
    console.error('Error parsing generated questions:', error)
    return generateFallbackQuestions(role, '')
  }
}

// Generate fallback questions based on role and job description
const generateFallbackQuestions = (role, jobDescription) => {
  const roleQuestions = {
    'software-engineer': [
      "Tell me about a challenging technical problem you solved recently.",
      "How do you approach debugging complex issues in production?",
      "Describe a time when you had to learn a new technology quickly.",
      "How do you handle code reviews and feedback from team members?",
      "What's your experience with testing and quality assurance?"
    ],
    'data-scientist': [
      "Walk me through a data analysis project you worked on.",
      "How do you handle missing or inconsistent data?",
      "Describe a time when you had to explain complex findings to non-technical stakeholders.",
      "What's your experience with machine learning models?",
      "How do you stay updated with the latest data science trends?"
    ],
    'product-manager': [
      "Tell me about a product you managed from conception to launch.",
      "How do you prioritize features when resources are limited?",
      "Describe a time when you had to make a difficult product decision.",
      "How do you gather and analyze user feedback?",
      "What's your approach to working with engineering and design teams?"
    ],
    'sales': [
      "Tell me about your biggest sales achievement.",
      "How do you handle customer objections?",
      "Describe a time when you had to close a difficult deal.",
      "How do you build relationships with prospects?",
      "What's your approach to understanding customer needs?"
    ],
    'marketing': [
      "Tell me about a successful marketing campaign you ran.",
      "How do you measure the success of marketing initiatives?",
      "Describe a time when you had to adapt a campaign strategy.",
      "How do you stay updated with marketing trends?",
      "What's your experience with different marketing channels?"
    ]
  }

  // Try to match role from job description
  const lowerDesc = jobDescription.toLowerCase()
  let matchedRole = 'general'

  if (lowerDesc.includes('software') || lowerDesc.includes('developer') || lowerDesc.includes('engineer')) {
    matchedRole = 'software-engineer'
  } else if (lowerDesc.includes('data') || lowerDesc.includes('analytics') || lowerDesc.includes('machine learning')) {
    matchedRole = 'data-scientist'
  } else if (lowerDesc.includes('product') || lowerDesc.includes('pm')) {
    matchedRole = 'product-manager'
  } else if (lowerDesc.includes('sales') || lowerDesc.includes('account')) {
    matchedRole = 'sales'
  } else if (lowerDesc.includes('marketing') || lowerDesc.includes('brand')) {
    matchedRole = 'marketing'
  }

  return roleQuestions[matchedRole] || roleQuestions['software-engineer']
}

// Text Analysis using Hugging Face
export const analyzeTextSentiment = async (text) => {
  try {
    const response = await fetch(`${HUGGING_FACE_API_URL}/cardiffnlp/twitter-roberta-base-sentiment-latest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    })

    if (!response.ok) {
      throw new Error('Failed to analyze sentiment')
    }

    const result = await response.json()
    return result[0]
  } catch (error) {
    console.error('Error analyzing sentiment:', error)
    // Fallback to basic analysis
    return {
      label: 'NEUTRAL',
      score: 0.5
    }
  }
}

// Language Detection using Hugging Face
export const detectLanguage = async (text) => {
  try {
    const response = await fetch(`${HUGGING_FACE_API_URL}/papluca/xlm-roberta-base-language-detection`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    })

    if (!response.ok) {
      throw new Error('Failed to detect language')
    }

    const result = await response.json()
    return result[0]
  } catch (error) {
    console.error('Error detecting language:', error)
    return { label: 'en', score: 1.0 }
  }
}

// Get Daily Quote for practice prompts
export const getDailyQuote = async () => {
  try {
    const response = await fetch(QUOTES_API_URL)
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote')
    }

    const data = await response.json()
    return {
      quote: data.contents.quotes[0].quote,
      author: data.contents.quotes[0].author,
      category: data.contents.quotes[0].category
    }
  } catch (error) {
    console.error('Error fetching quote:', error)
    // Fallback quotes
    const fallbackQuotes = [
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
      { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "motivation" },
      { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" }
    ]
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
  }
}

// Enhanced speech analysis using multiple APIs
export const enhancedSpeechAnalysis = async (transcriptText) => {
  try {
    // Analyze sentiment
    const sentiment = await analyzeTextSentiment(transcriptText)
    
    // Detect language
    const language = await detectLanguage(transcriptText)
    
    // Basic text analysis
    const words = transcriptText.toLowerCase().split(' ')
    const wordCount = words.length
    
    // Calculate scores with sentiment influence
    let clarity = 70
    let confidence = 70
    let engagement = 70
    let structure = 70

    // Adjust scores based on sentiment
    if (sentiment.label === 'POSITIVE') {
      confidence += 10
      engagement += 5
    } else if (sentiment.label === 'NEGATIVE') {
      confidence -= 10
      engagement -= 5
    }

    // Filler words analysis
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally']
    const fillerCount = fillerWords.reduce((count, word) => {
      return count + (transcriptText.toLowerCase().match(new RegExp(word, 'g')) || []).length
    }, 0)
    
    if (fillerCount > 0) {
      clarity = Math.max(40, clarity - (fillerCount * 5))
    }
    
    // Confident words analysis
    const confidentWords = ['definitely', 'certainly', 'absolutely', 'clearly', 'obviously']
    const confidentCount = confidentWords.reduce((count, word) => {
      return count + (transcriptText.toLowerCase().match(new RegExp(word, 'g')) || []).length
    }, 0)
    
    confidence = Math.min(95, confidence + (confidentCount * 3))
    
    // Engaging words analysis
    const engagingWords = ['because', 'however', 'therefore', 'specifically', 'for example']
    const engagingCount = engagingWords.reduce((count, word) => {
      return count + (transcriptText.toLowerCase().match(new RegExp(word, 'g')) || []).length
    }, 0)
    
    engagement = Math.min(95, engagement + (engagingCount * 2))
    
    // Structure words analysis
    const structureWords = ['first', 'second', 'third', 'finally', 'in conclusion', 'to summarize']
    const structureCount = structureWords.reduce((count, word) => {
      return count + (transcriptText.toLowerCase().match(new RegExp(word, 'g')) || []).length
    }, 0)
    
    structure = Math.min(95, structure + (structureCount * 4))
    
    // Adjust based on word count
    if (wordCount < 20) {
      clarity -= 10
      confidence -= 10
    } else if (wordCount > 100) {
      structure += 5
      engagement += 5
    }

    return {
      scores: {
        clarity: Math.round(clarity),
        confidence: Math.round(confidence),
        engagement: Math.round(engagement),
        structure: Math.round(structure)
      },
      sentiment: sentiment,
      language: language,
      wordCount: wordCount,
      fillerCount: fillerCount
    }
  } catch (error) {
    console.error('Error in enhanced speech analysis:', error)
    // Fallback to basic analysis
    return {
      scores: {
        clarity: 70,
        confidence: 70,
        engagement: 70,
        structure: 70
      },
      sentiment: { label: 'NEUTRAL', score: 0.5 },
      language: { label: 'en', score: 1.0 },
      wordCount: transcriptText.split(' ').length,
      fillerCount: 0
    }
  }
}

// Generate enhanced feedback using analysis results
export const generateEnhancedFeedback = (analysis, scenario) => {
  const { scores, sentiment, language, wordCount, fillerCount } = analysis
  const scenarioName = scenario.replace('-', ' ')
  
  let feedback = `Great job on your ${scenarioName} practice! `
  
  // Overall assessment with sentiment
  const averageScore = Math.round((scores.clarity + scores.confidence + scores.engagement + scores.structure) / 4)
  
  if (averageScore >= 80) {
    feedback += "Your communication shows excellent potential! "
  } else if (averageScore >= 60) {
    feedback += "Your communication shows good potential with room for improvement. "
  } else {
    feedback += "Your communication has potential but needs focused practice. "
  }

  // Sentiment-based feedback
  if (sentiment.label === 'POSITIVE') {
    feedback += "Your positive tone comes through clearly and helps engage your audience. "
  } else if (sentiment.label === 'NEGATIVE') {
    feedback += "Consider using more positive language to better connect with your audience. "
  }
  
  // Language detection feedback
  if (language.label !== 'en') {
    feedback += `I detected some non-English content. For ${scenarioName} practice, try to focus on English communication. `
  }
  
  // Specific score feedback
  feedback += `\n\nYour clarity score of ${scores.clarity}/100 indicates ${scores.clarity >= 80 ? 'excellent' : scores.clarity >= 60 ? 'good' : 'needs improvement'} communication. `
  
  if (fillerCount > 0) {
    feedback += `I detected ${fillerCount} filler words. Try to reduce these for clearer speech. `
  }
  
  feedback += `Your confidence level of ${scores.confidence}/100 shows ${scores.confidence >= 80 ? 'strong' : scores.confidence >= 60 ? 'good' : 'developing'} self-assurance. `
  
  if (scores.confidence < 70) {
    feedback += "Practice using more definitive language and avoid hedging phrases. "
  }
  
  feedback += `The engagement score of ${scores.engagement}/100 suggests ${scores.engagement >= 80 ? 'excellent' : scores.engagement >= 60 ? 'good' : 'developing'} audience connection. `
  
  if (scores.engagement < 70) {
    feedback += "Try to include more specific examples and connecting words. "
  }
  
  feedback += `For structure (${scores.structure}/100), ${scores.structure >= 80 ? 'excellent organization' : scores.structure >= 60 ? 'good organization' : 'consider better organization'}. `
  
  if (scores.structure < 70) {
    feedback += "Use transition words and organize your thoughts with clear points. "
  }
  
  // Word count feedback
  if (wordCount < 20) {
    feedback += "\n\nYour response was quite brief. Try to provide more detailed answers with specific examples."
  } else if (wordCount > 100) {
    feedback += "\n\nYour response was comprehensive. Great job providing detailed information!"
  }
  
  feedback += "\n\nKeep practicing regularly to improve your communication skills!"
  
  return feedback
} 