from rest_framework import serializers

from .models import Wine, WineSearchWord


class WineSerializer(serializers.ModelSerializer):
    # new
    variety = serializers.SerializerMethodField()
    winery = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    # new
    def get_variety(self, obj):
        if hasattr(obj, 'variety_headline'):
            return getattr(obj, 'variety_headline')
        return getattr(obj, 'variety')

    # new
    def get_winery(self, obj):
        if hasattr(obj, 'winery_headline'):
            return getattr(obj, 'winery_headline')
        return getattr(obj, 'winery')

    # new
    def get_description(self, obj):
        if hasattr(obj, 'description_headline'):
            return getattr(obj, 'description_headline')
        return getattr(obj, 'description')

    class Meta:
        model = Wine
        fields = ('id', 'country', 'description', 'points', 'price', 'variety', 'winery',)


class WineSearchWordSerializer(serializers.ModelSerializer): # new
    class Meta:
        model = WineSearchWord
        fields = ('word',)
