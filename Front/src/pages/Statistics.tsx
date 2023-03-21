import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface StatisticsProps {
  isLogin: boolean
}

const Statistics = ({ isLogin }: StatisticsProps) => {
  const navigate = useNavigate()

  if (!isLogin) {
    navigate('/')
  }
  return <>{isLogin && <div>통계페이지</div>}</>
}

export default Statistics
