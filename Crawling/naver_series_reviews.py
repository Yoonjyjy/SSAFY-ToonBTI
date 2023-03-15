import csv
import time
from selenium import webdriver
from bs4 import BeautifulSoup

driver = webdriver.Chrome()

ifilename = 'naver_novels_review'
ofilename = '{}_all'.format(ifilename)

with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    fieldnames = reader.fieldnames + ['content'] + ['date'] + ['reviews_tags'] + ['spoiler_flag']
    
    with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            # Construct the URL using the "Link" column of the current row
            url = 'https://series.naver.com/' + row['link']

            # Load the URL in the Chrome webdriver
            driver.get(url)
            
            # Extract the HTML content of the page
            html = driver.page_source

            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')
            
            reviews = soup.select("ul.u_cbox_list")
            time.sleep(1)
            
            print(reviews)
            break