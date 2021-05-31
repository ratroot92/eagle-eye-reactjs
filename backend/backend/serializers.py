
# from rest_framework import serializers
from backend.mongo_models import LeadDocument
from rest_framework_mongoengine import serializers
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# class LeadDocumentSerialzier(serializers.DocumentSerializer):
#     class Meta:
#         model=LeadDocument
#         # fields='__all__'
#         fields=['name','email']


# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields = ('id', 'username', 'email')
    # fields = '__all__'
    fields = ('id','username','email','is_active','is_staff','is_superuser','date_joined')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")