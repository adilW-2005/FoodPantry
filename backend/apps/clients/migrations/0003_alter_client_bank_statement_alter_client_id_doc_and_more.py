# Generated by Django 5.2.4 on 2025-07-03 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clients", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="client",
            name="bank_statement",
            field=models.FileField(blank=True, null=True, upload_to="client_docs/"),
        ),
        migrations.AlterField(
            model_name="client",
            name="id_doc",
            field=models.FileField(blank=True, null=True, upload_to="client_docs/"),
        ),
        migrations.AlterField(
            model_name="client",
            name="lease_doc",
            field=models.FileField(blank=True, null=True, upload_to="client_docs/"),
        ),
    ]
