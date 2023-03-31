package com.ssafy.toonbti.user.controller;

import com.ssafy.toonbti.user.model.dto.UserAnswerDTO;
import com.ssafy.toonbti.user.model.dto.UserDTO;
import com.ssafy.toonbti.user.model.dto.UserResultDTO;
import com.ssafy.toonbti.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
//    logger.info("Social Regist Info : {}", user);

    /***
     * 모든 유저 수 반환
     * @return
     */
    @QueryMapping
    public long countAllUsers(){
        return userService.getUserCounts();
    }

    /***
     * 유저가 선택한 답을 저장
     * @param input
     */
    @MutationMapping
    public UserResultDTO addUserResponse(@Argument UserAnswerDTO input) {
        return userService.addUserResponse(input);
    }

    /***
     * 모든 유저 유형 반환
     * @return
     */
    @QueryMapping
    public List<UserDTO> getAllTypes() {
        return userService.getAllTypes();
    }
}
