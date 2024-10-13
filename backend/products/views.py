from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser
from django.db import models
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError
from .filters import ProductFilter
from .pagination import ProductPagination
from .models import (
    Product,
    Category,
    SubCategory,
    Brand,
    Review,
    Cart,
    CartItem,
    Wishlist,
    WishlistItem
)
from .serializers import (
    ProductSerializer, 
    # RelatedProductSerializer,
    # FeaturedProductSerializer, 
    # NewArrivalProductSerializer, 
    # RecentProductSerializer,
    CategorySerializer, 
    SubCategorySerializer, 
    BrandSerializer,  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.  # Added Brand model serializer for brand related operations.
    ReviewSerializer,
    CartSerializer,
    CartItemSerializer,
    WishlistSerializer,
    WishlistItemSerializer
)


# Get all products with related products
class ProductListView(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filterset_class = ProductFilter
    # filterset_fields = ['category', 'brand', 'price', 'subcategory__name',]
    search_fields = ['name', 'description', 'category__name', 'brand__name', 'subcategory__name']
    ordering_fields = ['id', 'price', 'name']
    pagination_class = ProductPagination
    page_size = 10
    parser_classes = [FormParser, MultiPartParser]
    def perform_create(self, serializer):
        serializer.save()
        
class ProductListByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        # Get the category from the URL (e.g., 'MEN', 'WOMEN', 'CHILDREN')
        category_name = self.kwargs.get('category_name').upper()
        # Optionally, get subcategory from query parameters (e.g., 'shirts')
        subcategory_name = self.request.query_params.get('subcategory', None)
        
        # Filter products by the main category
        queryset = Product.objects.filter(category__name=category_name)
        
        # If subcategory is provided, filter further by subcategory
        if subcategory_name:
            queryset = queryset.filter(subcategory__name__iexact=subcategory_name)

        return queryset
    
class ProductListBySubCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination
    def get_queryset(self):
        # Filter products by subcategory (e.g., 'watches')
        subcategory_name = self.kwargs.get('subcategory_name').lower()
        return Product.objects.filter(subcategory__name__iexact=subcategory_name)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser,)
    
class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = ProductPagination

class SubCategoryListView(generics.ListCreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    pagination_class = ProductPagination

class BrandListView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    pagination_class = ProductPagination

# Get featured products
class FeaturedProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        return Product.get_featured_products()

# Get new arrivals
class NewArrivalProductListView(generics.ListAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.get_new_arrivals()
    
class RelatedProductListView(generics.ListAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get the product ID or slug from the URL query parameters
        product_id = self.kwargs.get('product_id')  # Assuming you're passing product_id in the URL

        # Fetch the product instance
        product = get_object_or_404(Product, id=product_id)

        # Use the instance method to get related products
        return product.get_related_products()

# Get recent products (e.g., the last 10 items added)
class RecentProductListView(generics.ListAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get the last 10 recent products
        return Product.get_recent_products(limit=10)

class ReviewListCreateView(generics.ListCreateAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_queryset(self):
         return Review.objects.filter(product_id=self.kwargs["product_id"])
    
    def get_serializer_context(self):
        return {"product_id": self.kwargs["product_id"]}
    # def get_queryset(self):
    #     product_id = self.kwargs['product_id']
    #     return Review.objects.filter(product_id=product_id)

    # def perform_create(self, serializer):
    #     product_id = self.kwargs['product_id']
    #     product = Product.objects.get(id=product_id)
    #     user = self.request.user

    #     # Check if the user has already reviewed this product
    #     if Review.objects.filter(product=product, user=user).exists():
    #         raise ValidationError("You have already reviewed this product.")

    #     serializer.save(user=user, product=product)
        
class ReviewRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    lookup_field = 'id'
    
# View for Top-Rated Products
class TopRatedProductsView(generics.ListAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Annotate products with average rating and order by it
        return Product.objects.annotate(
            average_rating=models.Avg('reviews__rating')
        ).filter(reviews__isnull=False).order_by('-average_rating')[:10]  # Limit top 10 products

# View for Best-Selling Products
class BestSellingProductsView(generics.ListAPIView):
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Assume that you track the sales count in the Product model
        return Product.objects.filter(sales_count__gt=0).order_by('-sales_count')[:10]  # Limit top 10 products
    
class CartViews(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    
    # def get_queryset(self):
    #     """Optionally restricts the returned wishlists to the current user."""
    #     user = self.request.user
    #     return self.queryset.filter(user=user)
    
class CartDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]  
class CartItemsViews(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        return CartItem.objects.filter(cart_id=cart_id)
        
class CartItemDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]
    
    
    
class WishlistViews(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [AllowAny]
    
    # def get_queryset(self):
    #     """Optionally restricts the returned wishlists to the current user."""
    #     user = self.request.user
    #     return self.queryset.filter(user=user)
    
class WishlistDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]  
class WishlistItemsViews(generics.ListCreateAPIView):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        wishlist_id = self.kwargs['wishlist_id']
        return WishlistItem.objects.filter(wishlist_id=wishlist_id)
        
class WishlistItemDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]