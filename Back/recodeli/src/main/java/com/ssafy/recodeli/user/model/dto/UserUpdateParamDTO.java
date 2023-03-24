package com.ssafy.recodeli.user.model.dto;

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
public class UserUpdateParamDTO {
	private String nickName;
	private String gender;
	private String age;
	
	public static UserUpdateParamDTO of(UserUpdateParamDTO userDTO) {
		return UserUpdateParamDTO.builder()
				.nickName(userDTO.getNickName())
				.gender(userDTO.getGender().charAt(0) + "")
				.age(userDTO.getAge())
				.build();
	}
}
