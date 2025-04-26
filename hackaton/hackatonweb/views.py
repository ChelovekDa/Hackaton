from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login

from hackatonweb.forms import LoginForm

roles_templates = {
    "creator": "web/registration_creator_box.html",
    "member": "web/member_registration.html"
}

content = {
    "title": "Лига спорта"
}


def index(request):
    return render(request, "web/index.html", context=content)


def login_redirect(request):
    return render(request, "web/login_various.html", context=content)


def registration(request, reg_type):
    if reg_type in roles_templates.keys():
        return render(request, roles_templates.get(reg_type), context=content)
    else:
        return Http404("Такой роли не существует.")


def login(request):
    return render(request, "web/reg_login.html")


def login_test(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd['login'],
                                password=cd['password'])
            if user and user.is_active:
                django_login(request, user)
                return redirect("index")
            else:
                return render(request, "web/login_various.html",{"form": form, "error_message": "Такого пользователя не существует!"})
    else:
        form = LoginForm(request.POST)
    return render(request, "web/login_various.html",{"form": form})

