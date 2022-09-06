from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Group, Event, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "profile")
        
        
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
        
class GroupSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    
    class Meta:
        model = Group
        fields = '__all__'