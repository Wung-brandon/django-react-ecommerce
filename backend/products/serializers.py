from rest_framework import serializers
from .models import Product, ProductImage
from .models import (
    Category, 
    SubCategory, 
    Brand, 
    Product,
    Review,
    Cart,
    CartItem,
    Wishlist,
    WishlistItem
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
    rating_percentages = serializers.SerializerMethodField()
    available_sizes = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'brand', 'category', 'subcategory', 'price', 'stock', 
                  'image', 'video', 'is_featured', 'is_new_arrival', 'slug', 'available_sizes', 'rating_percentages',
                  'images', 'additional_images', 'review_count', 'average_rating', 'sales_count']
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
    
    def get_rating_percentages(self, obj):
        return obj.get_rating_percentages()
    
    def get_available_sizes(self, obj):
        # Return a list of available sizes from the DEFAULT_SIZES
        return [size[0] for size in Product.DEFAULT_SIZES]

    # def get_related_products(self, obj):
    #     related_products = obj.get_related_products()
    #     # Use a smaller serializer to avoid recursion
    #     return RelatedProductSerializer(related_products, many=True).data


# Create a smaller serializer for related products to avoid recursion
# class RelatedProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'price', 'slug', 'image', 'images', 'description', 'category', 'subcategory', 
#                     'stock', 'brand',]  # Only include essential fields
    

# # Serializer for Featured Products
# class FeaturedProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
    
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 
#                   'brand', 'images', 'review_count', 'average_rating', 'sales_count']
#         read_only_fields = ['id']

# # Serializer for New Arrivals
# class NewArrivalProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 
#                   'brand', 'images', 'review_count', 'average_rating', 'sales_count']
#         read_only_fields = ['id']

# # Serializer for Recent Products
# class RecentProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'price', 'image', 'slug', 'description', 'category', 'subcategory', 'stock', 
#                   'brand', 'images', 'review_count', 'average_rating', 'sales_count']
#         read_only_fields = ['id']


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)  # Display product's name

    class Meta:
        model = Review
        fields = ['id', 'product', 'name', 'rating', 'review']
        read_only_fields = ['id', 'name', 'product']
    
class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    cart = serializers.StringRelatedField()
    total_price = serializers.SerializerMethodField(read_only=True) # Display
    unit_price = serializers.SerializerMethodField(read_only=True)  # Display unit price
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'cart', 'unit_price', 'quantity', 'total_price']
        read_only_fields = ['id']
        
    def total_price(self, obj):
        """Calculate total price for this cart item based on the quantity"""
        return obj.total_price()
        
    def get_unit_price(self, obj):
        """Retrieve the unit price of the product"""
        return obj.product.price
        
class CartSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField() # Display
    total_price = serializers.SerializerMethodField(read_only=True) # Display
    total_items = serializers.SerializerMethodField(read_only=True) # Display
    items = CartItemSerializer(many=True)  # Use the related_name
    items_count = serializers.SerializerMethodField(read_only=True) #
    class Meta:
        model = Cart
        fields = ['id', 'user', 'total_price', 'total_items', 'items', 'items_count']
        read_only_fields = ['id']
        
    def get_total_price(self, obj):
        """Calculate total price of all items in the cart."""
        return obj.total_price
    def get_total_items(self, obj):
        """Get total count of items in the cart."""
        return obj.total_items
    
    def get_items_count(self, obj):
        return obj.total_items_count
    
class WishlistItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()  # Display product name

    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'wishlist']  # Include any other fields you need
        read_only_fields = ['id']
        
class WishlistSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Display user
    total_items = serializers.SerializerMethodField(read_only=True)  # Display total items
    items = WishlistItemSerializer(source='wishlist_items', many=True)  # Use the related_name

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'total_items', 'items']
        read_only_fields = ['id']

    def get_total_items(self, obj):
        """Get total count of items in the wishlist."""
        return obj.total_items  # Calls the property in Wishlist