from rest_framework import serializers
from .models import Variable


class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variable
        fields = '__all__'
    
    def validate(self, attrs):
        if not attrs.get('key') or not attrs.get('value'):
            raise serializers.ValidationError('Key and Value are required fields')
        if not attrs.get('autho_id'):
            raise serializers.ValidationError('Author ID is required')
        return attrs