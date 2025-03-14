from django.conf import settings
from rest_framework import serializers
from .models import Projects, Variables
from cryptography.fernet import Fernet


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def validate(self, attrs):
        if not attrs.get("name"):
            raise serializers.ValidationError("Name is required")
        if not attrs.get("creator"):
            raise serializers.ValidationError("Creator is required")

        return attrs


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta(ProjectSerializer.Meta):
        read_only_fields = ("creator", "created_at", "updated_at")


class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variables
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def validate(self, attrs):
        if (
            not attrs.get("key")
            or not attrs.get("value")
            or not attrs.get("author")
            or not attrs.get("project")
        ):
            raise serializers.ValidationError(
                "Key, Value, Author and Project are required"
            )

        return attrs


class VariableDetailSerializer(serializers.ModelSerializer):
    class Meta(VariableSerializer.Meta):
        read_only_fields = ("author", "project", "created_at", "updated_at")

    __f = Fernet(settings.ENCRYPTION_KEY)

    def update(self, instance, validated_data):
        if "value" in validated_data:
            validated_data["value"] = self.__f.encrypt(
                validated_data["value"].encode()
            ).decode()

        if "key" in validated_data:
            validated_data["key"] = (
                validated_data["key"].strip().upper().replace(" ", "_")
            )
        return super().update(instance, validated_data)
