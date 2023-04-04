package com.ssafy.toonbti.webtoon.model.service;

import com.ssafy.toonbti.user.model.dto.UserDTO;
import com.ssafy.toonbti.user.model.entity.User;
import com.ssafy.toonbti.user.model.entity.UserNbti;
import com.ssafy.toonbti.user.model.repository.NbtiRepositroy;
import com.ssafy.toonbti.user.model.repository.UserNbtiRepositroy;
import com.ssafy.toonbti.user.model.repository.UserRepository;
import com.ssafy.toonbti.webtoon.model.dto.WebtoonDTO;
import com.ssafy.toonbti.webtoon.model.dto.WebtoonResultDTO;
import com.ssafy.toonbti.webtoon.model.entity.UserWebtoon;
import com.ssafy.toonbti.webtoon.model.entity.Webtoon;
import com.ssafy.toonbti.webtoon.model.repository.UserWebtoonRepository;
import com.ssafy.toonbti.webtoon.model.repository.WebtoonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WebtoonService {
    private final UserWebtoonRepository userWebtoonRepository;
    private final UserRepository userRepository;
    private final UserNbtiRepositroy userNbtiRepositroy;

    public WebtoonResultDTO createResult(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        UserNbti userNbti = userNbtiRepositroy.findByUser(user);
        UserDTO userDTO = UserDTO.of(userNbti.getNbti());
        Long cnt = userWebtoonRepository.countByUser(user);
        int[] platformRatio = getPlatformRatio(user);
        int[] finishedRatio = getFinishedRatio(user);
        int[] genreList = getGenreList(user);
        return WebtoonResultDTO.of(userDTO, cnt, platformRatio, finishedRatio, genreList);
    }

    public int[] getPlatformRatio(User user) {
        int[] platfrom = new int[2]; // 0: KAKAO, 1: NAVER
        List<UserWebtoon> userWebtoonList = userWebtoonRepository.findAllByUser(user);
        for (UserWebtoon userWebtoon: userWebtoonList) {
            if(userWebtoon.getWebtoon().getPlatform().equals("KAKAO")){
                platfrom[0]++;
            }else{
                platfrom[1]++;
            }
        }
        return platfrom;
    }

    public int[] getFinishedRatio(User user) {
        int[] isEnded = new int[2]; // 0: False, 1: True
        List<UserWebtoon> userWebtoonList = userWebtoonRepository.findAllByUser(user);
        for (UserWebtoon userWebtoon: userWebtoonList) {
            if(userWebtoon.getWebtoon().isEnded()){
                isEnded[0]++;
            }else{
                isEnded[1]++;
            }
        }
        return isEnded;
    }

    public int[] getGenreList(User user) {
        /*
            장르 리스트
            0:null
            1:판타지
            2:드라마
            3:로맨스
            4:로맨스판타지
            5:현대판타지
            6:액션/무협
            7:소년/감성
            8:일상/개그
            9:공포/추리
            10:스포츠
         */
        int[] genre = new int[10];
        List<UserWebtoon> userWebtoonList = userWebtoonRepository.findAllByUser(user);
        for (UserWebtoon userWebtoon: userWebtoonList) {
            genre[Math.toIntExact(userWebtoon.getWebtoon().getGenre().getGenreId())]++;
        }
        return genre;
    }
}
