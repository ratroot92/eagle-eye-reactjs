from rest_framework_mongoengine.serializers import DocumentSerializer
from .twitter_models import Twitter_Tweets_Document,Twitter_Profile_Document



class Twitter_Tweets_Target_Serializer(DocumentSerializer):
    class Meta:
        model = Twitter_Tweets_Document
        depth = 2

class Twitter_Profile_Target_Serializer(DocumentSerializer):
    class Meta:
        model = Twitter_Profile_Document
        depth = 2