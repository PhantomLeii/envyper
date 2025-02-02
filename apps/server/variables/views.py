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
        
        project = Project.objects.get(pk=project_id)
        if not project:
            return Response({"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if project.creatorId != 'test-user':
            return Response({"message": "You are not authorized to view this project's variables"}, status=status.HTTP_401_UNAUTHORIZED)
        
        variables = Variable.objects.filter(project_id=project_id)
        return Response(VariableSerializer(variables, many=True).data, status=status.HTTP_200_OK)


    # # TODO: Create this API view
    # def post(self, request):
    #     serizializer = VariableSerializer(data=request.data)
    #     if serizializer.is_valid():
    #         serizializer.save()
    #         return Response(serizializer.data, status=status.HTTP_201_CREATED)
    #     return Response({"message": "Provided data is invalid"}, status=status.HTTP_400_BAD_REQUEST)