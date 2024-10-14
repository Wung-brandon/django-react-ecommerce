from django.core.management.base import BaseCommand
from faker import Faker
from products.models import Product, Review
import random

class Command(BaseCommand):
    help = 'Generate fake reviews'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='The number of reviews to create')

    def handle(self, *args, **kwargs):
        count = kwargs['count']
        fake = Faker()
        product_related_reviews = [
            "Excellent quality! Very satisfied with this product.",
            "The product arrived on time and is exactly as described.",
            "This product exceeded my expectations. Would definitely recommend!",
            "Not quite what I expected, but overall it’s decent.",
            "Poor quality, wouldn't buy this again.",
            "Amazing value for the price. Highly recommend!",
            "The material is great, but the sizing runs a bit small.",
            "The packaging was damaged, but the product is fine.",
            "I love this! It’s exactly what I was looking for.",
            "This is an okay product, but I think it could be improved.",
        ]

        for _ in range(count):
            product = Product.objects.order_by('?').first()  # Get a random product

            # Create a new review instance with product-related text
            review = Review(
                product=product,
                name=fake.name(),
                review=random.choice(product_related_reviews),  # Select from predefined product reviews
                rating=random.randint(1, 5),  # Generate a rating between 1 and 5
            )
            review.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} reviews'))
