import csv
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import time
import pyperclip
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

base_url = 'https://comic.naver.com/webtoon?tab=genre&genre={}'
# driver = webdriver.Chrome()
driver.get(base_url)
time.sleep(0.5)

html = driver.page_source
soup = bs(html, "html.parser")
first_login = True

# Genres = driver.find_elements(By.CLASS_NAME, "TagGroup__tag--xu0OH")
Genres = ['일상', '스릴러', '개그', '무협&사극', '드라마', '감성', '스포츠', '먼치킨', '학원로맨스', '로판', '게임판타지',  '연예계', '이세계']
Genres_for_Link = ['DAILY', 'THRILL', 'COMIC', 'HISTORICAL', 'DRAMA', 'SENSIBILITY', 'SPORTS', '먼치킨', '학원로맨스', '로판', '게임판타지', '연예계', '이세계']
# 끝난 장르 : 로맨스, 판타지, 액션

# for g in Genres:
    # filename = 'naver_webtoon_{}'.format(g)

    # with open(filename+'.csv', 'w', newline='', encoding='utf-8') as csvfile:
    #     fieldnames = ['Title', 'description', 'Link', 'Score', 'Story_author', 'Painting_author', 'Author', 'Day', 'Genre', 'Image_Source', 'isDone', 'tags']
    #     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    #     writer.writeheader()
        
        # while True:
for i in range(len(Genres_for_Link)):
    filename = 'naver_webtoon_{}'.format(Genres[i])

    with open(filename+'.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Title', 'description', 'Link', 'Score', 'Story_author', 'Painting_author', 'Author', 'Day', 'Genre', 'Image_Source', 'isDone', 'tags']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()                                    
        # 장르별 페이지 들어가기
        url = base_url.format(Genres_for_Link[i])
        driver.get(url)
        # 로드되기 기다리기
        time.sleep(2)
        if first_login:
            username = "wlsghsla94"
            password = "K1j2h31994!"
            # 로그인 버튼 클릭
            toLogin = driver.find_element('id', 'gnb_login_button')
            toLogin.click()

            time.sleep(2)
            html = driver.page_source
            soup = bs(html, "html.parser")
            # Find the username and password fields and enter the credentials
            username_field = driver.find_element('name', 'id')
            password_field = driver.find_element('name', 'pw')
            username_field.click()
            pyperclip.copy(username)
            username_field.send_keys(Keys.CONTROL, 'v')
            time.sleep(3)
            password_field.click()
            pyperclip.copy(password)
            password_field.send_keys(Keys.CONTROL, 'v')
            time.sleep(3)
            # Find and click the login button
            login_button = driver.find_element('id', 'log.login')
            login_button.click()
            first_login = False
            time.sleep(2)
            
        # scroll down to the bottom of the page to load all content

        # set the amount of scrolling you want to do
        scroll_amount = 200

        # get the height of the page
        page_height = driver.execute_script('return document.body.scrollHeight')
        # create an instance of ActionChains
        actions = ActionChains(driver)
        while True:
            # perform the scroll
            actions.send_keys(Keys.PAGE_DOWN).perform()
            
            # wait for a short time for the page to load
            time.sleep(0.5)
            
            # get the new height of the page
            # new_page_height = driver.execute_script('return document.body.scrollHeight')
            scroll_height = driver.execute_script("return window.scrollY;")
            
            # check if we've reached the bottom of the page
            if scroll_height == page_height:
                break
                
            # update the page height
            page_height = scroll_height
        # extract the HTML content
        html = driver.page_source
        soup = bs(html, "html.parser")
        
        # 웹툰 클릭 이동 위한 titles
        # titles = driver.find_elements(By.CLASS_NAME, "Poster__link--sopnC")
        # 웹툰들의 평점 정보 담은 score_nums
        score_nums = soup.select("span.Rating__star_area--dFzsb")
        for j in range(len(score_nums)):
            print("\rprocess: " + str(j + 1) + " / " + str(len(score_nums)))
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
            time.sleep(0.5)
            # 이동한 페이지의 html 코드 가져오기
            html = driver.page_source
            soup = bs(html, 'html.parser')
            
            # 이미지 정보 가져오기
            while not soup.find('img', {'class': 'Poster__image--d9XTI'}):
                time.sleep(0.1)
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
            if len(writers) == 1:
                if writers[0].find('a'):
                    story_author = writers[0].find('a').getText()
                    painting_author = writers[0].find('a').getText()
                else:
                    story_author = writers[0].find('span').getText()
                    painting_author = writers[0].find('span').getText()
                
                author = ''
            elif len(writers) == 3:
                # print('writers[0]: ', writers[0])
                # print('writers[0].find : ', writers[0].find('span'))
                # print('여기',writers[0].find('span').getText())
                if writers[0].find('a'):
                
                    story_author = writers[0].find('a').getText()
                elif writers[0].find('span'):
                    story_author = writers[0].find('span').getText()
                if writers[1].find('a'):
                    painting_author = writers[1].find('a').getText()
                elif writers[1].find('span'):
                    painting_author = writers[1].find('span').getText()
                if writers[2].find('a'):
                    author = writers[2].find('a').getText()
                elif writers[2].find('span'):
                    author = writers[2].find('span').getText()
            else:
                if writers[0].find('a'):
                    if writers[0].find('a').getText() == '글/그림':
                        story_author = writers[0].find('a').getText()
                        painting_author = writers[0].find('a').getText()
                        author = writers[1].find('a').getText()
                    else:
                        story_author = writers[0].find('a').getText()
                        painting_author = writers[1].find('a').getText()
                        author = ''
                elif writers[0].find('span'):
                    if writers[0].find('span').getText() == '글/그림':
                        story_author = writers[0].find('span').getText()
                        painting_author = writers[0].find('span').getText()
                        author = writers[1].find('span').getText()
                    else:
                        story_author = writers[0].find('span').getText()
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
            # 엑셀에 저장
            writer.writerow({'Title': title, 'description' : description, 'Link': link, 'Score' : score, 'Story_author': story_author, 'Painting_author': painting_author, 'Author': author, 'Day': day, 'Genre': genre, 'Image_Source': image, 'isDone': isDone, 'tags': ' '.join(tags_list)})
            # 뒤로가기
            driver.back()
            time.sleep(2)