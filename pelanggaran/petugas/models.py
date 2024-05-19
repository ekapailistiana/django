from django.db import models
from sekolah.models import Sekolah

# Create your models here.
class Petugas(models.Model):
    SekolahId = models.ForeignKey(Sekolah, on_delete=models.CASCADE)
    Nama = models.CharField(max_length=100, null=True)
    Jabatan = models.CharField(max_length=50, null=True)
    NoHp = models.IntegerField()
    Email = models.EmailField()
    Catatan = models.CharField(max_length=200, null=True)

    def _str_(self):
        return self.Nama

    class Meta:
        db_table = 'petugas' 