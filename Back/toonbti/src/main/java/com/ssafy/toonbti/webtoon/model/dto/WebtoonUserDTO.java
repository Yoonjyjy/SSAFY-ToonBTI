package com.ssafy.toonbti.webtoon.model.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WebtoonUserDTO {
    private int myRank;
    private int allUser;

    public static WebtoonUserDTO of(int myRank, int allUser){
        return WebtoonUserDTO.builder()
                .myRank(myRank)
                .allUser(allUser)
                .build();
    }
}
