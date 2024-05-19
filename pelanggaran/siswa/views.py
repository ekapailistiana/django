from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SiswaSerializer
from .models import Siswa

# Create your views here.
class SiswaViewSet(viewsets.ModelViewSet):
    serializer_class = SiswaSerializer
    queryset = Siswa.objects.all()