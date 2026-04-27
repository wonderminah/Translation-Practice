import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './FeedbackPage.css'

interface Attempt {
  id: number
  sentence: string
  createdAt: Date
}

export default function FeedbackPage() {
  const { origin, target } = useLocation().state as { origin: string; target: string }
  const [retryInput, setRetryInput] = useState('')
  const [attempts, setAttempts] = useState<Attempt[]>([
    { id: 1, sentence: target, createdAt: new Date() },
  ])

  const handleRetryEntered = () => {
    if (!retryInput.trim()) return
    setAttempts((prev) => [
      ...prev,
      { id: prev.length + 1, sentence: retryInput.trim(), createdAt: new Date() },
    ])
    setRetryInput('')
  }

  const handleRetryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleRetryEntered()
  }

  return (
    <>
      <main className="feedback">
        <div className="feedback__origin-card">
          <div className="feedback__origin-header">
            <span className="feedback__pin">📌</span>
            <span className="feedback__origin-label">오늘의 문장 (내가 입력한 한국어)</span>
          </div>
          <div className="feedback__origin-body">
            <p className="feedback__origin-text">{origin}</p>
          </div>
        </div>

        <div className="feedback__history">
          <div className="feedback__history-header">
            <span className="feedback__history-title">번역 히스토리</span>
          </div>

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
                    — <span className="feedback__card-score-placeholder">/100</span>
                  </span>
                </div>

                <p className="feedback__card-sentence">{attempt.sentence}</p>

                <div className="feedback__card-feedback">
                  <p className="feedback__card-feedback-placeholder">AI 피드백이 여기에 표시됩니다.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <div className="feedback__input-bar">
        <div className="input-box">
          <div className="input-box__wrapper">
            <input
              className="input-box__field"
              type="text"
              placeholder="더 자연스럽고 정확한 영어로 다시 써보세요."
              value={retryInput}
              onChange={(e) => setRetryInput(e.target.value)}
              onKeyDown={handleRetryKeyDown}
            />
            <button className="input-box__btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
