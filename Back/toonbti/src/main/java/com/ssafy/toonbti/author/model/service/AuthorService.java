package com.ssafy.toonbti.author.model.service;

import com.ssafy.toonbti.author.model.entity.Author;
import com.ssafy.toonbti.author.model.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthorService {
    private AuthorRepository authorRepository;

    public Author getAuthor(long authorId) {
        return authorRepository.findAuthorByAuthorId(authorId).orElseThrow(NoSuchElementException::new);
    }
}
