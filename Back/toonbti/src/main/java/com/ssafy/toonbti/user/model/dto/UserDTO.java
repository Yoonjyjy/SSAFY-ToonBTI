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
    // 타입에 해당하는 사용자의 수
    private Long count;

    private String thumbnailTitle;

    private String thubnailCharacter;

    public static UserDTO of(@NotNull Nbti nbti){
        return UserDTO.builder()
                .nbtiId(nbti.getNbtiId())
                .userType(nbti.getName())
                .description(nbti.getContent())
                .image(nbti.getImage())
                .thumbnailTitle(nbti.getThumbnailTitle())
                .thubnailCharacter(nbti.getThumbnailCharacter())
                .build();
    }
}
