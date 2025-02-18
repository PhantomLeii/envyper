from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProjectSerializer


class ProjectsAPIView(APIView):
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
