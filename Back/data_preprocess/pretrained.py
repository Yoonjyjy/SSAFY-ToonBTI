from gensim.models import fasttext
import datetime

print(f"== Load START at {datetime.datetime.now()}")
model = fasttext.load_facebook_model('cc.ko.300.bin')
print(f"== Load END at {datetime.datetime.now()}")

print(model.wv.similarity('절대세계의 검은 호랑이','호랑이'))
print(model.wv.similarity('호랑이형님','호랑이'))
print(model.wv.similarity('호랑이형님','판타지'))
print(model.wv.similarity('호랑이형님','환타지'))
print(model.wv.similarity('호랑이형님','동양풍'))
print(model.wv.most_similar('호랑이'))
print(model.wv.similar_by_word('호랑이'))
print(model.wv.similar_by_vector('호랑이'))