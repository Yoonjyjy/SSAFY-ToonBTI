import csv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fake_useragent import UserAgent
import pickle
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup
import multiprocessing
import time

ifilename = 'kakao_webtoons'
ofilename = '{}_all'.format(ifilename)

# login
url = 'https://page.kakao.com/'


def exec_chrom():
    options = Options()
    userAgent = UserAgent().random
    options.add_argument(f'user-agent={userAgent}')
    # options.add_argument('--incognito')
    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=options)
    # driver.maximize_window()
    driver.get(url)
    return driver


def login(driver):
    # time.sleep(60)
    # pickle.dump(driver.get_cookies(), open(
    #     "kakao_cookies.pkl", "wb"))  # 최초 로그인 후 쿠키 저장시에만
    cookies = pickle.load(open("kakao_cookies.pkl", "rb"))
    for cookie in cookies:
        # print(cookie)
        driver.add_cookie(cookie)
    driver.get(url)


def process_row(row, driver):
    # driver = exec_chrom()
    login(driver)
    # Construct the URL using the "Link" column of the current row
    base_url = 'https://page.kakao.com/' + row['Link'] + '?tab_type=about'

    # Load the URL in the Chrome webdriver
    driver.get(base_url)
    time.sleep(2)

    # Extract the HTML content of the page
    html = driver.page_source

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Find all elements
    img_srcs = soup.select_one(
        '#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.mx-auto.css-1cyn2un-ContentOverviewThumbnail > div > div > img[src]')
    title = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > span')
    authors = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.flex.items-center.justify-center.mt-4pxr.flex-col.text-el-50.opacity-100.all-child\:font-small2 > div.mt-4pxr > span')
    view = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.mt-16pxr.flex.items-center.justify-center.text-el-60.all-child\:font-small2 > span:nth-child(2)')
    score_nums = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.mt-16pxr.flex.items-center.justify-center.text-el-60.all-child\:font-small2 > span:nth-child(5)')
    age = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.mt-16pxr.flex.items-center.justify-center.text-el-60.all-child\:font-small2 > span:nth-child(7)')
    type = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.mt-16pxr.flex.items-center.justify-center.text-el-60.all-child\:font-small2 > span:nth-child(9)')
    genre = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.mt-16pxr.flex.items-center.justify-center.text-el-60.all-child\:font-small2 > span:nth-child(11)')
    day = soup.select_one('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.flex.w-320pxr.flex-col > div:nth-child(1) > div.w-320pxr.css-0 > div > div.css-0 > div.relative.text-center.mx-32pxr.py-24pxr > div.flex.items-center.justify-center.mt-4pxr.flex-col.text-el-50.opacity-100.all-child\:font-small2 > div:nth-child(1) > span')
    synopsis_divs = soup.select_one(
        '#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.ml-4px.flex.w-632pxr.flex-col > div.flex-1.bg-bg-a-20 > div.text-el-60.break-keep.py-20pxr.pt-31pxr.pb-32pxr > span')
    tags = soup.select('#__next > div > div.flex.w-full.grow.flex-col.px-122pxr > div.flex.h-full.flex-1 > div.mb-28pxr.ml-4px.flex.w-632pxr.flex-col > div.flex-1.bg-bg-a-20 > div:nth-child(1) > div.flex.flex-wrap.px-32pxr > a > button')
    tag = ''

    for t in tags:
        tag += t.text

    # print(tag)

    # print(img_srcs.get('src'))
    if img_srcs:
        row['img'] = img_srcs.get('src')
    # print(title.text)
    if title:
        row['title'] = title.text
    # print(authors.text)
    if authors:
        row['authors'] = authors.text
    # print(view.text)
    if view:
        row['view'] = view.text
    # print(score_nums.text)
    if score_nums:
        row['score'] = score_nums.text

    if genre:
        if age:
            row['age'] = age.text
    else:
        row['age'] = '전체이용가'

    # print(type.text)
    if genre:
        if type:
            row['type'] = type.text
    else:
        if age:
            row['type'] = age.text

    # print(genre.text)
    if genre:
        if genre:
            row['genre'] = genre.text
    else:
        if type:
            row['genre'] = type.text
    # print(day.text)
    if day:
        row['day'] = day.text
    # print(synopsis_divs.text)
    if synopsis_divs:
        row['synopsis'] = synopsis_divs.text
    # for tag in tags:
    #     print(tag.text)
    row['tag'] = tag
    # print()

    return row


if __name__ == '__main__':
    # print(os.cpu_count())
    # print(multiprocessing.Pool(8))
    # driver = exec_chrom()
    # Open the CSV file and read its contents
    with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)

        # Create a list of fieldnames with the additional "Synopsis" column
        fieldnames = reader.fieldnames + \
            ['img', 'title', 'authors', 'view', 'score', 'age',
                'type', 'genre', 'day', 'synopsis', 'tag']

        # Initialize the output CSV file and write the header
        with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()

            # login()
            driver = exec_chrom()
            for row in reader:
                writer.writerow(process_row(row, driver))

            # # Create a pool of worker processes
            # pool = multiprocessing.Pool(4)

            # # Process each row in parallel
            # for updated_row in pool.imap(process_row, reader):
            #     # Write the updated row to the output CSV file
            #     writer.writerow(updated_row)

            # # Close the pool of worker processes
            # pool.close()
            # pool.join()
