"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from .views import *


"""
DRF Routes 
"""
from rest_framework import routers
# from .api import LeadDocumentViewSet,LoginApi
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
router=routers.DefaultRouter()
# router.register('api/leads',LeadDocumentViewSet,'leads')





urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    # path('api/auth/user-is-authenticated/',User_Is_Authenticated),
    # path('api/auth/user/login/',User_Login),
    # path('api/auth/add-user/',Add_User),
    # path('api/auth/user-exist/',User_Already_Exist),
    # path('api/auth/user-email-exist/',User_Email_Exist),
    # path('api/auth/user-phone-exist/',User_Phone_Exist),
    # path('api/auth/all-users/',All_Users),
    # path('api/auth/deactivate-user/',Deactivate_User),
    # path('api/auth/activate-user/',Activate_User),
    path('api/dashboard/', include("dashboard.urls")),
    path('api/twitter/', include("twitter.urls")),
    path('api/rapid-search/', include("rapid_search.urls")),

]
# urlpatterns.extend(router.urls)
