from rest_framework import serializers
from .models import Product, ProductImage
from .models import (
    Category, 
    SubCategory, 
    Brand, 
    Product,
    Review
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'category', 'slug']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug']
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']
        read_only_fields = ['id']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)  # Related images
    image = serializers.ImageField(required=False)  # Main image
    video = serializers.FileField(required=False)   # Product video
    additional_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )  # Field to accept multiple images during POST
    # related_products = serializers.SerializerMethodField()  # For fetching related products
    brand = serializers.StringRelatedField()  # String representation of the brand
    category = serializers.StringRelatedField()  # String representation of the category
    subcategory = serializers.StringRelatedField(allow_null=True)  # Optional subcategory
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'brand', 'category', 'subcategory', 'price', 'stock', 
                  'image', 'video', 'is_featured', 'is_new_arrival', 'slug', 
                  'images', 'additional_images', 'review_count', 'average_rating']
        read_only_fields = ['id', 'is_featured', 'is_new_arrival']

    def create(self, validated_data):
        additional_images = validated_data.pop('additional_images', [])
        product = Product.objects.create(**validated_data)
        # Handle multiple images
        for image in additional_images:
            ProductImage.objects.create(product=product, image=image)

        return product

    def update(self, instance, validated_data):
        additional_images = validated_data.pop('additional_images', [])
        instance = super().update(instance, validated_data)

        # Handle multiple images in update
        for image in additional_images:
            ProductImage.objects.create(product=instance, image=image)

        return instance
    def get_review_count(self, obj):
        """Returns the total number of reviews for the product."""
        return obj.get_review_count()
    
    def get_average_rating(self, obj):
        average_rating = obj.get_average_rating()
        return round(average_rating, 1) if average_rating else None

    # def get_related_products(self, obj):
    #     related_products = obj.get_related_products()
    #     # Use a smaller serializer to avoid recursion
    #     return RelatedProductSerializer(related_products, many=True).data


# Create a smaller serializer for related products to avoid recursion
class RelatedProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'slug', 'image', 'images', 'description', 'category', 'subcategory', 'stock', 'brand']  # Only include essential fields
    

# Serializer for Featured Products
class FeaturedProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 'brand', 'images']
        read_only_fields = ['id']

# Serializer for New Arrivals
class NewArrivalProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 'brand', 'images']
        read_only_fields = ['id']

# Serializer for Recent Products
class RecentProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 'brand', 'images']
        read_only_fields = ['id']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Display user's username
    product = serializers.StringRelatedField(read_only=True)  # Display product's name

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'review']
        read_only_fields = ['id', 'user', 'product']