import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './Layout.css'

const SIDEBAR_EXPANDED = 250
const SIDEBAR_COLLAPSED = 50

export default function Layout() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      `${collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED}px`,
    )
  }, [collapsed])

  return (
    <div className="page">
      <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
        <div className="sidebar__header">
          <button className="sidebar__menu-btn" onClick={() => setCollapsed((v) => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="sidebar__logo-text" onClick={() => navigate('/')}>EngDiary</span>
        </div>

        <div className="sidebar__bottom">
          <div className="sidebar__avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <span className="sidebar__name-text" onClick={() => navigate('/profile')}>Mina Kim</span>
        </div>
      </aside>

      <div className="page__content">
        <Outlet />
      </div>
    </div>
  )
}
