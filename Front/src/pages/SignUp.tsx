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
  nickname: string
  email: string
  social: string
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

  const [profilePreview, setProfilePreview] = useState(download)
  const profileImgRef = useRef<HTMLInputElement>(null)
  const [inputs, setInputs] = useState<InputType>({
    nickname: '',
    email: '',
    social: '',
    profileImg: null,
    gender: '',
    age: 0,
    favoriteG: [],
    dislikeG: [],
  })

  // useEffect(() => {
  //   let [email, nickname, social] = params
  //     .slice(35, params.length - 1)
  //     .split(', ')
  //   nickname = nickname.slice(9, nickname.length)
  //   social = social.substring(social.length - 1)

  //   setInputs({ ...inputs, nickname })
  //   setInputs({ ...inputs, email })
  //   setInputs({ ...inputs, social })
  // }, [])

  function checkDuplicate() {}
  function handleInputClick() {
    if (profileImgRef.current !== null) {
      profileImgRef.current.click()
    }
  }
  function handleGenderClick(gender: string) {
    setInputs({
      ...inputs,
      gender: gender,
    })
  }

  const handleFavGenreClick = (genre: string) => {
    const new_array = inputs.favoriteG.includes(genre)
      ? inputs.favoriteG.filter((item) => item !== genre)
      : [...inputs.favoriteG, genre]

    let new_array2
    if (new_array.includes(genre) && inputs.dislikeG.includes(genre)) {
      new_array2 = inputs.dislikeG.filter((item) => item !== genre)
    }
    if (new_array2) {
      setInputs({
        ...inputs,
        favoriteG: new_array,
        dislikeG: new_array2,
      })
    } else {
      setInputs({
        ...inputs,
        favoriteG: new_array,
      })
    }
  }

  const handleDislikeGenreClick = (genre: string) => {
    const new_array = inputs.dislikeG.includes(genre)
      ? inputs.dislikeG.filter((item) => item !== genre)
      : [...inputs.dislikeG, genre]

    let new_array2
    if (new_array.includes(genre) && inputs.favoriteG.includes(genre)) {
      new_array2 = inputs.favoriteG.filter((item) => item !== genre)
    }
    if (new_array2) {
      setInputs({
        ...inputs,
        favoriteG: new_array2,
        dislikeG: new_array,
      })
    } else {
      setInputs({
        ...inputs,
        dislikeG: new_array,
      })
    }
  }

  // 이미지 base 64로 인코딩해서 보여줌
  const reader = new FileReader() // FileReader의 인스턴스 생성
  function encodeToBase64(fileBlob: Blob) {
    return new Promise<void>(() => {
      reader.onload = () => {
        const resultString = reader.result?.toString()
        if (resultString) {
          setProfilePreview(resultString)
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
    formData.append('profileImg', inputs.profileImg)
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
    formData.append('nickname', inputs.nickname)
    formData.append('social', inputs.social)
    formData.append('email', inputs.email)

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
                src={profilePreview}
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
                  {item.value}
                </div>
              )
            })}
          </div>
          <div>
            <label htmlFor="age">연령대</label>
            <select name="age" id="age">
              <option value="">--선택--</option>
              <option value="10s">10대</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
              <option value="40s">40대</option>
              <option value="50s">50대</option>
              <option value="60s">60대 이상</option>
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
            <button>다음에 하기</button>
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
