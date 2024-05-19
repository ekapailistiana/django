from rest_framework import routers
from .views import PetugasViewSet

router = routers.DefaultRouter()
router.register(r'api/petugas',
PetugasViewSet, 'petugas')

urlpatterns = router.urls