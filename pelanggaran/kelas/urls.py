from rest_framework import routers
from .views import KelasViewSet

router = routers.DefaultRouter()
router.register(r'api/kelas',
KelasViewSet, 'kelas')

urlpatterns = router.urls