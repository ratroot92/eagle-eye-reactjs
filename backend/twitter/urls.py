from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
       #  """ Routes for Twitter Tweets Targets """
       path('add-twitter-tweets-target/', views.Add_Twitter_Tweets_Target,name='Add_Twitter_Tweets_Target'),
       path('tweets-targets-exist/', views.Tweets_Target_Exist,name='Tweets_Target_Exist'),
       path('all-tweets-targets/', views.Get_All_Tweets_Targets,name='Get_All_Tweets_Targets'),
       path('delete-tweets-target/', views.Delete_Tweets_Target,name='Delete_Tweets_Target'),
    
       # """ Routes for Twitter Profile Targets """
       path('add-twitter-profile-target/', views.Add_Twitter_Profile_Target,name='Add_Twitter_Profile_Target'),
       path('profile-targets-exist/', views.Profile_Target_Exist,name='Profile_Target_Exist'),
       path('all-profile-targets/', views.Get_All_Profile_Targets,name='Get_All_Profile_Targets'),
       path('delete-profile-target/', views.Delete_Profile_Target,name='Delete_Profile_Target'),
]