package com.ssafy.recodeli.user.controller;

import com.ssafy.recodeli.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.recodeli.user.model.entity.User;
import com.ssafy.recodeli.user.model.repository.UserRepository;
import com.ssafy.recodeli.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class UserGrapController {

	private static final String SUCCESS = "success";
	private static final String RESULT = "result";
	private final UserRepository userRepository;
	private final Logger logger = LoggerFactory.getLogger(UserGrapController.class);
	private final UserService userService;

	@MutationMapping
	User addUser(@Argument @Valid UserSocialRegistParamDTO userDTO){
		logger.info("Social Regist Info : {}", userDTO);
		return userRepository.save(UserSocialRegistParamDTO.of(userDTO));
	}
}
