import pandas as pd
import re

# Read the CSV file
# df = pd.read_csv('naver_all.csv')
df = pd.read_csv('tags_info.csv')

# Extract the tags column
tags_col = df['tags']

# Create an empty dictionary to store the tag counts
tag_counts = {}

# Loop through each row in the tags column
for row in tags_col:

    # Use regular expression to extract only Korean characters
    korean_tags = re.findall('[가-힣]+', row)

    # Loop through each tag
    for i, tag in enumerate(korean_tags):

        # If the tag is not in the dictionary, add it with an empty inner dictionary
        if tag not in tag_counts:
            tag_counts[tag] = {}

        # Loop through each tag that appears after the current tag in the row
        for j in range(0, len(korean_tags)):
            other_tag = korean_tags[j]

            if tag == other_tag:
                continue

            # If the other tag is not in the inner dictionary, add it with a count of 1
            if other_tag not in tag_counts[tag]:
                tag_counts[tag][other_tag] = 1

            # If the other tag is already in the inner dictionary, increment its count by 1
            else:
                tag_counts[tag][other_tag] += 1

# Convert the tag_counts dictionary to a DataFrame
df = pd.DataFrame(tag_counts)

# Save the DataFrame to an Excel file
df.to_excel('tag_counts.xlsx')
