from rest_framework import routers
from .views import SiswaViewSet

router = routers.DefaultRouter()
router.register(r'api/siswa',
SiswaViewSet, 'siswa')

urlpatterns = router.urls