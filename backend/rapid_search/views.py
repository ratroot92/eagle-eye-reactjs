from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
import geopy
from geopy import Nominatim
import json
import twint
import nest_asyncio
import asyncio
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def Twitter_Rapid_Search(request):
    try:
        formData = json.loads(request.body.decode('utf-8'))
        search_type=formData['search_type']
        print(formData['tweets_count'])
        """  
        Serach Type === 1 ==> Phrase Search
        """
        if search_type==1:
            print("Serach Type ==> Phrase Search")
            target_phrase=formData['target_phrase']
            tweets_type=formData['tweets_type']
            target_username=''
            tweets_count=int(formData['tweets_count'])
            tweets=GenericSearchTweets(target_phrase,tweets_count,tweets_type,target_username)
            """  
            Serach Type === 2 ==> User Phrase Search
            """
        elif search_type==2:
            print("Serach Type ==> User Phrase Search")
            target_phrase=formData['target_phrase']
            tweets_type=formData['tweets_type']
            target_username=formData['target_username']
            tweets_count=int(formData['tweets_count'])
            tweets=GenericSearchTweets(target_phrase,tweets_count,tweets_type,target_username)
            """  
                Serach Type === 3 ==> Location Phrase Search
            """
        elif search_type==3:
            print("Serach Type ==> Location Phrase Search")
            target_phrase=formData['target_phrase']
            tweets_type=formData['tweets_type']
            target_location=formData['target_location']
            location_radius=formData['location_radius']
            tweets_count=int(formData['tweets_count'])
            # get long and lat
            geolocator = Nominatim(user_agent="http")
            location1 = geolocator.geocode(target_location)
            lat=str(location1.latitude)
            lon=str(location1.longitude)
            rad=str(location_radius)
            string=""+lat+","+lon+","+rad+""
            # print(target_phrase,tweets_count,tweets_type,lat,lon,rad)
            tweets=LocationSearchTweets(target_phrase,tweets_count,tweets_type,lat,lon,rad)   
            """  
                Serach Type === 4 ==> Geo Fence Search
            """
        elif search_type==4:
            print("Serach Type ==> Geo Fence Search")
            target_phrase=formData['target_phrase']
            tweets_type=formData['tweets_type']
            latitude=formData['latitude']
            longitude=formData['longitude']
            location_radius=formData['location_radius']
            tweets_count=int(formData['tweets_count'])
            tweets=LocationSearchTweets(target_phrase,tweets_count,tweets_type,latitude,longitude,location_radius)     
        if(len(tweets)<1):
            context = {'success':False,'data':formData}
            return JsonResponse(context, safe=False)
        else:
            context = {'success':True,'data':tweets}
            return JsonResponse(context, safe=False)
    except Exception as e:
        print("Error => ",e)
        context = {'success':False,'data':formData}
        return JsonResponse(context, safe=False)

        
"""
Helping Functions
"""

def GenericSearchTweets(_phrase,_limit,_tweets_type,_target_username):
    print("*** -- GenericSearchTweets  --***")
    print("Phrase ==> ",_phrase)
    print("Limit ==> ",_limit)
    print("Tweets Type ==> ",_tweets_type)
    print("Target UserName ==> ",_target_username)
    asyncio.set_event_loop(asyncio.new_event_loop())
    c = twint.Config()
    c.Store_object = True
    c.Search = ""+_phrase
    if _target_username!='':
        c.Username=_target_username
    c.Limit =int(_limit)
    if _tweets_type ==1 or _tweets_type=="1":
        c.Images = False
    if _tweets_type ==2 or _tweets_type=="2":
        c.Images = True
    if _tweets_type ==3 or _tweets_type=="3":
        c.Images = False
    c.Hide_output = True
# lists
    id=[]
    id_str=[]
    conversation_id=[]
    datetime=[]
    datestamp=[]
    timestamp=[]
    user_id=[]
    user_id_str=[]
    username=[]
    name=[]
    place=[]
    timezone=[]
    img=[]
    mentions=[]
    urls=[]
    photos=[]
    video=[]
    text=[]
    hashtags=[]
    cashtags=[]
    replies_count=[]
    retweets_count=[]
    likes_count=[]
    link=[]
    user_rt_id=[]
    retweet=[]
    retweet_id=[]
    retweet_date=[]
    quote_url=[]
    near=[]
    geo=[]
    source=[]
    reply_to=[]
# Search starts here
    twint.output.clean_lists()
    twint.run.Search(c)
    tweets = twint.output.tweets_list
    for tweet in tweets:
      id.append(tweet.id)
      id_str.append(tweet.id_str)
      conversation_id.append(tweet.conversation_id)
      datetime.append(tweet.datetime)
      datestamp.append(tweet.datestamp)
      timestamp.append(tweet.timestamp)
      user_id.append(tweet.user_id)
      user_id_str.append(tweet.user_id_str)
      username.append(tweet.username)
      name.append(tweet.name)
      place.append(tweet.place)
      timezone.append(tweet.timezone)
      mentions.append(tweet.mentions)
      urls.append(tweet.urls)
      photos.append(tweet.photos)
      video.append(tweet.video)
      text.append(tweet.tweet)
      hashtags.append(tweet.hashtags)
      cashtags.append(tweet.cashtags)
      replies_count.append(tweet.replies_count)
      retweets_count.append(tweet.retweets_count)
      likes_count.append(tweet.likes_count)
      link.append(tweet.link)
      user_rt_id.append(tweet.user_rt_id)
      retweet.append(tweet.retweet)
      retweet_id.append(tweet.retweet_id)
      retweet_date.append(tweet.retweet_date)
      quote_url.append(tweet.quote_url)
      near.append(tweet.near)
      geo.append(tweet.geo)
      source.append(tweet.source)
      reply_to.append(tweet.reply_to)

    # Construct Dictionary of Tweets
    dic = []
    for item in zip(id,id_str,conversation_id,datetime,
                datestamp,timestamp,user_id,user_id_str,username
                ,name,place,timezone,mentions,urls,photos,
                 video,text,hashtags,cashtags,replies_count,likes_count,retweets_count,link
               ,user_rt_id,retweet,retweet_id,retweet_date,quote_url,near,geo,
                source,reply_to
               ):

        dic.append({
            'id':item[0],
            'id_str':item[1],
            'conversation_id':item[2],
            'datetime':item[3],
            'datestamp':item[4],
            'timestamp':item[5],
            'user_id':item[6],
            'user_id_str':item[7],
            'username':item[8],
            'name':item[9],
            'place':item[10],
            'timezone':item[11],
            'mentions':item[12],
            'urls':item[13],
            'photos':item[14],
            'video':item[15],
            'text':item[16],
            'hashtags':item[17],
            'cashtags':item[18],
            'replies_count':item[19],
            'likes_count':item[20],
            'retweets_count':item[21],
            'link':item[22],
            'user_rt_id':item[23],
            'retweet':item[24],
            'retweet_id':item[25],
            'retweet_date':item[26],
            'quote_url':item[27],
            'near':item[28],
            'geo':item[29],
            'source':item[30],
            'reply_to':item[31],
                })




    return dic




# phrase search + Phrase search with username
def LocationSearchTweets(_phrase,_limit,_tweets_type,_lat,_lon,_rad):


    # # c.Hide_output = True
    # c.Output = True
    asyncio.set_event_loop(asyncio.new_event_loop())
    c = twint.Config()
    c.Limit =_limit
    c.Geo=""+_lat+","+_lon+","+_rad+"km"
    if _phrase!='':
        c.Search = ""+_phrase
    # c.Output = False
    c.Store_object = True
    if _tweets_type ==1 or _tweets_type=="1":
        c.Images = False
    if _tweets_type ==2 or _tweets_type=="2":
        c.Images = True
    if _tweets_type ==3 or _tweets_type=="3":
        c.Images = False
    c.Hide_output = True
# lists
    id=[]
    id_str=[]
    conversation_id=[]
    datetime=[]
    datestamp=[]
    timestamp=[]
    user_id=[]
    user_id_str=[]
    username=[]
    name=[]
    place=[]
    timezone=[]
    img=[]
    mentions=[]
    urls=[]
    photos=[]
    video=[]
    text=[]
    hashtags=[]
    cashtags=[]
    replies_count=[]
    retweets_count=[]
    likes_count=[]
    link=[]
    user_rt_id=[]
    retweet=[]
    retweet_id=[]
    retweet_date=[]
    quote_url=[]
    near=[]
    geo=[]
    source=[]
    reply_to=[]
# Search starts here
    twint.output.clean_lists()
    twint.run.Search(c)
    tweets = twint.output.tweets_list
    for tweet in tweets:
      id.append(tweet.id)
      id_str.append(tweet.id_str)
      conversation_id.append(tweet.conversation_id)
      datetime.append(tweet.datetime)
      datestamp.append(tweet.datestamp)
      timestamp.append(tweet.timestamp)
      user_id.append(tweet.user_id)
      user_id_str.append(tweet.user_id_str)
      username.append(tweet.username)
      name.append(tweet.name)
      place.append(tweet.place)
      timezone.append(tweet.timezone)
      mentions.append(tweet.mentions)
      urls.append(tweet.urls)
      photos.append(tweet.photos)
      video.append(tweet.video)
      text.append(tweet.tweet)
      hashtags.append(tweet.hashtags)
      cashtags.append(tweet.cashtags)
      replies_count.append(tweet.replies_count)
      retweets_count.append(tweet.retweets_count)
      likes_count.append(tweet.likes_count)
      link.append(tweet.link)
      user_rt_id.append(tweet.user_rt_id)
      retweet.append(tweet.retweet)
      retweet_id.append(tweet.retweet_id)
      retweet_date.append(tweet.retweet_date)
      quote_url.append(tweet.quote_url)
      near.append(tweet.near)
      geo.append(tweet.geo)
      source.append(tweet.source)
      reply_to.append(tweet.reply_to)

    # Construct Dictionary of Tweets
    dic = []
    for item in zip(id,id_str,conversation_id,datetime,
                datestamp,timestamp,user_id,user_id_str,username
                ,name,place,timezone,mentions,urls,photos,
                 video,text,hashtags,cashtags,replies_count,likes_count,retweets_count,link
               ,user_rt_id,retweet,retweet_id,retweet_date,quote_url,near,geo,
                source,reply_to
               ):

        dic.append({
            'id':item[0],
            'id_str':item[1],
            'conversation_id':item[2],
            'datetime':item[3],
            'datestamp':item[4],
            'timestamp':item[5],
            'user_id':item[6],
            'user_id_str':item[7],
            'username':item[8],
            'name':item[9],
            'place':item[10],
            'timezone':item[11],
            'mentions':item[12],
            'urls':item[13],
            'photos':item[14],
            'video':item[15],
            'text':item[16],
            'hashtags':item[17],
            'cashtags':item[18],
            'replies_count':item[19],
            'likes_count':item[20],
            'retweets_count':item[21],
            'link':item[22],
            'user_rt_id':item[23],
            'retweet':item[24],
            'retweet_id':item[25],
            'retweet_date':item[26],
            'quote_url':item[27],
            'near':item[28],
            'geo':item[29],
            'source':item[30],
            'reply_to':item[31],
                })




    return dic