
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Post, Comments
from .serializer import PostSerializer, CommentsSerializer

from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema


from users_api.models import Profile



# Create your views here.

# adding post, only logged in user can do that

@swagger_auto_schema(method='post', request_body=PostSerializer)
@api_view(['POST'])
# @permission_classes([IsAuthenticated]) #just logged in user can add post
def addPost(request):
    
    serializer = PostSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    
    return Response(serializer.errors, status=400)

# get all posts, no need login

@api_view(['GET'])
def getAllPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response({
        "status": True,
        "data": serializer.data
    })

# get a post using id to identify
@api_view(['GET'])
def getPostById(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({"Error" : "Post not found"}, status=404)
    
    serializer = PostSerializer(post)
    return Response(serializer.data)


# update post

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, id):
    try:
        post = Post.objects.get(id=id)
        serializer = PostSerializer(post, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    except:
        return Response({"Error" : "Post not found"}, status=404)
    

# deleting post

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, id):
    try:
        post = Post.objects.get(id=id)
    
    except Post.DoesNotExist:
        return Response({"Error" : "Post not found"}, status=404)
    
    post.delete()
    return Response({"message": "Post deleted successfully"})


# comments

from django.http import HttpResponse


@swagger_auto_schema(method='post', request_body=CommentsSerializer)
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def addComment(request, id) :
    
    post = Post.objects.get(id=id)
    
    profile = Profile.objects.get(user_id = request.user.id)

    comment = {
        'author' : f"{profile.first_name} {profile.last_name}",
        'text': request.data,
        'likeCount': 0
    }

    post.newComments.append(comment)

    post.save()
    try:
        return HttpResponse(post)

    except: 
        return HttpResponse('The is no Post')