from rest_framework import generics
from .models import Product
from .serializers import (
    ProductSerializer, 
    FeaturedProductSerializer, 
    NewArrivalProductSerializer, 
    RecentProductSerializer,
)

# Get all products with related products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Get featured products
class FeaturedProductListView(generics.ListAPIView):
    serializer_class = FeaturedProductSerializer

    def get_queryset(self):
        return Product.get_featured_products()

# Get new arrivals
class NewArrivalProductListView(generics.ListAPIView):
    serializer_class = NewArrivalProductSerializer

    def get_queryset(self):
        return Product.get_new_arrivals()

# Get recent products (e.g., the last 10 items added)
class RecentProductListView(generics.ListAPIView):
    serializer_class = RecentProductSerializer

    def get_queryset(self):
        # Get the last 10 recent products
        return Product.get_recent_products(limit=10)
