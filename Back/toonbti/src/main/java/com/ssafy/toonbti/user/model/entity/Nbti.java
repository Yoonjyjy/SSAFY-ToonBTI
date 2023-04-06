package com.ssafy.toonbti.user.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "nbti")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class

Nbti {
    @Id
    @Column(name = "nbti_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nbtiId;

    @Column(name = "name")
    private String name;
    @Column(name = "content")
    private String content;
    @Column(name = "image")
    private String image;

    @Column(name = "best_type_id")
    private Long bestTypeId;

    @Column(name = "worst_type_id")
    private Long worstTypeId;

    @Column(name = "thumbnail_title")
    private String thumbnailTitle;

    @Column(name = "thumbnail_character")
    private String thumbnailCharacter;
}
