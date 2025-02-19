from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    ProjectSerializer,
    ProjectDetailSerializer,
    VariableSerializer,
    VariableDetailSerializer,
)
from .models import Projects, Variables


class ProjectsAPIView(APIView):
    def get(self, request):
        projects = Projects.objects.filter(creator=request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetailAPIView(APIView):
    def get_object(self, project_id, user_id):
        try:
            return Projects.objects.get(pk=project_id, creator=user_id)
        except Projects.DoesNotExist:
            return None

    def get(self, request, project_id):
        project = self.get_object(project_id, request.user.id)
        if project is None:
            return Response(
                {"detail": "Project does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProjectSerializer(project)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, project_id):
        project = self.get_object(project_id, request.user.id)
        if project is None:
            return Response(
                {"detail": "Project does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProjectDetailSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id):
        project = self.get_object(project_id, request.user.id)
        if project is None:
            return Response(
                {"detail": "Project does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VariablesAPIView(APIView):
    def post(self, request, project_id):
        data = {**request.data, "project": project_id, "author": request.user.id}
        serializer = VariableSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, project_id):
        project_id = request.query_params.get("project")
        if project_id is None:
            return Response(
                {"detail": "Project ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        if not Projects.objects.filter(pk=project_id, creator=request.user.id).exists():
            return Response(
                {"detail": "Project does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        variables = Variables.objects.filter(
            author=request.user.id, project=request.query_params.get("project")
        )

        serializer = VariableSerializer(variables, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class VariableDetailAPIView(APIView):
    def get(self, request, project_id, variable_id):
        pass

    def patch(self, request, project_id, variable_id):
        pass

    def delete(self, request, project_id, variable_id):
        pass
