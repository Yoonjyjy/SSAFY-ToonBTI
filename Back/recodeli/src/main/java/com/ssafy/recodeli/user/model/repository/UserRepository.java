package com.ssafy.recodeli.user.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.recodeli.user.model.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email, String password);
	Optional<User> findByNickName(String nickName);
	Optional<List<User>> findByNickNameContains(String nickName);
}	
