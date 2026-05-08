import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
          padding: '14px',
          borderRadius: '10px',
          fontWeight: '500',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
        },

        success: {
          style: {
            border: '1px solid #22c55e'
          }
        },

        error: {
          style: {
            border: '1px solid #ef4444'
          }
        }
      }}
    />

    <App />

  </StrictMode>,
)