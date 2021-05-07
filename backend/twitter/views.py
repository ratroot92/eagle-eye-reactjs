from django.http import JsonResponse
from django.http import HttpResponse
import json
from rest_framework_mongoengine import serializers
from django.views.decorators.csrf import csrf_exempt
from .twitter_models import Twitter_Target_Document
from .serializers import Twitter_Tweets_Target_Serializer
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
from .tasks import getTweets
# Create your views here.
@csrf_exempt
def Add_Twitter_Tweets_Target(request):
    try:
        print("Add_Twitter_Tweets_Target")
        formData = json.loads(request.body.decode('utf-8'))
        Obj=Twitter_Target_Document()
        Obj.Create_Twitter_Target(
                                formData["target_platform"],
                                formData["target_type"],
                                formData["target_username"],
                                int(formData["target_scheduling"]),
                                )
        qs=Twitter_Target_Document.objects.get(target_username=formData["target_username"])
        entry = Twitter_Tweets_Target_Serializer(qs)
        celery_task_sent=getTweets.delay(formData["target_username"])
        context = {'success':True,'data':entry.data}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print(e)
        context = {'success':False,'data':formData}
        return JsonResponse(context)
    
def Tweets_Target_Exist(request):
    try:
        print("Tweets_Target_Exist",request.GET["target_username"])
        twitter_username=request.GET["target_username"]
        Obj=Twitter_Target_Document()
        entry=Obj.Twitter_Tweets_Target_Exist(target_username=twitter_username)
        context = {'success':entry,'data':twitter_username}
        return JsonResponse(context)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'data':False}
        return JsonResponse(context)
    
   
def Get_All_Tweets_Targets(request):
    try:
        print("Get_All_Tweets_Targets")
        Obj=Twitter_Target_Document()
        qs=Obj.Get_All_Twitter_Targets()
        allTweetsTargets = Twitter_Tweets_Target_Serializer(qs, many=True)
        context = {'success':True,'data':allTweetsTargets.data}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'data':False}
        return JsonResponse(context)
    
    
def Delete_Tweets_Target(request):
    try:
        print("Delete_Tweets_Target")
        target_id=request.GET["id"]
        entry=Twitter_Target_Document.objects.get(id=target_id).delete()
        context = {'success':True,'data':target_id}
        return JsonResponse(context, safe=False)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'data':e}
        return JsonResponse(context, safe=False)