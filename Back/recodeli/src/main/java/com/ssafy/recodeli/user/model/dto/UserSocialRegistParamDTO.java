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

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserSocialRegistParamDTO {
	private String email;
	private String nickname;
	private String gender;
	private String age;
	private String social;
	
	public static User of(UserSocialRegistParamDTO userDTO) {
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
