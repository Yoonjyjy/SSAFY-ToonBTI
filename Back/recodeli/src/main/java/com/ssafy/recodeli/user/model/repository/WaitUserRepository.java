package com.ssafy.recodeli.user.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.recodeli.user.model.entity.WaitUser;

public interface WaitUserRepository extends JpaRepository<WaitUser, Long> {
	Optional<WaitUser> findByEmail(String email);
	Optional<WaitUser> findByNickName(String nickname);
}
