from django.db import models

# Create your models here.
class Sekolah(models.Model):
    Nama = models.CharField(max_length=100, null=True)
    Alamat = models.TextField(max_length=100, null=True)
    Kota = models.CharField(max_length=50, null=True)
    Provinsi = models.CharField(max_length=50, null=True)
    NoTelp = models.IntegerField()
    Email = models.EmailField()
    Website = models.URLField()
    Catatan = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.Nama

    class Meta:
        db_table = 'sekolah'