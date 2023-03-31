package com.ssafy.toonbti.author.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "author")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Author {
	@Id
	@Column(name="author_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long authorId;

	@Column(name="name", length = 50)
	@NotNull
	private String name;
}
