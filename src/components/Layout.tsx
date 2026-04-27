import { Outlet } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
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

      <Outlet />
    </div>
  )
}
