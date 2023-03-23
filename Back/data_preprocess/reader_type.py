import pandas as pd
import re

# Read the CSV file
# df = pd.read_csv('data_comic.csv', dtype="string" ,low_memory=False)
df = pd.read_csv('reader_type_test.csv', low_memory=False, keep_default_na=False)

person_type = {}

for d in df:
    idx = int(d.split(' ')[1])
    type = df.iloc[idx][1]
    # print(type)
    if type not in person_type:
        person_type[type] = {}
    # print(df.iloc[idx].size)
    for i in range(2,74):
        if df.iloc[idx][i]:
            # print(df.iloc[idx][i])
            if df.iloc[idx][i] not in person_type[type]:
                person_type[type][df.iloc[idx][i]] = 1
            else:
                person_type[type][df.iloc[idx][i]] += 1

df = pd.DataFrame(person_type)

df.to_excel('reader_type.xlsx')