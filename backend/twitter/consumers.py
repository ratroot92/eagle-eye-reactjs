import json
from channels.generic.websocket import WebsocketConsumer
from .tasks import getTweets
from django.http import JsonResponse
from asgiref.sync import async_to_sync
class Twitter_Tweets_Targets_Channels(WebsocketConsumer):
    def connect(self):
        print("connect")
        self.accept()

    def disconnect(self, close_code):
        print("disconnect")
        pass

    def receive(self, text_data):
        print("receive")
        text_data_json = json.loads(text_data)
        _username = text_data_json['_username']
        get_user=tweets_target_model.objects.get(twitter_username=_username)
        print(get_user.twitter_username)
        if(get_user.scanning_status=='pending' or get_user.scanning_status=='completed'):
            t=tweets_target_model.objects.get(twitter_username=_username)
            t.scanning_status = 'pending'
            t.save()
            r=getTweets.delay(_username)
            self.send(text_data=json.dumps({
            '_username': 'Django Twitter Consumer Replying To : ws://127.0.0.1:8000/scan/maliksblr92/',
            '_reply': 'success',
            '_status_code': 0,
        }))
        else:
            self.send(text_data=json.dumps({
            '_username': 'Django Twitter Consumer Replying To : ws://127.0.0.1:8000/scan/maliksblr92/',
            '_reply': 'failure / request rejected / already completed ',
            '_status_code': 1,
        }))
        
class Twitter_Channels(WebsocketConsumer):
    # chat/consumers.py

    def connect(self):
        print("###############CELERY NOTIFICATIONS CHANNEL  CONNECTED ##########################")
        self.room_name = 'Twitter_Tweets'
        self.room_group_name = self.room_name+"_Targets_Events"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
       

    def disconnect(self, code):
        print("###############CELERY NOTIFICATIONS CHANNEL  CONNECTED ##########################")
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        print("###############CELERY NOTIFICATIONS RECEIVED ##########################")
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        info = data['info']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                "type": 'twitter_tweets_targets_task_compelete',
                "message": message,
                "username": username,
                "info": info
            }
        )

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                "type": 'tweets_count_socket_close',
                "message": message,
                "username": username
            }
        )

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                "type": 'followers_scanning_complete',
                "message": message,
                "username": username,
                "info": info,
            }
        )
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                "type": 'following_scanning_complete',
                "message": message,
                "username": username,
                "info": info,
            }
        )

    def tweets_count_socket_close(self,event):
        print("Socker Close ")
        self.disconnect()

    def followers_scanning_complete(self,event):
        print("############### CELERY =  followers_scanning_complete ##########################")
        message = event['message']
        username = event['username']
        info=event['info']
        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'info':info,
        }))
    def following_scanning_complete(self,event):
        print("############### CELERY =  following_scanning_complete ##########################")
        message = event['message']
        username = event['username']
        info=event['info']
        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'info':info,
        }))
    def twitter_tweets_targets_task_compelete(self,event):
        print("Class => Twitter_Channels ")
        print("Channel Name  => Twitter_Tweets_Targets_Events ")
        print("Class Function  => tweets_count ")
        payload = event['payload']
        self.send(text_data=json.dumps({
            'event': event,

        }))
    # def tweets_count(self,event):
    #     print("Class => Twitter_Channels ")
    #     print("Channel Name  => Twitter_Tweets_Targets_Events ")
    #     print("Class Function  => tweets_count ")
    #     payload = event['payload']
    #     print(payload)
    #     self.send(text_data=json.dumps({
    #         'message': payload,

    #     }))