import csv
from selenium import webdriver
from bs4 import BeautifulSoup
import tensorflow as tf

# Path to the Chrome webdriver executable
CHROME_DRIVER_PATH = '/path/to/chromedriver'

ifilename = 'naver_novels'
ofilename = '{}_all1'.format(ifilename)

# Set TensorFlow to use GPU memory growth
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)

# Initialize the TensorFlow session and check if GPU is available
with tf.compat.v1.Session() as sess:
    if tf.test.is_gpu_available():
        print('GPU is available!')
    else:
        print('GPU is not available')

    # Open the CSV file and read its contents
    with open(ifilename+'.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile,)

        # Remember the fieldnames from the first column
        fieldnames = next(reader)

        # Skip to the 30373rd column
        for i in range(1, 30373):
            next(reader)

        # Create a list of fieldnames with the additional "Synopsis" column
        fieldnames = reader.fieldnames + ['Synopsis'] + ['isDone'] + ['Genre']

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

                # Extract the first and second div elements with class "_synopsis"
                if len(info_divs) > 1:
                    isDone = info_divs[0].text
                    Genre = info_divs[1].text
                else:
                    isDone = ''
                    Genre = ''

                if len(synopsis_divs) > 1:
                    first_synopsis_div = synopsis_divs[0]
                    second_synopsis_div = synopsis_divs[1]
                    synopsis_text = first_synopsis_div.text.strip() + '\n' + \
                        second_synopsis_div.text.strip()
                else:
                    synopsis_text = ''

                row['isDone'] = isDone
                row['Genre'] = Genre
                row['Synopsis'] = synopsis_text

                # Write the updated row to the CSV file
                writer.writerow(row)

            # Close the Chrome webdriver
            driver.quit()
