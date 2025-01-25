from django.urls import path
from .views import ProjectDetailAPIView, ProjectOperationAPIView

urlpatterns = [
    path('', ProjectDetailAPIView.as_view(), name='projects'),
    path('<int:project_id>/', ProjectOperationAPIView.as_view(), name='project-operations'),
]
