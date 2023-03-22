import pandas as pd

# Read the CSV file
# df = pd.read_csv('data_comic.csv', dtype="string" ,low_memory=False)
df = pd.read_csv('data_comic.csv', low_memory=False, keep_default_na=False)

# Extract the tags column
# 그림작가, 글작가, 장르, 연재여부
platform =  [32, 38, 41, 72, 78, 122, 133, 142, 143, 151, 152, 157]
data = df[['pictrWritrNm','sntncWritrNm','mainGenreCdNm','pltfomCd','webtoonPusryYn']]
ban_list = ['기관발행물','정기간행물','BL','성인','학습만화','동성애','GL','']

# Create an empty dictionary to store the tag counts
authors = {}

# print(data.iloc[0]['pltfomCd'])
# print(len(data))

# Loop through each row in the tags column
# 작가 dic생성
for i in range(len(data)):
    if data.iloc[i]['pltfomCd'] not in platform:
        w = data.iloc[i]['sntncWritrNm']
        p = data.iloc[i]['pictrWritrNm']
        g = data.iloc[i]['mainGenreCdNm']

        if g in ban_list:
            continue

        writer = w.split(',')
        painter = p.split(',')

        if writer:
            for wt in writer:    
                if wt not in authors:
                    authors[wt] = {}

                if g not in authors[wt]:
                    authors[wt][g] = 1
                else:
                    authors[wt][g] += 1


        if painter:
            for pt in painter:
                if pt not in authors:
                    authors[pt] = {}

                if g not in authors[pt]:
                    authors[pt][g] = 1
                else:
                    authors[pt][g] += 1
# print(type(authors))

# # Convert the tag_counts dictionary to a DataFrame
df = pd.DataFrame(authors)

# # Save the DataFrame to an Excel file
df.to_excel('authors.xlsx')
