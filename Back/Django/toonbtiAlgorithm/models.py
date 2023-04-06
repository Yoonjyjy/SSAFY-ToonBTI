# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

# 유저의 설문 답변 정보
class Answer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'answer'

# 작가 정보
class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'author'

# 장르 정보
class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'genre'
        
# 웹툰 정보
class Webtoon(models.Model):
    webtoon_id = models.AutoField(primary_key=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=50, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    platform = models.CharField(max_length=5, blank=True, null=True)
    end_flag = models.IntegerField(blank=True, null=True)
    rate = models.FloatField(blank=True, null=True)
    view = models.IntegerField(blank=True, null=True)
    search_title = models.CharField(max_length=50, blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'webtoon'
        
# 글/그림 작가 정보
class Authorrole(models.Model):
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'authorrole'

# toonbti 정보
class Nbti(models.Model):
    nbti_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    content = models.CharField(max_length=255)
    image = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'nbti'

# 설문조사 질문 정보

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255)
    image = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'question'

# 태그 정보

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag'

# 유저 정보

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    uudi = models.CharField(max_length=45)
    link = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'user'

# 유저의 설문 답변 정보

class Useranswer(models.Model):
    useranswer_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'useranswer'

# 유저의 toonbti 유형 정보

class Usernbti(models.Model):
    usernbti_id = models.AutoField(db_column='user_nbti_id', primary_key=True)  # Field name made lowercase.
    nbti = models.ForeignKey(Nbti, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'usernbti'

# 유저가 읽은 웹툰 정보

class Userwebtoon(models.Model):
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'userwebtoon'


# 웹툰의 태그 정보
class webtoonTag(models.Model):
    webtoontag_id = models.AutoField(db_column='webtoon_tag_id', primary_key=True)  # Field name made lowercase.
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'webtoontag'
