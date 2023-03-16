package com.ssafy.recodeli.user.model.service;

import java.time.LocalDate;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.recodeli.global.exception.DuplicatedInputException;
import com.ssafy.recodeli.global.exception.InvalidInputException;
import com.ssafy.recodeli.user.model.dto.UserInfoRespDTO;
import com.ssafy.recodeli.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.recodeli.user.model.dto.UserUpdateParamDTO;
import com.ssafy.recodeli.user.model.entity.User;
import com.ssafy.recodeli.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	/* 소셜회원 가입처리*/
	@Override
	public void socialRegist(UserSocialRegistParamDTO userDTO) {
		checkSocialRegistrationValidation(userDTO);
		userRepository.save(UserSocialRegistParamDTO.of(userDTO));
	}

	/*이메일 중복 체크*/
	@Override
	public void emailDuplicateCheck(String email) {
		User user = findUserByEmail(email);
		if (user != null) {
			throw new DuplicatedInputException("중복된 이메일 입니다.");
		}
	}

	/*닉네임 중복 체크*/
	@Override
	public void nickNameDuplicateCheck(String nickname) {
		User user = findUserByNickName(nickname);
		if (user != null) {
			throw new DuplicatedInputException("중복된 닉네임입니다.");
		}
	}
	
	/*회원 정보 조회*/
	@Override
	public UserInfoRespDTO getUserInfo(String userid) throws NumberFormatException {
		long userId = Long.parseLong(userid);
		User user = findUserByUserId(userId);
		if (user != null) {
			return UserInfoRespDTO.of(user);
		} else {
			throw new InvalidInputException("입력된 값으로 회원 정보를 찾을 수 없습니다.");
		}
	}
	
	/*회원 정보 수정*/
	@Override
	public void updateUserInfo(long userId, UserUpdateParamDTO userDTO) {
		checkUpdateValidation(userDTO);
		userDTO = UserUpdateParamDTO.of(userDTO);
		User user = findUserByUserId(userId);
		if (user != null) {
			user.setNickName(userDTO.getNickName());
			user.setGender(userDTO.getGender());
			user.setUserAge(userDTO.getAge());
			userRepository.save(user);
		}
	}
	
	/* 회원 탈퇴 */
	@Override
	public void withdrawal(long userId) {
		User user = findUserByUserId(userId);
		if (user != null) {
			user.setEmail("deletedUser" + userId);
			user.setNickName("deletedUser" + userId);
			user.setPassword("deletedUser" + userId);
			user.setUserAge(null);
			user.setGender(null);
			user.setSocial(null);
			userRepository.save(user);
		} else {
			throw new InvalidInputException("회원 정보를 찾을 수 없습니다.");
		}
	}

	
	////////////////
	// 범용 method //
	///////////////
	
	@Override
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	@Override
	public User findUserByNickName(String nickName) {
		return userRepository.findByNickName(nickName).orElse(null);
	}
	
	@Override
	public User findUserByUserId(long userId) {
		return userRepository.findById(userId).orElse(null);
	}


	@Override
	public void deleteUser(long userId) {
		userRepository.deleteById(userId);
	}

	/////////////////
	// 유효성 method //
	////////////////

	/***
	 * Validation for User SocialRegistration
	 * 
	 * @param userRegistParamDTO
	 */
	public void checkSocialRegistrationValidation(UserSocialRegistParamDTO userDTO) {
		String emailRegexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		
		User user = userRepository.findByEmail(userDTO.getEmail()).orElse(null);
		if (user != null) {
			throw new DuplicatedInputException("이미 가입된 이메일입니다.");
		}
		
		// null check
		if (userDTO.getEmail() == null) {
			throw new InvalidInputException("이메일이 null입니다.");
		}
		if (userDTO.getNickname() == null) {
			throw new InvalidInputException("닉네임이 null입니다.");
		}
		if (userDTO.getGender() == null) {
			throw new InvalidInputException("성별이 null입니다.");
		}
		if (userDTO.getAge() == null) {
			throw new InvalidInputException("생년월일 값이 null입니다.");
		}
		
		// email regexp check
		if (!Pattern.matches(emailRegexp, userDTO.getEmail())) {
			throw new InvalidInputException("이메일 입력값이 올바르지 않습니다.");
		}
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickname())) {
			throw new InvalidInputException("닉네임 입력값이 올바르지 않습니다.");
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException("성별 입력값이 올바르지 않습니다.");
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getAge());
//			LocalDate now = LocalDate.now();
			if (birth > 100 || birth < 0) {
				throw new InvalidInputException("생년월일 값이 올바르지 않습니다.");
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException("생년월일 값이 숫자가 아닙니다.");
		}
	}

	/***
	 * Validation for User UpdateInfo
	 * 
	 * @param UserUpdateParamDTO
	 */
	public void checkUpdateValidation(UserUpdateParamDTO userDTO) {
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		// null check
		if (userDTO.getNickName() == null) {
			throw new InvalidInputException("닉네임이 null입니다.");
		}
		if (userDTO.getGender() == null) {
			throw new InvalidInputException("성별이 null입니다.");
		}
		if (userDTO.getAge() == null) {
			throw new InvalidInputException("생년월일 값이 null입니다.");
		}
		
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickName())) {
			throw new InvalidInputException("닉네임 입력값이 올바르지 않습니다.");
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException("성별 입력값이 올바르지 않습니다.");
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getAge());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException("생년월일 값이 올바르지 않습니다.");
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException("생년월일 값이 숫자가 아닙니다.");
		}
	}

}
