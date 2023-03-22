import pandas as pd

# Read the CSV file
# df = pd.read_csv('data_comic.csv', dtype="string" ,low_memory=False)
df = pd.read_csv('reader_type_test.csv', low_memory=False, keep_default_na=False)

print(df)
