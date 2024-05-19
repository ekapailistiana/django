from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SekolahSerializer
from .models import Sekolah

# Create your views here.
class SekolahViewSet(viewsets.ModelViewSet):
    serializer_class = SekolahSerializer
    queryset = Sekolah.objects.all()