"""
URL configuration for hackaton project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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

from hackatonweb.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"),
    path('box/varous-login', login_redirect, name="box_various_login"),
    path('box/registration/<slug:reg_type>', registration, name="box_reg"),
    path('box/registration/<slug:reg_type>/reg-license-agreement', license_agreement, name="licence"),
    path('box/login', login, name="box_login")
    #path('login/', login_redirect, name="login"),
    #path('registration/login', login, name="reg_login")
]
