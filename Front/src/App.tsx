import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { Home, SignUp, Ranking, Statistics } from './pages'
import { RootState } from './redux/configStore'

function App() {
  const [modal, setModal] = useState<boolean>(false)
  const isLogin = localStorage.getItem('token') ? true : false

  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Header modal={modal} setModal={setModal} isLogin={isLogin} />
          }
        >
          <Route path="/" element={<Home isLogin={isLogin} />} />
          <Route path="/statistics" element={<Ranking />} />
          <Route path="/ranking" element={<Statistics isLogin={isLogin} />} />
        </Route>
        <Route path="/signup" element={<SignUp isLogin={isLogin} />} />
      </Routes>
    </div>
  )
}

export default App
