from django.urls import path
from .views import CreateUserAPIView

urlpatterns = [
    path("user/create/", CreateUserAPIView.as_view(), name="create-user"),
]
