from django.http import JsonResponse
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .serializers import User_Document_Serializer
from twitter.twitter_models import User_Document


"""
Obejcts Creation
"""
""" Views For Backend """ 

@csrf_exempt
def User_Is_Authenticated(request):
    try:
        print("*** -- User_Is_Authenticated -- ***")
        User_Document.User_Is_Authenticated(email,password)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context)

@csrf_exempt
def Add_User(request):
    try:
        print("*** -- Add_User -- ***")
        formData = json.loads(request.body.decode('utf-8'))
        username=formData['username']
        email=formData['email']
        role=int(formData['role'])
        phone=formData['phone']
        password=formData['password']
        userObj=User_Document()
        isInserted=userObj.Insert_User(username,email,password,role,phone)
        if(isInserted):
            qs=User_Document.objects.get(username=username)
            entry = User_Document_Serializer(qs)
            context = {'success':True,'message':'user inserted successfully','data':entry.data}
            return JsonResponse(context, safe=False)
        else:
             context = {'success':False,'message':'failed to insert user','data':formData}
             return JsonResponse(context, safe=False)
       
    except Exception as e:
        print(e)
        context = {'success':False,'message':'failed to insert user','data':[]}
        return JsonResponse(context)



def User_Already_Exist(request):
    try:
        print("User_Already_Exist",request.GET["username"])
        username=request.GET["username"]
        entry=User_Document.User_Already_Exist(username=username)
        print
        context = {'success':entry,'message':'','data':username}
        return JsonResponse(context)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'message':'','data':False}
        return JsonResponse(context)





@csrf_exempt
def User_Login(request):
    try:
        print("*** -- User_Login -- ***")
        formData = json.loads(request.body.decode('utf-8'))
        email=formData['email']
        password=formData['password']
        User.Validate_User(email,password)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context)
    