from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
       path('twitter-top-world-trends/', views.TopWorldTrends,name='TopWorldTrends'),
       path('twitter-top-pakistan-trends/', views.TopPakistanTrends,name='TopPakistanTrends'),
       path('twitter-top-trends/area/', views.TopTrendsByArea,name='TopTrendsByArea'),
   
    
]