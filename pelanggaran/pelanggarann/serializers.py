from rest_framework import serializers
from pelanggarann.models import Pelanggarann

class PelanggarannSerializer(serializers.ModelSerializer):
    class Meta :
        model = Pelanggarann
        fields = "__all__"