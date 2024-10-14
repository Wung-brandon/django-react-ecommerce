from django.contrib import admin
from .models import (
    Product, 
    ProductImage, 
    Brand,
    Category,
    SubCategory,
    Review,
    Cart,
    CartItem,
    Wishlist,
    WishlistItem
)

class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image']
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price', 'category', 'is_featured', 'is_new_arrival', 'slug']
    list_editable = ['is_featured', 'is_new_arrival']
    search_fields = ('name', 'brand__name', 'category__name')
    prepopulated_fields = {
        'slug': ('name',),
    }

class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {
        'slug': ('name',),
    }

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {
        'slug': ('name',),
    }
    
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'slug']
    prepopulated_fields = {
        'slug': ('name',),
    }

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'product', 'rating']
    
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created']
    
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity']
    
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'created']        
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ['wishlist', 'product', 'added_at'] 
    
    
    
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Review, ReviewAdmin)

admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(WishlistItem, WishlistItemAdmin)
# Register your models here.
