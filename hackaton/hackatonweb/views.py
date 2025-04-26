from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login

from hackatonweb.forms import LoginUserForm, RegisterUserForm

roles_templates = {
    "creator": "web/registration_creator_box.html",
    "member": "web/member_registration.html"
}

roles_licences = {
    "creator": "web/registration_creator_box.html",
    "member": "web/member-reg-license-agreement.html"
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


def license_agreement(request, reg_type):
    if reg_type in roles_templates.keys():
        return render(request, roles_licences.get(reg_type), context=content)
    else:
        return Http404("Такой роли не существует.")


def login(request):
    if request.method == "POST":
        form = LoginUserForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd['login'],
                                password=cd['password'])
            if user and user.is_active:
                django_login(request, user)
                return redirect("index")
    else:
        form = LoginUserForm(request.POST)
    context = content | {'form': form}
    return render(request, "web/login.html", context=context)

def register(request):
    if request.method == "POST":
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            return render()
    else:
        form = LoginUserForm(request.POST)
    context = content | {'form': form}
    return render(request, "web/login.html", context=context)

