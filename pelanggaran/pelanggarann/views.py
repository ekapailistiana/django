from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PelanggarannSerializer
from .models import Pelanggarann

# Create your views here.
class PelanggarannViewSet(viewsets.ModelViewSet):
    serializer_class = PelanggarannSerializer
    queryset = Pelanggarann.objects.all()