from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    
    def validate(self, attrs):
        """
        Check that the data contains at least a project name or description
        """
        if not attrs.get('name') and not attrs.get('description'):
            raise serializers.ValidationError("Project name or description is required")
        
        return attrs