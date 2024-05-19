from django.shortcuts import render
from rest_framework import viewsets
from .serializers import KelasSerializer
from .models import Kelas

# Create your views here.
class KelasViewSet(viewsets.ModelViewSet):
    serializer_class = KelasSerializer
    queryset = Kelas.objects.all()