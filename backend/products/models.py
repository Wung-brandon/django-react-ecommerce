from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from datetime import timedelta


class Category(models.Model):
    Categories = (
        ('MEN', 'Men'),
        ('WOMEN', 'Women'),
        ('CHILDREN', 'Children'),
        
    )
    name = models.CharField(max_length=100, choices=Categories, default='MEN')
    slug = models.SlugField(max_length=100, null=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Categories'


# SubCategory model for specific categories like T-shirts, Trousers, etc.
class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    slug = models.SlugField(max_length=100, null=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Subcategories'
    

class Brand(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, null=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Brand, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Brand'

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    slug = models.SlugField(max_length=150, null=True, blank=True, default=None)
    image = models.ImageField(upload_to="products/", default='', null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    
    def get_average_rating(self):
        """Calculates and returns the average rating for the product."""
        reviews = self.reviews.all()
        if reviews.exists():
            return reviews.aggregate(average=models.Avg('rating'))['average']
        return None

    
    def get_review_count(self):
        """Returns the total number of reviews for the product."""
        return self.reviews.count()

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
    image = models.ImageField(upload_to='productsImg/', null=True, blank=True, default='')

    def __str__(self):
        return f'{self.product.name} Image'
    
    class Meta:
        verbose_name_plural = 'Product Images'
        
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])  # Rating between 1 and 5
    review = models.TextField(blank=True, null=True)  # Optional review text
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'product')  # Ensures a user can only review a product once

    def __str__(self):
        return f'{self.user} review for {self.product} - Rating: {self.rating}'

class Cart(models.Model):
    pass

class CartItem(models.Model):
    pass

class Wishlist(models.Model):
    pass

