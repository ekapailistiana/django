from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import Pelanggaran_KategoriViewSet

router = routers.DefaultRouter()
router.register(r'api/kategori',
Pelanggaran_KategoriViewSet, 'kategori')

urlpatterns = [ path('admin/', admin.site.urls), path('', include(router.urls)) ]
# urlpatterns = [ path('', include(router.urls)) ]
# urlpatterns = router.urls
