from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework import serializers
from .twitter_models import Twitter_Tweets_Document,Twitter_Profile_Document,User_Document

"""
Auth Imports
"""
from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication



class User_Document_Serializer(DocumentSerializer):
    class Meta:
        model = User_Document
        depth = 2


class LoginSerializer(serializers.Serializer):
    username:serializers.CharField()
    password:serializers.CharField()
    def validate(self,data):
        user={
            "username":self.initial_data['username'],
            "password":self.initial_data['password'],
        }
        if(user['username']=="admin" and user['password']=="admin@gmail.com"):
            return user
        else:
            print("LoginSerializer >> : Else ")
            raise serializers.ValidationError("Inocrrect Credentials")

class Twitter_Tweets_Target_Serializer(DocumentSerializer):
    class Meta:
        model = Twitter_Tweets_Document
        depth = 2

class Twitter_Profile_Target_Serializer(DocumentSerializer):
    class Meta:
        model = Twitter_Profile_Document
        depth = 2