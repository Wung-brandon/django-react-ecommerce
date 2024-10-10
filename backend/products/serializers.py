from rest_framework import serializers
from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']
        read_only_fields = ['id']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    related_products = serializers.SerializerMethodField()
    is_featured = serializers.BooleanField(read_only=True)
    is_new_arrival = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'slug', 'category', 'brand', 'image', 'video', 'is_featured', 'is_new_arrival', 'related_products']
        read_only_fields = ['id']
    def get_related_products(self, obj):
        related_products = obj.get_related_products()
        return ProductSerializer(related_products, many=True).data

# Serializer for Featured Products
class FeaturedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug']
        read_only_fields = ['id']

# Serializer for New Arrivals
class NewArrivalProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug']
        read_only_fields = ['id']

# Serializer for Recent Products
class RecentProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug']
        read_only_fields = ['id']
