from rest_framework import serializers


try:

    from home.models import Sales

except:
    pass 

class SalesSerializer(serializers.ModelSerializer):
    class Meta:

        try:
            model = Sales
        except:
            pass    
        fields = '__all__'

