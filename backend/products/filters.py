from django_filters.rest_framework import FilterSet
from .models import Product, Category, Brand
import django_filters

class ProductFilter(FilterSet):
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.all())
    brand = django_filters.ModelChoiceFilter(queryset=Brand.objects.all())
    class Meta:
        model = Product
        fields = {
            'category': ['exact'],
            'subcategory': ['exact'],
            'brand': ['exact'],
            'price': ['range'],
            
            # 'stock': ['gt', 'lt'],
            # 'is_featured': ['exact'],
            # 'is_new_arrival': ['exact'],
        }