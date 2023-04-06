from graphene import List, Int, ObjectType, String, Schema, Float, Field, Boolean, Mutation
from graphene_django import DjangoObjectType
from .models import Webtoon, Userwebtoon
from django.db import transaction
import toonbtiAlgorithm.views as views

# Webtoon을 위한 ObjectType을 정의합니다
class WebtoonType(DjangoObjectType):
    class Meta:
        model = Webtoon

# UserWebtoon을 위한 ObjectType을 정의합니다
class UserWebtoonType(DjangoObjectType):
    class Meta:
        model = Userwebtoon

# 반환할 값들의 type 정보
class Webtoon(ObjectType):
    webtoon_id= Int()
    genre_id = Int()
    title = String()
    image = String()
    platform = String()
    end_flag = Int()
    rate = Float()
    view = Int()
    search_title = String()
    like_rate = Float()
    author_name = String()

# 키워드 정보 type 정보
class MyKeyword(ObjectType):
    my_keyword_name = List(String)
    my_keyword_id = List(Int)

# 스프링에서 받은 myType의 value의 type 정보
class MyType(ObjectType):
    userType = String()
    image = String()
    count = Int()
    thumbnailTitle = String()
    thumbnailCharacter = String()
    
# 스프링에서 받은 정보의 type 정보
class GetFromSpring(ObjectType):
    myType = Field(MyType)
    webtoonCounts = Int()
    platformRatio = List(Int)
    doneRatio = List(Int)
    genreRatio = List(Int)

class GetFromSpring2(ObjectType):
    myRank = Int()
    allUser = Int()
    
# 내 장르 정보 type
class MyGenre(ObjectType):
    genreId = Int()
    genreName = String()


# 내가 선택한 웹툰을 저장하기위한 뮤테이션을 정의합니다.
class SaveWebtoonMutation(Mutation):
    # 입력 값
    class Arguments:
        webtoon_pk = List(Int, required=True)
        user_pk = Int()
    #반환 값
    success = Boolean(required=True)

    # 웹툰 DB 저장 함수
    def mutate(self, info, webtoon_pk, user_pk):
        # 저장이 되었는지 확인하는 플래그
        flag= False
        for web_pk in webtoon_pk:
            # 유저id와 웹툰 아이디를 객체로 만들고
            added_select_webtoon = Userwebtoon(
                user_id=user_pk,
                webtoon_id=web_pk
            )
            # DB에 저장하기 전에 중복되는 데이터가 있는지 확인
            if not Userwebtoon.objects.filter(user_id=user_pk, webtoon_id=web_pk).exists():
                # 중복된 데이터가 없으면 DB에 저장
                added_select_webtoon.save()
                flag =True
        # 저장됐다면 success = true
        if flag: 
            # 정상저장 시 success = true
            success = True
        # 저장 안됐다면  success = false
        else:
            # 저장 실패 시 success = false
            success = False
        return SaveWebtoonMutation(success=success)

# 뮤테이션을 위한 ObjectType을 정의합니다.
class Mutation(ObjectType):
    #save_webtoon 필드가 Graphql Mutation에서 호출되면 SaveWebtoonMutation 클래스의 mutate() 메서드가 실행되어 데이터를 처리하고 결과를 반환합니다.
    save_webtoon = SaveWebtoonMutation.Field()
    
# 쿼리를 위한 ObjectType을 정의합니다.
class Query(ObjectType):
    myGenre = List(MyGenre, webtoon_pk=List(Int))
    getFromSpring = List(GetFromSpring, user_pk=Int())
    getFromSpring2 = List(GetFromSpring2, user_pk=Int())
    authorWebtoon = List(Webtoon, genre_pk=Int(), webtoon_pk=List(Int))
    keywordSimilarWebtoon = List(Webtoon, keywords=List(Int), top_n=Int())
    myKeyword = List(MyKeyword, webtoon_pk=List(Int))
    nbtiWebtoon = List(Webtoon, nbti_pk=Int(), offset=Int())
    searchWebtoon = List(Webtoon, search_name=String())
    resultNbtiWebtoon = List(Webtoon, nbti_pk=Int(), user_pk=Int())
    additionalWebtoon = List(Webtoon, webtoon_pk=Int(), genre_pk=Int())


    '''
    query SEARCH{
        nbtiWebtoon(nbtiPk: 17, offset: 1){
            webtoonId
            genreId
            title
            image
            platform
            endFlag
            rate
            view
        }
    }
    '''


    def resolve_nbtiWebtoon(self, info, nbti_pk, offset):
        ans = []
        webtoons = views.nbti_webtoon(nbti_pk, offset)
        for webtoon in webtoons:
            w = Webtoon()
            w.webtoon_id = webtoon.webtoon_id
            w.genre_id = webtoon.genre.genre_id
            w.title = webtoon.title
            w.image = webtoon.image
            w.platform = webtoon.platform
            w.end_flag = webtoon.end_flag
            w.rate = webtoon.rate
            w.view = webtoon.view
            w.search_title = webtoon.search_title
            ans.append(w)
        return webtoons

    '''
    query SEARCH{
        searchWebtoon(searchName:"멸망"){
            webtoonId
            genreId
            title
            image
            platform
            endFlag
            rate
            view
        }
    }   
    '''

    def resolve_searchWebtoon(self, info, search_name):
        webtoons = views.search_webtoon(search_name)
        wList = []
        if webtoons:
            for webtoon in webtoons:
                w = Webtoon()
                w.webtoon_id = webtoon.webtoon_id
                w.genre_id = webtoon.genre.genre_id
                w.title = webtoon.title
                w.image = webtoon.image
                w.platform = webtoon.platform
                w.end_flag = webtoon.end_flag
                w.rate = webtoon.rate
                w.view = webtoon.view
                w.search_title = webtoon.search_title
                wList.append(w)
        return wList

    '''
    query SEARCH{
        additionalWebtoon(webtoonPk:3, genrePk:9){
            webtoonId
            genreId
            title
            image
            platform
            endFlag
            rate
            view
        }
    }
    '''
    def resolve_additionalWebtoon(self, info, webtoon_pk, genre_pk):
        webtoons = views.additional_webtoon(webtoon_pk, genre_pk)
        wList = []
        for webtoon in webtoons:
            w = Webtoon()
            w.webtoon_id = webtoon.webtoon_id
            w.genre_id = webtoon.genre.genre_id
            w.title = webtoon.title
            w.image = webtoon.image
            w.platform = webtoon.platform
            w.end_flag = webtoon.end_flag
            w.rate = webtoon.rate
            w.view = webtoon.view
            w.search_title = webtoon.search_title
            wList.append(w)
        return wList
    '''
    query SEARCH{
        resultNbtiWebtoon(nbtiPk:17, userPk:3){
            webtoonId
            genreId
            title
            image
            platform
            endFlag
            rate
            view
            likeRate
        }
    }
    '''
    def resolve_resultNbtiWebtoon(self, info, nbti_pk, user_pk):
        webtoons = views.result_nbti_webtoon(nbti_pk, user_pk)
        wList = []
        if webtoons:
            for webtoon in webtoons:
                w = Webtoon()
                w.webtoon_id = webtoon[0]['webtoon_id']
                w.genre_id = webtoon[0]['genre']
                w.title = webtoon[0]['title']
                w.image = webtoon[0]['image']
                w.platform = webtoon[0]['platform']
                w.end_flag = webtoon[0]['end_flag']
                w.rate = webtoon[0]['rate']
                w.view = webtoon[0]['view']
                w.search_title = webtoon[0]['search_title']
                w.like_rate = webtoon[1]
                wList.append(w)
        return wList
    
    '''
    query SEARCH{
        myKeyword(webtoonPk:[3,4,5]){
            myKeyword
            }
        }
    '''
    def resolve_myKeyword(self, info, webtoon_pk):
        keywords = views.my_keyword(webtoon_pk)
        name_temp = []
        id_temp = []
        kList = []
        if keywords:
            for key in keywords:
                name_temp.append(key['name'])
                id_temp.append(key['tag_id'])
            k = MyKeyword()
            k.my_keyword_name = name_temp
            k.my_keyword_id = id_temp
            kList.append(k)
        return kList
    
    '''
    query SEARCH{
        keywordSimilarWebtoon(keywords:[16, 38, 21, 95], topN:5){
            webtoonId
            genreId
            title
            image
            platform
            endFlag
            rate
            view
        }
    }
    '''
    def resolve_keywordSimilarWebtoon(self, info, keywords, top_n):
        webtoons = views.find_similar_webtoon(keywords, top_n)
        return webtoons
    
    
    '''
    query SEARCH{
        authorWebtoon(genrePk:3, webtoonPk:[3,4,5]){
            webtoonId
            genreId
            image
            title
            platform
            rate
            endFlag
            searchTitle
            view
            authorName
        }
    }
    '''
    
    def resolve_authorWebtoon(self, info, genre_pk, webtoon_pk):
        webtoon = views.result_author(genre_pk, webtoon_pk)
        wList = []
        if webtoon:
            w = Webtoon()
            w.webtoon_id = webtoon[0]['webtoon_id']
            w.genre_id = webtoon[0]['genre']
            w.image = webtoon[0]['image']
            w.title = webtoon[0]['title']
            w.platform = webtoon[0]['platform']
            w.rate = webtoon[0]['rate']
            w.end_flag = webtoon[0]['end_flag']
            w.view = webtoon[0]['view']
            w.author_name = webtoon[1]
            wList.append(w)
        return wList
    
    '''
    query SEARCH{
        getFromSpring(userPk:1700){
            myType
            webtoonCounts
            platformRatio
            doneRatio
            genreRatio
        }
    }
    '''
    def resolve_getFromSpring(self, info, user_pk):
        statistics = views.get_from_spring(user_pk)
        sList = []
        if statistics:
            s = GetFromSpring()
            s.myType = statistics['myType']
            s.webtoonCounts = statistics['webtoonCounts']
            s.platformRatio = statistics['platformRatio']
            s.doneRatio = statistics['doneRatio']
            s.genreRatio = statistics['genreRatio']
            sList.append(s)
        return sList      
    '''
    getFromSpring2(userPk: $userPk){
        myRank
        allUser
    }
    '''
    def resolve_getFromSpring2(self, info, user_pk):
        statistic2 = views.get_from_spring2(user_pk)
        sList = []
        if statistic2:
            s = GetFromSpring2()
            s.myRank = statistic2['myRank']
            s.allUser = statistic2['allUser']
            sList.append(s)
        return sList
    '''
    query SEARCH{
        myGenre(webtoonPk:[3,4,5]){
            genreId
        }
    }
    '''

    def resolve_myGenre(self, info, webtoon_pk):
        genre = views.my_genre(webtoon_pk)
        gList = []
        if genre:
            g = MyGenre()
            g.genreId = genre.genre_id
            g.genreName = genre.name
            gList.append(g)
        return gList
    
schema = Schema(query=Query, mutation=Mutation)
