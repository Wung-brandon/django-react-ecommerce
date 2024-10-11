from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from .models import (
    Product,
    Category,
    SubCategory,
    Brand,
    Review
)
from .serializers import (
    ProductSerializer, 
    RelatedProductSerializer,
    FeaturedProductSerializer, 
    NewArrivalProductSerializer, 
    RecentProductSerializer,
    CategorySerializer, 
    SubCategorySerializer, 
    BrandSerializer,  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.
    ReviewSerializer
)


# Get all products with related products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    parser_classes = [FormParser, MultiPartParser]
    def perform_create(self, serializer):
        serializer.save()

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser,)
    
class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryListView(generics.ListCreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class BrandListView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

# Get featured products
class FeaturedProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = FeaturedProductSerializer

    def get_queryset(self):
        return Product.get_featured_products()

# Get new arrivals
class NewArrivalProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewArrivalProductSerializer

    def get_queryset(self):
        return Product.get_new_arrivals()
    
class RelatedProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RelatedProductSerializer

    def get_queryset(self):
        # Get the product ID or slug from the URL query parameters
        product_id = self.kwargs.get('product_id')  # Assuming you're passing product_id in the URL

        # Fetch the product instance
        product = get_object_or_404(Product, id=product_id)

        # Use the instance method to get related products
        return product.get_related_products()

# Get recent products (e.g., the last 10 items added)
class RecentProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RecentProductSerializer

    def get_queryset(self):
        # Get the last 10 recent products
        return Product.get_recent_products(limit=10)

class ReviewListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        product = Product.objects.get(id=product_id)
        user = self.request.user

        # Check if the user has already reviewed this product
        if Review.objects.filter(product=product, user=user).exists():
            raise ValidationError("You have already reviewed this product.")

        serializer.save(user=user, product=product)