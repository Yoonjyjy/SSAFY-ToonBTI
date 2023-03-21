import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HomeProps {
  isLogin: boolean;
  modal: boolean;
  setModal: (value: boolean) => void;
}

const navMenu = [
  {
    menu_id: 1,
    name: "랭킹",
    url: "ranking",
  },
  {
    menu_id: 2,
    name: "통계",
    url: "statistics",
  },
];

export default function Header({ isLogin, setModal }: HomeProps) {
  const navigate = useNavigate();
  const handleClick = (url: string) => {
    switch (url) {
      case "home":
        navigate("/");
        break;
      case "ranking":
        navigate("/ranking");
        break;
      case "statistics":
        if (isLogin) {
          navigate("/statistics");
        } else {
          setModal(true);
        }
        break;
    }
  };
  // 로그인 상태일 경우
  return (
    <HeaderDiv>
      <LogoDiv onClick={() => handleClick("home")}>
        <h2>RecoDeli</h2>
      </LogoDiv>
      <NavBar>
        <MenuSection>
          {navMenu.map((item) => {
            return (
              <div key={item.menu_id} onClick={() => handleClick(item.url)}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </MenuSection>
        <SearchBar></SearchBar>
      </NavBar>
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  width: 100%;
  height: 10vh;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 9fr;
`;
const MenuSection = styled.div`
  display: flex;
`;
const LogoDiv = styled.div`
  margin: auto 8px;
  padding: 0;
`;

const NavBar = styled.nav`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;
const SearchBar = styled.div`
  display: flex;
  justify-content: end;
  border: 1px solid black;
  border-radius: 10px;
  margin: auto 0;
  width: fit-content;
`;
