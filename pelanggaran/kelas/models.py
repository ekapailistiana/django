from django.db import models
from sekolah.models import Sekolah

# Create your models here.
class Kelas(models.Model):
    SekolahId = models.ForeignKey(Sekolah, on_delete=models.CASCADE)
    Nama = models.CharField(max_length=100, null=True)
    Tingkat = models.CharField(max_length=13, null=True)
    Catatan = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'kelas'