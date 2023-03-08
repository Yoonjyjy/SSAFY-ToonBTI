import csv
from selenium import webdriver
from bs4 import BeautifulSoup

# Path to the Chrome webdriver executable
CHROME_DRIVER_PATH = '/path/to/chromedriver'

ifilename = 'naver_novels_로판'
ofilename = '{}_syn'.format(ifilename)

# Open the CSV file and read its contents
with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # Create a list of fieldnames with the additional "Synopsis" column
    fieldnames = reader.fieldnames + ['Synopsis'] + ['isDone'] + ['Genre1']
    
    # Initialize the Chrome webdriver
    driver = webdriver.Chrome(CHROME_DRIVER_PATH)
    
    # Open the same CSV file in write mode and write the updated rows with the additional "Synopsis" column
    with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            # Construct the URL using the "Link" column of the current row
            url = 'https://series.naver.com/' + row['Link']
            
            # Load the URL in the Chrome webdriver
            driver.get(url)
            
            # Extract the HTML content of the page
            html = driver.page_source
            
            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')
            
            # Find all div elements with class "_synopsis"
            info_divs = soup.select('li.info_lst > ul > li > span')
            synopsis_divs = soup.find_all('div', {'class': '_synopsis'})

            # print(info_divs)
            # break
            # Extract the second div element with class "_synopsis"
            if len(info_divs) > 1:
                isDone = info_divs[0].text
                Genre = info_divs[1].text
            else:
                isDone = ''
                Genre = ''
            # print(isDone)
            # print(Genre)
            # break

            # # Extract the second div element with class "_synopsis"
            if len(synopsis_divs) > 1:
                second_synopsis_div = synopsis_divs[1]
                synopsis_text = second_synopsis_div.text.strip()[:-2]
            else:
                synopsis_text = ''
            
            row['isDone'] = isDone
            row['Genre1'] = Genre
            # Add the synopsis to the current row
            row['Synopsis'] = synopsis_text
            
            # Write the updated row to the CSV file
            writer.writerow(row)
            break
        
    # Close the Chrome webdriver
    driver.quit()
