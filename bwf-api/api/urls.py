from api import views
from rest_framework import routers
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('groups', views.GroupViewSet)
router.register('events', views.EventViewSet)
router.register('userprofiles', views.UserProfileViewSet)
router.register('users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('authenticate', views.CustomObtainAuthToken.as_view()),
    path('register', views.RegisterNewUser.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
