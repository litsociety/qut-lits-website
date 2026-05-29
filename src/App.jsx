import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Sponsors from './pages/Sponsors'
import Events from './pages/Events'
import Pathways from './pages/Pathways'
import PathwayDetail from './pages/PathwayDetail'
import NotFound from './pages/NotFound'
import AnnouncementBanner from './components/AnnouncementBanner'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/pathways/:track" element={<PathwayDetail />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
