from django.http import JsonResponse
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from django.contrib.auth.models import User


"""
Obejcts Creation
"""
""" Views For Backend """ 

@csrf_exempt
def User_Is_Authenticated(request):
    try:
        formData = json.loads(request.body.decode('utf-8'))
        username=formData['username']
        password=formData['password']
        print(username,password,formData)
        qs=User.objects.filter(username=username,password=password).first()
        if(qs):
            entry = UserSerializer(qs)
            user={
            "username":entry.data["username"],
            "password":entry.data["password"],
            "email":entry.data["email"],
            "role":entry.data["role"],
            "status":entry.data["status"],
            }
            context = {'success':True,'message':'','data':user}
            return JsonResponse(context, safe=False)
        else:
            user={
                "username":'',
                "password":'',
                "email":'',
                "role":'',
                "status":'',
                }

            context = {'success':False,'message':'','data':user}
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
            qs=User.objects.get(username=username)
            entry = UserSerializer(qs)
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
        username=request.GET["username"]
        entry=User.objects.filter(username=username).exists()
        if entry:
            context = {'success':True,'message':'','data':username}
            return JsonResponse(context)
        else:
            context = {'success':False,'message':'','data':username}
            return JsonResponse(context)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'message':'','data':False}
        return JsonResponse(context)




def User_Email_Exist(request):
    try:
        email=request.GET["email"]
        entry=User.objects.filter(email=email).exists()
        if entry:
            context = {'success':True,'message':'','data':email}
            return JsonResponse(context)
        else:
            context = {'success':False,'message':'','data':email}
            return JsonResponse(context)

    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'message':'exception ','data':False}
        return JsonResponse(context)



def User_Phone_Exist(request):
    try:
        print("User_Phone_Exist",request.GET["phone"])
        phone=request.GET["phone"]
        entry=User.objects.filter(phone=phone).get()
        if entry:
            context = {'success':True,'message':'phone exist','data':phone}
            return JsonResponse(context)
        else:
            context = {'success':True,'message':'phone does not eixst ','data':phone}
            return JsonResponse(context)

    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'message':'exception ','data':False}
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
    





def All_Users(request):
    try:
        qs=User.objects.all()
        entry = UserSerializer(qs,many=True)
        context = {'success':True,'message':'','data':entry.data}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context)
    
"""
Status [0,1]
0 => deactivate   
1 ==> activate
"""
def Deactivate_User(request):
    try:
        print("*** -- Deactivate_User  -- ***")
        id=request.GET["id"]
        qs=User.objects.filter(id=id).first()
        qs.is_active=False
        qs.save()
        entry = UserSerializer(qs)
        print("entry",entry)
        context = {'success':True,'message':'','data':entry.data}
        return JsonResponse(context, safe=False)
            
    except Exception as e:
        print(e)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context)

    
"""
Status [0,1]
0 => deactivate   
1 ==> activate
"""
def Activate_User(request):
    try:
        print("*** -- Activate_User  -- ***")
        id=request.GET["id"]
        qs=User.objects.filter(id=id).first()
        qs.is_active=True
        qs.save()
        entry = UserSerializer(qs)
        print("entry",entry)
        context = {'success':True,'message':'','data':entry.data}
        return JsonResponse(context, safe=False)
            
    except Exception as e:
        print(e)
        context = {'success':False,'message':'','data':[]}
        return JsonResponse(context)