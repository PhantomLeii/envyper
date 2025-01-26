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
        serializer = ProjectSerializer(data={"creatorId": "test-user", **request.data})
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response({"message": 'Provided data is invalid'}, status=status.HTTP_400_BAD_REQUEST)


class ProjectOperationAPIView(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(pk=project_id)
        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
    
    def patch(self, request, project_id):
        project = Project.objects.get(id=project_id)

        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)

        return Response({"message": "Provided data is invalid"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id):
        project = Project.objects.get(id=project_id)
        if not project:
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)
        
        if project.creatorId != 'test-user':
            return Response({'message': 'Project not found'},status=status.HTTP_404_NOT_FOUND)
        
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)