from rest_framework import serializers
from .models import Post, Comments


class CommentsSerializer(serializers.ModelSerializer):

    

    class Meta:
        model = Comments
        fields = ['author', 'text', 'likeCount']

class PostSerializer(serializers.ModelSerializer):
    # comments = CommentsSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = '__all__'
        # setting the serializer the author not be expected as part of the data 
        read_only_fields = ['user']


