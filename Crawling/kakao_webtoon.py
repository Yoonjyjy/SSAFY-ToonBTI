from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from bs4 import BeautifulSoup
import time
import csv
import os
from dotenv import load_dotenv

load_dotenv()

userid = os.environ.get("id")
password = os.environ.get("pass")

# Start a new Selenium driver
driver = webdriver.Chrome()

# login
login_url = 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fis_popup%3Dfalse%26ka%3Dsdk%252F2.1.0%2520os%252Fjavascript%2520sdk_type%252Fjavascript%2520lang%252Fko-KR%2520device%252FWin32%2520origin%252Fhttps%25253A%25252F%25252Fpage.kakao.com%26auth_tran_id%3DlF-gR.L2lF7KAzJR8ChJCD8Eoa2hPji~.XKcpM7D7at84Y3J-02Dds33oofj%26response_type%3Dcode%26state%3Dhttps%25253A%25252F%25252Fpage.kakao.com%25252Fmenu%25252F11%25252Fscreen%25252F37%25253Fsubcategory_uid%25253D86%26redirect_uri%3Dhttps%253A%252F%252Fpage.kakao.com%252Frelay%252Flogin%26through_account%3Dtrue%26client_id%3D49bbb48c5fdb0199e5da1b89de359484&talk_login=hidden#login'
driver.get(login_url)
time.sleep(1)

# Find the ID and password input fields and fill them with your credentials
id_field = driver.find_element('id', 'loginKey--1')
id_field.send_keys(userid)
password_field = driver.find_element('id', 'password--2')
password_field.send_keys(password)

# Submit the form to log in
password_field.send_keys(Keys.RETURN)
time.sleep(5)

base_url = 'https://page.kakao.com/menu/11/screen/37?subcategory_uid={}'  # novel
# base_url = 'https://page.kakao.com/menu/10/screen/14?subcategory_uid={}'  # webtoon

# novel
Genres = ['판타지', '현판', '로맨스', '로판', '무협']
GenresCode = ['86', '120', '89', '117', '87']
# webtoon
# Genres = ['소년', '드라마', '로맨스', '로판', '액션무협']
# GenresCode = ['115', '116', '121', '69', '112']

# open the CSV file for writing
with open('kakao_novels1.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Link']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    # for i in range(len(Genres)):
    for i in range(2, 4):
        url = base_url.format(GenresCode[i])
        # url = base_url.format(GenresCode[2])
        driver.get(url)
        print(url)
        time.sleep(1)

        # set the amount of scrolling you want to do
        scroll_amount = 200

        # get the height of the page
        page_height = driver.execute_script(
            'return document.body.scrollHeight')
        # create an instance of ActionChains
        actions = ActionChains(driver)
        while True:
            # perform the scroll
            actions.send_keys(Keys.PAGE_DOWN).perform()

            # wait for a short time for the page to load
            time.sleep(3)

            # get the new height of the page
            # new_page_height = driver.execute_script('return document.body.scrollHeight')
            scroll_height = driver.execute_script("return window.scrollY;")

            # check if we've reached the bottom of the page
            if scroll_height == page_height:
                break

            # update the page height
            page_height = scroll_height

        print("{} 무한 스크롤 끝!".format(Genres[i]))
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        # grid = driver.find_element(By.CLASS_NAME, "grid")
        # list = grid.find_elements(By.CSS_SELECTOR, 'div')

        links = soup.select(
            '#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div > div.flex.grow.flex-col > div.flex.grow.flex-col > div > div.flex.grow.flex-col.py-10pxr.px-15pxr > div > div > div > div > div > a')

        print(len(links))
        # print(links)
        for link in links:
            l = link.get('href')
            if l is None:
                continue
            if not l[:4] == '/con':
                continue
            # print(l)
            writer.writerow({'Link': l})
        # break

# Close the driver
driver.close()
