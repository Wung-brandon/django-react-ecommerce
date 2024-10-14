from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from datetime import timedelta, datetime



class Category(models.Model):
    Categories = (
        ('MEN', 'Men'),
        ('WOMEN', 'Women'),
        ('CHILDREN', 'Children'),
        ('ACCESSORIES', 'Accessories')
        
    )
    name = models.CharField(max_length=100, choices=Categories, default='MEN')
    slug = models.SlugField(max_length=100, blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
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
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Subcategories'
    

class Brand(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Brand, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Brand'

class Product(models.Model):
    DEFAULT_SIZES = (
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XS', 'XS'),
        ('XXL', 'XXL'),
        ('3XL', '3XL')
    )
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    size = models.CharField(max_length=100, choices=DEFAULT_SIZES, default='M', blank=True, null=True)
    sales_count = models.PositiveIntegerField(default=0, blank=True, null=True)
    slug = models.SlugField(max_length=150, blank=True, unique=True)
    image = models.ImageField(upload_to="products/", default='', null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Override the save method to automatically generate a slug from the product name."""
        if not self.slug:  # Check if the slug is empty
            self.slug = slugify(self.name)  # Generate slug from the name
        super().save(*args, **kwargs)  # Call the superclass save method
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
    name = models.CharField(max_length=150, blank=True, null=True)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])  # Rating between 1 and 5
    review = models.TextField(blank=True, null=True)  # Optional review text
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} review for {self.product} - Rating: {self.rating}'

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Cart {self.id} - User: {self.user.username}'
    
    
    @property
    def total_price(self):
        """Calculate total price of all items in the cart."""
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        """Get total count of items in the cart."""
        return sum(item.quantity for item in self.items.all())
    
    @property
    def total_items_count(self):
        """Get total count of unique items in the cart."""
        return self.items.count()  # Count of unique CartItems
    
        

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ('cart', 'product')  # Ensures a user can't add the same product to the cart more than once
    
    def __str__(self):
        return f'Cart Item - Product: {self.product.name}, Quantity: {self.quantity}'
    @property
    def total_price(self):
        """Calculate total price for this cart item based on the quantity"""
        return self.quantity * self.product.price

# Wishlist model to store wishlist related to a user
class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Wishlist {self.id} - User: {self.user.username}"

    @property
    def total_items(self):
        """Get total count of items in the wishlist."""
        return self.wishlist_items.count()

# WishlistItem model to store individual items in the wishlist
class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='wishlist_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlist_items')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('wishlist', 'product')  # Ensure that the same product is not added twice

    def __str__(self):
        return f"{self.product.name} (Wishlist: {self.wishlist.id})"