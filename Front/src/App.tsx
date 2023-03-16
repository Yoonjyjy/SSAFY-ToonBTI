import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { Home, SignUp } from './pages'

function App() {
  const [modal, setModal] = useState<boolean>(false)
  const isLogin = useSelector((state) => state.isLogin)

  return (
    <div className="app">
      <Routes>
        <Route element={<Header modal={modal} setModal={setModal} />}>
          <Route path="/" element={<Home isLogin={isLogin} />} />
        </Route>
        <Route path="/signup" element={<SignUp isLogin={isLogin} />} />
      </Routes>
    </div>
  )
}

export default App
