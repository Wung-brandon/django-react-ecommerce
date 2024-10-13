from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer

class OrderListCreateAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny, IsAuthenticated]
    
    # def get_queryset(self):
    #     return Order.objects.filter(user=self.request.user)

# Create your views here.
