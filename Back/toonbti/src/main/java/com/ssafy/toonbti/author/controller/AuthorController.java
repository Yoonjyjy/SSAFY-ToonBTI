package com.ssafy.toonbti.author.controller;

import com.ssafy.toonbti.author.model.entity.Author;
import com.ssafy.toonbti.author.model.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import javax.validation.Valid;

@Controller
@Slf4j
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    /***
     * 작가 정보 반환
     * @param authorId
     * @return
     */
    @QueryMapping
    public Author getAuthor(@Argument @Valid Integer authorId){
        return authorService.getAuthor(authorId);
    }
}
