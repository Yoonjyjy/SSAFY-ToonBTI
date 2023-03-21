import React from "react";
import axios from "axios";
import UserAPI from "../../shared/api.js";

function KakaoOauth2Login(){

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  

  return (
    null
  )

}

export default KakaoOauth2Login;