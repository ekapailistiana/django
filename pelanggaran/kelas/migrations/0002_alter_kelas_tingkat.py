# Generated by Django 5.0.6 on 2024-05-16 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kelas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kelas',
            name='Tingkat',
            field=models.CharField(max_length=13),
        ),
    ]