import pandas as pd

kakao_df = pd.read_csv('./kakao_webtoon.csv', low_memory=False, keep_default_na=False)
naver_df = pd.read_csv('./naver_webtoon.csv', low_memory=False, keep_default_na=False)

kakao = kakao_df[['title', 'authors', 'view', 'score','age','type','genre','day','synopsis','tag']]
naver = naver_df[['title', 'description', 'link', 'score', 'story_author', 'painting_author', 'author', 'day', 'genre', 'image', 'isDone','tags']]
data = naver

from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(ngram_range=(1,1))
# counter_vector = CountVectorizer(min_df=0, ngram_range=(1,2))
c_vector_genres = vectorizer.fit_transform(data['tags'])
x = vectorizer.get_feature_names_out()
# print(c_vector_genres.toarray())

# '''
# 유사도값 추출(코사인 유사도)
# 장르를 기준으로 유사도값을 계산한다
from sklearn.metrics.pairwise import cosine_similarity

# argsort를 이용해서 유사도가 높은 영화들의 index 추출
similarity_genre = cosine_similarity(c_vector_genres,c_vector_genres).argsort()[:,::-1]
# print(cosine_similarity(c_vector_genres,c_vector_genres))


# 장르기반의 유사도를 기준으로 테마를 추천해준다
# top=10을 없애는게 맞음. 10개 모두 내가 관심목록으로해서 제외시키면 return이 0개기 때문에 아쉬운 상황을 방지하고자 top을 없애고 나중에 뿌릴 때 몇개 뿌릴지 설정
def recommend_theme_list(df, theme_title):
    # 특정 테마정보 뽑아내기
    target_theme_index = df[df['tags'] == theme_title].index.values

    # 타켓테마와 비슷한 코사인 유사도값
    sim_index = similarity_genre[target_theme_index, :].reshape(-1)

    # 본인은 제외시킴
    sim_index = sim_index[sim_index != target_theme_index]

    # 추천결과 새로운 df생성, 평균평점(score)으로 정렬
    # result = df.iloc[sim_index].sort_values('score', ascending=False)[:10]
    result = df.iloc[sim_index]

    return result

print(recommend_theme_list(data, theme_title='연놈')[['title','tags']])
# '''