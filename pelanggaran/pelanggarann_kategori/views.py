from django.shortcuts import render
from rest_framework import viewsets
from .serializers import KategoriSerializers
from .models import Kategori

# Create your views here.
class Pelanggaran_KategoriViewSet(viewsets.ModelViewSet):
    serializer_class = KategoriSerializers
    queryset = Kategori.objects.all()