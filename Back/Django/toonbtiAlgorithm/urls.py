from django.urls import path
from . import views

app_name = 'toonbtiAlgorithm'
urlpatterns = [
    
    # path('<int:nbti_pk>/', views.nbti_webtoon, name='nbti_webtoon'),    # 유저 유형으로 해당 유형이 본 웹툰정보 반환
    # path('search/', views.search_webtoon, name='search_webtoon'),  # 검색
    # path('select/<int:nbti_pk>/<int:user_pk>/', views.select_webtoon, name='select_webtoon'),  # 내가 고른 웹툰 저장
    
    # path('tag/', views.webtoon_tag_frequency, name='webtoon_tag_frequency'),
    # path('keyword/', views.my_keyword, name='my_keyword'),  # 내가 고른 웹툰에서 키워드 4개 반환

    # path('result/<int:nbti_pk>/', views.result_nbti_webtoon, name='result_nbti_webtoon'),    # 유저 유형으로 동일 유형 다른 유저의 작품들 중 내가 읽지 않은 작품을 완결, 연재로 나눠 반환
    # path('result/author/<int:genre_pk>/', views.result_author, name='result_author'),
]
