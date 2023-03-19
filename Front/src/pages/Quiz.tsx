import React, { useEffect, useRef, useState } from 'react'
import { QuizEnd, QuizQuestions } from '../components'

interface QuizProps {
  isLogin: boolean
}

/**
 * 퀴즈 페이지 컴포넌트입니다.
 * comp state가 quiz_start인 경우, quiz인 경우, quiz_end인 경우로 나눠집니다.
 * quiz_start: 퀴즈 시작 페이지
 * quiz: 퀴즈 문제를 맞추는 페이지
 * quiz_end: 퀴즈가 끝나고 결과를 확인하는 페이지
 * @param isLogin : 로그인인 경우 데이터 저장
 * @returns Quiz관련 컴포넌트
 */

const Quiz = ({ isLogin }: QuizProps) => {
  // const userInfo 다른 컴포넌트로 user정보 넘겨줘야함
  const [comp, setComp] = useState('quiz_start') // 퀴즈 관련 컴포넌트 조건부 렌더링

  const handleClick = () => {
    setComp('quiz')
  }

  return (
    <>
      {comp === 'quiz_start' && (
        <div>
          <h1>초성 맞추기</h1>
          <button onClick={handleClick}>시작하기</button>
        </div>
      )}
      {comp === 'quiz' && <QuizQuestions setComp={setComp} />}
      {comp === 'quiz_end' && <QuizEnd />}
    </>
  )
}

export default Quiz
