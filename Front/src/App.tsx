import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import { Home, Quiz } from './pages'

function App() {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className="app">
      <div className="MobileFullFrame">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
