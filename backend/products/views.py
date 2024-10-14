from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser
from django.db import models
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError
from .filters import ProductFilter
from rest_framework.response import Response
from rest_framework.views import APIView
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
    WishlistItemSerializer,

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
    
class ProductListByBrandView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination
    def get_queryset(self):
        brand_name = self.kwargs.get('brand_name').lower()
        queryset = Product.objects.filter(brand__name__iexact=brand_name)
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
    
    
class CartItemsViews(APIView):
    permission_classes = [AllowAny]

    def get(self, request, cart_id):
        """
        Retrieve all items in the cart and calculate the grand total.
        """
        cart_items = CartItem.objects.filter(cart_id=cart_id)  # Retrieve all items for the given cart
        serializer = CartItemSerializer(cart_items, many=True)  # Serialize the cart items

        # Calculate grand total by summing the total prices of all items
        grand_total = sum([item.product.price * item.quantity for item in cart_items])

        # Return the cart items along with the grand total in the response
        return Response({
            "cart_items": serializer.data,  # Cart items
            "grand_total": grand_total      # Grand total sum
        })
    
    def post(self, request, cart_id):
        """
        Add a new cart item or update quantity if the item already exists.
        """
        cart = Cart.objects.get(id=cart_id)  # Get the cart instance by cart_id
        product_id = request.data.get('product_id')  # Get the product_id from the request data
        quantity = request.data.get('quantity')  # Get the quantity from the request data

        if not product_id or not quantity:
            return Response({'error': 'Product and quantity are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)  # Get the product instance by product_id
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Check if the product already exists in the cart
            cart_item = CartItem.objects.get(cart=cart, product=product)
            # If it exists, update the quantity (add to existing quantity)
            cart_item.quantity += int(quantity)
            cart_item.save()
        except CartItem.DoesNotExist:
            # If it doesn't exist, create a new CartItem
            cart_item = CartItem.objects.create(cart=cart, product=product, quantity=quantity)

        # Serialize the updated or new CartItem and return the response
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, cart_id, product_id):
        """
        Update the quantity of an existing item in the cart.
        """
        cart = Cart.objects.get(id=cart_id)
        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Update quantity
        new_quantity = request.data.get('quantity')
        if new_quantity:
            cart_item.quantity = new_quantity
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, cart_id, product_id=None):
        """
        Delete a cart item or the entire cart.
        """
        try:
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

        if product_id:
            # If product_id is provided, delete the specific cart item
            try:
                cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
                cart_item.delete()
                return Response({'message': 'Cart item deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
            except CartItem.DoesNotExist:
                return Response({'error': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Delete all items in the cart
            cart.cartitem_set.all().delete()  # Deletes all items associated with the cart
            cart.delete()  # Optionally, delete the cart itself
            return Response({'message': 'Cart deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        
        
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
    
    
class WishlistItemsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id):
        """
        Retrieve all items in the wishlist.
        """
        wishlist_items = WishlistItem.objects.filter(user_id=user_id)  # Retrieve all items for the given user
        serializer = WishlistItemSerializer(wishlist_items, many=True)  # Serialize the wishlist items
        return Response(serializer.data)

    def post(self, request, user_id):
        """
        Add a new item to the wishlist.
        """
        product_id = request.data.get('product_id')  # Get the product_id from the request data

        if not product_id:
            return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)  # Get the product instance by product_id
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Create a new WishlistItem
        wishlist_item = WishlistItem.objects.create(user_id=user_id, product=product)
        serializer = WishlistItemSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WishlistItemUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, user_id, product_id):
        """
        Remove an item from the wishlist.
        """
        try:
            wishlist_item = WishlistItem.objects.get(user_id=user_id, product_id=product_id)
            wishlist_item.delete()
            return Response({'message': 'Wishlist item deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except WishlistItem.DoesNotExist:
            return Response({'error': 'Wishlist item not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete_all(self, request, user_id):
        """
        Delete all items in the wishlist.
        """
        WishlistItem.objects.filter(user_id=user_id).delete()  # Deletes all items in the user's wishlist
        return Response({'message': 'All wishlist items deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
