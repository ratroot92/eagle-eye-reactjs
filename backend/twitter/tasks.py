from __future__ import absolute_import, unicode_literals
from celery import shared_task
import twint
import asyncio
import nest_asyncio
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from dashboard.TwitterTrend import Twitter_Trends
from .twitter_models import Top_World_Trends,Countries_Top_Trends_Document,Twitter_Tweets_Document,Twitter_Profile_Document
from .serializers import Twitter_Profile_Target_Serializer, Twitter_Tweets_Target_Serializer
channel_layer = get_channel_layer()


""" *************************************************** """
""" This Shared Task will run for Twitter Tweets Target""" 
""" *************************************************** """
@shared_task
def getTweets(_username):
    try:
        print("twitter -- tasks.py getTweets --username = ",_username)
        asyncio.set_event_loop(asyncio.new_event_loop())
        c = twint.Config()
        c.Username = _username
        c.Store_object = True
        # c.Limit =20
        c.Hide_output = False
        # c.Database = "d_auth"
        # nest_asyncio.apply()

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
        Twitter_Tweets_Document.InsertTargetTweets(_username,dic)
        qs=Twitter_Tweets_Document.objects.get(target_username=_username)
        entry = Twitter_Tweets_Target_Serializer(qs)
        async_to_sync(channel_layer.group_send)(
            'Twitter_Tweets_Targets_Events',
                {
            'type': 'twitter_tweets_targets_task_compelete',
            'payload': {'username':_username,'updated_model':entry.data},
                }
                )
        print("Twitter Tweets Target --fetch tweets --ended successfully ")
    except Exception as e:
        qs=Twitter_Tweets_Document.objects.get(target_username=_username)
        entry = Twitter_Tweets_Target_Serializer(qs)
        Twitter_Tweets_Document.objects.get(target_username=_username).delete()
        async_to_sync(channel_layer.group_send)(
             'Twitter_Tweets_Targets_Events',
                 {
             'type': 'twitter_tweets_targets_task_failed',
             'payload': {'username':_username,'updated_model':entry.data},
                 }
                 )
        print("Twitter Tweets Target --fetch tweets --ended successfully ")

""" *************************************************** """
""" This Shared Task will run for Twitter Profile Target""" 
""" *************************************************** """
@shared_task
def getSingleUser(_username):
    try:
        # nest_asyncio.apply()
        asyncio.set_event_loop(asyncio.new_event_loop())
        c = twint.Config()
        c.Username = _username
        c.Store_object = True
        # user = {'id': ''}
        twint.output.clean_lists()
        twint.run.Lookup(c)
        u = twint.output.users_list
        id=''
        following=''
        followers=''
        tweets=''
        name=''
        username=''
        media=''
        location=''
        profile_img_url=''
        background_image=''
        for i in u:
            id=i.id
            following=i.following
            followers=i.followers
            tweets=i.tweets
            name=i.name
            username=i.username
            media=i.media_count
            location=i.location
            profile_img_url=i.avatar
            background_image=i.background_image
        profileDic={
            "id":id,
            "following":following,
            "followers":followers,
            "tweets":tweets,
            "name":name,
            "username":username,
            "media":media,
            "location":location,
            "profile_img_url":profile_img_url,
            "background_image":background_image,}
        user_tweets=getTweetsByUsername(_username)
        Twitter_Profile_Document.UpdateProfileTarget(_username,user_tweets,[],[],profileDic)
        qs=Twitter_Profile_Document.objects.get(target_username=_username)
        entry = Twitter_Profile_Target_Serializer(qs)
        async_to_sync(channel_layer.group_send)(
                'Twitter_Tweets_Targets_Events',
                    {
                'type': 'twitter_profile_targets_task_compelete',
                'payload': {'username':_username,'updated_model':entry.data},
                    }
                    )
        print("*** - getSingleUser Successfull Exection  - **** ")
    except Exception as e:
        print("*** - getSingleUser Exception Occurred - **** ")
        Twitter_Profile_Document.UpdateProfileTarget(_username,[],[],[],profileDic)
        qs=Twitter_Profile_Document.objects.get(target_username=_username)
        entry = Twitter_Profile_Target_Serializer(qs)
        Twitter_Profile_Document.objects.get(target_username=_username).delete()
        async_to_sync(channel_layer.group_send)(
                'Twitter_Tweets_Targets_Events',
                    {
                'type': 'twitter_profile_targets_task_failed',
                'payload': {'username':_username,'updated_model':entry.data},
                    }
                    )
        print("*** - getSingleUser Exception Occurred - **** ")

""" ****************** """
""" Helping Functions """ 
""" ****************** """
@shared_task
def getAllFollowers(_username):
    print("getAllFollowers")
    asyncio.set_event_loop(asyncio.new_event_loop())
    c = twint.Config()
    c.Username = _username
    c.User_full = True
    c.Store_object = True
    twint.output.clean_lists()
    twint.run.Followers(c)
    user_lists = twint.output.users_list
    id=[]
    name =[]
    username  =[]
    bio  =[]
    location =[]
    url  =[]
    join_date  =[]
    join_time=[]
    tweets  =[]
    following =[]
    followers =[]
    likes    =[]
    profile_image_url =[]
    is_private  =[]
    is_verified =[]
    media =[]
    background_image =[]

    for user in user_lists:
        id.append(user.id)
        name.append(user.name)
        username.append(user.username)
        bio.append(user.bio)
        location.append(user.location)
        url.append(user.url)
        join_date.append(user.join_date)
        join_time.append(user.join_time)
        tweets.append(user.tweets)
        following.append(user.following)
        followers.append(user.followers)
        likes.append(user.likes)
        profile_image_url.append(user.avatar)
        is_private.append(user.is_private )
        is_verified.append(user.is_verified)
        media.append(user.media_count)
        background_image.append(user.background_image)
    dic = []
    for item in zip(id,name,username,bio,location,url,join_date,join_time,tweets,following,followers,likes,profile_image_url,is_private,is_verified,media,background_image):

        dic.append({
            'id':item[0],
            'name':item[1],
            'username':item[2],
            'bio':item[3],
            'location':item[4],
            'url':item[5],
            'join_date':item[6],
            'join_time':item[7],
            'tweets':item[8],
            'following':item[9],
            'followers':item[10],
            'likes':item[11],
            'profile_image_url':item[12],
            'is_private':item[13],
            'is_verified':item[14],
            'media':item[15],
            'background_image':item[16],


            })
    return dic
   
@shared_task
def getAllFollowings(_username):
    print("getAllFollowings")
    asyncio.set_event_loop(asyncio.new_event_loop())
    c = twint.Config()
    c.Username = _username
    c.User_full = True
    c.Store_object = True
    twint.output.clean_lists()
    twint.run.Following(c)
    user_lists = twint.output.users_list
    id=[]
    name =[]
    username  =[]
    bio  =[]
    location =[]
    url  =[]
    join_date  =[]
    join_time=[]
    tweets  =[]
    following =[]
    followers =[]
    likes    =[]
    profile_image_url =[]
    is_private  =[]
    is_verified =[]
    media =[]
    background_image =[]
    for user in user_lists:
        id.append(user.id)
        name.append(user.name)
        username.append(user.username)
        bio.append(user.bio)
        location.append(user.location)
        url.append(user.url)
        join_date.append(user.join_date)
        join_time.append(user.join_time)
        tweets.append(user.tweets)
        following.append(user.following)
        followers.append(user.followers)
        likes.append(user.likes)
        profile_image_url.append(user.avatar)
        is_private.append(user.is_private )
        is_verified.append(user.is_verified)
        media.append(user.media_count)
        background_image.append(user.background_image)
    dic = []
    for item in zip(id,name,username,bio,location,url,join_date,join_time,tweets,following,followers,likes,profile_image_url,is_private,is_verified,media,background_image):
        dic.append({
            'id':item[0],
            'name':item[1],
            'username':item[2],
            'bio':item[3],
            'location':item[4],
            'url':item[5],
            'join_date':item[6],
            'join_time':item[7],
            'tweets':item[8],
            'following':item[9],
            'followers':item[10],
            'likes':item[11],
            'profile_image_url':item[12],
            'is_private':item[13],
            'is_verified':item[14],
            'media':item[15],
            'background_image':item[16],
            })
    return dic

def getTweetsByUsername(_username):
    try:
        print("twitter -- tasks.py getTweets --username = ",_username)
        asyncio.set_event_loop(asyncio.new_event_loop())
        c = twint.Config()
        c.Username = _username
        c.Store_object = True
        c.Hide_output = False
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
    except Exception as e:
        return []