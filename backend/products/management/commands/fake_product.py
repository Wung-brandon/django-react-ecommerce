from django.core.management.base import BaseCommand
from faker import Faker
from products.models import Product, Brand, Category, SubCategory
import random
import os
from django.conf import settings
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Generate fake products'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='The number of products to create')

    def handle(self, *args, **kwargs):
        count = kwargs['count']
        fake = Faker()

        # Define lists for generating realistic fashion product names
        men_names = [
            "Men's Casual Shirt", "Men's Slim Fit Jeans", "Men's Formal Suit",
            "Men's Leather Jacket"
        ]

        women_names = [
            "Women's Summer Dress", "Women's Leather Handbag", "Women's High Heels",
            "Women's Casual Blouse", "Women's Activewear Leggings", "Women's Winter Coat"
        ]

        children_names = [
            "Kids' Graphic T-Shirt", "Children's Denim Shorts", "Kids' Sneakers",
            "Boys' Swim Trunks", "Girls' Party Dress", "Infant Onesie"
        ]

        watch_names = [
            "Men's Luxury Analog Watch", "Women's Stylish Quartz Watch",
            "Children's Digital Watch", "Men's Sports Watch", "Unisex Smartwatch"
        ]

        all_names = men_names + women_names + children_names + watch_names

        # Define your media folder where images are stored
        media_folder = os.path.join(settings.MEDIA_ROOT, 'products')

        # List all images in the media folder
        image_files = [f for f in os.listdir(media_folder) if f.endswith(('.jpg', '.png', '.jpeg'))]

        for _ in range(count):
            # Generate a random brand and category
            brand = Brand.objects.order_by('?').first()  # Get a random brand
            category = Category.objects.order_by('?').first()  # Get a random category
            
            # Randomly select a product name
            product_name = random.choice(all_names)
            slug = slugify(product_name)

            # Randomly select an image from the media folder
            product_image = f'products/{random.choice(image_files)}' if image_files else None

            # Create a new product instance
            product = Product(
                name=product_name,
                description=fake.text(max_nb_chars=200),
                brand=brand,
                category=category,
                price=fake.random_number(digits=5) + random.uniform(10, 100),
                stock=random.randint(1, 100),
                slug=slug,
                is_featured=fake.boolean(),
                is_new_arrival=fake.boolean(),
                image=product_image,  # Use the selected image
                video=None
            )
            product.save()

            # Optionally create additional images if needed
            for _ in range(2):
                additional_image_url = f'products/{random.choice(image_files)}' if image_files else None
                # Assuming you have a related image model to save these URLs
                if additional_image_url:
                    product.images.create(image=additional_image_url)  # Adjust based on your Image model setup

        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} products'))
