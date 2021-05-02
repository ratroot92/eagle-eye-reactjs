from rest_framework_mongoengine.serializers import DocumentSerializer
from .twitter_models import Twitter_Target_Document



class Twitter_Tweets_Target_Serializer(DocumentSerializer):
    class Meta:
        model = Twitter_Target_Document
        depth = 2