import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import { Home, Quiz } from './pages'

function App() {
  const [modal, setModal] = useState<boolean>(false)
  const isLogin = localStorage.getItem('token') ? true : false

  return (
    <div className="app">
      <div className="MobileFullFrame">
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} />} />
          <Route path="/quiz" element={<Quiz isLogin={isLogin} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
