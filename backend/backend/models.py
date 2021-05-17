
from mongoengine import *
import datetime
import os
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

""" 
    @dated  ==> Monday, 17 May 2021
    @author ==> Ahmed Kabeer Shaukat
    @email  ==> maliksblr92
    @params ==> password,email
    return  ==> True/Flase
"""
class User(Document):
  username: StringField(verbose_name="Username", max_length=255)
  email: StringField(verbose_name="Email", max_length=255)
  password: StringField(verbose_name="Password", max_length=255)
  role: StringField(verbose_name="Role", max_length=255,default=0)#0=>
  created_at=DateField(default=datetime.datetime.now, editable=False)
  updated_at=DateField(default=datetime.datetime.now, editable=True)
  def __repr__(self):
     return self.username
  def __str__(self):
        return self.username
  def Create_Twitter_Target(self,username,email,password,role):
        self.username=username
        self.email=email
        self.password=password
        self.role=int(role)
        try:
           self.save()
           print(f"{bcolors.WARNING}User  --Create New User  --Success ,{bcolors.ENDC}")
           return True
        except Exception as e:
          print(f"{bcolors.WARNING}User  --Create New User  --Exception ,{bcolors.ENDC}")
          print(e)
          return False
  @staticmethod
  def User_Is_Authenticated(password,email):
        try:
             user=User.objects.filter(email=email).exists()
             print(user)
             return False
        except Exception as e:
            print(f"{bcolors.WARNING}User  --Create New User  --Exception ,{bcolors.ENDC}")
            print(e)
            return False
  @staticmethod
  def Validate_User(email,password):
        try:
             user=User.objects.all()
             print(user)
             return False
        except Exception as e:
            print(f"{bcolors.WARNING}User  --Validate_User --Exception ,{bcolors.ENDC}")
            print(e)
            return False