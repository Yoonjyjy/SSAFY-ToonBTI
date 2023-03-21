import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Survey } from '../components'

const isLogin = localStorage.getItem('token') ? true : false
function Home() {
  const [comp, setComp] = useState(0)

  const handleClick = () => {
    setComp(comp + 1)
  }

  return (
    <div className="Home">
      <>
        {comp === 0 && (
          <div>
            <h1>웹툰 독자 유형 테스트</h1>
            <ImageLogo imgUrl=""/>
            <button onClick={handleClick}>
              <b>시작하기</b>
              <p>지금까지 {}명이 참여했어요!</p>
              </button>
          </div>
        )}
        {comp === 1 && <Survey />}
      </>
    </div>
  )
}

const ImageLogo = styled.div<{imgUrl:string}>`
  background-image: url(${props => props.imgUrl});
  background-size: contain;
  background-position: center;
`
export default Home
