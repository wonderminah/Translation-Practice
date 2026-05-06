import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FeedbackPage from './pages/FeedbackPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'feedback/:id', element: <FeedbackPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
