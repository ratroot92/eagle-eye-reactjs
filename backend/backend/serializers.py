from rest_framework_mongoengine.serializers import DocumentSerializer
from twitter.twitter_models import User_Document



class User_Document_Serializer(DocumentSerializer):
    class Meta:
        model = User_Document
        depth = 2
