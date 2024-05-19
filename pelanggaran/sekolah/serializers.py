from rest_framework import serializers
from sekolah.models import Sekolah

class SekolahSerializer(serializers.ModelSerializer):
    class Meta :
        model = Sekolah
        fields = "__all__"