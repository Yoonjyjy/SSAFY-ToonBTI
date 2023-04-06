import random
import re

import pandas as pd
from django.db.models import Count
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from scipy.spatial.distance import cosine

import toonbtiAlgorithm.pythontospring as pts

from .models import Author, Genre, Tag, Usernbti, Userwebtoon, Webtoon, webtoonTag
from .serializers import TagsSerializer, WebtoonsSerializer


# 웹툰 취향 검사를 위한 웹툰 불러오기 함수
# 유형검사 결과로 나온 내 nbti와 같은 nbti의 다른 사람들이 많이 고른 웹툰 우선
# 위 조건의 웹툰이 다 반환되면 나머지 웹툰을 반환
# offset은 param으로 받고 limit는 27로 하드코딩 
def nbti_webtoon(nbti_pk, offset):
    # 내 nbti와 같은 nbti의 user들을 찾는다
    same_nbti_user = Usernbti.objects.filter(nbti_id=nbti_pk)
    # 해당 nbti 유저들이 고른 웹툰들의 출현 횟수를 계산
    webtoon_cnt = Userwebtoon.objects.filter(user_id__in=[nbti.user_id for nbti in same_nbti_user]) \
        .values('webtoon_id') \
        .annotate(cnt=Count('webtoon_id')) \
        .order_by('-cnt')
    # 모든 웹툰의 id를 가져와서 webtoon_cnt에 없는 id들을 cnt=0으로 추가
    webtoon_ids = set(Webtoon.objects.values_list('webtoon_id', flat=True))
    webtoon_cnt_ids = set([w['webtoon_id'] for w in webtoon_cnt])
    for webtoon_id in webtoon_ids - webtoon_cnt_ids:
        webtoon_cnt = list(webtoon_cnt)
        webtoon_cnt.append({'webtoon_id': webtoon_id, 'cnt': 0})
    # limit 값과 offset 값으로 보내줄 웹툰 구간 구하기
    limit = 27
    start_index = int(offset) * int(limit)
    end_index = start_index + int(limit)
    # 현재 페이지에 해당하는 객체들을 가져오기
    paged_webtoon_cnt = webtoon_cnt[start_index:end_index]
    # 페이지에 해당하는 웹툰 객체들을 가져와서 리스트에 담기
    webtoon_list = Webtoon.objects.filter(webtoon_id__in=[y['webtoon_id']for y in paged_webtoon_cnt])
    if webtoon_list:
        return webtoon_list
    else:
        return None


# 검색기능 함수
# 검색어랑 웹툰 제목, 작가명(그림작가만) 대조해서 포함하면 가져와서 중복 제거 후 반환
def search_webtoon(search_name):
    # user의 search_name에서 한글, 영어,숫자 제외시킨 쿼리용 search_query 생성
    search_query = re.sub(r'[^ㄱ-ㅎ가-힣a-zA-Z0-9]', '', search_name).strip()
    # 검색어가 두글자 이상일 떄만
    if len(search_query) >= 2:
        # title 또는 name이 검색어를 포함하는 웹툰 정보를 가져온다
        webtoons = Webtoon.objects.filter(
            search_title__icontains=search_query
        ).distinct('title')
        authors = Author.objects.filter(
            name__icontains=search_query
        ).distinct()
        author_webtoons = Webtoon.objects.filter(
            authorrole__author__in=authors
        ).distinct('title')
        # 웹툰과 작가 정보를 합쳐서 중복을 제거한 후 반환한다
        webtoons = (webtoons | author_webtoons).distinct()
        if webtoons:
            return webtoons
        return None
    return None


# 스프링에 통계 자료 요청
def get_from_spring(user_pk):
    result = pts.get_webtoon_result(user_pk)
    if result:
        return result.json()['data']['createResult']
    return None

def get_from_spring2(user_pk):
    result = pts.get_ranking(user_pk)
    if result:
        print(result)
        return result.json()['data']['getRanking']
    return None

# 같은 nbti 유형의 다른 사람들이 읽은 웹툰들을 카운트하고 그 중 내가 읽은 웹툰 제외
# 가장 많이 읽은 웹툰 순으로 추천한다
# 완결작 기준 상위 5개, 미완결작 기준 상위 5개 정렬
# 취향 저격률은 '해당 웹툰의 카운트 수/ 카운트 횟수'
def result_nbti_webtoon(nbti_pk, user_pk):
    # 유형저장 T에서 넘어온 nbti_pk값과 nbti_id가 같은 것만 필터링해서 담는다(nbti_id, user_id)
    nbti_webtoons = Usernbti.objects.filter(nbti_id=nbti_pk)
    # 같은 유형의 유저가 고른 웹툰 id를 담을 배열
    user_webtoons = []
    # 같은 유형이면서 웹툰을 고른 다른 유저들의 수를 셀 set
    other_user_cnt = set()
    if nbti_webtoons.exists():
        # 모은 동일 유형 유저의 정보를 순회
        for nbti in nbti_webtoons:
            # 각 유저의 user_id를 가지고
            other_user_pk = nbti.user_id
            # 내 user_id와 같다면 통과
            if other_user_pk == user_pk:
                continue
            # 해당 유저가 읽은 웹툰을 웹툰선택 T에서 가져온다
            user_webtoon = Userwebtoon.objects.filter(user_id=other_user_pk)
            if user_webtoon.exists():
                # 해당 웹툰들을 순회하면서
                for id in user_webtoon:
                    # 해당 웹툰 id들을 user_webtoons에 담는다
                    user_webtoons.append(id.webtoon_id)
                    # 유저 id를 중복 제거해서 유일한 user id만 저장한다
                    other_user_cnt.add(id.user_id)
        if user_webtoons:
            # 나온 웹툰 id를 set으로 정리하고
            temp = list(set(user_webtoons))
            # 각 웹툰의 출현횟수를 담을 배열
            webtoon_cnt = []
            # 웹툰 id를 순회하며
            for t in temp:
                # 각 웹툰의 등장횟수를 webtoon_cnt에 저장
                webtoon_cnt.append([t, user_webtoons.count(t)])
            # 횟수 기준 내림차순 정렬
            webtoon_cnt = sorted(webtoon_cnt, key=lambda x: x[1], reverse=True)
            # serializer 돌릴 객체 담을 배열
            webtoon_infos = []
            # [웹툰id, 등장횟수] 순회
            for j in webtoon_cnt:
                # 취향저격률
                # 해당 웹툰이 나온 횟수 / 전체 유저 명 수 (곱하기 3은 너무 낮아서 넣은 수)
                like_rate = j[1] / len(other_user_cnt) * 100 * 3
                if like_rate > 100:
                    like_rate = 99.9
                # 해당 웹툰 id로 웹툰 정보를 받아온다
                webtoon_info = get_object_or_404(Webtoon, webtoon_id=j[0])
                # serialize 하고
                serializer = WebtoonsSerializer(webtoon_info)
                # 그걸 webtoon_infos에 담는다
                webtoon_infos.append([serializer.data, like_rate])
            # 완결작, 연재작 담을 배열
            done, ongoing = [], []
            while True:
                # 웹툰들의 정보를 순회하며
                for info in webtoon_infos:
                    # 완결작이고 5개 미만으로 모였다면
                    if info[0]['end_flag'] == 1 and len(done) < 5:
                        # 완결작 웹툰에 담는다
                        done.append(info)
                    # 연재자이고 5개 미만으로 모였다면
                    elif info[0]['end_flag'] == 0 and len(ongoing) < 5:
                        # 연재작 웹툰에 담는다
                        ongoing.append(info)
                    # 완결작, 연재작 모두 5개씩 모였다면
                    if len(done) == 5 and len(ongoing) == 5:
                        # 종료
                        break
                # 종료
                break
            result = done + ongoing
            return result
        return None
    return None
# # 같은 nbti 유형의 다른 사람들이 읽은 웹툰들을 카운트하고 그 중 내가 읽은 웹툰 제외
# # 가장 많이 읽은 웹툰 순으로 추천한다
# # 완결작 기준 상위 5개, 미완결작 기준 상위 5개 정렬
# # 취향 저격률은 '해당 웹툰의 카운트 수/ 카운트 횟수'
# def result_nbti_webtoon(nbti_pk, user_pk):
#     # 유형저장 T에서 넘어온 nbti_pk값과 nbti_id가 같은 것만 필터링해서 담는다(nbti_id, user_id)
#     nbti_webtoons = Usernbti.objects.filter(nbti_id=nbti_pk)
#     # 같은 유형의 유저가 고른 웹툰 id를 담을 배열
#     user_webtoons = []
#     # 같은 유형이면서 웹툰을 고른 다른 유저들의 수를 셀 set
#     other_user_cnt = set()
#     # 모은 동일 유형 유저의 정보를 순회
#     for nbti in nbti_webtoons:
#         # 각 유저의 user_id를 가지고
#         other_user_pk = nbti.user_id
#         # 내 user_id와 같다면 통과
#         if other_user_pk == user_pk:
#             continue
#         # 해당 유저가 읽은 웹툰을 웹툰선택 T에서 가져온다
#         user_webtoon = Userwebtoon.objects.filter(user_id=other_user_pk)
#         # 해당 웹툰들을 순회하면서
#         for id in user_webtoon:
#             # 해당 웹툰 id들을 user_webtoons에 담는다
#             user_webtoons.append(id.webtoon_id)
#             # 유저 id를 중복 제거해서 유일한 user id만 저장한다
#             other_user_cnt.add(id.user_id)
#     # 나온 웹툰 id를 set으로 정리하고
#     temp = list(set(user_webtoons))
#     # 각 웹툰의 출현횟수를 담을 배열
#     webtoon_cnt = []
#     # 웹툰 id를 순회하며
#     for t in temp:
#         # 각 웹툰의 등장횟수를 webtoon_cnt에 저장
#         webtoon_cnt.append([t, user_webtoons.count(t)])
#     # 횟수 기준 내림차순 정렬
#     webtoon_cnt = sorted(webtoon_cnt, key=lambda x: x[1], reverse=True)
#     # serializer 돌릴 객체 담을 배열
#     webtoon_infos = []
#     # [웹툰id, 등장횟수] 순회
#     for j in webtoon_cnt:
#         # 취향저격률
#         # 해당 웹툰이 나온 횟수 / 전체 유저 명 수 (곱하기 3은 너무 낮아서 넣은 수)
#         like_rate = j[1] / len(other_user_cnt) * 100 * 3
#         if like_rate > 100:
#             like_rate = 99.9
#         # 해당 웹툰 id로 웹툰 정보를 받아온다
#         webtoon_info = get_object_or_404(Webtoon, webtoon_id=j[0])
#         # serialize 하고
#         serializer = WebtoonsSerializer(webtoon_info)
#         # 그걸 webtoon_infos에 담는다
#         webtoon_infos.append([serializer.data, like_rate])
#     # 완결작, 연재작 담을 배열
#     done, ongoing = [], []
#     while True:
#         # 웹툰들의 정보를 순회하며
#         for info in webtoon_infos:
#             # 완결작이고 5개 미만으로 모였다면
#             if info[0]['end_flag'] == 1 and len(done) < 5:
#                 # 완결작 웹툰에 담는다
#                 done.append(info)
#             # 연재자이고 5개 미만으로 모였다면
#             elif info[0]['end_flag'] == 0 and len(ongoing) < 5:
#                 # 연재작 웹툰에 담는다
#                 ongoing.append(info)
#             # 완결작, 연재작 모두 5개씩 모였다면
#             if len(done) == 5 and len(ongoing) == 5:
#                 # 종료
#                 break
#         # 종료
#         break
#     result = done + ongoing
#     return result


# 내가 즐겨보는 키워드
# 내가 고른 웹툰들의 태그를 카운트해서 상위 4개 반환
def my_keyword(webtoon_pk):
    # 키워드와 횟수를 담을 딕셔너리
    keyword_dict = {}
    # 내가 고른 웹툰 id를 순회하며
    for pk in webtoon_pk:
        # 해당 웹툰 id와 일치하는 웹툰들의 태그를 가져옴
        tags = webtoonTag.objects.filter(webtoon_id=pk)
        if tags.exists():
            # 태그들을 순회하며
            for t in tags:
                # 해당 태그 아이디가 딕셔너리에 있다면
                if t.tag_id in keyword_dict:
                    # 횟수 + 1
                    keyword_dict[t.tag_id] += 1
                # 딕셔너리에 없다면
                else:
                    # 새로 추가
                    keyword_dict[t.tag_id] = 1
        # 많이 나온 횟수 기준으로 정렬해서 상위 4개만 뽑는다
        res1 = sorted(keyword_dict.items(), key=lambda x: x[1], reverse=True)[:4]
        result = []
        # 태그 id를 순회하며
        for r in res1:
            # 태그 정보를 가져온다
            tag = get_object_or_404(Tag, tag_id=r[0])
            # serializer 돌리고
            serializer = TagsSerializer(tag)
            # 태그 이름을 result에 담아서 반환한다
            result.append(serializer.data)
        return result
    return None


# 내 장르면서 내가 읽지 않은 웹툰, 내가 읽은 웹툰의 작가가 아닌 작가의 웹툰 중 하나와 작가를 추천
def result_author(genre_pk, webtoon_pk):
    # 내가 읽은 웹툰의 작가들의 ID를 가져옴(그림 작가(artist)만)
    authors = Author.objects.filter(authorrole__webtoon_id__in=webtoon_pk, authorrole__type='artist').distinct()
    # genre_pk와 같은 genre_id를 가진 웹툰 중,
    # 내가 읽은 웹툰이 아니면서, 
    # 내가 읽은 웹툰의 작가들을 제외한 웹툰들의 작가 출현 횟수를 구함
    webtoons = Webtoon.objects.filter(genre_id=genre_pk) \
        .exclude(webtoon_id__in=webtoon_pk) \
        .exclude(authorrole__author_id__in=authors) \
        .exclude(authorrole__type='story') \
        .annotate(author_count=Count('authorrole__author_id')) \
        .order_by('-author_count')
    # 위 조건의 웹툰이 존재한다면
    if webtoons.exists():
        # 가장 많이 출현한 작가의 웹툰 중 하나를 랜덤으로 선택함
        # 출현 횟수 가장 많은 작가를 뽑아낸다
        top_authors = webtoons.first().authorrole_set.filter(type='artist').values_list('author', flat=True)
        # 동일 수 작가 있을 수 있기 때문에 랜덤으로 한명 뽑는다
        random_author_id = random.choice(top_authors)
        # 해당 작가의 정보를 가져오고
        author_name_object = get_object_or_404(Author, author_id=random_author_id)
        # 이름을 뽑아낸다
        author_name = author_name_object.name
        # 해당 작가의 웹툰 중 내가 보지 않았고 내 장르인 웹툰 중 하나를 뽑는다
        random_webtoon = random.choice(Webtoon.objects.filter(authorrole__author=random_author_id, genre_id=genre_pk).exclude(webtoon_id__in=webtoon_pk))
        if random_webtoon:
            # serlializer 돌리고
            ran_webtoon = WebtoonsSerializer(random_webtoon)
            # 해당 웹툰 정보와 작가 이름을 묶어서 반환한다
            result = [ran_webtoon.data, author_name]
            return result
        return None
    return None
# 내 장르면서 내가 읽지 않은 웹툰, 내가 읽은 웹툰의 작가가 아닌 작가의 웹툰 중 하나와 작가를 추천
# def result_author(genre_pk, webtoon_pk):
#     # 내가 읽은 웹툰의 작가들의 ID를 가져옴(그림 작가(artist)만)
#     authors = Author.objects.filter(authorrole__webtoon_id__in=webtoon_pk, authorrole__type='artist').distinct()
#     # genre_pk와 같은 genre_id를 가진 웹툰 중,
#     # 내가 읽은 웹툰이 아니면서, 
#     # 내가 읽은 웹툰의 작가들을 제외한 웹툰들의 작가 출현 횟수를 구함
#     webtoons = Webtoon.objects.filter(genre_id=genre_pk) \
#         .exclude(webtoon_id__in=webtoon_pk) \
#         .exclude(authorrole__author_id__in=authors) \
#         .exclude(authorrole__type='story') \
#         .annotate(author_count=Count('authorrole__author_id')) \
#         .order_by('-author_count')
#     # 위 조건의 웹툰이 존재한다면
#     if webtoons.exists():
#         # 가장 많이 출현한 작가의 웹툰 중 하나를 랜덤으로 선택함
#         # 출현 횟수 가장 많은 작가를 뽑아낸다
#         top_authors = webtoons.first().authorrole_set.filter(type='artist').values_list('author', flat=True)
#         # 동일 수 작가 있을 수 있기 때문에 랜덤으로 한명 뽑는다
#         random_author_id = random.choice(top_authors)
#         # 해당 작가의 정보를 가져오고
#         author_name_object = get_object_or_404(Author, author_id=random_author_id)
#         # 이름을 뽑아낸다
#         author_name = author_name_object.name
#         # 해당 작가의 웹툰 중 내가 보지 않았고 내 장르인 웹툰 중 하나를 뽑는다
#         random_webtoon = random.choice(Webtoon.objects.filter(authorrole__author=random_author_id, genre_id=genre_pk)
#                                     .exclude(webtoon_id__in=webtoon_pk)
#                                     )
#         # serlializer 돌리고
#         ran_webtoon = WebtoonsSerializer(random_webtoon)
#         # 해당 웹툰 정보와 작가 이름을 묶어서 반환한다
#         result = [ran_webtoon.data, author_name]
#         return result
#     else:
#         # 해당하는 웹툰이 없으면 빈 JSON을 반환함
#         return JsonResponse({})


# 내 장르 알아내는 함수
def my_genre(webtoon_pk):
    # 장르와 해당 장르 숫자 셀 딕셔너리
    genre_dict = {}
    # 내가 고른 웹툰 id를 순회하면서
    for pk in webtoon_pk:
        # 웹툰 id로 해당 웹툰 객체를 가져와서
        webtoon = get_object_or_404(Webtoon, webtoon_id=pk)
        # 해당 웹툰의 장르가 장르 딕셔너리에 있으면
        if webtoon.genre_id in genre_dict:
            # 카운트 + 1
            genre_dict[webtoon.genre_id] += 1
        # 해당 장르가 없다면
        else:
            # 새로 하나 추가
            genre_dict[webtoon.genre_id] = 1
    # 카운트 순으로 내림차순 하고 제일 카운트가 많이 나온 장르의 장르 id를 찾고
    my_genre_pk = sorted(genre_dict.items(), key=lambda x: x[1], reverse=True)[0][0]
    # 해당 genre의 정보를 가져와서 반환
    result = get_object_or_404(Genre, genre_id=my_genre_pk)
    return result


# 웹툰과 웹툰의 태그정보를 2차원 표로 표현할 함수
def create_webtoon_tag_table():
    # 웹툰 태그 정보를 모두 가져와서
    webtoon_tags = webtoonTag.objects.all()

    # 표를 만들기 전 {웹툰:태그} 딕셔너리를 만든다
    table_data = {}
    for webtoon_tag in webtoon_tags:
        # table_data에 지금 webtoon이 없다면
        if webtoon_tag.webtoon_id not in table_data:
            # 새로 생성
            table_data[webtoon_tag.webtoon_id] = {}
        # table_data에에 지금 webtoon이 있다면 지금 tag 정보를 1로 표시
        table_data[webtoon_tag.webtoon_id][webtoon_tag.tag_id] = 1
    # 위에서 만든 table_data를 panda를 활용해 2차원 표로 만든다
    table = pd.DataFrame.from_dict(table_data, orient='index')
    # 빈칸은 0으로 채움
    table = table.fillna(0)
    # 행의 이름은 webtoon_id로 한다
    table.index.name = 'webtoon_id'
    # 표의 값들의 type은 int로 한다
    table = table.astype(int)
    return table


# 내 키워드 기반 추천 웹툰을 찾기 윈한 함수
def find_similar_webtoon(keywords, top_n):
    # create_webtoon_tag_table를 이용해 웹툰, 태그 간 2차원 표를 만든다
    table = create_webtoon_tag_table()

    # 나의 키워드 4를 table과 비교하기 위해 내 키워드 정보도 행으로 만든다
    my_keyword = pd.Series([1 if i in keywords else 0 for i in table.columns], index=table.columns)

    # 내 키워드 정보와 각 웹툰들의 태그 정보 간의 코사인 유사도를 계산한다
    similarities = table.apply(lambda x: 1 - cosine(my_keyword, x), axis=1)

    # 유사도가 가장 큰 것을 top_n(5)개 뽑아낸다
    top_n_similarities = similarities.nlargest(top_n)
    # 그것의 webtoon id를 저장하고
    top_n_webtoon_ids = list(top_n_similarities.index)
    # 그것의 유사도를 저장한다
    top_n_cosine_similarities = list(top_n_similarities.values)
    # 찾아낸 웹툰 id로 webtoon 정보를 받아와 serializer 돌리고 유사도와 함께 묶어 반환한다
    similar_webtoons = []
    for webtoon_pk in top_n_webtoon_ids:
        webtoon = Webtoon.objects.get(webtoon_id=webtoon_pk)
        serializer = WebtoonsSerializer(webtoon)
        similar_webtoon = serializer.data
        similar_webtoon['cosine_similarity'] = round(
            top_n_cosine_similarities[top_n_webtoon_ids.index(webtoon_pk)], 4)
        similar_webtoons.append(similar_webtoon)
    return similar_webtoons


# 웹툰 선택 시 같은 장르 웹툰 중 평점 높은 순 200개중 랜덤으로 3개 반환 함수
def additional_webtoon(webtoon_pk, genre_pk):
    # genre_pk와 일치하고 webtoon_pk와 다른 웹툰 200개 불러옴
    webtoons = Webtoon.objects.filter(genre_id=genre_pk) \
        .exclude(webtoon_id=webtoon_pk) \
        .order_by('-rate')[:200]
    # 불러온 웹툰 중에서 랜덤으로 3개 선택
    random_webtoons = random.sample(list(webtoons), 3)
    return random_webtoons