from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import Event, Group, UserProfile
from .serializers import EventSerializer, GroupSerializer, UserSerializer, UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    class Meta:
        model = UserProfile
        
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    class Meta:
        model = User


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    class Meta:
        model = Group
    

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    class Meta:
        model = Event
        

class CustomObtainAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({
            'token': token.key,
            'user': user_serializer.data
            })
        
        
class RegisterNewUser(views.APIView):
    
    def post(self, request):
        existing_user = User.objects.filter(username=request.data.get('newUserName')).exists()
        if existing_user:
            return Response({
                'message': 'There is already an user with this username.'
            })
        new_user = User.objects.create_user(
            username = request.data.get('newUserName'),
            password = request.data.get('newPassword'),
            first_name = request.data.get('firstName'),
            last_name = request.data.get('lastName'),
            email = request.data.get('email')
        )
        new_user_profile = UserProfile.objects.create(
            user = new_user,
            image = None
        )
        user_profile_serializer = UserProfileSerializer(new_user_profile)
        return Response({
            'new_user_profile': user_profile_serializer.data,
            'message': 'User created successfully!'
        })
        

class ChangeUserPassword(views.APIView):
    
    def put(self, request):
        user_id = request.data.get('userId')
        user: User = User.objects.get(id=user_id)
        user.set_password(request.data.get('newPassword'))
        user.save()
        user_serializer = UserSerializer(user)
        return Response({   
            'updated_user': user_serializer.data,
            'message': 'Password updated successfuly'
        })