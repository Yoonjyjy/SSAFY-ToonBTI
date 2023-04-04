package com.ssafy.toonbti.user.model.dto;

import com.ssafy.toonbti.user.model.entity.Nbti;
import lombok.*;
import org.jetbrains.annotations.NotNull;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserResultDTO {
    private Long userId;
    private UserDTO myType;
    private UserDTO bestType;
    private UserDTO worstType;
    private UserDTO firstType;
    private UserDTO secondType;

    public static UserResultDTO of(Long userId, UserDTO myUser, UserDTO bestType, UserDTO worstType, UserDTO rankOne, UserDTO rankTwo) {
        return UserResultDTO.builder()
                .userId(userId)
                .myType(myUser)
                .bestType(bestType)
                .worstType(worstType)
                .firstType(rankOne)
                .secondType(rankTwo)
                .build();
    }
}
