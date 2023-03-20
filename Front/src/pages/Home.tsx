import React, { useEffect, useState } from 'react'
import { Survey } from '../components'

interface HomeProps {
  isLogin: boolean
}

function Home({ isLogin }: HomeProps) {
  const [comp, setComp] = useState(0)

  const handleClick = () => {
    setComp(comp + 1)
  }

  return (
    <div className="Home">
      {!isLogin ? (
        <>
          {comp === 0 && (
            <div>
              <p>
                웹툰 웹소설을 좋아하세요? <br />
                당신의 취향 유형을 알려드릴게요!
              </p>
              <button onClick={handleClick}>시작하기</button>
            </div>
          )}
          {comp === 1 && <Survey />}
        </>
      ) : (
        <div>
          <p>로그아웃</p>
        </div>
      )}
    </div>
  )
}

export default Home
