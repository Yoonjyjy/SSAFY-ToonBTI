import styled from 'styled-components'
import { Login } from '../'

interface HomeModalProps {
  type: string
  modal: boolean
  setModal?: (value: boolean) => void
}
/**
  Modal창을 만드는 모듈입니다. 
  @param(string) type : 모달의 종류
  @param(boolean) modal : 모달의 개폐 여부
*/

function Modal({ type, modal }: HomeModalProps) {
  if (type === 'login') {
    return (
      <Wrapper modal={modal}>
        <ModalDiv onClick={(e) => e.stopPropagation()}>
          <Login />
        </ModalDiv>
      </Wrapper>
    )
  }

  return <></>
}

const Wrapper = styled.div<{ modal: boolean }>`
  width: 100%;
  height: 100%;
  overflow: ${(props) => (props.modal ? 'hidden' : 'auto')};
`
const ModalDiv = styled.div`
  width: fit-content;
  height: fit-content;
  z-index: 300;
  position: absolute;
  right: 0;
  left: 40%;
  top: 30%;
  bottom: 0;
  background-color: white;
  border-radius: 12px;
  padding: 16px 8px;
`

export default Modal
