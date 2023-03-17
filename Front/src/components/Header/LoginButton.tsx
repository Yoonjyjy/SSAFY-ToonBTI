import React from 'react'
import { Dimmer, Modal } from '..'
import styled from 'styled-components'

interface LoginBtnProps {
  modal: boolean
  setModal: (value: boolean) => void
}

function LoginButton({ modal, setModal }: LoginBtnProps) {
  function openModal() {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }
  return (
    <>
      <LoginBtn onClick={openModal}>Login</LoginBtn>
      {modal && (
        <>
          <Dimmer setModal={setModal} />
          <Modal type="login" modal={modal} setModal={setModal} />
        </>
      )}
    </>
  )
}

const LoginBtn = styled.div`
  margin: auto 24px auto 0;
  display: flex;
  justify-content: end;
  position: fixed;
  top: 25px;
  bottom: 0;
  right: 20px;
`
export default LoginButton
