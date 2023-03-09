import csv
from selenium import webdriver
from bs4 import BeautifulSoup
import multiprocessing

# Path to the Chrome webdriver executable
CHROME_DRIVER_PATH = '/path/to/chromedriver'

ifilename = 'naver_novels'
ofilename = '{}_all'.format(ifilename)


def process_row(row):
    # Construct the URL using the "Link" column of the current row
    url = 'https://series.naver.com/' + row['Link']

    # Initialize the Chrome webdriver
    driver = webdriver.Chrome(CHROME_DRIVER_PATH)

    # Load the URL in the Chrome webdriver
    driver.get(url)

    # Extract the HTML content of the page
    html = driver.page_source

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Find all div elements with class "_synopsis"
    info_divs = soup.select('li.info_lst > ul > li > span')
    synopsis_divs = soup.find_all('div', {'class': '_synopsis'})

    # Extract the second div element with class "_synopsis"
    if len(info_divs) > 1:
        isDone = info_divs[0].text
        Genre = info_divs[1].text
    else:
        isDone = ''
        Genre = ''

    if len(synopsis_divs) > 1:
        second_synopsis_div = synopsis_divs[1]
        synopsis_text = second_synopsis_div.text.strip()[:-2]
    else:
        synopsis_text = ''

    # Close the Chrome webdriver
    driver.quit()

    # Add the synopsis to the current row
    row['isDone'] = isDone
    row['Genre'] = Genre
    row['Synopsis'] = synopsis_text

    return row


if __name__ == '__main__':
    # Open the CSV file and read its contents
    with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)

        # Create a list of fieldnames with the additional "Synopsis" column
        fieldnames = reader.fieldnames + ['Synopsis'] + ['isDone'] + ['Genre']

        # Initialize the output CSV file and write the header
        with open(ofilename+'.csv', 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()

            # Create a pool of worker processes
            pool = multiprocessing.Pool()

            # Process each row in parallel
            for updated_row in pool.imap(process_row, reader):
                # Write the updated row to the output CSV file
                writer.writerow(updated_row)

            # Close the pool of worker processes
            pool.close()
            pool.join()
