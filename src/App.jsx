import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Learn from './pages/Learn'
import Contact from './pages/Contact'

// Component to scroll to top on route/hash/history changes
function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const performScrollToTop = () => {
      const html = document.documentElement
      const body = document.body
      const prevHtmlBehavior = html.style.scrollBehavior
      const prevBodyBehavior = body.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      body.style.scrollBehavior = 'auto'

      const scrollNow = () => window.scrollTo(0, 0)
      scrollNow()
      requestAnimationFrame(scrollNow)
      setTimeout(scrollNow, 50)

      // restore smooth behavior if any
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prevHtmlBehavior
        body.style.scrollBehavior = prevBodyBehavior
      })
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}
