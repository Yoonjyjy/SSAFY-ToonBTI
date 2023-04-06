package com.ssafy.toonbti.user.model.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TypeAnswerDTO {
    private UserDTO myType;
    private UserDTO bestType;
    private UserDTO worstType;
    private UserDTO firstType;
    private UserDTO secondType;

    public static TypeAnswerDTO of(UserDTO myUser, UserDTO bestType, UserDTO worstType, UserDTO rankOne, UserDTO rankTwo) {
        return TypeAnswerDTO.builder()
                .myType(myUser)
                .bestType(bestType)
                .worstType(worstType)
                .firstType(rankOne)
                .secondType(rankTwo)
                .build();
    }
}
