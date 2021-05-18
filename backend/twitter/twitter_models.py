from typing import Dict
from mongoengine import *
from mongoengine import connect
from django.conf import settings
import datetime
import os
# MONGO_DB_IP = settings.MONGO_DB


# disconnect('default')
# dbHost=os.getenv('MONGODB_HOSTNAME',default='127.0.0.1:27017')
# dbPort=int(os.getenv('MONGODB_PORT',default=27017))
# dbName=os.getenv('MONGODB_DATABASE',default='eagle_eye_db')
# try:
#     print("MongoDb Connection --MongoModels ",dbHost,dbName,dbPort)
#     connect(db=dbName,host='mongodb', port=dbPort,alias='default')
# except Exception as e:
#     print("MongoDb Connection --MongoModels --failed  ",e)
""" """
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
""" """
PERIODIC_INTERVALS = (
        (0,('one time only')),
        (5,('once per 5 minutes ')),
        (10, ('once per 10 minutes ')),
        (15, ('once per 15 minutes ')),
        (30, ('once per 30 minutes ')),
        (40, ('once per 40 minutes ')),
        (60, ('once per 60 minutes ')),
        (90, ('once per 90 minutes ')),
        (120, ('once per 120 minutes ')),
        (180, ('once per 180 minutes ')),
        (360, ('once per 360 minutes ')),
        (720, ('once per 720 minutes ')),
    )




class Twitter_Tweets_Document(Document):
    target_platform       =StringField(verbose_name="Target_Platform", max_length=255,default="twitter")
    target_type           =StringField(verbose_name="Target_Type",default="tweets")
    target_username       =StringField(verbose_name="Target_Username")
    target_scheduling     =IntField(verbose_name="Target_Scheduling",choices=PERIODIC_INTERVALS,default=0)
    scanning_status       =StringField(verbose_name="Scanning_Status",default="pending")
    #field to be updated later 
    tweets                =ListField(verbose_name="Tweets",default=[])
    tweets_count          =IntField(verbose_name="Tweets_Count",default=0)
    created_at            =DateField(default=datetime.datetime.now, editable=False,)
    updated_at            =DateField(default=datetime.datetime.now, editable=True,)
    def __repr__(self):
        return self.target_username
    def __str__(self):
        return self.target_username
    """ Create / Insert """
    def Create_Twitter_Target(self,target_platform,target_type,target_username,target_scheduling):
        self.target_platform=str(target_platform)
        self.target_type=str(target_type)
        self.target_username=str(target_username)
        self.target_scheduling=int(target_scheduling)
        try:
           self.save()
           print(f"{bcolors.WARNING}Twitter Target Document  --Create_Twitter_Target  --Success ,{bcolors.ENDC}")
           return True
        except Exception as e:
          print(f"{bcolors.WARNING}Twitter Target Document  --Create_Twitter_Target  --Exception ,{bcolors.ENDC}")
          print(e)
          return False

    """ returns all twitter targets """
    @staticmethod
    def Get_All_Twitter_Targets():
        try:
            Targets=Twitter_Tweets_Document.objects.all()
            return Targets
        except Exception as e:
            print("Get_All_Twitter_Targets --failed")
            print(e) 
    @staticmethod
    def Twitter_Tweets_Target_Exist(target_username):
        entry=Twitter_Tweets_Document.objects.filter(target_username=target_username)
        if(entry):
            print(f"{bcolors.WARNING}Twitter Target Document  --UserExist  --Target Already Exist ,{bcolors.ENDC}")
            return True
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --UserExist  --Target Not Exiist ,{bcolors.ENDC}")
            return False

    @staticmethod
    def FindTarget(target_username):
        target=Twitter_Tweets_Document.objects.filter(target_username=target_username).first()
        if(target):
            print(f"{bcolors.WARNING}Twitter Target Document  --FindTarget  --Success ,{bcolors.ENDC}")
            return target
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --FindTarget  --Failed ,{bcolors.ENDC}")
            return False

    @staticmethod
    def InsertTargetTweets(target_username,tweets_list):
        target=Twitter_Tweets_Document.objects.filter(target_username=target_username).first()
        if(target):
            #this will first empty the tweets_list on db  and save new tweets 
            target.update(add_to_set__tweets=[])
            target.update(add_to_set__tweets=tweets_list)
            target.update(scanning_status="completed",tweets_count=len(tweets_list))
            # target.tweets_count+=int(len(tweets_list))
            target.save()
            print(f"{bcolors.WARNING}Twitter Target Document  --InsertTargetTweets  --Success ,{bcolors.ENDC}")
            return True
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --InsertTargetTweets  --Failed ,{bcolors.ENDC}")
            return False


    @staticmethod
    def GetTwitterTweetsTargets(target_username):
        entry=Twitter_Tweets_Document.objects.get(target_username=target_username)
        return entry






""" Twiiter Profile Targets """


class Twitter_Profile_Document(Document):
    target_platform       =StringField(verbose_name="Target_Platform", max_length=255,default="twitter")
    target_type           =StringField(verbose_name="Target_Type",default="tweets")
    target_username       =StringField(verbose_name="Target_Username")
    target_scheduling     =IntField(verbose_name="Target_Scheduling",choices=PERIODIC_INTERVALS,default=0)
    scanning_status       =StringField(verbose_name="Scanning_Status",default="pending")
    #field to be updated later 
    tweets                =ListField(verbose_name="Tweets",default=[])
    followers          =ListField(verbose_name="Followers",default=[])
    following          =ListField(verbose_name="Followings",default=[])
    profile          =DictField(verbose_name="Profile",default={})

    created_at            =DateField(default=datetime.datetime.now, editable=False,)
    updated_at            =DateField(default=datetime.datetime.now, editable=True,)
    def __repr__(self):
        return self.target_username
    def __str__(self):
        return self.target_username
    """ Create / Insert """
    def Create_Twitter_Target(self,target_platform,target_type,target_username,target_scheduling):
        self.target_platform=str(target_platform)
        self.target_type=str(target_type)
        self.target_username=str(target_username)
        self.target_scheduling=int(target_scheduling)
        try:
           self.save()
           print(f"{bcolors.WARNING}Twitter Target Document  --Create_Twitter_Target  --Success ,{bcolors.ENDC}")
           return True
        except Exception as e:
          print(f"{bcolors.WARNING}Twitter Target Document  --Create_Twitter_Target  --Exception ,{bcolors.ENDC}")
          print(e)
          return False

    # """ returns all twitter targets """
    @staticmethod
    def Get_All_Profile_Targets():
        try:
            Targets=Twitter_Profile_Document.objects.all()
            return Targets
        except Exception as e:
            print("Get_All_Profiles_Targets --failed")
            print(e) 
    @staticmethod
    def Twitter_Profile_Target_Exist(target_username):
        entry=Twitter_Profile_Document.objects.filter(target_username=target_username)
        if(entry):
            print(f"{bcolors.WARNING}Twitter Target Document  --UserExist  --Target Already Exist ,{bcolors.ENDC}")
            return True
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --UserExist  --Target Not Exiist ,{bcolors.ENDC}")
            return False

    @staticmethod
    def FindTarget(target_username):
        target=Twitter_Profile_Document.objects.filter(target_username=target_username).first()
        if(target):
            print(f"{bcolors.WARNING}Twitter Target Document  --FindTarget  --Success ,{bcolors.ENDC}")
            return target
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --FindTarget  --Failed ,{bcolors.ENDC}")
            return False

    @staticmethod
    def UpdateProfileTarget(target_username,tweets_list,following_list,followers_list,profile):
        target=Twitter_Profile_Document.objects.filter(target_username=target_username).first()
        if(target):
            #this will first empty the tweets_list on db  and save new tweets 
            # target.update(add_to_set__tweets=[])
            # target.update(add_to_set__tweets=tweets_list)
            # target.update(add_to_set__profile={})
            # target.update(add_to_set__profile=profile)
            target.update(**{
                "set__profile": profile,
                "set__tweets": tweets_list,
                "set__scanning_status": "completed",
               
            })
            # target.update(add_to_set__followers=[])
            # target.update(add_to_set__followers=followers_list)
            # target.update(add_to_set__followings=[])
            # target.update(add_to_set__followings=following_list)
            # target.update(scanning_status="completed")
            target.save()
            print(f"{bcolors.WARNING}Twitter Target Document  --InsertTargetTweets  --Success ,{bcolors.ENDC}")
            return True
        else:
            print(f"{bcolors.WARNING}Twitter Target Document  --InsertTargetTweets  --Failed ,{bcolors.ENDC}")
            return False
   

    @staticmethod
    def GetTwitterTweetsTargets(target_username):
        entry=Twitter_Profile_Document.objects.get(target_username=target_username)
        return entry

 


class Top_World_Trends(Document):
    trends      =ListField(default=[])
    created_at  =DateField(default=datetime.datetime.now, editable=False,)
    updated_at  =DateField(default=datetime.datetime.now, editable=True,)
    def Create(self,trends):
        self.trends=trends
        try:
           self.save()
           print(f"{bcolors.WARNING}Top_World_Trends  --Create  --Success ,{bcolors.ENDC}")
           return True
        except Exception as e:
          print(f"{bcolors.WARNING}Top_World_Trends  --Create  --Exception ,{bcolors.ENDC}")
          print(e)
          return False

class Countries_Top_Trends_Document(Document):
    country_name=StringField(verbose_name="Country_Name", max_length=255,default="")
    city_name=StringField(verbose_name="City_Name", max_length=255,default="")
    trends      =ListField(default=[])
    created_at  =DateField(default=datetime.datetime.now, editable=False,)
    updated_at  =DateField(default=datetime.datetime.now, editable=True,)
    def Create(self,country_name,city_name,trends):
        self.city_name=city_name
        self.country_name=country_name
        self.trends=trends
        try:
           self.save()
           print(f"{bcolors.WARNING}Top_World_Trends  --Create Countries_Top_Trends_Document --Success ,{bcolors.ENDC}")
           return True
        except Exception as e:
          print(f"{bcolors.WARNING}Top_World_Trends  --Create Countries_Top_Trends_Document --Exception ,{bcolors.ENDC}")
          print(e)
          return False
    @staticmethod
    def getPakistanTrends():
        topTrends=Countries_Top_Trends_Document.objects.filter(country_name="pakistan")
        return topTrends





""" 
    @dated  ==> Monday, 17 May 2021
    @author ==> Ahmed Kabeer Shaukat
    @email  ==> maliksblr92
    @params ==> password,email
    return  ==> True/Flase
"""
class User_Document(Document):
    username= StringField(verbose_name="Username", max_length=255)
    email= StringField(verbose_name="Email", max_length=255)
    password= StringField(verbose_name="Password", max_length=255)
    role= IntField(verbose_name="Role", default=0)
    phone= StringField(verbose_name="Phone", max_length=255,default=0)
    created_at=DateField(default=datetime.datetime.now, editable=False)
    updated_at=DateField(default=datetime.datetime.now, editable=True)

  
    def __repr__(self):
        return self.username


    def __str__(self):
            return self.username
  
  
  
  
    def Insert_User(self,username,email,password,role,phone):
        try:
            self.username=username
            self.email=email
            self.password=password
            self.phone=phone
            self.role=int(role)
            self.save()
            print(f"{bcolors.WARNING}User  --Create New User  --Success ,{bcolors.ENDC}")
            return True
        except Exception as e:
            print(f"{bcolors.WARNING}User  --Create New User  --Exception ,{bcolors.ENDC}")
            print(e)
            return False


    @staticmethod
    def User_Already_Exist(username):
            entry=User_Document.objects.filter(username=username)
            if(entry):
                print(f"{bcolors.WARNING}User_Already_Exist  --UserExist Success ,{bcolors.ENDC}")
                return True
            else:
                print(f"{bcolors.WARNING}User_Already_Exist  --UserExist  Failed ,{bcolors.ENDC}")
                return False


    @staticmethod
    def User_Is_Authenticated(password,email):
            try:
                user=User_Document.objects.filter(email=email).exists()
                print(user)
                return False
            except Exception as e:
                print(f"{bcolors.WARNING}User  --Create New User  --Exception ,{bcolors.ENDC}")
                print(e)
                return False

    @staticmethod
    def User_Login(username,password):
                try:
                    user=User_Document.objects.filter(username=username).exists()
                    if user:
                        print(user)
                        print(user.user)
                        return False
                except Exception as e:
                    print(f"{bcolors.WARNING}User  --Create New User  --Exception ,{bcolors.ENDC}")
                    print(e)
                    return False







    @staticmethod
    def Validate_User(email,password):
            try:
                user=User_Document.objects.all()
                print(user)
                return False
            except Exception as e:
                print(f"{bcolors.WARNING}User  --Validate_User --Exception ,{bcolors.ENDC}")
                print(e)
                return False