from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import User



class User_Document_Serializer(DocumentSerializer):
    class Meta:
        model = User
        depth = 2
