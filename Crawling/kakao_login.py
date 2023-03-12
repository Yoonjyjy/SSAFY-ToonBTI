from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fake_useragent import UserAgent
import pickle
from webdriver_manager.chrome import ChromeDriverManager
import time

url = 'https://page.kakao.com/'


def exec_chrom():
    options = Options()
    userAgent = UserAgent().random
    options.add_argument(f'user-agent={userAgent}')
    # options.add_argument('--incognito')
    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    driver.get(url)
    return driver


def login(driver):
    # time.sleep(60)
    # pickle.dump(driver.get_cookies(), open(
    #     "kakao_cookies.pkl", "wb"))  # 최초 로그인 후 쿠키 저장시에만
    cookies = pickle.load(open("kakao_cookies.pkl", "rb"))
    for cookie in cookies:
        print(cookie)
        driver.add_cookie(cookie)
    driver.get(url)
    time.sleep(60)


def main():
    driver = exec_chrom()
    login(driver)


if __name__ == "__main__":
    main()
