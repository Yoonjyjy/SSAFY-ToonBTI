import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface QuizQuestionsProps {
  setComp: (comp: string) => void
}

const mockData = [
  {
    id: 1,
    question: 'ㅎㄹㅇㅎㄴ',
    answer: '호랑이행님',
  },
  {
    id: 2,
    question: 'ㄴㅂㄹㅅ',
    answer: '노블레스',
  },
  {
    id: 3,
    question: 'ㅇㅇㅎㅁ',
    answer: '연애혁명',
  },
  {
    id: 4,
    question: 'ㅇㅁㅈㅅㅈㅇ',
    answer: '외모지상주의',
  },
  {
    id: 5,
    question: 'ㅆㅇㄷㅎ',
    answer: '싸움독학',
  },
]
/**
 *
 * @param setComp 컴포넌트를 변경
 * @returns
 */
const QuizQuestions = ({ setComp }: QuizQuestionsProps) => {
  const [quizList, setQuizList] = useState(mockData) // 문제 리스트 10개씩 받아오기
  const [quiz, setQuiz] = useState<number>(0) // 문제
  const [time, setTimer] = useState(0) // timer 5초
  const inputRef = useRef<HTMLInputElement>(null)

  // 50초 지나면 자동으로 다음 문제 10개 받아옴
  // useEffect(() => {
  //   const getQuiz = setTimeout(() => {
  //     //quizList graphQL
  //     const result = [{}, {}, {}]
  //     setQuizList(result)
  //   }, 50000)
  //   return () => {
  //     clearTimeout(getQuiz)
  //   }
  // }, [quizList])

  const debounce = (func: () => void, timeout = 300) => {
    let time: number | undefined
    return (...args: any) => {
      clearTimeout(time)
      time = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  const handleSubmit = debounce(() => {
    const userAnswer = inputRef.current?.value
    const correctAnswer = quizList[quiz].answer
    if (userAnswer === correctAnswer) {
      setTimer(0)
      setQuiz(quiz + 1)
    } else {
      setComp('quiz_end')
    }

    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(time + 1000)
    }, 1000)
    if (time === 5000) {
      handleSubmit()
    }
    return () => clearTimeout(timeout)
  }, [time])

  return (
    <div>
      <p>{time}</p>
      {/* <QuizImage src={imgUrl} /> */}
      <p>{quizList[quiz].question}</p>
      {/* {correct && <p>정답입니다!</p>} */}
      <input
        type="text"
        ref={inputRef}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
      />
      <button
        onClick={(e) => {
          handleSubmit()
        }}
      >
        제출
      </button>
    </div>
  )
}

const QuizImage = styled.div<{ src: string }>`
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
`

export default QuizQuestions
