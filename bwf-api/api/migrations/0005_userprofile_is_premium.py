# Generated by Django 4.1 on 2022-09-07 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_userprofile_id_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_premium',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
    ]
