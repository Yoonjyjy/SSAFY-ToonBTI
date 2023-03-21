import pandas as pd

# Read the CSV file
df = pd.read_csv('title_keyword.csv')

# Extract the tags column
data = df[['title', 'nouns']]
# print(data.iloc[:, :1])
nouns = data.iloc[:, 1:]

count_per_title = data.groupby(['title']).count()

for i in range(len(nouns)):
    
# # Create an empty dict
# # Convert the tag_counts dictionary to a DataFrame
# df = pd.DataFrame(tag_counts)

# # Save the DataFrame to an Excel file
# df.to_excel('title_counts.xlsx')
