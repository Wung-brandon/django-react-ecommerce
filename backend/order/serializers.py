from products.models import Product
from .models import Order, OrderItem
from rest_framework import serializers

class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'quantity')
    
class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'order', 'product', 'quantity')
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order 
        fields = ['id', "placed_at", "status", "owner", "items"]