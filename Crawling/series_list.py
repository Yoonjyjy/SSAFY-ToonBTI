import csv
from selenium import webdriver
from bs4 import BeautifulSoup

# initialize a webdriver instance
driver = webdriver.Chrome()

# load the webpage
base_url = "https://series.naver.com/novel/categoryProductList.series?categoryTypeCode=genre&genreCode=203&page={}"
page_num = 1
Genre = '미스터리'
filename = 'naver_novels_{}'.format(Genre)

# open the CSV file for writing
with open(filename+'.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Content', 'Link', 'Score', 'Author', 'Title', 'Genre', 'Image Source']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    while True:
        url = base_url.format(page_num)

        driver.get(url)

        # extract the HTML content
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")

        # find all the score numbers, span tags with class name "author", a tags with title attribute, and img tags with "thumbnail" class
        contents = soup.select('div.cont > h3 > a[href]')
        titles = soup.select('a[title]')
        authors = soup.select("span.author")
        score_nums = soup.select("em.score_num")
        img_srcs = soup.select('img[src]')

        # print(contents)

        # # loop through all the elements and write the data to the CSV file
        for i in range(len(score_nums)):
            content = contents[i].getText()
            link = contents[i].get('href')
            score = score_nums[i].text
            author = authors[i].text
            title = titles[i+3]["title"] if i < len(titles) else ""
            img_src = img_srcs[i+3]["src"] if i < len(img_srcs) else ""

            writer.writerow({'Content': content, 'Link': link, 'Score': score, 'Author': author, 'Title': title, 'Genre': Genre, 'Image Source': img_src})

        # break
        next_button = soup.select_one('p.pagenate > span.next > a[href]')

        if next_button is None:
            break  # no more pages
        else:
            page_num += 1  # move to the next page

# close the webdriver instance
driver.quit()
