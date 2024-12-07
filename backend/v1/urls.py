from django.urls import path, include
from v1.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', welcome),
    path('auth/register', RegisterView.as_view(), name="sign_up"),
    path('auth/login', TokenObtainPairView.as_view(), name='sign_in'),
    path('news/add', AddNewsView.as_view(), name='add-news'),
    path('news/edit', EditNewsView.as_view(), name='edit-news'),
    path('news/delete', DeleteNewsView.as_view(), name='delete-news'),
    path('news/comment', CommentNewsView.as_view(), name='comment-news'),
    path('hotnews/', HotNewsViews.as_view(), name='get-hot-news'),
    path('news/id/<int:pk>/', GetNewsByIDView.as_view(), name='get-news-by-id'),
    path('news/search', SearchNewsView.as_view(), name='search-news'),
    path('user/mynews', MyNewsView.as_view(), name='my-news'),
    path('courtside', CourtSideView.as_view(), name='courtside'),
]