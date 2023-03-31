package com.ssafy.toonbti.webtoon.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "genre")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genre {
    @Id
    @Column(name="genre_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;
    @Column(name="name")
    @NotNull
    private String name;
}
