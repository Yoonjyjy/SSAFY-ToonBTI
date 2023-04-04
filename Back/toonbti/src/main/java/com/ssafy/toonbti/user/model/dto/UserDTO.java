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
public class UserDTO {
    private Long nbtiId;
    //독자 유형
    private String userType;
    //독자 유형 설명
    private String description;
    //독자 유형 이미지 경로
    private String image;

    private Long count;

    public static UserDTO of(@NotNull Nbti nbti){
        return UserDTO.builder()
                .nbtiId(nbti.getNbtiId())
                .userType(nbti.getName())
                .description(nbti.getContent())
                .image(nbti.getImage())
                .build();
    }
}
