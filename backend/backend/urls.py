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
from django.urls import path
from django.urls import path,include
from .views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/user-is-authenticated/',User_Is_Authenticated),
    path('api/auth/user/login/',User_Login),
    path('api/auth/add-user/',Add_User),
    path('api/auth/user-exist/',User_Already_Exist),
    path('api/auth/all-users/',All_Users),
    path('api/dashboard/', include("dashboard.urls")),
    path('api/twitter/', include("twitter.urls")),
    path('api/rapid-search/', include("rapid_search.urls")),
]
