import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchFeedback } from '../lib/claude'
import './FeedbackPage.css'

interface Attempt {
  id: number
  sentence: string
  createdAt: Date
  score: number | null
  feedback: string | null
  loading: boolean
}

export default function FeedbackPage() {
  const { origin, target } = useLocation().state as { origin: string; target: string }
  const [retryInput, setRetryInput] = useState('')
  const [attempts, setAttempts] = useState<Attempt[]>([
    { id: 1, sentence: target, createdAt: new Date(), score: null, feedback: null, loading: true },
  ])

  const loadFeedback = async (id: number, sentence: string) => {
    try {
      const result = await fetchFeedback(origin, sentence)
      setAttempts((prev) =>
        prev.map((a) => a.id === id ? { ...a, score: result.score, feedback: result.feedback, loading: false } : a)
      )
    } catch {
      setAttempts((prev) =>
        prev.map((a) => a.id === id ? { ...a, feedback: '피드백을 불러오지 못했어요.', loading: false } : a)
      )
    }
  }

  useEffect(() => {
    loadFeedback(1, target)
  }, [])

  const handleRetryEntered = () => {
    if (!retryInput.trim()) return
    const newAttempt: Attempt = {
      id: attempts.length + 1,
      sentence: retryInput.trim(),
      createdAt: new Date(),
      score: null,
      feedback: null,
      loading: true,
    }
    setAttempts((prev) => [...prev, newAttempt])
    loadFeedback(newAttempt.id, newAttempt.sentence)
    setRetryInput('')
  }

  const handleRetryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleRetryEntered()
  }

  return (
    <>
      <main className="feedback">
        <div className="feedback__fixed-top">
          <div className="feedback__origin-card">
            <div className="feedback__origin-header">
              <span className="feedback__pin">📌</span>
              <span className="feedback__origin-label">오늘의 문장 (내가 입력한 한국어)</span>
            </div>
            <div className="feedback__origin-body">
              <p className="feedback__origin-text">{origin}</p>
            </div>
          </div>
        </div>

        <div className="feedback__history">
          <div className="feedback__cards">
            {attempts.map((attempt) => (
              <div key={attempt.id} className="feedback__card">
                <div className="feedback__card-header">
                  <span className="feedback__card-meta">
                    시도 {attempt.id}
                    <span className="feedback__card-divider">|</span>
                    {attempt.createdAt.toLocaleDateString('ko-KR', {
                      year: 'numeric', month: '2-digit', day: '2-digit',
                    }).replace(/\. /g, '.').replace('.', '.')} {attempt.createdAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="feedback__card-score">
                    {attempt.score !== null
                      ? <strong>{attempt.score}</strong>
                      : <span className="feedback__card-score-placeholder">점수 불러오는 중...</span>
                    }
                  </span>
                </div>

                <p className="feedback__card-sentence">{attempt.sentence}</p>

                <div className={`feedback__card-feedback${attempt.loading ? ' feedback__card-feedback--loading' : ''}`}>
                  {attempt.loading
                    ? <span className="feedback__card-feedback-placeholder">피드백 불러오는 중...</span>
                    : <p className="feedback__card-feedback-text">{attempt.feedback}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="feedback__fixed-bottom">
          <div className="feedback__input-box">
            <div className="feedback__input-wrapper">
              <input
                className="feedback__input-field"
                type="text"
                placeholder="더 자연스럽고 정확한 영어로 다시 써보세요."
                value={retryInput}
                onChange={(e) => setRetryInput(e.target.value)}
                onKeyDown={handleRetryKeyDown}
              />
              <button className="feedback__input-btn" onClick={handleRetryEntered}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
