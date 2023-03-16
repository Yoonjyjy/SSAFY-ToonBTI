import csv
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import random

driver = webdriver.Chrome()

# 크롤링할 작품의 타이틀과 작가명이 저장된 파일
ifilename = 'naver_novel_reviews'
# 작품별 리뷰를 크롤링해서 딤을 파일
ofilename = '{}_all'.format(ifilename)

# csv 파일 오픈 시 '/ufeff'가 맨앞에 포함되어 오류 발생
# 이부분을 BOM(Byte Order mark)라고 하며 파일을 읽을 떄 이를 참고하여 데이터를 어떤 방식으로 읽을지 결정
# utf-8 -> utf-8-sig로 바꾸면 인코딩 시 BOM 부분을 알아서 걸러준다
# 크롤링할 파일을연다
with open(ifilename+'.csv', 'r', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # 리뷰를 담을 파일을 만든다
    with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
        fieldnames = reader.fieldnames + ['content'] + ['nickname'] + ['rating'] + ['date'] + ['review_tags'] + ['spoiler_flag']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # 소설넷 url
        url = 'https://sosul.network/'
        driver.get(url)
        # 리뷰가 받아진 작품 수를 셀 변수
        cnt = 0
        # 인위적으로 댓글의 태그를 넣어주기 위해 만든 tag 리스트
        artificial_tags = ['#용두사미', '#신선한', '#재밌는', '#재밌다', '#남성향', '#여성향', '#복수', '#완파', '#먹튀', '#신선', '#소름', '#반전', '#정주행', '#재관람', '#명작', '#병맛', '#오글', '#흥미', '#흥미진진', '#N회차', '#남주멋짐', '#여주멋짐', '#망작', '#존잼', '#괜츈', '#쏘쏘', '#그닥', '#중도포기', '#기승전결완벽', '#글못씀', '#인생작', '#실망', '#내용부실', '#고전명작', '#고전', '#별로', '#뻔하다', '#클리셰', '#진부', '#감동', '#달달', '#달콤', '#대리만족', '#추천', '#비추천', '#강력추천', '#달콤쌉싸름', '#필력대박' ,'#참신해요', '#묘사지림']
        # 작품들 순회하며
        for row in reader:
            print(row)
            # 검색 돋보기 클릭
            Magnifier = driver.find_element(By.CLASS_NAME, "icon-search")
            Magnifier.click()
            
            # 검색창에 타이틀 넣고 엔터
            input_title = row['title']
            search_input = driver.find_element(By.CLASS_NAME, "form-control")
            search_input.send_keys(input_title)
            search_input.send_keys(Keys.RETURN)
            
            # html 소스 긁기
            html = driver.page_source
            soup = bs(html, "html.parser")
            
            # 작품이 없다면 다음으로 진행
            if not soup.select('div', {'class': 'product'}):
                continue
            # 작품 클릭용
            book_list = driver.find_elements(By.CLASS_NAME, "product-image")
            # 작가 확인용
            book_list_2 = soup.select("section > div > div> div >div.product")
            # 검색해서 나온 작품들 순회
            if book_list_2:
                for b in range(len(book_list_2)):
                    # 각 작품의 작가정보
                    origins = book_list_2[b].find('div', {'class':'product-author'})
                    # 해당 작품에 작가가 있고 내가 가지고 있는 작가 정보와 일치한다면
                    if  origins and row['origin'] in origins.getText():
                        # 해당 작품 상세페이지로 이동
                        book_list[b].click()
                        time.sleep(0.5)
                        html = driver.page_source
                        soup = bs(html, "html.parser")
                        # 만약 리뷰가 있다면
                        if soup.select('div.comment-list'):
                            # 리뷰를 한 리스트에 담고
                            reviews = soup.select('div.comment')
                            print(len(reviews))
                            # 담은 리스트를 순회하면서 csv에 저장
                            for rv in reviews:
                                title = row['title']
                                origin = row['origin']
                                spoiler_flag = 'false'
                                nickname = rv.find('h5', {'class':'name'}).text.split()[0]
                                rating = rv.find('span', {'class':'rateit'})['data-rateit-value']
                                content = rv.find('div', {'class': 'text_holder'}).text
                                date = rv.find('span', {'class':'comment_date'}).text[:-6]
                                # 태그 리스트에서 랜덤하게 1~6개의 랜덤한 태그를 뽑아 저장
                                n = random.randint(1, 7)
                                tag_arr = random.sample(artificial_tags, n)
                                # 스포일러 div가 있으면 스포일러 플래그 true
                                if rv.find('div', {'class':'blur-effect'}):
                                    spoiler_flag = 'true'
                                    
                                print('nickname : ', nickname)
                                print('rating :', rating)
                                print('content : ', content)
                                print('tags :', ''.join(tag_arr))
                                print('spoiler_flag:', spoiler_flag)
                                print('date: ', date)
                                # csv 파일에 저장
                                writer.writerow({'title':title, 'origin': origin, 'nickname': nickname, 'rating':rating, 'content':content, 'review_tags': ''.join(tag_arr), 'spoiler_flag': spoiler_flag, 'date': date})
                            # 리뷰 긁어진 작품 수
                            cnt += 1
                            print(cnt)
                            break
                        else:
                            break