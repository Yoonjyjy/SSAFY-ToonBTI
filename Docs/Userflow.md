# User Flow

# MBTI형 검사 통계제공

### Input: 웹툰/만화를 N개 선택

- 선택시 9개 화면에서 특정한 한개를 선택 시, 그 선택과 비슷한 컨텐츠 추가 3~5개 제공
  - 토스 주식 선택 / 유투브 아티스트 선택과 비슷하게
- 키워드 검색
  - 웹툰/만화에 많이 등장하는 태그 및 단어를 (100개 정도) 유사도 테이블을 만들어 저장
  - 사용자가 입력한 단어가 유사도 테이블에 없을 경우, 국어사전 api에서 유의어를 찾아서 진행

### Output: 인바디식 통계제공

- 사용자 유형 표시
  - mbti처럼 특정 유형과 몇 퍼센트가 그 유형에 속하는지 표시
- 사용자가 많이 본 장르
  - 그래프를 사용하여 표시
- 플랫폼 비율 (카카오 / 네이버)
- 같은 유형 사용자가 선호하는 작품 표시
  - 연재 중인 작품 / 완결 작품 나눠서 표시
  - 작품이 특정 유형에 몇 퍼센트 유사한지 표기
- 같은 유형 사용자가 선호한 작가 정보 표시
  - 작가명
  - 작가가 연재한 작품
  - 작가가 많이 연재한 장르
  - 작가가 많이 연재한 분위기
- 비슷한 유형의 작가 정보 표시
- 나의 덕력 퍼센트로 표시 (장르, 키워드, 분위기 등)
- 검색 키워드와 유사 키워드를 가진 작품 표시
- 로그인 한 사용자:
  - 나의 웹툰 인바디를 저장해서 과거 정보 볼 수 있게 표시
  - 선호 장르 변화 정보 그래프로 볼 수 있게 하기