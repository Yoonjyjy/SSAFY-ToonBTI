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
base_url = 'https://comic.naver.com/webtoon?tab=genre'
# 페이지 띄우기
driver.get(base_url)
# 페이지 로드 기다리기
time.sleep(0.5)

# 드라이버를 사용하여 페이지의 html 소스 코드를 가져온다
html = driver.page_source
# html를 파싱하여 BeautifulSoup 객체 soup를 생성
soup = bs(html, "html.parser")
first_login = True

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
# 크롤링할 작품의 타이틀과 작가명이 저장된 파일
ifilename = 'naver_webtoon_all'
# 작품별 리뷰를 크롤링해서 딤을 파일
ofilename = '{}_getAge'.format(ifilename)
with open(ifilename+'.csv', 'r', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    
    with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
        fieldnames = reader.fieldnames + ['age']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            print(row)
            url = row['link']
            driver.get(url)
            # html 소스 긁기
            time.sleep(1)
            html = driver.page_source
            soup = bs(html, "html.parser")
            time.sleep(1)
            
            print(row['title'])
            if soup.find('span', {'class': 'ContentMetaInfo__info_item--utGrf'}):
                age = list(soup.find('span', {'class': 'ContentMetaInfo__info_item--utGrf'}).text.split('∙'))[1].strip()
                row['age'] = age
            else:
                row['age'] = ''
            writer.writerow(row)
            print(age)
    driver.quit()