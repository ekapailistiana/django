from rest_framework import routers
from .views import SekolahViewSet

router = routers.DefaultRouter()
router.register(r'api/sekolah',
SekolahViewSet, 'sekolah')

urlpatterns = router.urls