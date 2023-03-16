import csv
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from bs4 import BeautifulSoup as bs

driver = webdriver.Chrome()

ifilename = 'naver_novel_reviews'
ofilename = '{}_all'.format(ifilename)

with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    fieldnames = reader.fieldnames + ['content'] + ['rating'] + ['date'] + ['reviews_tags'] + ['spoiler_flag']
    
    with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        url = 'https://sosul.network/'
        driver.get(url)
        
        for row in reader:
            Magnifier = driver.find_element(By.CLASS_NAME, "icon-search")
            Magnifier.click()
            
            input_title = row['title']
            search_input = driver.find_element(By.CLASS_NAME, "form-control")
            search_input.send_keys(input_title)
            search_input.send_keys(Keys.RETURN)
            
            html = driver.page_source
            soup = bs(html, "html.parser")
            
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
                            # 담은 리스트를 순회함녀서 csv에 저장
                            for rv in reviews:
                                print(rv.text)
                            break
                        else:
                            break
            
                # if b.find('div', {'class':'product-author'}) == row['origin']:
                #     b.click()
                #     break
            
            
            
            
            
            # print(row)
            # Construct the URL using the "Link" column of the current row
            # url = 'https://series.naver.com/' + row['link']

            # # Load the URL in the Chrome webdriver
            # driver.get(url)
            
            # # Extract the HTML content of the page
            # html = driver.page_source

            # # Parse the HTML content using BeautifulSoup
            # soup = BeautifulSoup(html, 'html.parser')
            
            # reviews = soup.select("ul.u_cbox_list")
            # time.sleep(1)
            
            # print(reviews)
            # break