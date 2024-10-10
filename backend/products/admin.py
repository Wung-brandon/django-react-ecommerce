from django.contrib import admin
from .models import Product, ProductImage, Brand

class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image']
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price', 'categories', 'is_featured', 'is_new_arrival']
    list_editable = ['is_featured', 'is_new_arrival']

class BrandAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Brand, BrandAdmin)


# Register your models here.
