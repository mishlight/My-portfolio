from django.db import migrations


def add_live_url(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="Sky Snake").update(
        live_url="https://mishlight.github.io/Snake-Game/"
    )


def remove_live_url(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="Sky Snake").update(live_url="")


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0003_add_sky_snake")]
    operations = [migrations.RunPython(add_live_url, remove_live_url)]
