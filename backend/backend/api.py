# from backend.mongo_models import LeadDocument
# from rest_framework import viewsets,permissions,generics
# from rest_framework.response import Response
# from .serializers import LeadDocumentSerialzier
# from twitter.serializers import LoginSerializer,User_Document_Serializer
# from twitter.twitter_models import User_Document
# from knox.models import AuthToken 
# import json
# #Lead Viewset
# """
# it allows to cerate full CRUD API  without having to specify
# explicit methods for functionality
# """
# class LeadDocumentViewSet(viewsets.ModelViewSet):
#     queryset=LeadDocument.objects.all()
#     permission_classes=[permissions.AllowAny]
#     serializer_class=LeadDocumentSerialzier

# class LoginApi(generics.GenericAPIView):
#     serializer_class=LoginSerializer
#     def post(self,request,*args,**kwargs):
#         try:
#             form_data=json.loads(request.body.decode())
#             serializer=self.get_serializer(data=form_data)
#             serializer.is_valid(raise_exception=True)
#             user=serializer.validated_data
#             user=User_Document.objects.filter(username=user['username']).get()
#             print("user >> : ",user)
#             print({
#                 "user":User_Document_Serializer(
#                 user,context=self.get_serializer_context()).data,"token":AuthToken.objects.create(user)
#             })
#             return Response({
#                 "user":User_Document_Serializer(
#                 user,context=self.get_serializer_context()).data,"token":AuthToken.objects.create(user)
#             })
#         except Exception as e:
#             print("Exception >> : ",e)
#             return Response({
#                 "data":str(e),
#                 "success":False
#             })


from rest_framework import generics,permissions
from rest_framework.response import Response 
from knox.models import AuthToken 
from .serializers import UserSerializer,RegisterSerializer, LoginSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    print("LoginAPI")
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
    serializer_class=RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response(
            {
                "user":UserSerializer(user,context=self.get_serializer_context()).data,
                "token":AuthToken.objects.create(user)
            }
        )