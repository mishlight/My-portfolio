from django.db import migrations


def add_repository_link(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="YUMMY Restaurant Web Application").update(
        live_url="",
        repository_url="https://github.com/mishlight/yummy-web-App",
    )


def remove_repository_link(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="YUMMY Restaurant Web Application").update(
        repository_url="",
    )


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0005_reorder_featured_projects")]
    operations = [migrations.RunPython(add_repository_link, remove_repository_link)]
