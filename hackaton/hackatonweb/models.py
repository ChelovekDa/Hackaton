from django.db import models


class Member(models.Model):
    username = models.CharField(max_length=50)
    mail = models.CharField(max_length=100, unique=True)
    psw = models.CharField(max_length=50)


class BoxCreator(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    mail = models.CharField(max_length=100, unique=True)
    number_phone = models.IntegerField()
    town = models.CharField(max_length=100)
    name_organization = models.CharField(max_length=100)
    rang = models.CharField(max_length=100)
    psw = models.CharField(max_length=50)
