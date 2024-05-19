from django.db import models
from sekolah.models import Sekolah

# Create your models here.
class Kategori(models.Model):
    SekolahId = models.ForeignKey(Sekolah, on_delete=models.CASCADE)
    Nama = models.CharField(max_length=100, null=True)
    Poin = models.CharField(max_length=20, null=True)
    Pesan = models.CharField(max_length=100, null=True)
    Catatan = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.Nama

    class Meta:
        db_table = 'pelanggarann_kategori'

        