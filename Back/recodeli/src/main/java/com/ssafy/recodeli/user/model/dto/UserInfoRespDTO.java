package com.ssafy.recodeli.user.model.dto;

import javax.validation.constraints.Size;

import com.ssafy.recodeli.user.model.entity.User;
import com.ssafy.recodeli.user.model.vo.ProviderType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserInfoRespDTO {
	private String email;
	private String nickName;
	private String age;
	private String userGender;
	private String social;

	public static UserInfoRespDTO of(User user) {
		String gender = user.getGender();
		if (gender.equals("f")) gender = "female";
		else if (gender.equals("m")) gender = "male";
		else gender = "none";

		String social = "origin";
		@Size(min = 1, max = 1)
		ProviderType beforeSocial = user.getSocial();
		if (beforeSocial.equals(ProviderType.N))
			social = "naver";
		else if (beforeSocial.equals(ProviderType.K))
			social = "kakao";
		else if (beforeSocial.equals(ProviderType.G))
			social = "google";
		return UserInfoRespDTO.builder()
				.email(user.getEmail())
				.nickName(user.getNickName())
				.age(user.getUserAge())
				.userGender(gender)
				.social(social)
				.build();
	}
}
