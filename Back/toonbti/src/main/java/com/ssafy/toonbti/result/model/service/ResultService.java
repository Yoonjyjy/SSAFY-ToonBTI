package com.ssafy.toonbti.result.model.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final Logger logger = LoggerFactory.getLogger(ResultService.class);
    private String path = "/home/ubuntu/result"; //TODO:: path

    /**
     * 사용자 결과 정보 파일로 저장
     * @param data 사용자 결과 정보
     * @param uuid 사용자 uuid
     */
    public void saveResultJsonFile(String data, String uuid) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(path+uuid+".txt"));
            writer.write(data);
            writer.close();
            logger.info("파일이 성공적으로 저장되었습니다.");
        } catch (IOException e) {
            logger.error("파일 저장 중 오류가 발생하였습니다: " + e.getMessage());
        }
    }

    /**
     * 사용자 결과 정보 조회
     * @param uuid 사용자 uuid
     * @return 사용자 결과 정보
     */
    public String getResultJsonFile(String uuid) {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(path+uuid+".txt"))) {
            sb.append(reader.readLine());
            logger.info("file data : {}", sb.toString());
        } catch (IOException e) {
            logger.error("파일 읽기 중 오류가 발생하였습니다: " + e.getMessage());
        }
        return sb.toString();
    }
}
