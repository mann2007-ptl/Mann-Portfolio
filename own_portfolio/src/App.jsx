import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Certificate from './components/Certificate/Certificate'
import Education from './components/Education/Education'
import Contact from './components/Contact/Contact'
import './App.css'

import CustomCursor from './components/CustomCursor/CustomCursor'
import Background from './components/Background/Background'

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificate />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App
