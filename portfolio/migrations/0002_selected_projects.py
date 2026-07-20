from django.db import migrations


PROJECTS = [
    {
        "title": "Django Management System",
        "technology": "Django · SQLite · Bootstrap · JavaScript",
        "year": "2026",
        "color": "project-blue",
        "mark": "WEB DASHBOARD",
        "description": "A role-aware administration platform for managing users, agents, profiles, activity logs, alerts, settings, and authentication from one responsive dashboard.",
    },
    {
        "title": "FreshBasket Mobile Concept",
        "technology": "Mobile UX · Product Design · Prototyping",
        "year": "2026",
        "color": "project-dark",
        "mark": "MOBILE CONCEPT",
        "description": "A grocery-shopping product concept exploring product discovery, fresh-food categories, basket flows, and a friendly visual identity for everyday mobile commerce.",
    },
    {
        "title": "Mishlight Store",
        "technology": "HTML5 · CSS3 · JavaScript",
        "year": "2025",
        "color": "project-coral",
        "mark": "E-COMMERCE",
        "description": "A colourful single-page online store with category filtering, product collections, a dynamic cart, promotional sections, and responsive front-end interactions.",
    },
    {
        "title": "School Registration Management System",
        "technology": "Java · Swing · MySQL · NetBeans",
        "year": "2025",
        "color": "project-blue",
        "mark": "DESKTOP APP",
        "description": "A Java desktop application for registering students and organising school records through structured forms, database-backed workflows, and administrative screens.",
    },
    {
        "title": "UniConnect",
        "technology": "Next.js · TypeScript · Django · PostgreSQL",
        "year": "2026",
        "color": "project-coral",
        "mark": "FULL-STACK",
        "description": "A full campus community with study groups, events, messaging, confessions, a marketplace, Pomodoro tools, help-desk support, analytics, and moderation.",
    },
    {
        "title": "YUMMY Mobile",
        "technology": "React Native · Expo · Firebase · TypeScript",
        "year": "2026",
        "color": "project-dark",
        "mark": "MOBILE APP",
        "description": "A cross-platform restaurant ordering experience with Firebase data, food browsing, customer accounts, image handling, persistent state, and a polished dark interface.",
    },
    {
        "title": "YUMMY Restaurant Web Application",
        "technology": "Django · SQLite · JavaScript · Payments",
        "year": "2026",
        "color": "project-coral",
        "mark": "WEB PLATFORM",
        "description": "A complete restaurant platform covering menus, carts, orders, payments, reviews, notifications, reporting, customer accounts, and a custom operations dashboard.",
    },
]


def replace_projects(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.all().delete()
    for order, values in enumerate(PROJECTS, start=1):
        Project.objects.create(sort_order=order, is_featured=True, **values)


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0001_initial")]
    operations = [
        migrations.RunPython(replace_projects, migrations.RunPython.noop),
    ]
