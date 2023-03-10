import csv
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import time
import pyperclip
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

# 크롬 드라이버 객체를 생성
driver = webdriver.Chrome()
# 네이버 웹툰 BASE_URL
base_url = 'https://comic.naver.com/webtoon?tab=genre&genre={}'
# 페이지 띄우기
driver.get(base_url)
# 페이지 로드 기다리기
time.sleep(0.5)

# 드라이버를 사용하여 페이지의 html 소스 코드를 가져온다
html = driver.page_source
# html를 파싱하여 BeautifulSoup 객체 soup를 생성
soup = bs(html, "html.parser")
# 최초 로그인 위한 변수
first_login = True

# 크롤링할 장르 정보
Genres = ['로맨스', '판타지', '액션', '일상', '스릴러', '개그', '무협&사극', '드라마', '감성', '스포츠', '먼치킨', '학원로맨스', '로판', '게임판타지',  ]
# 실제 URL에 들어갈 장르 정보
Genres_for_Link = ['PURE', 'FANTASY', 'ACTION', 'DAILY', 'THRILL', 'COMIC', 'HISTORICAL', 'DRAMA', 'SENSIBILITY', 'SPORTS', '먼치킨', '학원로맨스', '로판', '게임판타지', '연예계', '이세계']

# 장르 전체를 순회하면서
for i in range(len(Genres_for_Link)):
    # 해당 장르의 csv 파일을 생성
    filename = 'naver_webtoon_{}'.format(Genres[i])

    with open(filename+'.csv', 'w', newline='', encoding='utf-8') as csvfile:
        # csv 파일에 들어갈 칼럼(필드)를 생성
        fieldnames = ['Title', 'description', 'Link', 'Score', 'Story_author', 'Painting_author', 'Author', 'Day', 'Genre', 'Image_Source', 'isDone', 'tags']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
                                            
        # 장르별 페이지 들어가기
        url = base_url.format(Genres_for_Link[i])
        driver.get(url)
        # 페이지 로드 기다리기
        time.sleep(2)
        
        # 최초 로그인
        if first_login:
            username = "wlsghsla94"
            password = "K1j2h31994!"
            # 로그인 버튼 클릭
            toLogin = driver.find_element('id', 'gnb_login_button')
            toLogin.click()

            # 로그인 화면 뜨기 기다리기
            time.sleep(1)
            html = driver.page_source
            soup = bs(html, "html.parser")
            
            ## 클릭, 복사, 붙여넣기 식의 이유는 자동입력 방지의 회피하기 위함
            # 아이디 입력 태그 찾기
            username_field = driver.find_element('name', 'id')
            # 입력칸 클릭
            username_field.click()
            # 아이디를 복사
            pyperclip.copy(username)
            # 입력창에 붙여넣기
            username_field.send_keys(Keys.CONTROL, 'v')
            # 1초 기다리기
            time.sleep(1)
            
            password_field = driver.find_element('name', 'pw')
            password_field.click()
            pyperclip.copy(password)
            password_field.send_keys(Keys.CONTROL, 'v')
            time.sleep(1)
            # 로그인 버튼 클릭
            login_button = driver.find_element('id', 'log.login')
            login_button.click()
            first_login = False
            time.sleep(1)
            

        # 스크롤 할 양
        scroll_amount = 200

        # 현재 페이지 전체의 높이를 계산
        page_height = driver.execute_script('return document.body.scrollHeight')
        # create an instance of ActionChains
        actions = ActionChains(driver)
        while True:
            # 스크롤 다운
            actions.send_keys(Keys.PAGE_DOWN).perform()
            
            # 로드 되는 것 기다리기
            time.sleep(0.5)
            
            # 현재 스크롤 바의 위치 계산
            scroll_height = driver.execute_script("return window.scrollY;")
            
            # 현재 스크롤바의 높이와 전체 페이지의 높이가 같다면 break
            # 같다면 더이상 로드할 것이 없이 끝까지 스크롤 됐다는 의미
            if scroll_height == page_height:
                break
                
            # 현재의 스크롤바 높이를 페이지 전체 높이와 동기화
            page_height = scroll_height
            
        # 각 장르별 페이지 소스 가져오기 및 파싱
        html = driver.page_source
        soup = bs(html, "html.parser")
        
        # 웹툰들의 평점 정보 담은 score_nums
        score_nums = soup.select("span.Rating__star_area--dFzsb")
        # 웹툰 수 만큼 순회
        for j in range(len(score_nums)):
            print("\rprocess: " + str(j + 1) + " / " + str(len(score_nums)))
            # 웹툰 상세페이지 이동을 위한 titles
            titles = driver.find_elements(By.CLASS_NAME, "Poster__link--sopnC")
            print(len(titles))
            # 웹툰 상세페이지 가기전 해당 웹툰의 평점, 장르, 링크 담기
            score = score_nums[j].get_text()[2:]
            genre = Genres[i]
            link = titles[j].get_attribute('href')

            # 19금 건너뛰기
            # if titles[j].text == '청유물':
            #     continue

            # 상세 페이지 이동
            titles[j].click()
            # 상세 페이지 로드되기 기자리기
            time.sleep(0.5)
            # 이동한 페이지의 html 코드 가져오기
            html = driver.page_source
            soup = bs(html, 'html.parser')
            
            # 이미지 정보 가져오기
            while not soup.find('img', {'class': 'Poster__image--d9XTI'}):
                # 혹시 시간 이슈로 이미지 태그를 못 불러올 수 있기 떄문에
                # 불러올 떄까지 기다리기
                time.sleep(0.1)
            # 이미지 url 가져오기
            image = soup.find('img', {'class': 'Poster__image--d9XTI'})['src']
            # 제목 정보 가져오기
            title = soup.find('h2', {'class': 'EpisodeListInfo__title--mYLjC'}).text
            # 요일 정보, 완결여부 정보 가져오기
            days = soup.select('nav > ul > li > a.SubNavigationBar__link--PXX5B[aria-current]')
            for d in days:
                if d.get('aria-current') == "true":
                    if d.getText() != "완결":
                        day = d.getText()
                        isDone = "False"
                    else:
                        day = ''
                        isDone = "True"
            # 작가 정보 가져오기
            writers = soup.select('div.ContentMetaInfo__meta_info--GbTg4 > span.ContentMetaInfo__category--WwrCp')
            # 작가정보가 하나라면 (글/그림)
            if len(writers) == 1:
                # a 태그일 시
                if writers[0].find('a'):
                    story_author = writers[0].find('a').getText()
                    painting_author = writers[0].find('a').getText()
                # span 태그일 시
                else:
                    story_author = writers[0].find('span').getText()
                    painting_author = writers[0].find('span').getText()
                author = ''
            # 작가정보가 3개라면(글, 그림, 원작)
            elif len(writers) == 3:
                #글 작가가 a 태그일 시
                if writers[0].find('a'):
                    story_author = writers[0].find('a').getText()
                # 글 작가가 span 태그일 시
                elif writers[0].find('span'):
                    story_author = writers[0].find('span').getText()
                # 그림 작가가 a 태그일 시
                if writers[1].find('a'):
                    painting_author = writers[1].find('a').getText()
                # 그림 작가가 span 태그일 시
                elif writers[1].find('span'):
                    painting_author = writers[1].find('span').getText()
                # 원작 작가가 a 태그일 시
                if writers[2].find('a'):
                    author = writers[2].find('a').getText()
                # 원작 작가가 span 태그일 시
                elif writers[2].find('span'):
                    author = writers[2].find('span').getText()
            # 작가정보가 2개라면(글, 그림 or 글/그림, 원작)
            else:
                # 글/그림, 원작이고 글/그림이 a 태그일 시
                if writers[0].find('a'):
                    if writers[0].find('a').getText() == '글/그림':
                        story_author = writers[0].find('a').getText()
                        painting_author = writers[0].find('a').getText()
                        # 원작 작가가 a 태그일 시
                        if writers[1].find('a'):
                            author = writers[1].find('a').getText()
                        # 원작 작가가 span 태그일 시
                        else:
                            author = writers[1].find('span').getText()
                    # 글, 그림일 시 글 작가가 a 태그일 시
                    else:
                        story_author = writers[0].find('a').getText()
                        # 그림 작가가 a 태그일 시
                        if writers[1].find('a'):
                            painting_author = writers[1].find('a').getText()
                        # 그림 작가가 span 태그일 시
                        else:
                            painting_author = writers[1].find('span').getText()
                        author = ''
                #글/그림, 원작이고 글/그림이 span 태그일 시
                else:
                    if writers[0].find('span').getText() == '글/그림':
                        story_author = writers[0].find('span').getText()
                        painting_author = writers[0].find('span').getText()
                        # 원작 작가가 a 태그일 시
                        if writers[1].find('a'):
                            author = writers[1].find('a').getText()
                        # 원작 작가가 span 태그일 시
                        else:
                            author = writers[1].find('span').getText()
                    # 글, 그림이고 글 작가가 span 태그일 시
                    else:
                        story_author = writers[0].find('span').getText()
                        # 그림 작가가 a 태그일 시
                        if writers[1].find('a'):
                            painting_author = writers[1].find('a').getText()
                        # 그림 작가가 span 태그일 시
                        else:
                            painting_author = writers[1].find('span').getText()
                        author = ''
            
            # 작품소개 정보 가져오기
            description = soup.select('p.EpisodeListInfo__summary--Jd1WG')[0].getText()
            
            # 태그 정보 가져오기
            tags = soup.select('a.TagGroup__tag--xu0OH')
            tags_list = []
            for t in tags:
                tag = t.getText()
                tags_list.append(tag)
            print(score, genre, image, title, day, isDone, story_author, painting_author, author, description, ' '.join(tags_list))
            # csv 파일에 저장
            writer.writerow({'Title': title, 'description' : description, 'Link': link, 'Score' : score, 'Story_author': story_author, 'Painting_author': painting_author, 'Author': author, 'Day': day, 'Genre': genre, 'Image_Source': image, 'isDone': isDone, 'tags': ' '.join(tags_list)})
            # 뒤로가기
            driver.back()
            time.sleep(2)