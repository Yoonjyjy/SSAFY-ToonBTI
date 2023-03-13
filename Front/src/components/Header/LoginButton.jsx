import React from "react";
import { Dimmer, Modal } from "..";
import styled from "styled-components";

function LoginButton(props){
    const { modal, setModal } = props;

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
                <Dimmer setModal={setModal} onClick={()=>setModal()} />
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