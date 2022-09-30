from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BetGroup, Event, Member, UserProfile
from django.db.models import QuerySet


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('image', 'bio', 'is_premium')

        
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "email", "profile",)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
              
class GroupSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    
    class Meta:
        model = BetGroup
        fields = '__all__'


class MemberSerializer(serializers.Serializer):
    user = UserSerializer()
    admin = serializers.BooleanField()
        

class GroupFullSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    events = EventSerializer(many=True)
    
    class Meta:
        model = BetGroup
        fields = '__all__'
    
    def get_members(self, object):
        return MemberSerializer(object.members.all(), many=True).data
    


    
    