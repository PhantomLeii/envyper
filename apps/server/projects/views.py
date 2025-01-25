from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Project
from .serializers import ProjectSerializer


class ProjectDetailAPIView(APIView):    
    def get(self, request):
        projects = Project.objects.filter(creatorId='test-user')
        return Response({"data": projects.values()}, status=status.HTTP_200_OK)

    def post(self, request):
        project = Project.objects.create(creatorId='test-user')
        return Response({"data": project.values()}, status=status.HTTP_201_CREATED)


class ProjectOperationAPIView(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(pk=project_id)
        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
    
    # TODO: Fix attributes error bug & implement update method
    def patch(self, request, project_id):
        project = Project.objects.get(id=project_id)

        if not (request.data.get('name') or request.data.get('description')):
            return Response({'message': 'No provided data'}, status=status.HTTP_400_BAD_REQUEST)
    
        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)
            
        project.objects.update(**request.data)
        project.save()
        return Response({"data": project.values()}, status=status.HTTP_200_OK)

    def delete(self, request, project_id):
        project = Project.objects.get(id=project_id)
        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)
        
        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)
        
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)