from django.db import models


class Member(models.Model):
    username = models.CharField(max_length=50)
    mail = models.CharField(max_length=100, unique=True)
    psw = models.CharField(max_length=50)
    rank = models.IntegerField(default=0)


class Creator(models.Model):
    member = models.ForeignKey('Member', on_delete=models.PROTECT, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    number_phone = models.IntegerField(unique=True)


class BoxMember(models.Model):
    member = models.ForeignKey('Member', on_delete=models.PROTECT, null=True)


class Team(models.Model):
    members = models.ManyToManyField('BoxMember')


class Fight(models.Model):
    teams = models.ManyToManyField('Team', related_name='fights_as_team')
    winner = models.ForeignKey('Team', on_delete=models.PROTECT, null=True, related_name='fights_as_winner')
    date = models.DateField()


class Competition(models.Model):
    creator = models.ForeignKey('Creator', on_delete=models.PROTECT, null=True)
    town = models.CharField(max_length=100)
    fights = models.ManyToManyField('Fight')
