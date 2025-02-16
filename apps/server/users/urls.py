from django.urls import path
from .views import UserAPIView

urlpatterns = [
    path("user/create/", UserAPIView.as_view(), name="create-user"),
]
