from rest_framework import routers
from .views import PelanggarannViewSet

router = routers.DefaultRouter()
router.register(r'api/pelanggarann',
PelanggarannViewSet, 'pelanggarann')

urlpatterns = router.urls