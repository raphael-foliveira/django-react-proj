from django.contrib import admin
from .models import Group, Event, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    fields = ("user", "image")
    list_display = ("user", "image")

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    fields = ('name', 'location', 'description')
    list_display = ('id', 'name', 'location', 'description')
    
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fields = ('team_1', 'team_2', 'score_1', 'score_2', 'time')
    list_display = ('id', 'team_1', 'team_2', 'score_1', 'score_2', 'time')
