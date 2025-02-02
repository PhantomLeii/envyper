from django.urls import path
from .views import VariableAPIView

urlpatterns = [
    path('', VariableAPIView.as_view(), name='variables')
]
