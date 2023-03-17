import React from 'react'
import { useNavigate } from 'react-router-dom'

interface MyPageProps {
  isLogin: boolean
}
function Home({ isLogin }: MyPageProps) {
  const navigate = useNavigate()

  if (!isLogin) {
    navigate('/')
  }
  return <div>마이페이지</div>
}

export default Home
