import requests
import pandas as pd

# Load the Excel file into a Pandas DataFrame
# set the absolute path of the excel file
df = pd.read_excel(
    '/home/ssafy/Programming/SSAFY/S08P22A302/Crawling/dummy.xlsx')

# Iterate over each row of the DataFrame
# set img column and Link column
for index, row in df.iterrows():
    # Get the URL from the 'image_url' column
    url = row['img']
    # Send a GET request to the URL to download the image
    response = requests.get(url)
    # Save the image to a file
    id = row['Link'].split('/content/')[-1]
    with open(f'{id}.jpg', 'wb') as f:
        f.write(response.content)
