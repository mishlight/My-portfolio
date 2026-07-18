from django.db import models

class Project(models.Model):
    COLOR_CHOICES = [
        ("project-blue", "Blue"),
        ("project-coral", "Coral"),
        ("project-dark", "Dark"),
    ]
    title = models.CharField(max_length=120)
    technology = models.CharField(max_length=180)
    year = models.CharField(max_length=4)
    color = models.CharField(max_length=30, choices=COLOR_CHOICES, default="project-blue")
    mark = models.CharField(max_length=12)
    description = models.TextField()
    repository_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title

class Inquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField(max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d}"
