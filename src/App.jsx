import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { LoadingSpinner } from './components/LoadingSpinner'
import AnnouncementBanner from './components/AnnouncementBanner'

// Lazy load pages for better initial load performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Sponsors = lazy(() => import('./pages/Sponsors'))
const Events = lazy(() => import('./pages/Events'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue">
      <LoadingSpinner size="lg" />
    </div>
  )
}

// Component to scroll to top on route/hash/history changes
function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const performScrollToTop = () => {
      // Use requestAnimationFrame for smooth scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }

    performScrollToTop()

    const onHashChange = () => performScrollToTop()
    const onPopState = () => performScrollToTop()

    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
    }
  }, [location])
  
  return null
}

export default function App() {
  return (
    <Router>
      <AnnouncementBanner />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
