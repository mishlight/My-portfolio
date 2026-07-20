from django.core import signing
from django.core import mail
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from .models import Inquiry, Project


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class PortfolioTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Test Project",
            slug="test-project",
            technology="Django · SQLite",
            year="2026",
            mark="WEB APP",
            description="A useful test project.",
            problem="A problem worth solving.",
            features="First feature\nSecond feature",
            challenges="A meaningful challenge",
            sort_order=99,
        )

    def contact_payload(self, **overrides):
        payload = {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "message": "I would like to discuss a useful software project.",
            "website": "",
            "started_at": signing.dumps(
                timezone.now().timestamp() - 10,
                salt="portfolio-contact",
            ),
        }
        payload.update(overrides)
        return payload

    def test_project_detail_renders_case_study(self):
        response = self.client.get(reverse("project_detail", args=[self.project.slug]))
        self.assertContains(response, "What needed to be solved")
        self.assertContains(response, "First feature")

    def test_valid_contact_is_saved_and_emailed(self):
        response = self.client.post(reverse("home"), self.contact_payload())
        self.assertRedirects(response, reverse("home"))
        self.assertEqual(Inquiry.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    def test_honeypot_blocks_contact(self):
        response = self.client.post(
            reverse("home"),
            self.contact_payload(website="https://spam.example"),
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Inquiry.objects.count(), 0)

    def test_robots_and_sitemap_are_public(self):
        robots = self.client.get(reverse("robots_txt"))
        sitemap = self.client.get("/sitemap.xml")
        self.assertContains(robots, "Sitemap:")
        self.assertEqual(sitemap.status_code, 200)
        self.assertContains(sitemap, self.project.get_absolute_url())
