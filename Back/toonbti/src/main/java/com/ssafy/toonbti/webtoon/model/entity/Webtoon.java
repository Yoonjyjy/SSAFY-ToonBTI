package com.ssafy.toonbti.webtoon.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "webtoon")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Webtoon {
    @Id
    @Column(name = "webtoon_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long webtoonId;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @Column(name = "title")
    @NotNull
    private String title;
    @Column(name = "image")
    @NotNull
    private String image;
    @Column(name = "platform")
    @NotNull
    private String platform;
    @Column(name = "end_flag")
    @NotNull
    private boolean isEnded;
    @Column(name = "rate")
    @NotNull
    private int rate;
    @Column(name = "view")
    private int view;
}
