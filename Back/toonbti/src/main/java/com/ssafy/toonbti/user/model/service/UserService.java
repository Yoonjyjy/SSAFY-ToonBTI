package com.ssafy.toonbti.user.model.service;

import com.ssafy.toonbti.user.model.dto.TypeAnswerDTO;
import com.ssafy.toonbti.user.model.dto.UserAnswerDTO;
import com.ssafy.toonbti.user.model.dto.UserDTO;
import com.ssafy.toonbti.user.model.dto.UserResultDTO;
import com.ssafy.toonbti.user.model.entity.Nbti;
import com.ssafy.toonbti.user.model.entity.User;
import com.ssafy.toonbti.user.model.entity.UserNbti;
import com.ssafy.toonbti.user.model.repository.UserNbtiRepositroy;
import com.ssafy.toonbti.user.model.repository.UserRepository;
import com.ssafy.toonbti.user.model.repository.NbtiRepositroy;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
	public static final Logger logger = LoggerFactory.getLogger(UserService.class);
	private final UserRepository userRepository;
	private final UserNbtiRepositroy userNbtiRepositroy;
	private final NbtiRepositroy nbtiRepositroy;

	/**
	 * 유형별 관계 조회
	 * @param userType
	 * @return TypeAnswerDTO
	 */
	public TypeAnswerDTO getByType(String userType) {
		Nbti nbti = nbtiRepositroy.findByName(userType);
		UserDTO myType = UserDTO.of(nbti);
		UserDTO bestType = getByBest(userType);
		UserDTO worstType = getByWorst(userType);
		return TypeAnswerDTO.of(myType, bestType, worstType, getByRank(1), getByRank(2));
	}

	/***
	 * 가장 잘 맞는 유형 찾기
	 * @param userType
	 * @return UserDTO
	 */
	public UserDTO getByBest(String userType) {
		Nbti nbti = nbtiRepositroy.findByName(userType);
		return UserDTO.of(nbtiRepositroy.findByNbtiId(nbti.getBestTypeId()));
	}

	/***
	 * 가장 안 맞는 유형 찾기
	 * @param userType
	 * @return UserDTO
	 */
	public UserDTO getByWorst(String userType) {
		Nbti nbti = nbtiRepositroy.findByName(userType);
		return UserDTO.of(nbtiRepositroy.findByNbtiId(nbti.getWorstTypeId()));
	}

	/***
	 * 유형의 랭킹 찾기
	 * @param ranking
	 * @return ranking(숫자)에 해당하는 유형 반환
	 */
	public UserDTO getByRank(int ranking) {
		// 16가지 유형이 아닌경우 반환
		if(ranking < 0 || ranking >= 16) return null;
		// 16가지 유형 많은 순으로 가져오기
		List<Object[]> objects = userNbtiRepositroy.getRanking();
		//
		int type = (int) objects.get(ranking - 1)[0];
		Long Type = (long) type;
		Nbti userType = nbtiRepositroy.findByNbtiId(Type);
		return UserDTO.of(userType);
	}

	/***
	 * 사용자의 답을 받아 사용자 유형을 찾고 사용자 Nbti 결과 페이지에 들어가는 요소 반환
	 * @param userAnswerDTO
	 * @return myType, bestType, worstType, Top1, Top2
	 */
	public UserResultDTO addUserResponse(UserAnswerDTO userAnswerDTO) {
		//유저 uuid 생성
		String uuid = UUID.randomUUID().toString();
		User inputUser = User.builder()
				.uuid(uuid)
				.date(LocalDateTime.now())
				.build();
		//유저 정보 저장
		logger.info("유저정보 저장 inputUser: {}", inputUser.toString());
		User user = userRepository.save(inputUser);
		// 내 유형 찾기
		UserDTO myUser = getUser(userAnswerDTO, user);
		UserDTO bestType = getByBest(myUser.getUserType());
		UserDTO worstType = getByWorst(myUser.getUserType());
		return UserResultDTO.of(user.getUserId(), uuid, myUser, bestType, worstType, getByRank(1), getByRank(2));
	}

	/***
	 * 유저 저장, 유저 유형 계산, 유저 유형 저장
	 * @param userAnswerDTO, user
	 * @return 사용자가 해당하는 유형 반환
	 */
	public UserDTO getUser(UserAnswerDTO userAnswerDTO, User user) {
		List<String> answers = userAnswerDTO.getAnswers();
		//유저 유형 계산
		String type = caclulateType(answers);
		//유저 유형 찾아오기
		Nbti nbti = nbtiRepositroy.findByName(type);

		UserNbti userNbti = UserNbti.builder()
				.nbti(nbti)
				.user(user)
				.build();
		//유저 유형 저장
		userNbtiRepositroy.save(userNbti);

		return UserDTO.of(nbtiRepositroy.findByName(type));
	}

	/***
	 * 모든 유형 반환
	 * @return 리스트 형태의 유형
	 */
	public List<UserDTO> getAllTypes() {
		// 모든 유형 찾아오기
		List<Nbti> nbtiList = nbtiRepositroy.findAll();
		List<UserDTO> userDTOList = nbtiList.stream().map(n -> UserDTO.of(n)).collect(Collectors.toList());

		// 모든 유형에 자신의 유형의 갯수 저장
		for (int i = 0; i < nbtiList.size(); i++) {
			Nbti nbti = nbtiRepositroy.findByName(nbtiList.get(i).getName());
			userDTOList.get(i).setCount(userNbtiRepositroy.countByNbti(nbti));
		}
		logger.info("userDTOList : {}",userDTOList);
		return userDTOList;
	}

	/***
	 * 전체 사용자 수 반환
	 * @return long형의 사용자 수 반환
	 */
	public long getUserCounts() {
		return userRepository.count();
	}

	/***
	 * 사용자 유형을 answers 리스트의 항목을 통해 계산 후 반환
	 * @param answers 답 리스트
	 * @return String 사용자 유형
	 */
	private static String caclulateType(List<String> answers) {
		// 0: LH, 1: RE, 2: SW, 3: AT
		/*
		계산식
		0 a3 b2 c-2 d-3 L | H
		5 a4 b1 c-1 d-4 L | H

		1 a3 b-3 c-3 d1 e-3 R | E
		3 a4 b2 c-2 d-4 R | E

		4 a3 b-2 c2 d-3 A | T
		6 a4 b1 c-1 d-4 A | T

		2 a2 b2 c-2 d-1  S | W
		7 a3 b4 c-3 d-4 S | W
		 */
		int[] type = new int[4];
		for (int i = 0; i < answers.size(); i++) {
			switch (i){
				case 0:
					if (answers.get(i).equals("a"))
						type[0] += 3;
					else if (answers.get(i).equals("b"))
						type[0] += 2;
					else if (answers.get(i).equals("c"))
						type[0] -= 2;
					else if (answers.get(i).equals("d"))
						type[0] -= 3;
					break;
				case 1:
					if (answers.get(i).equals("a"))
						type[1] += 3;
					else if (answers.get(i).equals("b"))
						type[1] -= 3;
					else if (answers.get(i).equals("c"))
						type[1] -= 3;
					else if (answers.get(i).equals("d"))
						type[1] += 1;
					else if (answers.get(i).equals("e"))
						type[1] -= 3;
					break;
				case 2:
					if (answers.get(i).equals("a"))
						type[2] += 2;
					else if (answers.get(i).equals("b"))
						type[2] += 2;
					else if (answers.get(i).equals("c"))
						type[2] -= 2;
					else if (answers.get(i).equals("d"))
						type[2] -= 1;
					break;
				case 3:
					if (answers.get(i).equals("a"))
						type[1] += 4;
					else if (answers.get(i).equals("b"))
						type[1] += 2;
					else if (answers.get(i).equals("c"))
						type[1] -= 2;
					else if (answers.get(i).equals("d"))
						type[1] -= 4;
					break;
				case 4:
					if (answers.get(i).equals("a"))
						type[3] += 3;
					else if (answers.get(i).equals("b"))
						type[3] -= 2;
					else if (answers.get(i).equals("c"))
						type[3] += 2;
					else if (answers.get(i).equals("d"))
						type[3] -= 3;
					break;
				case 5:
					if (answers.get(i).equals("a"))
						type[0] += 4;
					else if (answers.get(i).equals("b"))
						type[0] += 1;
					else if (answers.get(i).equals("c"))
						type[0] -= 1;
					else if (answers.get(i).equals("d"))
						type[0] -= 4;
					break;
				case 6:
					if (answers.get(i).equals("a"))
						type[3] += 4;
					else if (answers.get(i).equals("b"))
						type[3] += 1;
					else if (answers.get(i).equals("c"))
						type[3] -= 1;
					else if (answers.get(i).equals("d"))
						type[3] -= 4;
					break;
				case 7:
					if (answers.get(i).equals("a"))
						type[2] += 3;
					else if (answers.get(i).equals("b"))
						type[2] += 4;
					else if (answers.get(i).equals("c"))
						type[2] -= 3;
					else if (answers.get(i).equals("d"))
						type[2] -= 4;
					break;
			} // end of switch
		} // end of for
		String result = "";
		if(type[0] > 0) result += "L";
		else result += "H";
		if(type[2] > 0) result += "S";
		else result += "W";
		if(type[1] > 0) result += "R";
		else result += "E";
		if(type[3] > 0) result += "A";
		else result += "T";

		return result;
	} // end of caclulateType method
}
