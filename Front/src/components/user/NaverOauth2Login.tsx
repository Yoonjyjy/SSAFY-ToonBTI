import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const REACT_APP_NAVER_REDIRET_URI = "http://localhost:5173/oauth/naver/callback";

function NaverOauth2Login(){    
    
  const location = useLocation();

  const code = location.search.split('=')[1];
  const state = location.search.split('=')[2];

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=${code}&client_id=${process.env.CLIENT_ID}&state=${state}&redirect_uri=${REACT_APP_NAVER_REDIRET_URI}`
  
  return (
    null
  )
}

export default NaverOauth2Login;