from django.urls import path
from .views import (
    ProductListView,
    ProductDetailView,
    FeaturedProductListView,
    NewArrivalProductListView,
    RecentProductListView,
    CategoryListView,
    SubCategoryListView,
    BrandListView,
    RelatedProductListView,
    ReviewListCreateView,
    ReviewRetrieveUpdateDestroyView,
    TopRatedProductsView,
    BestSellingProductsView,
    ProductListByCategoryView, 
    ProductListBySubCategoryView,
    ProductListByBrandView,
    # Cart views
    CartViews,
    CartDetailViews,
    CartItemsViews,
    CartItemUpdateDeleteView,
    CartItemDetailViews,
    
    # Wishlist views
    WishlistViews,
    WishlistDetailViews,
    WishlistItemsViews,
    WishlistItemDetailViews,
    
    # WishlistItem views
    WishlistItemsView,
    WishlistItemUpdateDeleteView,
    
)



urlpatterns = [
    path('', ProductListView.as_view(), name='products'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('featured/',FeaturedProductListView.as_view(), name='featured'),
    path('<int:product_id>/related/',RelatedProductListView.as_view(), name='related'),
    path('top-rated/', TopRatedProductsView.as_view(), name='top-rated-products'),
    path('best-selling/', BestSellingProductsView.as_view(), name='best-selling-products'),
    path('new-arrivals/',NewArrivalProductListView.as_view(), name='new-arrivals'),
    path('recent/',RecentProductListView.as_view(), name='recent'),
    
    # reviews api endpoint
    path('<int:product_id>/reviews/', ReviewListCreateView.as_view(), name='product-reviews'),
    path('reviews/<int:id>/', ReviewRetrieveUpdateDestroyView.as_view(), name='review-detail'),
    
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('subcategories/', SubCategoryListView.as_view(), name='subcategory-list'),
    path('brands/', BrandListView.as_view(), name='brand-list'),
    
    # Endpoint for category collections (Men, Women, Children)
    path('category/<str:category_name>/', ProductListByCategoryView.as_view(), name='product-list-by-category'),
    
    # Endpoint for products with brand collections (olev, Calvin klein)
    path('brand/<str:brand_name>/', ProductListByBrandView.as_view(), name='product-list-by-brand'),
    
    # Endpoint for subcategory collections (e.g., 'watches')
    path('subcategory/<str:subcategory_name>/', ProductListBySubCategoryView.as_view(), name='product-list-by-subcategory'),
    
    # Cart api endpoints
    path('cart/', CartViews.as_view(), name='cart'),
    path('cart/<int:id>/', CartDetailViews.as_view(), name='cart-detail'),
    path('cart-item/user/<int:cart_id>/', CartItemsViews.as_view(), name='cart-item-user'), 
    path('cart-item/<int:cart_id>/product/<int:product_id>/', CartItemUpdateDeleteView.as_view(), name='cart-item-update-delete'),  # PUT and DELETE
    path('cart-item/<int:id>/', CartItemDetailViews.as_view(), name='cart-item'),
    
    # Wishlist api endpoints
    path('wishlist/', WishlistViews.as_view(), name='wishlist'),
    path('wishlist/<int:id>/', WishlistDetailViews.as_view(), name='wishlist-detail'),
    path('wishlist-item/user/<int:wishlist_id>/', WishlistItemsViews.as_view(), name='wishlist-item-user'),
    path('wishlist-item/<int:id>/', WishlistItemDetailViews.as_view(), name='wishlist-item'),
    
    # Wishlist URLs
    path('wishlist/<int:user_id>/', WishlistItemsView.as_view(), name='wishlist-items'),  # GET and POST
    path('wishlist/<int:user_id>/product/<int:product_id>/', WishlistItemUpdateDeleteView.as_view(), name='wishlist-item-update-delete'),  # DELETE
    path('wishlist/<int:user_id>/delete_all/', WishlistItemUpdateDeleteView.as_view(), name='wishlist-delete-all'),  # DELETE all items
] 
