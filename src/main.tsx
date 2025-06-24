import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './components/context/AppContext.tsx'
import App from './App.tsx'
import './satoshi.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <AppProvider
    initialData={{
      nav: null,
      strings: null,
      pages: null,
      pagesBlock: null,
      blogSlug: null
    }}>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProvider>
)
