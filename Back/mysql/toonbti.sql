use toonbti;

﻿DROP TABLE IF EXISTS `webtoon`;

CREATE TABLE `webtoon` (
	`id`	int	NOT NULL,
	`genre_id`	int	NOT NULL,
	`title`	char(50)	NULL,
	`img`	varchar(255)	NULL,
	`platform`	char(5)	NULL,
	`end_flag`	boolean	NULL,
	`award_flag`	boolean	NULL,
	`rate`	int	NULL,
	`view`	int	NULL
);

DROP TABLE IF EXISTS `userNbti`;

CREATE TABLE `userNbti` (
	`id`	int	NOT NULL,
	`nbti_id`	int	NOT NULL,
	`user_id`	int	NOT NULL
);

DROP TABLE IF EXISTS `userAnswer`;

CREATE TABLE `userAnswer` (
	`id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`answer_id`	int	NOT NULL
);

DROP TABLE IF EXISTS `nbti`;

CREATE TABLE `nbti` (
	`id`	int	NOT NULL,
	`name`	char(50)	NULL,
	`content`	varchar(255)	NULL,
	`img`	char(255)	NULL
);

DROP TABLE IF EXISTS `userWebtoon`;

CREATE TABLE `userWebtoon` (
	`id`	int	NOT NULL,
	`webtoon_id`	int	NOT NULL,
	`user_id`	int	NOT NULL
);

DROP TABLE IF EXISTS `genre`;

CREATE TABLE `genre` (
	`id`	int	NOT NULL,
	`name`	char(50)	NULL
);

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
	`id`	int	NOT NULL,
	`name`	char(50)	NULL
);

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
	`id`	int	NOT NULL,
	`question`	varchar(255)	NULL,
	`img`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
	`id`	int	NOT NULL,
	`question_id`	int	NOT NULL,
	`answer`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
	`id`	int	NOT NULL,
	`name`	char(50)	NULL
);

DROP TABLE IF EXISTS `webtoonTag`;

CREATE TABLE `webtoonTag` (
	`id`	int	NOT NULL,
	`webtoon_id`	int	NOT NULL,
	`tag_id`	int	NOT NULL
);

DROP TABLE IF EXISTS `authorRole`;

CREATE TABLE `authorRole` (
	`id`	int	NOT NULL,
	`artist_id`	int	NOT NULL,
	`story_id`	int	NOT NULL,
	`type`	char(50)	NULL
);

DROP TABLE IF EXISTS `uesr`;

CREATE TABLE `uesr` (
	`id`	int	NOT NULL,
	`date`	timestamp	NULL,
	`link`	varchar(255)	NULL
);

ALTER TABLE `webtoon` ADD CONSTRAINT `PK_WEBTOON` PRIMARY KEY (
	`id`
);

ALTER TABLE `userNbti` ADD CONSTRAINT `PK_USERNBTI` PRIMARY KEY (
	`id`
);

ALTER TABLE `userAnswer` ADD CONSTRAINT `PK_USERANSWER` PRIMARY KEY (
	`id`
);

ALTER TABLE `nbti` ADD CONSTRAINT `PK_NBTI` PRIMARY KEY (
	`id`
);

ALTER TABLE `userWebtoon` ADD CONSTRAINT `PK_USERWEBTOON` PRIMARY KEY (
	`id`
);

ALTER TABLE `genre` ADD CONSTRAINT `PK_GENRE` PRIMARY KEY (
	`id`
);

ALTER TABLE `tag` ADD CONSTRAINT `PK_TAG` PRIMARY KEY (
	`id`
);

ALTER TABLE `question` ADD CONSTRAINT `PK_QUESTION` PRIMARY KEY (
	`id`
);

ALTER TABLE `answer` ADD CONSTRAINT `PK_ANSWER` PRIMARY KEY (
	`id`
);

ALTER TABLE `author` ADD CONSTRAINT `PK_AUTHOR` PRIMARY KEY (
	`id`
);

ALTER TABLE `webtoonTag` ADD CONSTRAINT `PK_WEBTOONTAG` PRIMARY KEY (
	`id`
);

ALTER TABLE `authorRole` ADD CONSTRAINT `PK_AUTHORROLE` PRIMARY KEY (
	`id`
);

ALTER TABLE `uesr` ADD CONSTRAINT `PK_UESR` PRIMARY KEY (
	`id`
);

ALTER TABLE `webtoon` ADD CONSTRAINT `FK_genre_TO_webtoon_1` FOREIGN KEY (
	`genre_id`
)
REFERENCES `genre` (
	`id`
);

ALTER TABLE `userNbti` ADD CONSTRAINT `FK_nbti_TO_userNbti_1` FOREIGN KEY (
	`nbti_id`
)
REFERENCES `nbti` (
	`id`
);

ALTER TABLE `userNbti` ADD CONSTRAINT `FK_uesr_TO_userNbti_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `uesr` (
	`id`
);

ALTER TABLE `userAnswer` ADD CONSTRAINT `FK_uesr_TO_userAnswer_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `uesr` (
	`id`
);

ALTER TABLE `userAnswer` ADD CONSTRAINT `FK_answer_TO_userAnswer_1` FOREIGN KEY (
	`answer_id`
)
REFERENCES `answer` (
	`id`
);

ALTER TABLE `userWebtoon` ADD CONSTRAINT `FK_webtoon_TO_userWebtoon_1` FOREIGN KEY (
	`webtoon_id`
)
REFERENCES `webtoon` (
	`id`
);

ALTER TABLE `userWebtoon` ADD CONSTRAINT `FK_uesr_TO_userWebtoon_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `uesr` (
	`id`
);

ALTER TABLE `answer` ADD CONSTRAINT `FK_question_TO_answer_1` FOREIGN KEY (
	`question_id`
)
REFERENCES `question` (
	`id`
);

ALTER TABLE `webtoonTag` ADD CONSTRAINT `FK_webtoon_TO_webtoonTag_1` FOREIGN KEY (
	`webtoon_id`
)
REFERENCES `webtoon` (
	`id`
);

ALTER TABLE `webtoonTag` ADD CONSTRAINT `FK_tag_TO_webtoonTag_1` FOREIGN KEY (
	`tag_id`
)
REFERENCES `tag` (
	`id`
);

ALTER TABLE `authorRole` ADD CONSTRAINT `FK_webtoon_TO_authorRole_1` FOREIGN KEY (
	`artist_id`
)
REFERENCES `webtoon` (
	`id`
);

ALTER TABLE `authorRole` ADD CONSTRAINT `FK_author_TO_authorRole_1` FOREIGN KEY (
	`story_id`
)
REFERENCES `author` (
	`id`
);

