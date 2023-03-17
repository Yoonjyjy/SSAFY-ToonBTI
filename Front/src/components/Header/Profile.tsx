import React, { MouseEventHandler, useRef } from 'react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import download from '../../assets/download.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Profile = () => {
  const navigate = useNavigate()
  // const userInfo = useSelector((state) => state.user.user)
  const userInfo = {
    profileImg: { download },
    nickname: '사용자',
    level: 100,
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate('/mypage')}>
          <ProfileImg src={download} />
          <p>{userInfo.nickname}</p>
          <div>
            <p>Lv. {userInfo.level}</p>
          </div>
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={() => navigate('/mypage')}>
          <p>마이페이지</p>
        </span>
      ),
    },
  ]

  return (
    <ProfileDropBox>
      <Dropdown menu={{ items }}>
        <DropDownATag onClick={(e) => e.preventDefault()}>
          <Space>
            <ProfileImg src={download} />
            <span>
              <b>{userInfo.nickname}</b>님 안녕하세요.
            </span>
            <DownOutlined />
          </Space>
        </DropDownATag>
      </Dropdown>
    </ProfileDropBox>
  )
}

const DropDownATag = styled.a`
  display: flex;
  align-items: center;
`

const ProfileDropBox = styled.div`
  margin: auto 24px auto 0;
  display: flex;
  justify-content: end;
`
const ProfileImg = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
`
export default Profile
