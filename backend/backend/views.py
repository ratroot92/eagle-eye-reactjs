from django.http import JsonResponse
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .serializers import User_Document_Serializer
from .models import User


"""
Obejcts Creation
"""
""" Views For Backend """ 

@csrf_exempt
def User_Is_Authenticated(request):
    try:
        print("*** -- User_Is_Authenticated -- ***")
        User.User_Is_Authenticated(email,password)
        context = {'success':False,'data':[]}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'data':[]}
        return JsonResponse(context)
@csrf_exempt
def User_Login(request):
    try:
        print("*** -- User_Login -- ***")
        formData = json.loads(request.body.decode('utf-8'))
        email=formData['email']
        password=formData['password']
        User.Validate_User(email,password)
        context = {'success':False,'data':[]}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'data':[]}
        return JsonResponse(context)
    