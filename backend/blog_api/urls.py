from django.urls import path
from .views import addPost, getAllPosts, getPostById, updatePost, deletePost

urlpatterns = [
    path('', getAllPosts, name='all_posts'),
    path('add/', addPost),
    path('get/<int:id>/', getPostById, name='get_post_by_id'),
    path('update/<int:id>/', updatePost, name='update_post'),
    path('delete/<int:id>/', deletePost, name='delete_post')
]