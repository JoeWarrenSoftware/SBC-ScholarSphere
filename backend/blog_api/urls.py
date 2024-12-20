from django.urls import path
from .views import addPost, getAllPosts, getPostById, updatePost, deletePost, addComment, likePost

urlpatterns = [
    path('', getAllPosts, name='all_posts'),
    path('add/', addPost),
    path('get/<int:id>/', getPostById, name='get_post_by_id'),
    path('update/<int:id>/', updatePost, name='update_post'),
    path('delete/<int:id>/', deletePost, name='delete_post'),
    path('comment/<int:id>/', addComment, name='add_comment'),
    path('like/<int:id>/<str:letter>/', likePost, name='like_post'),

]