from rest_framework import serializers
from kelas.models import Kelas

class KelasSerializer(serializers.ModelSerializer):
    class Meta :
        model = Kelas
        fields = "__all__"