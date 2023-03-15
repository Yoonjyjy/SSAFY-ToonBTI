import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { Home, SignUp } from './pages'

function App() {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className="app">
      <Routes>
        <Route element={<Header modal={modal} setModal={setModal} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
