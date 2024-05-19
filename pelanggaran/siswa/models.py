from django.db import models
from sekolah.models import Sekolah
from kelas.models import Kelas

# Create your models here.
class Siswa(models.Model):
    SekolahId = models.ForeignKey(Sekolah, on_delete=models.CASCADE)
    NIS = models.IntegerField(max_length=20, null=True)
    Nama = models.CharField(max_length=100, null=True)
    KelasId = models.ForeignKey(Kelas, on_delete=models.CASCADE)
    NamaOrtu = models.CharField(max_length=100, null=True)
    HpOrtu = models.IntegerField()
    EmailOrtu = models.EmailField()
    Catatan = models.CharField(max_length=200, null=True)

    def _str_(self):
        return self.Nama
    
    class Meta:
        db_table = 'siswa'