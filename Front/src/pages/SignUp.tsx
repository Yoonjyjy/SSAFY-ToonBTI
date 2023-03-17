import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import download from '../assets/download.png'
import editicon from '../assets/Icon/editicon.png'
import { useAppDispatch } from '../redux/configStore'
import { asyncSignUp } from '../redux/Modules/User'
// import { asyncSignUp } from '../redux/Modules/User'
import './test.css'

interface GenderBtnType {
  btn_id: number
  value: string
  name: string
}

interface GenreBtnType {
  btn_id: number
  value: string
}

interface InputType {
  profileImg: any
  gender: string
  age: number
  favoriteG: string[]
  dislikeG: string[]
}

interface SignUpProps {
  isLogin: boolean
}

const genderBtnList: GenderBtnType[] = [
  {
    btn_id: 1,
    value: 'Female',
    name: '여성',
  },
  {
    btn_id: 2,
    value: 'Male',
    name: '남성',
  },
]

const genreBtnList: GenreBtnType[] = [
  {
    btn_id: 1,
    value: '판타지',
  },
  {
    btn_id: 2,
    value: '드라마',
  },
  {
    btn_id: 3,
    value: '로맨스',
  },
  {
    btn_id: 4,
    value: '로맨스판타지',
  },
  {
    btn_id: 5,
    value: '현대판타지',
  },
  {
    btn_id: 6,
    value: '액션/무협',
  },
  {
    btn_id: 7,
    value: '소년/감성',
  },
  {
    btn_id: 8,
    value: '일상/개그',
  },
  {
    btn_id: 9,
    value: '공포/추리',
  },
  {
    btn_id: 10,
    value: '스포츠',
  },
]

const SignUp = ({ isLogin }: SignUpProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const params = decodeURIComponent(location.search)

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [])

  const profilePreviewRef = useRef<any>(download)
  const nicknameRef = useRef<string>('')
  const genderRef = useRef<string>('')
  const ageRef = useRef<string>('')
  const favoriteGRef = useRef<string[]>([])
  const dislikeGRef = useRef<string[]>([])
  const [social, setSocial] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    let [email, nickname, social] = params
      .slice(35, params.length - 1)
      .split(', ')
    nickname = nickname.slice(9, nickname.length)
    social = social.substring(social.length - 1)

    nicknameRef.current = nickname
    setEmail(email)
    setSocial(social)
  }, [])

  // const [profilePreview, setProfilePreview] = useState(download)
  const profileImgRef = useRef<HTMLInputElement>(null)
  // const [inputs, setInputs] = useState<InputType>({
  //   profileImg: null,
  //   gender: '',
  //   age: 0,
  //   favoriteG: [],
  //   dislikeG: [],
  // })
  function checkDuplicate() {}
  function handleInputClick() {
    if (profileImgRef.current !== null) {
      profileImgRef.current.click()
    }
  }
  function handleGenderClick(gender: string) {
    // setInputs({
    //   ...inputs,
    //   gender: gender,
    // })
    genderRef.current = gender
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: React.MutableRefObject<string>,
  ) => {
    const value = e.target.value
    type.current = value
  }

  const handleFavGenreClick = (genre: string) => {
    const new_array = favoriteGRef.current.includes(genre)
      ? favoriteGRef.current.filter((item) => item !== genre)
      : [...favoriteGRef.current, genre]

    let new_array2
    if (new_array.includes(genre) && dislikeGRef.current.includes(genre)) {
      new_array2 = dislikeGRef.current.filter((item: string) => item !== genre)
    }
    if (new_array2) {
      favoriteGRef.current = new_array
      dislikeGRef.current = new_array2
    } else {
      favoriteGRef.current = new_array
    }
  }

  const handleDislikeGenreClick = (genre: string) => {
    const new_array = dislikeGRef.current.includes(genre)
      ? dislikeGRef.current.filter((item) => item !== genre)
      : [...dislikeGRef.current, genre]

    let new_array2
    if (new_array.includes(genre) && favoriteGRef.current.includes(genre)) {
      new_array2 = favoriteGRef.current.filter((item) => item !== genre)
    }
    if (new_array2) {
      dislikeGRef.current = new_array
      favoriteGRef.current = new_array2
    } else {
      dislikeGRef.current = new_array
    }
  }

  // 이미지 base 64로 인코딩해서 보여줌
  const reader = new FileReader() // FileReader의 인스턴스 생성
  function encodeToBase64(fileBlob: Blob) {
    return new Promise<void>(() => {
      reader.onload = () => {
        const resultString = reader.result?.toString()
        if (resultString) {
          profilePreviewRef.current = resultString
        } else {
          throw new Error('Failed to read file')
        }
      }
      reader.readAsDataURL(fileBlob)
    })
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInputs({
        ...inputs,
        profileImg: e.target.files[0],
      })
      encodeToBase64(e.target.files[0])
    }
  }

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    // redux-toolkit
    e.preventDefault()

    const formData = new FormData()

    formData.append('profileImg', profileImgRef)
    formData.append('nickname', nicknameRef.current)
    formData.append('social', social)
    formData.append('email', email)
    formData.append('age', inputs.age.toString())
    formData.append('gender', inputs.gender)
    formData.append('favoriteG', JSON.stringify(inputs.favoriteG))
    formData.append('dislikeG', JSON.stringify(inputs.dislikeG))

    dispatch(asyncSignUp(formData)).then(() => {
      navigate('/')
    })
  }
  const signUpWNoData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nickname', nickname.current)
    formData.append('social', social)
    formData.append('email', email)

    dispatch(asyncSignUp(formData)).then(() => {
      navigate('/')
    })
  }
  return (
    <>
      <SignUpDiv>
        <form onSubmit={signUp}>
          <legend>회원가입</legend>
          <ProfileImgDiv>
            {profilePreview && (
              <ProfileImg
                onClick={handleInputClick}
                src={profilePreview.current}
              ></ProfileImg>
            )}
            <input
              accept="image/*"
              type="file"
              ref={profileImgRef}
              onChange={handleImgChange}
              hidden
            />
          </ProfileImgDiv>
          <div>
            <input
              type="text"
              defaultValue={nickname.current}
              placeholder="닉네임을 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e, nickname)
              }
            />
            <button onClick={checkDuplicate}>중복 확인</button>
          </div>

          <div className="gender_select">
            {genderBtnList.map((item) => {
              return (
                // button selected 되면 style 변경 해야할 듯
                <div
                  key={item.btn_id}
                  onClick={() => {
                    handleGenderClick(item.value)
                  }}
                  className={
                    item.value === inputs?.gender ? 'selected' : 'unselected'
                  }
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          <div>
            <label htmlFor="age">연령대</label>
            <select name="age" id="age">
              <option value="0">--선택--</option>
              <option value="10">10대</option>
              <option value="20">20대</option>
              <option value="30">30대</option>
              <option value="40">40대</option>
              <option value="50">50대</option>
              <option value="60">60대 이상</option>
            </select>
          </div>
          <div className="favorite_genre_box">
            <p>선호 장르</p>
            {genreBtnList.map((item) => {
              return (
                // button selected 되면 style 변경 해야할 듯
                <div
                  key={item.btn_id}
                  onClick={() => {
                    handleFavGenreClick(item.value)
                  }}
                  className={
                    inputs?.favoriteG.includes(item.value)
                      ? 'selected'
                      : 'unselected'
                  }
                >
                  {item.value}
                </div>
              )
            })}
          </div>
          <div className="dislike_genre_box">
            <p>비선호 장르</p>
            {genreBtnList.map((item) => {
              return (
                // button selected 되면 style 변경 해야할 듯
                <div
                  key={item.btn_id}
                  onClick={() => {
                    handleDislikeGenreClick(item.value)
                  }}
                  className={
                    inputs?.dislikeG.includes(item.value)
                      ? 'selected'
                      : 'unselected'
                  }
                >
                  {item.value}
                </div>
              )
            })}
          </div>
          <div>
            <button type="submit">submit</button>
            <button type="button" onClick={(e) => signUpWNoData}>
              정보 설정 다음에 하기
            </button>
          </div>
        </form>
      </SignUpDiv>
    </>
  )
}

const SignUpDiv = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: #ffffff;
  margin: auto;
  padding: 4rem;
`
const ProfileImgDiv = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
`
const ProfileImg = styled.div<{ src?: any }>`
  width: 160px;
  height: 160px;
  border-radius: 100px;
  background-image: url(${(props) => props?.src});
  background-position: center;
  background-size: cover;
`
export default SignUp
