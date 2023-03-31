package com.ssafy.toonbti.author.model.entity;

import com.ssafy.toonbti.webtoon.model.entity.Webtoon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "authorRole")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="webtoon_id")
    private Webtoon webtoon;

    @ManyToOne
    @JoinColumn(name="author_id")
    private Author author;

    @Column(name="type")
    @NotNull
    private String type;


}
