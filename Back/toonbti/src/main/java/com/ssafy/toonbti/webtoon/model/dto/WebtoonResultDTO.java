package com.ssafy.toonbti.webtoon.model.dto;

import com.ssafy.toonbti.user.model.dto.UserDTO;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WebtoonResultDTO {
    private UserDTO myType;
    private Long webtoonCounts;
    private int[] platformRatio;
    private int[] doneRatio;
    private int[] genreRatio;


}
