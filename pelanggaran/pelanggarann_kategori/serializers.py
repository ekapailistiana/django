from rest_framework import serializers
from .models import Kategori

class KategoriSerializers(serializers.ModelSerializer):
    class Meta :
        model = Kategori
        fields = "__all__"