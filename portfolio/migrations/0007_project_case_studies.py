from django.db import migrations, models


CASE_STUDIES = {
    "Sky Snake": {
        "slug": "sky-snake",
        "problem": "Classic browser games are often either too plain or too difficult to use on mobile. Sky Snake was built to make the familiar snake mechanic feel modern, replayable, and equally comfortable with keyboard or touch controls.",
        "features": "Three themed game worlds\nEasy, normal, and hard difficulty modes\nPower-ups, obstacles, levels, and achievements\nDaily challenges and local leaderboard\nKeyboard, touch, sound, and fullscreen controls",
        "challenges": "Keeping the game loop responsive across desktop and mobile\nBalancing difficulty without making the game unfair\nPersisting scores and settings without a backend",
    },
    "YUMMY Restaurant Web Application": {
        "slug": "yummy-restaurant-web-application",
        "problem": "Restaurants need more than a digital menu. Customers need a clear path from discovering a meal to paying and tracking an order, while staff need one place to manage the operation.",
        "features": "Menu categories, search, prices, stock, and promotions\nCustomer accounts, profiles, cart, and checkout\nOrder tracking, payments, reviews, and notifications\nContact messages and operational reporting\nCustom staff dashboard and role-aware access",
        "challenges": "Coordinating state across cart, order, and payment workflows\nDesigning separate customer and staff experiences\nKeeping permissions and order transitions predictable",
    },
    "UniConnect": {
        "slug": "uniconnect",
        "problem": "University communication is often scattered across unrelated chat groups and tools. UniConnect brings academic collaboration, campus discovery, support, and student commerce into one community platform.",
        "features": "Study groups, campus events, and real-time messaging\nAnonymous confessions with moderation\nStudent marketplace and help desk\nPomodoro productivity tools\nAnalytics, notifications, and community administration",
        "challenges": "Designing permissions for students, moderators, and administrators\nOrganising many community features without overwhelming users\nPlanning safe handling for anonymous and marketplace content",
    },
    "Django Management System": {
        "slug": "django-management-system",
        "problem": "Small teams need a secure administration workspace without building each user-management and reporting screen separately. This system centralises common operational tasks.",
        "features": "Secure authentication and session management\nUser, agent, profile, and role administration\nActivity logs, alerts, settings, forms, and tables\nResponsive dashboard metrics and charts\nProtected staff-only routes",
        "challenges": "Keeping navigation usable across a feature-rich dashboard\nApplying consistent access rules to every protected view\nPresenting operational data clearly on smaller screens",
    },
    "FreshBasket Mobile Concept": {
        "slug": "freshbasket-mobile-concept",
        "problem": "Online grocery experiences can feel crowded and impersonal. FreshBasket explores a calmer mobile journey for discovering everyday food, understanding categories, and reviewing a basket.",
        "features": "Friendly onboarding and visual identity\nFresh-food category discovery\nProduct browsing and basket flows\nResponsive mobile navigation\nReusable interface components",
        "challenges": "Fitting useful product information into a small screen\nKeeping the experience lightweight and visually friendly\nDesigning a clear path from discovery to basket",
    },
    "Mishlight Store": {
        "slug": "mishlight-store",
        "problem": "A small retailer needs a straightforward online catalogue that makes a mixed inventory easy to browse without requiring a complex commerce platform.",
        "features": "Product catalogue with multiple categories\nInstant category filtering\nDynamic cart interactions\nResponsive single-page layout\nNewsletter and store information sections",
        "challenges": "Managing catalogue state with plain JavaScript\nKeeping filters and cart interactions simple\nMaking a large product grid responsive",
    },
    "School Registration Management System": {
        "slug": "school-registration-management-system",
        "problem": "Paper-based student registration makes records difficult to search, update, and organise. This desktop system structures registration and academic administration into database-backed workflows.",
        "features": "Student registration forms\nAcademic year management\nAdministrative login and dashboard\nStructured school record workflows\nMySQL-backed desktop data storage",
        "challenges": "Connecting Java Swing forms to relational data\nValidating multi-field registration records\nMaintaining a consistent desktop interface across screens",
    },
    "YUMMY Mobile": {
        "slug": "yummy-mobile",
        "problem": "Restaurant customers increasingly expect an app-like ordering experience. YUMMY Mobile translates food discovery, accounts, and persistent ordering state into a polished cross-platform product.",
        "features": "Onboarding, authentication, and customer profiles\nFood discovery and image-rich browsing\nFirebase-backed application data\nPersistent client state\nCross-platform Expo navigation",
        "challenges": "Keeping state consistent across screens and sessions\nHandling images and remote Firebase data efficiently\nCreating a coherent experience on different phone sizes",
    },
}


def populate_case_studies(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    for title, values in CASE_STUDIES.items():
        Project.objects.filter(title=title).update(**values)


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0006_add_yummy_repository_link")]
    operations = [
        migrations.AddField(
            model_name="project",
            name="slug",
            field=models.SlugField(blank=True, default="", max_length=140),
        ),
        migrations.AddField(
            model_name="project",
            name="problem",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="project",
            name="features",
            field=models.TextField(blank=True, help_text="One feature per line"),
        ),
        migrations.AddField(
            model_name="project",
            name="challenges",
            field=models.TextField(blank=True, help_text="One challenge per line"),
        ),
        migrations.RunPython(populate_case_studies, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="project",
            name="slug",
            field=models.SlugField(max_length=140, unique=True),
        ),
    ]
