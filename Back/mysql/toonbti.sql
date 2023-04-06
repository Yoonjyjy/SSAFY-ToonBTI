use toonbti;

CREATE TABLE `author` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`name`	CHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`date`	timestamp(6) NOT NULL,
	`link`	VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `nbti` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`name`	CHAR(50)	NOT NULL,
	`content`	VARCHAR(255)	NOT NULL,
	`img`	CHAR(255)	NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `userNbti` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`nbti_id`	INT NOT NULL,
	`user_id`	INT NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_nbti_TO_userNbti_1` FOREIGN KEY (`nbti_id`)
		REFERENCES `nbti` (`id`),
	CONSTRAINT `FK_user_TO_userNbti_1` FOREIGN KEY (`user_id`)
		REFERENCES `user` (`id`)
);

CREATE TABLE `genre` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`name`	CHAR(50)	NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `webtoon` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`genre_id`	INT NULL,
	`title`	CHAR(50)	NULL,
	`img`	VARCHAR(255)	NULL,
	`platform`	CHAR(5)	NULL,
	`end_flag`	BOOLEAN	NULL,
	`rate`	INT	NULL,
	`view`	INT	NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_genre_TO_webtoon_1` FOREIGN KEY (`genre_id`)
		REFERENCES `genre` (`id`)
);

CREATE TABLE `authorRole` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `webtoon_id` INT NOT NULL,
    `story_id` INT NOT NULL,
    `type` CHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
	CONSTRAINT `FK_webtoon_TO_authorRole_1` FOREIGN KEY (`webtoon_id`)
		REFERENCES `webtoon` (`id`),
	CONSTRAINT `FK_author_TO_authorRole_1` FOREIGN KEY (`story_id`)
		REFERENCES `author` (`id`)
);

CREATE TABLE `tag` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`name`	CHAR(50)	NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `question` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`question`	VARCHAR(255)	NOT NULL,
	`img`	VARCHAR(255)	NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `userWebtoon` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`webtoon_id`	INT NOT NULL,
	`user_id`	INT NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_webtoon_TO_userWebtoon_1` FOREIGN KEY (`webtoon_id`)
		REFERENCES `webtoon` (`id`),
	CONSTRAINT `FK_user_TO_userWebtoon_1` FOREIGN KEY (`user_id`)
		REFERENCES `user` (`id`)
);

CREATE TABLE `answer` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`question_id`	INT NOT NULL,
	`answer`	VARCHAR(255)	NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_question_TO_answer_1` FOREIGN KEY (`question_id`)
		REFERENCES `question` (`id`)
);

CREATE TABLE `userAnswer` (
	`id`	INT NOT NULL AUTO_INCREMENT,
	`user_id`	INT NOT NULL,
	`answer_id`	INT NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_user_TO_userAnswer_1` FOREIGN KEY (`user_id`)
		REFERENCES `user` (`id`),
	CONSTRAINT `FK_answer_TO_userAnswer_1` FOREIGN KEY (`answer_id`)
		REFERENCES `answer` (`id`)
);

CREATE TABLE `webtoonTag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `webtoon_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`webtoon_id`) REFERENCES `webtoon`(`id`),
  FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`)
);
