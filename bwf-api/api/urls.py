from api import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register('groups', views.GroupViewSet)
router.register('events', views.EventViewSet)
router.register('userprofiles', views.UserProfileViewSet)
router.register('users', views.UserViewSet)
router.register('members', views.MemberViewSet)
router.register('groups_detailed', views.GroupFullViewSet, basename='groups_detailed')

urlpatterns = [
    path('', include(router.urls)),
    path('authenticate', views.CustomObtainAuthToken.as_view()),
    path('register', views.RegisterNewUser.as_view()),
    path('change-password', views.ChangeUserPassword.as_view()),
    path('join', views.UserJoinGroup.as_view())
]
