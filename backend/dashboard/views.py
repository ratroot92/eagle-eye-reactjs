
from django.http import JsonResponse
from django.http import HttpResponse
import json
from .TwitterTrend import Twitter_Trends

""" Global Class Objects Initialize """
Get_Trends=Twitter_Trends()
# Create your views here.

def TopWorldTrends(request):
    print("TopWorldTrends")
    data=Get_Trends.World_Top_Trends()
    context = {'success':True,'data':data}
    return JsonResponse(context)

    
def TopPakistanTrends(request):
    print("TopPakistanTrends")
    data=Get_Trends.Pakistan_Top_Trends()
    context = {'success':True,'data':data}
    return JsonResponse(context)
   

   
def TopTrendsByArea(request):
    print("TopTrendsByArea")
    areaName=request.GET["area"]
    data=Get_Trends.Top_Trends_By_Area(areaName)
    context = {'success':True,'data':data}
    return JsonResponse(context)
   