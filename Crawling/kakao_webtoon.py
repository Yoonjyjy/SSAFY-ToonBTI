from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import csv

# Start a new Selenium driver
driver = webdriver.Chrome()
url = 'https://page.kakao.com/menu/11/screen/37'
driver.get(url)
time.sleep(1)

# open the CSV file for writing
with open('kakao_novels.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Link']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    # Scroll down to the bottom of the page
    while True:
        # Scroll down by 1000 pixels
        driver.execute_script("window.scrollBy(0, 1000)")

        # Wait for some time for the new content to load
        time.sleep(1)

        # Check if the end of the page has been reached
        scroll_height = driver.execute_script(
            "return document.body.scrollHeight")
        current_scroll_position = driver.execute_script(
            "return window.pageYOffset;")
        if current_scroll_position >= scroll_height:
            break

    print("무한 스크롤 끝!")
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    # grid = driver.find_element(By.CLASS_NAME, "grid")
    # list = grid.find_elements(By.CSS_SELECTOR, 'div')

    links = soup.find_all('a', class_='css-0')

    for link in links:
        l = link.get('href')
        if l is None:
            continue
        if not l[:4] == '/con':
            continue
        # print(l)
        writer.writerow({'Link': l})
    # for item in list:
    # el = item.find_element(
    # By.CLASS_NAME, 'font-small1 break-all text-el-60 line-clamp-2')
    # print(item)
    # print(soup.find_all(
    #     'em', {'class': 'font-small1 break-all text-el-60 line-clamp-2'}))

    """
    # Scroll down to load more content
    # elem = driver.find_element_by_tag_name('body')
    # for i in range(5):
    #     elem.send_keys(Keys.PAGE_DOWN)
    #     time.sleep(1)


    # Parse the content with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Extract the scores and authors
    scores = [float(score.text.strip())
            for score in soup.find_all('em', {'class': 'score_num'})]
    authors = [author.text.strip()
            for author in soup.find_all('em', {'class': 'author'})]

    # Print the results
    for i in range(len(scores)):
        print(f'Score: {scores[i]}, Author: {authors[i]}')
    """

# Close the driver
driver.close()
