from rest_framework import serializers
from .models import Webtoon, Tag

# Webtoon용 serializer
class WebtoonsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Webtoon
        fields = '__all__'
        
# Tag용 serializer
class TagsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tag
        fields = '__all__'