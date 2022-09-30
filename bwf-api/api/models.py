
from django.db import models
from django.contrib.auth.models import User

def upload_path_handler(instance, filename):
    return f"avatars/{instance.user.id}/{filename}"


class UserProfile(models.Model):
    user: User = models.OneToOneField(User, related_name="profile", primary_key=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path_handler, blank=True)
    is_premium = models.BooleanField(default=False)
    bio = models.CharField(max_length=255, blank=True, null=True)


class BetGroup(models.Model):
    name = models.CharField(max_length=32)
    location = models.CharField(max_length=32)
    description = models.CharField(max_length=255)
    
    class Meta:
        unique_together = (('name', 'location'))


class Event(models.Model):
    team_1 = models.CharField(max_length=100)
    team_2 = models.CharField(max_length=100)
    score_1 = models.IntegerField(default=0)
    score_2 = models.IntegerField(default=0)
    time = models.DateTimeField()
    group = models.ForeignKey(BetGroup, related_name='events', on_delete=models.CASCADE)
    

class Member(models.Model):
    group = models.ForeignKey(BetGroup, related_name='members', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='bet_groups', on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)
    
    class Meta:
        unique_together = (('user', 'group'))
