import requests
import pandas as pd

# Load the Excel file into a Pandas DataFrame
# set the absolute path of the excel file
df = pd.read_excel(
    '/home/ssafy/Programming/SSAFY/S08P22A302/Crawling/dummy-naver.xlsx')

# Iterate over each row of the DataFrame
# set img column and Link column
for index, row in df.iterrows():
    # Get the URL from the 'image_url' column
    url = row['Image_Source']
    print(url)
    # Send a GET request to the URL to download the image
    headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36'}
    response = requests.get(url, headers=headers)
    print(response)
    # Save the image to a file
    id = row['Link'].split('titleId=')[-1]
    with open(f'{id}.jpg', 'wb') as f:
        f.write(response.content)
