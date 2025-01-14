# Generated by Django 5.0.6 on 2024-05-16 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sekolah', '0003_alter_sekolah_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='sekolah',
            name='Provinsi',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='sekolah',
            name='Alamat',
            field=models.TextField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='sekolah',
            name='Catatan',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='sekolah',
            name='Kota',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='sekolah',
            name='Nama',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
