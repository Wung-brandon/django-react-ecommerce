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
    ReviewListCreateView
)



urlpatterns = [
    path('', ProductListView.as_view(), name='products'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('featured/',FeaturedProductListView.as_view(), name='featured'),
    path('<int:product_id>/related/',RelatedProductListView.as_view(), name='related'),
    path('<int:product_id>/reviews/', ReviewListCreateView.as_view(), name='product-reviews'),
    path('new-arrivals/',NewArrivalProductListView.as_view(), name='new-arrivals'),
    path('recent/',RecentProductListView.as_view(), name='recent'),
    
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('subcategories/', SubCategoryListView.as_view(), name='subcategory-list'),
    path('brands/', BrandListView.as_view(), name='brand-list'),
    
] 
