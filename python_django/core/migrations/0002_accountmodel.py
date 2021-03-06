# Generated by Django 3.1.2 on 2020-12-03 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountModel',
            fields=[
                ('id', models.UUIDField(editable=False, primary_key=True, serialize=False)),
                ('customer_id', models.UUIDField()),
                ('balance', models.BigIntegerField()),
            ],
            options={
                'db_table': 'account',
            },
        ),
    ]
