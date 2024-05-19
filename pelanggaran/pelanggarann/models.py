from django.db import models
from sekolah.models import Sekolah
from petugas.models import Petugas
from siswa.models import Siswa
from pelanggarann_kategori.models import Kategori

# Create your models here.
class Pelanggarann(models.Model):
    SekolahId = models.ForeignKey(Sekolah, on_delete=models.CASCADE)
    TglJam = models.DateTimeField()
    PetugasId = models.ForeignKey(Petugas, on_delete=models.CASCADE)
    SiswaId = models.ForeignKey(Siswa, on_delete=models.CASCADE)
    KategoriId = models.ForeignKey(Kategori, on_delete=models.CASCADE)
    Poin = models.CharField(max_length=20, null=True)
    Catatan = models.CharField(max_length=200, null=True)

    class Meta:
        db_table = 'pelanggarann'