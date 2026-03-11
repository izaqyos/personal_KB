import { useState, useEffect, useCallback } from 'react'
import './App.css'
import TitleSlide from './components/slides/TitleSlide'
import TableOfContents from './components/slides/TableOfContents'
import ResidualPrimer from './components/slides/ResidualPrimer'
import HCExplained from './components/slides/HCExplained'
import HCProblem from './components/slides/HCProblem'
import MHCSolution from './components/slides/MHCSolution'
import SinkhornKnopp from './components/slides/SinkhornKnopp'
import WhyItWorks from './components/slides/WhyItWorks'
import Architecture from './components/slides/Architecture'
import Results from './components/slides/Results'
import StabilityDeep from './components/slides/StabilityDeep'
import InfraOptimizations from './components/slides/InfraOptimizations'
import TLDRSlide from './components/slides/TLDRSlide'
import WhatsNext from './components/slides/WhatsNext'

const slides = [
  TitleSlide,
  TableOfContents,
  ResidualPrimer,
  HCExplained,
  HCProblem,
  MHCSolution,
  SinkhornKnopp,
  WhyItWorks,
  Architecture,
  Results,
  StabilityDeep,
  InfraOptimizations,
  TLDRSlide,
  WhatsNext,
]

function App() {
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => {
    setCurrent(c => Math.min(c + 1, slides.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrent(c => Math.max(c - 1, 0))
  }, [])

  const goTo = useCallback((idx) => {
    setCurrent(idx)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const SlideComponent = slides[current]
  const progress = ((current + 1) / slides.length) * 100

  return (
    <div className="presentation">
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <div className="slide-container" key={current}>
        <div className="slide animate-in">
          <SlideComponent goTo={goTo} currentSlide={current} />
        </div>
      </div>

      <div className="nav-bar">
        <button className="nav-btn" onClick={goPrev} disabled={current === 0}>
          ← Prev
        </button>
        <span className="slide-counter">
          {current + 1} / {slides.length}
        </span>
        <button className="nav-btn" onClick={goNext} disabled={current === slides.length - 1}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default App
