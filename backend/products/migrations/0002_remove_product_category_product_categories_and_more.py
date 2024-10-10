# Generated by Django 5.1.1 on 2024-10-10 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="category",
        ),
        migrations.AddField(
            model_name="product",
            name="categories",
            field=models.CharField(
                choices=[("MEN", "MEN"), ("WOMEN", "WOMEN"), ("CHILDREN", "CHILDREN")],
                default="MEN",
                max_length=100,
            ),
        ),
        migrations.DeleteModel(
            name="Category",
        ),
    ]