# Generated by Django 3.1.4 on 2021-12-19 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_review_createdat'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductCategories',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
    ]