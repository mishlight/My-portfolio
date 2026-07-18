from django.db import migrations, models

def seed_projects(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    rows = [
        ("YUMMY Restaurant", "Django · SQLite · JavaScript", "2025", "project-blue", "Y.", "Full-stack ordering with authentication, payments, tracking and a custom admin dashboard.", 1),
        ("UniConnect", "Next.js · Django REST · PostgreSQL", "2025", "project-coral", "U/C", "A real-time university social and study platform built for connection and collaboration.", 2),
        ("FreshBasket", "React Native · Expo Router", "2025", "project-dark", "F/B", "A responsive grocery shopping experience with search, favourites, cart and profiles.", 3),
    ]
    for title, technology, year, color, mark, description, order in rows:
        Project.objects.create(title=title, technology=technology, year=year, color=color, mark=mark, description=description, sort_order=order)

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(name="Inquiry", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("name", models.CharField(max_length=100)),
            ("email", models.EmailField(max_length=254)),
            ("message", models.TextField(max_length=3000)),
            ("created_at", models.DateTimeField(auto_now_add=True)),
        ], options={"ordering": ["-created_at"], "verbose_name_plural": "inquiries"}),
        migrations.CreateModel(name="Project", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("title", models.CharField(max_length=120)),
            ("technology", models.CharField(max_length=180)),
            ("year", models.CharField(max_length=4)),
            ("color", models.CharField(choices=[("project-blue", "Blue"), ("project-coral", "Coral"), ("project-dark", "Dark")], default="project-blue", max_length=30)),
            ("mark", models.CharField(max_length=12)),
            ("description", models.TextField()),
            ("repository_url", models.URLField(blank=True)),
            ("live_url", models.URLField(blank=True)),
            ("sort_order", models.PositiveSmallIntegerField(default=0)),
            ("is_featured", models.BooleanField(default=True)),
        ], options={"ordering": ["sort_order", "id"]}),
        migrations.RunPython(seed_projects, migrations.RunPython.noop),
    ]
