# Generated by Django 5.0.6 on 2024-05-16 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pelanggarann_kategori', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kategori',
            name='Catatan',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='kategori',
            name='Nama',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='kategori',
            name='Pesan',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='kategori',
            name='Poin',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
