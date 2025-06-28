# 🚀 Free API Setup Guide for Aurify

Aurify now uses **two free APIs** to enhance your communication coaching experience:

## 1. 🤗 Hugging Face Inference API (Free Tier)

**What it provides:**
- Sentiment analysis of your speech
- Language detection
- Enhanced AI-powered feedback

**Free limits:**
- 30,000 requests per month
- Perfect for personal use and small projects

### How to get your API key:

1. **Sign up** at [Hugging Face](https://huggingface.co/join)
2. **Go to Settings** → [Access Tokens](https://huggingface.co/settings/tokens)
3. **Create a new token** with "Read" permissions
4. **Copy your token** (starts with `hf_`)

### Update your code:

In `src/utils/api.js`, replace:
```javascript
const HUGGING_FACE_API_KEY = 'hf_your_api_key_here'
```

With your actual token:
```javascript
const HUGGING_FACE_API_KEY = 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

## 2. 💬 Quotes API (Free Tier)

**What it provides:**
- Daily inspirational quotes
- Practice prompts based on quotes
- Motivational content

**Free limits:**
- Unlimited requests
- No API key required

### No setup needed! 
The Quotes API is already working without any configuration.

---

## 🎯 What's New in Aurify

### Enhanced Features:
- **AI Sentiment Analysis**: Detects positive, negative, or neutral tone in your speech
- **Language Detection**: Identifies the language you're speaking
- **Daily Inspiration**: Fresh quotes every day for practice prompts
- **Detailed Analytics**: Word count, filler word detection, and more
- **Enhanced Feedback**: More personalized and detailed feedback

### How it works:
1. **Record your speech** using the Web Speech API (free, no setup needed)
2. **AI analyzes** your transcript using Hugging Face models
3. **Get detailed feedback** with sentiment analysis and language detection
4. **Practice with daily quotes** for inspiration

---

## 🔧 Troubleshooting

### If Hugging Face API doesn't work:
- Check your API key is correct
- Ensure you have internet connection
- The app will fall back to basic analysis if the API fails

### If Quotes API doesn't work:
- Check your internet connection
- The app will use fallback quotes

### Rate Limits:
- Hugging Face: 30,000 requests/month (plenty for personal use)
- Quotes API: Unlimited requests

---

## 🚀 Ready to Start?

1. Get your Hugging Face API key
2. Update the `HUGGING_FACE_API_KEY` in `src/utils/api.js`
3. Run `npm run dev` to start your enhanced Aurify app!

Your communication coaching experience is now powered by real AI analysis! 🎉 