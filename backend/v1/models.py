from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=400)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=2, default='1')
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.username

class news(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    thumbnail = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class comments(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    news = models.ForeignKey(news, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)