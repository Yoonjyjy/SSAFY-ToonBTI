package com.ssafy.recodeli.user.model.service;

import com.ssafy.recodeli.global.exception.DuplicatedInputException;
import com.ssafy.recodeli.global.exception.InvalidInputException;
import com.ssafy.recodeli.user.model.dto.EmailAuthParamDTO;
import com.ssafy.recodeli.user.model.dto.UserInfoRespDTO;
import com.ssafy.recodeli.user.model.dto.UserLoginParamDTO;
import com.ssafy.recodeli.user.model.dto.UserRegistParamDTO;
import com.ssafy.recodeli.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.recodeli.user.model.dto.UserUpdateParamDTO;
import com.ssafy.recodeli.user.model.entity.User;
import com.ssafy.recodeli.user.model.entity.WaitUser;

public interface UserService {
	
	/* about registration - insert */
	void tmpRegistration(UserRegistParamDTO userDTO, String authKey) throws InvalidInputException, DuplicatedInputException;
	void registEmailAuth(EmailAuthParamDTO authDTO);
	void registration(WaitUser user);
	void socialRegist(UserSocialRegistParamDTO userDTO);
	
	/* about login */
	User loginService(UserLoginParamDTO loginDTO);
	
	/* about delete */
	void withdrawal(long userId);
	void deleteUser(long userId);
	
	/* about update */
	void updateUserInfo(long userId, UserUpdateParamDTO userDTO);
	void updatePassword(long userId, String password, String newPassword);
	void updateTmpPassword(long userId, String tmpPassword);
	
	/* about lookup - select */
	// email
	void emailDuplicateCheck(String email);
	User findUserByEmail(String email);
	
	// nickname
	void nickNameDuplicateCheck(String nickname);
	User findUserByNickName(String nickName);
	
	UserInfoRespDTO getUserInfo(String userid);
	User findUserByUserId(long userId);	
	User findUserByEmailAndPassword(String email, String password);

	// wait user
	WaitUser findWaitUserByEmail(String email);
	WaitUser findWaitUserByNickName(String nickname);
}
