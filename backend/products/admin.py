from django.contrib import admin
from .models import (
    Product, 
    ProductImage, 
    Brand,
    Category,
    SubCategory,
    Review
)

class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image']
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price', 'category', 'is_featured', 'is_new_arrival']
    list_editable = ['is_featured', 'is_new_arrival']

class BrandAdmin(admin.ModelAdmin):
    list_display = ['name']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'slug']

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'rating']

admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Review, ReviewAdmin)
# Register your models here.
