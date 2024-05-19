from rest_framework import serializers
from petugas.models import Petugas

class PetugasSerializer(serializers.ModelSerializer):
    class Meta :
        model = Petugas
        fields = "__all__"