package com.ssafy.toonbti.webtoon.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "webtoonTag")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebtoonTag {
    @Id
    @Column(name="webtoonTag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long webtoonTagId;
    @ManyToOne
    @JoinColumn(name="webtoon_id")
    private Webtoon webtoon;

    @ManyToOne
    @JoinColumn(name="tag_id")
    private Tag tag;
}
