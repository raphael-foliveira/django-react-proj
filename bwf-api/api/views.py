from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import Event, BetGroup, Member, UserProfile
from .serializers import EventSerializer, GroupFullSerializer, GroupSerializer, UserSerializer, UserProfileSerializer, MemberSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django.db.models import Q


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    class Meta:
        model = UserProfile
        
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    class Meta:
        model = User


class GroupViewSet(viewsets.ModelViewSet):
    queryset = BetGroup.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    class Meta:
        model = BetGroup
        

class GroupFullViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def list(self, request):
        groups = BetGroup.objects.all()
        serializer = GroupFullSerializer(groups, many=True)
        return Response(serializer.data)
                        
    def retrieve(self, request, pk=None):
        group = BetGroup.objects.get(pk=pk)
        group_serializer = GroupFullSerializer(group)
        return Response(group_serializer.data)
    
    def create(self, request):
        new_group = BetGroup.objects.create(
            name=request.data["newGroupName"],
            location=request.data["newGroupLocation"],
            description=request.data["newGroupDescription"]
        )
        group_creator = User.objects.get(pk=request.data["userId"])
        new_member = Member.objects.create(
            user=group_creator,
            group=new_group,
            admin=True
        )
        new_group_serializer = GroupSerializer(new_group)
        return Response({
            "message": "New group created successfully!",
            "new_group": new_group_serializer.data
        })
        
    def destroy(self, request, pk=None):
        deleted_group: BetGroup = BetGroup.objects.get(pk=pk)
        membership: Member = Member.objects.get(user=request.user, group=deleted_group)
        if membership.admin:
            deleted_group.delete()
            return Response({
                "message": f"Group {deleted_group.name} deleted successfully"
            })
        return Response({
            "message": "User does not have the required permission to do that."
        })
        

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    class Meta:
        model = Event
        

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    class Meta:
        model = Member
        

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
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
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
        
        
class UserJoinGroup(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def post(self, request):
        user_id: int = request.data.get('userId')
        group_id: int = request.data.get('groupId')
        user: User = User.objects.get(id=user_id)
        group: BetGroup = BetGroup.objects.get(id=group_id)
        Member.objects.create(
            user=user,
            group=group
        )
        user_serializer: UserSerializer = UserSerializer(user)
        group_serializer: GroupFullSerializer = GroupFullSerializer(group)
        return Response({
            'user': user_serializer.data,
            'group': group_serializer.data
        })
        
class userLeavegroup(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def post(self, request):
        user_id: int = request.data.get('userId')
        group_id: int = request.data.get('groupId')
        user: User = User.objects.get(id=user_id)
        group: BetGroup = BetGroup.objects.get(id=group_id)
        relationship: Member = Member.objects.get(Q(user=user), Q(group=group))
        relationship.delete()
        return Response({
            'message': f'{user.username} has left {group.name}'
        })
        