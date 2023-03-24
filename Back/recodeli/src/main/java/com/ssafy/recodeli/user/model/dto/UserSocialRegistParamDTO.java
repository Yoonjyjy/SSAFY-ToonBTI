package com.ssafy.recodeli.user.model.dto;

import com.ssafy.recodeli.user.model.entity.User;
import com.ssafy.recodeli.user.model.vo.ProviderType;
import com.ssafy.recodeli.user.model.vo.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserSocialRegistParamDTO {

	@NotNull(message = "email를 입력해주세요")
	@Email
	private String email;

	@NotNull(message = "별명을 입력해주세요")
	private String nickname;

	@NotNull(message = "성별을 입력해주세요")
	private String gender;

	@NotNull(message = "나이대를 입력해주세요")
	private String age;

	@NotNull(message = "소셜종류가 null입니다")
	private String social;

	public static User of(UserSocialRegistParamDTO userDTO) {
		System.out.println("userdto:" + userDTO);
		String receivedSocial = userDTO.getSocial().toUpperCase();
		if (receivedSocial.equals("K")) {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userAge(userDTO.getAge())
					.social(ProviderType.K)
					.roleType(RoleType.USER)
					.build();
		} else if (receivedSocial.equals("G")) {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userAge(userDTO.getAge())
					.social(ProviderType.G)
					.roleType(RoleType.USER)
					.build();
		} else {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userAge(userDTO.getAge())
					.social(ProviderType.N)
					.roleType(RoleType.USER)
					.build();
		}
	}
}
