import React from "react";
import { Dimmer, Modal } from "..";
import styled from "styled-components";

interface LoginBtnProps {
    modal: boolean;
    setModal: (value: boolean) => void;
};

function LoginButton({ modal, setModal } : LoginBtnProps){

    function openModal(){
        if(modal){
            setModal(false);
        } else {
            setModal(true);
        }
    }
    return(
        <>
            <div onClick={openModal}>Login</div>
            {modal && 
                <>
                <Dimmer setModal={setModal} />
                <Modal 
                    type="login" 
                    modal={modal} 
                    setModal={setModal} />
                </>
            }
        </>
    )
}

export default LoginButton;