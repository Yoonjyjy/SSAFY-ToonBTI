package com.ssafy.recodeli.user.model.service;

import com.ssafy.recodeli.user.model.dto.UserInfoRespDTO;
import com.ssafy.recodeli.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.recodeli.user.model.dto.UserUpdateParamDTO;
import com.ssafy.recodeli.user.model.entity.User;

public interface UserGraphqlService {

    /* about registration - insert */
    void socialRegist(UserSocialRegistParamDTO userDTO);

    /* about delete */
    void withdrawal(long userId);
    void deleteUser(long userId);

    /* about update */
    void updateUserInfo(long userId, UserUpdateParamDTO userDTO);

    /* about lookup - select */
    // email
    void emailDuplicateCheck(String email);
    User findUserByEmail(String email);

    // nickname
    void nickNameDuplicateCheck(String nickname);
    User findUserByNickName(String nickName);

    UserInfoRespDTO getUserInfo(String userid);
    User findUserByUserId(long userId);
}
