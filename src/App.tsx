import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [origin, setOrigin] = useState('')
  const [target, setTarget] = useState('')
  const [showTargetInputBox, setShowTargetInputBox] = useState(false)
  const targetInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showTargetInputBox) {
      targetInputRef.current?.focus()
    }
  }, [showTargetInputBox])

  const handleOriginKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && origin.trim()) {
      setShowTargetInputBox(true)
    }
  }

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar__logo">
          <span className="navbar__logo-text">EngDiary</span>
        </div>
        <div className="navbar__right">
          <div className="navbar__streak">
            <span>🔥</span>
            <span>5일 연속</span>
          </div>
          <div className="navbar__avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="prompt">
          <h1 className="prompt__title">어떤 문장을 써볼까요?</h1>
          <p className="prompt__subtitle">한국어로 먼저 입력해보세요.</p>
        </div>

        <div className="input-box">
          <div className={`input-box__wrapper origin${!showTargetInputBox ? ' origin--alone' : ''}`}>
            <input
              className="input-box__field"
              type="text"
              placeholder="한국어 문장을 입력하세요"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              onKeyDown={handleOriginKeyDown}
            />
            {!showTargetInputBox && (
              <button className="input-box__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            )}
          </div>

          {showTargetInputBox && <div className="input-box__wrapper target">
            <input
              className="input-box__field"
              type="text"
              ref={targetInputRef}
              placeholder="영어 문장으로 번역해 보세요"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <button className="input-box__btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>}
        </div>

        <p className="input-box__hint">
          <kbd className="input-box__kbd">Enter</kbd> 을 누르면 {showTargetInputBox ? ('입력한 영어 문장을 AI가 피드백합니다') : ('영어 입력창이 나타납니다')}
        </p>
      </main>
    </div>
  )
}

export default App
