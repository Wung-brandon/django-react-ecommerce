from django.contrib import admin
from .models import Order, OrderItem

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'placed_at')
    list_editable = ['status']

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity')
    list_editable = ['quantity']
    
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)