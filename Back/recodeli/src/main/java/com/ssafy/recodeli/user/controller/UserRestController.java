package com.ssafy.recodeli.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.recodeli.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.recodeli.user.model.dto.UserUpdateParamDTO;
import com.ssafy.recodeli.user.model.service.JwtService;
import com.ssafy.recodeli.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Api("USER API")
public class UserRestController {
	
	private static final String SUCCESS = "success";
	private static final String RESULT = "result";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final UserService userService;
	private final JwtService jwtService;
	
	/***
	 * Social User Registration
	 * @param UserSocialRegistParamDTO
	 * @return status 200, 400, 409
	 */
	@ApiOperation(value = "소셜 회원가입", notes = "소셜 회원의 회원가입을 진행합니다.")
	@PostMapping("/social")
	public ResponseEntity<Map<String, String>> socialRegistration(
			@ApiParam(required = true) UserSocialRegistParamDTO userDTO
			) {
		
		logger.info("Social Regist Info : {}", userDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.socialRegist(userDTO);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}

	/***
	 * User nickname Duplicate Check
	 * @param nickname
	 * @return status 200, 409
	 */
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임이 중복되는 지 여부를 확인해줍니다.")
	@GetMapping("/nickname")
	public ResponseEntity<Map<String, String>> nicknameDuplicateCheck(
			@RequestParam(value = "nickname") @ApiParam(required = true) String nickname
			) {
		
		logger.info("nickname duplicate check input parameter : {}", nickname);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.nickNameDuplicateCheck(nickname);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User information lookup
	 * @param token
	 * @param userid
	 * @return status 200, 400, 401
	 */
	@ApiOperation(value = "회원 정보 조회", 	notes = "해당 유저의 정보를 조회합니다.")
	@GetMapping("/{userid}")
	public ResponseEntity<Map<String, Object>> getUserInfo(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable(value = "userid") @ApiParam(required = true) String userid
			) throws NumberFormatException {
		logger.info("getUserInfo input parameter : {}", userid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		resultMap.put(RESULT, SUCCESS);
		resultMap.put("user", userService.getUserInfo(userid));
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User information Update
	 * @param token
	 * @param updateInfo
	 * @return status 200, 401
	 */
	@ApiOperation(value = "회원 정보 수정", notes = "해당 유저의 정보를 수정합니다.")
	@PutMapping
	public ResponseEntity<Map<String, Object>> updateUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) UserUpdateParamDTO userDTO
			) {
		
		logger.info("updateUser input parameter : {}", userDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		userService.updateUserInfo(userId, userDTO);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User withdrawal
	 * @param token
	 * @return status 200, 401
	 */
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴를 진행합니다.")
	@DeleteMapping
	public ResponseEntity<Map<String, String>> deleteUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		
		logger.info("findPassword in");
		Map<String, String> resultMap = new HashMap<String, String>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		userService.withdrawal(userId);
		resultMap.put(RESULT, SUCCESS);
		SecurityContextHolder.clearContext();
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}

}
