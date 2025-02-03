from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Variable
from .serializers import VariableSerializer
from projects.models import Project
from projects.serializers import ProjectSerializer


class VariableAPIView(APIView):
    # FIXME: TEST THIS API VIEW
    def get(self, request):
        project_id = request.query_params.get('projectId')        
        if not project_id:
            return Response({"message": "Project ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            project = Project.objects.get(pk=project_id)
            if project.creatorId != 'test-user':
                return Response({"message": "You are not authorized to view this project's variables"}, status=status.HTTP_401_UNAUTHORIZED)
            
            variables = Variable.objects.filter(project_id=project_id)
            return Response({"data": variables.values()}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        