# Generated by Django 5.1.1 on 2024-10-10 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0006_alter_brand_options_alter_category_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, default="", null=True, upload_to="products/"
            ),
        ),
    ]