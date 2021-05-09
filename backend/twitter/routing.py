# chat/routing.py
from django.urls import re_path,path

from .consumers import Twitter_Channels,Twitter_Tweets_Targets_Channels

websocket_urlpatterns = [
    # re_path(r'ws/test/',Twitter_Channels),
    path('ws/test',Twitter_Channels.as_asgi()),
    path('ws/abc',Twitter_Tweets_Targets_Channels.as_asgi()),
]