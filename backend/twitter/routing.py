# chat/routing.py
from django.urls import re_path

# from .consumers import Twitter_Tweets_Targets_Channels
# from .consumers import CELERY_NOTIFICATIONS_Twitter_Crawler
# from .consumers import Rescan_Twitter_Profile_Target
# from .consumers import TweetCount
websocket_urlpatterns = [
    # # routes defined in tweets_targets.html
    # # re_path(r're_scan/(?P<_username>\w+)/$', Twitter_Tweets_Targets_Channels),
    # re_path(r'ws/re_scan/', Twitter_Tweets_Targets_Channels),
    # re_path(r'ws/celery_notifications/Twitter_Crawler/',CELERY_NOTIFICATIONS_Twitter_Crawler),
    # # routes defined in profiles_targets.html
    # re_path(r'ws/getCount/', TweetCount),
    # re_path(r'ws/rescan/profile_targets/',Rescan_Twitter_Profile_Target)
]