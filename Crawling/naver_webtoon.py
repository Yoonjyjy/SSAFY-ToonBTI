import csv
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

base_url = 'https://comic.naver.com/webtoon?tab=genre&genre={}'
driver = webdriver.Chrome()
driver.get(base_url)
time.sleep(0.5)

html = driver.page_source
soup = bs(html, "html.parser")

# Genres = driver.find_elements(By.CLASS_NAME, "TagGroup__tag--xu0OH")
Genres = ['로맨스', '판타지', '액션', '일상', '스릴러', '개그', '무협/사극', '드라마', '감성', '스포츠', '먼치킨', '학원로맨스', '로판', '게임판타지',  '연예계', '이세계']
Genres_for_Link = ['PURE', 'FANTASY', 'ACTION', 'DAILY', 'THRILL', 'COMIC', 'HISTORICAL', 'DRAMA', 'SENSIBILITY', 'SPORTS', '먼치킨', '학원로맨스', '로판', '게임판타지', '연예계', '이세계']
for g in Genres:
    filename = 'naver_webtoon_{}'.format(g)
    

    with open(filename+'.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Title', 'Content', 'Link', 'Score', 'Story_author', 'Painting_author', 'Author', 'Day', 'Genre', 'Image_Source', 'isDone']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        while True:
            for i in range(len(Genres_for_Link)):
                url = base_url.format(Genres_for_Link[i])
                driver.get(url)
                time.sleep(3)
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
                    time.sleep(0.5)
                    
                    # check if we've reached the bottom of the page
                    if scroll_height == page_height:
                        break
                        
                    # update the page height
                    page_height = scroll_height
                # extract the HTML content
                html = driver.page_source
                soup = bs(html, "html.parser")
                
                score_nums = soup.select("span.Rating__star_area--dFzsb")
                for i in range(len(score_nums)):
                    print(score_nums[i].get_text()[2:])
                print('aaaaaaaa', len(score_nums))
                genre = Genres[i]
                
                titles = driver.find_elements(By.CLASS_NAME, "Poster__link--sopnC")
        
                for i in range(len(titles)):
                    
                    print("\rprocess: " + str(i + 1) + " / " + str(len(titles)))
                    link = titles[i].get_attribute('href')
                    
                    titles[i].click()
                    time.sleep(0.5)
                    

            # time.sleep(0.5)

            # genres = driver.find_elements(By.CLASS_NAME, "TagGroup__tag--xu0OH")

            # for i in range(len(genres)):
            #     genres[i].click()
            #     time.sleep(0.5)
                
            #     titles = driver.find_elements(By.CLASS_NAME, "Poster__link--sopnC")
                
                    