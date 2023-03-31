package com.ssafy.toonbti.webtoon.model.dto;

import com.ssafy.toonbti.webtoon.model.entity.UserWebtoon;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WebtoonDTO {
    private Long webtoonId;
    //웹툰 이름
    private String webtonTitle;
    //웹툰 이미지 경로
    private String image;
    private String similarity;
}
