from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer


class UserAPIView(APIView):
    def post(self, request):
        User = get_user_model()

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            pass

        email = request.data.pop("email")
        password = request.data.pop("password")

        user = User.objects.create_user(email=email, password=password, **request.data)

        return Response(
            {"username": user.username, "email": user.email},
            status=status.HTTP_201_CREATED,
        )
