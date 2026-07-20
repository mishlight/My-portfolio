from django.db import migrations


def add_sky_snake(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.all().update(sort_order=models.F("sort_order") + 1)
    Project.objects.create(
        title="Sky Snake",
        technology="HTML5 · CSS3 · JavaScript · Canvas",
        year="2026",
        color="project-blue",
        mark="ARCADE GAME",
        description=(
            "A responsive browser arcade game with three worlds, difficulty modes, "
            "power-ups, daily challenges, achievements, sound controls, touch input, "
            "levels, and a persistent local leaderboard."
        ),
        repository_url="https://github.com/mishlight/Snake-Game",
        sort_order=1,
        is_featured=True,
    )


def remove_sky_snake(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="Sky Snake").delete()
    Project.objects.all().update(sort_order=models.F("sort_order") - 1)


from django.db import models


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0002_selected_projects")]
    operations = [migrations.RunPython(add_sky_snake, remove_sky_snake)]
