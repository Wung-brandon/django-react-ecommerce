from django.db import models
from products.models import Product
from django.contrib.auth.models import User
# Create your models here.
class Order(models.Model):
    DEFAULT_STATUS = (
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed')
    )
    status = models.CharField(max_length=150, choices=DEFAULT_STATUS, default='Failed')
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    placed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user.username} - {self.status}'
    


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name = "items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    

    def __str__(self):
        return self.product.name