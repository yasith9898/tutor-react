import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from '@/app/providers/router/ui/AppRouter'
import { PostHogProvider } from '@posthog/react'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
} as const

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <AppRouter />
    </PostHogProvider>
  </React.StrictMode>,
)
