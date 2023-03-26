import pandas as pd

# Read the CSV file
df = pd.read_excel('태그통계1.xlsx', keep_default_na=False)
kakao_df = pd.read_csv('./kakao_webtoon.csv', low_memory=False, keep_default_na=False)
naver_df = pd.read_csv('./nver_webtoon.csv', low_memory=False, keep_default_na=False)

kakao = kakao_df[['title', 'authors', 'view', 'score','age','type','genre','day','synopsis','tag']]
naver = naver_df[['Title', 'description', 'Link', 'Score', 'Story_author', 'Painting_author', 'Author', 'Day', 'Genre', 'Image_Source', 'isDone','tags']]

data = df[['대분류', '소분류']]
# print(data.loc[:, '대분류'])
bGenre = list(data.loc[:, '대분류'])
sGenre = list(data.loc[:, '소분류'])


# print(kakao.loc[:, 'tag'][0].split('#'))

# print(naver.loc[:, 'Genre'])

for i in range(len(kakao.loc[:, 'tag'])):
    ta = kakao.loc[:, 'tag'][i].split('#')
    for t in range(len(ta)):
        for j in range(len(sGenre)):
            if ta[t] == sGenre[j]:
                if bGenre[j] != '':
                    ta[t] = bGenre[j]
    kakao.at[i, 'tag'] = ta

# for i in range(len(naver.loc[:, 'tags'])):
#     for j in range(len(sGenre)):
#         if naver.loc[:, 'tags'][i] == sGenre[j]:
#             if bGenre[j] != '':
#                 naver.at[i, 'tags'] = bGenre[j]


print(kakao)
# naver.to_excel('naver_tag_changed.xlsx')
# kakao.to_excel('kakao_tag_changed.xlsx')