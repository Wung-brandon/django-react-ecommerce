import os
import random
import string
from django.core.management.base import BaseCommand
from products.models import Product, Category, SubCategory, Brand  # Adjust imports
from django.utils.text import slugify
from faker import Faker

class Command(BaseCommand):
    help = 'Generate random products with placeholder images and videos'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='The number of products to create')

    def handle(self, *args, **kwargs):
        fake = Faker()
        count = kwargs['count']
        categories = ['MEN', 'WOMEN', 'CHILDREN', 'ACCESSORIES']
        product_names = {
            'MEN': ["Stylish Jacket", "Casual Shirt", "Formal Pants", "Leather Shoes"],
            'WOMEN': ["Elegant Dress", "Fashionable Top", "Chic Skirt", "High Heels"],
            'CHILDREN': ["Kids T-Shirt", "Boys Shorts", "Girls Dress", "Sneakers"],
            'ACCESSORIES': ["Smart Watch", "Classic Watch", "Sport Watch", "Luxury Watch"],
        }

        brands = Brand.objects.all()  # Assuming you have some brands already created
        subcategories = SubCategory.objects.all()  # Assuming subcategories are already created

        for _ in range(count):  # Generate the specified number of products
            category_name = random.choice(categories)
            
            # Retrieve or create the Category object
            category_obj, created = Category.objects.get_or_create(name=category_name)
            
            # Randomly select a brand and subcategory
            brand_obj = random.choice(brands) if brands.exists() else None
            subcategory_obj = random.choice(subcategories) if subcategories.exists() else None

            product_name = random.choice(product_names[category_name]) + ' ' + self.random_string(5)
            slug = slugify(product_name)

            # Generate a product description based on category
            description = self.generate_product_description(category_name, product_name, fake)

            # Create and save the product
            Product.objects.create(
                name=product_name,
                description=description,
                brand=brand_obj,  # Assign a random brand
                category=category_obj,  # Assign the Category instance
                subcategory=subcategory_obj,  # Assign the SubCategory instance
                price=random.randint(10, 30) * 500,  # Generates prices like 10000,
                stock=random.randint(0, 100),  # Random stock between 0 and 100
                sales_count=random.randint(0, 500),  # Random sales count
                slug=slug,  # Generate a slug for the product
                is_featured=random.choice([True, False]),  # Randomly mark as featured
                is_new_arrival=random.choice([True, False]),  # Randomly mark as new arrival
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created product: {product_name}'))

    def random_string(self, length=5):
        # Generate a random string of fixed length
        letters = string.ascii_uppercase
        return ''.join(random.choice(letters) for _ in range(length))

    def generate_product_description(self, category, product_name, fake):
        # Custom descriptions based on the product category
        if category == 'MEN':
            return f"{product_name} is the perfect choice for men who want to look sharp and stylish. Made with high-quality materials, this product ensures comfort and durability. Ideal for both casual and formal occasions."
        
        elif category == 'WOMEN':
            return f"Introducing {product_name}, a must-have for any fashion-forward woman. This elegant and fashionable piece is designed to turn heads wherever you go. Perfect for both day and night looks, it’s a staple in any wardrobe."
        
        elif category == 'CHILDREN':
            return f"{product_name} is designed with kids in mind. Comfortable, stylish, and made from soft materials, this product ensures your child stays comfortable all day long. Whether for playtime or casual outings, this is a great pick for the little ones."
        
        elif category == 'ACCESSORIES':
            return f"Complete your look with {product_name}, a timeless accessory that adds a touch of sophistication. Whether you’re heading to a formal event or dressing up for a night out, this product is the perfect finishing touch."
        
        else:
            return fake.text(max_nb_chars=200)  # Fallback to a generic description
