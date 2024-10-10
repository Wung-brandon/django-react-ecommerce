from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class Brand(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Brand, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    Categories = (
        ('MEN', 'MEN'),
        ('WOMEN', 'WOMEN'),
        ('CHILDREN', 'CHILDREN'),
        ('WATCH', 'WATCH'),
    )
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')
    categories = models.CharField(max_length=100, choices=Categories, default='MEN')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    slug = models.SlugField(max_length=150, default=None)
    image = models.ImageField(upload_to="productImages/", default='', null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    

    def __str__(self):
        return self.name

    # Methods to get filtered products
    @classmethod
    def get_featured_products(cls):
        """Fetch all featured products."""
        return cls.objects.filter(is_featured=True)

    @classmethod
    def get_new_arrivals(cls):
        """Fetch products marked as new arrivals."""
        return cls.objects.filter(is_new_arrival=True)

    @classmethod
    def get_recent_products(cls, limit=10):
        """Fetch the last 'limit' number of recently added products."""
        return cls.objects.all().order_by('-created')[:limit]

    def get_related_products(self):
        """Fetch related products based on the category or brand."""
        return Product.objects.filter(category=self.category).exclude(id=self.id)[:4]

# Product Image Model
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return f'{self.product.name} Image'

class Cart(models.Model):
    pass

class CartItem(models.Model):
    pass

class Wishlist(models.Model):
    pass