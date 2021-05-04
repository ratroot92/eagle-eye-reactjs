from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
       path('twitter/search/', views.Twitter_Rapid_Search,name='Twitter_Rapid_Search'),
      
]