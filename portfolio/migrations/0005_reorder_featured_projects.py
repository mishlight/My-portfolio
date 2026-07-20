from django.db import migrations


NEW_ORDER = {
    "Sky Snake": 1,
    "YUMMY Restaurant Web Application": 2,
    "UniConnect": 3,
    "Django Management System": 4,
    "FreshBasket Mobile Concept": 5,
    "Mishlight Store": 6,
    "School Registration Management System": 7,
    "YUMMY Mobile": 8,
}

OLD_ORDER = {
    "Sky Snake": 1,
    "Django Management System": 2,
    "FreshBasket Mobile Concept": 3,
    "Mishlight Store": 4,
    "School Registration Management System": 5,
    "UniConnect": 6,
    "YUMMY Mobile": 7,
    "YUMMY Restaurant Web Application": 8,
}


def apply_order(apps, order):
    Project = apps.get_model("portfolio", "Project")
    for title, sort_order in order.items():
        Project.objects.filter(title=title).update(sort_order=sort_order)


def reorder_projects(apps, schema_editor):
    apply_order(apps, NEW_ORDER)


def restore_order(apps, schema_editor):
    apply_order(apps, OLD_ORDER)


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0004_add_sky_snake_live_url")]
    operations = [migrations.RunPython(reorder_projects, restore_order)]
