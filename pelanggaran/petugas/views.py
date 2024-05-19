from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PetugasSerializer
from .models import Petugas

# Create your views here.
class PetugasViewSet(viewsets.ModelViewSet):
    serializer_class = PetugasSerializer
    queryset = Petugas.objects.all()