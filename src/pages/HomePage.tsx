import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession, saveAttempt } from '../lib/supabase'
import './HomePage.css'

export default function HomePage() {
  const [origin, setOrigin] = useState('')
  const [target, setTarget] = useState('')
  const [showTargetInputBox, setShowTargetInputBox] = useState(false)
  const targetInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (showTargetInputBox) {
      targetInputRef.current?.focus()
    }
  }, [showTargetInputBox])


  const handleOriginEntered = () => {
    if (origin.trim()) setShowTargetInputBox(true)
  }

  const handleOriginKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleOriginEntered()
  }

  const handleTargetEntered = async () => {
    if (!target.trim()) return
    const session = await createSession(origin.trim())
    await saveAttempt(session.id, target.trim(), null, null)
    navigate(`/feedback/${session.id}`)
  }

  const handleTargetKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleTargetEntered()
  }

  return (
    <main className="main">
      <div className="prompt">
        <h1 className="prompt__title">어떤 문장을 써볼까요?</h1>
        <p className="prompt__subtitle">한국어로 먼저 입력해보세요.</p>
      </div>

      <div className="home__input-box">
        <div className={`home__input-wrapper${showTargetInputBox ? ' origin--entered' : ''}`}>
          <input
            className="home__input-field"
            type="text"
            placeholder="한국어 문장을 입력하세요"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            onKeyDown={handleOriginKeyDown}
          />
          {!showTargetInputBox && (
            <button className="home__input-btn" onClick={handleOriginEntered}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )}
        </div>

        {showTargetInputBox && (
          <div className="home__input-wrapper target">
            <input
              className="home__input-field"
              type="text"
              ref={targetInputRef}
              placeholder="영어 문장으로 번역해 보세요"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={handleTargetKeyDown}
            />
            <button className="home__input-btn" onClick={handleTargetEntered}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <p className="home__input-hint">
        <kbd className="home__input-kbd">Enter</kbd> 을 누르면 {showTargetInputBox ? '입력한 영어 문장을 AI가 피드백합니다' : '영어 입력창이 나타납니다'}
      </p>
    </main>
  )
}
