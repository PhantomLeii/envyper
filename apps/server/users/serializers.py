from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        read_only_fields = ("id", "date_joined", "is_active")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Access Email & Password from validated data & create
        new user or raise exception if either is missing.
        """
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        if not email or not password:
            raise serializers.ValidationError("Email & Password are required")

        user = self.Meta.model.objects.create(email=email, **validated_data)
        user.set_password(password)
        user.save()
        return user
