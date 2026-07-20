from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.templatetags.static import static
from django.utils import timezone
from .forms import InquiryForm
from .models import Project


SCREENSHOTS = {
    "sky-snake": ["sky-snake-1.webp", "sky-snake-2.webp", "sky-snake-3.webp"],
    "yummy-restaurant-web-application": ["yummy-web-1.webp", "yummy-web-2.webp", "yummy-web-3.webp"],
    "uniconnect": ["uniconnect-1.webp", "uniconnect-2.webp", "uniconnect-3.webp"],
    "django-management-system": ["management-1.webp", "management-2.webp", "management-3.webp"],
    "freshbasket-mobile-concept": ["freshbasket-1.webp", "freshbasket-2.webp", "freshbasket-3.webp"],
    "mishlight-store": ["mishlight-store-1.webp", "mishlight-store-2.webp", "mishlight-store-3.webp"],
    "yummy-mobile": ["yummy-mobile-1.webp", "yummy-mobile-2.webp", "yummy-mobile-3.webp"],
}


def home(request):
    form = InquiryForm()
    if request.method == "POST":
        form = InquiryForm(request.POST)
        if form.is_valid():
            last_submission = request.session.get("last_contact_submission", 0)
            if timezone.now().timestamp() - last_submission < 60:
                messages.error(request, "Please wait one minute before sending another message.")
                return redirect("home")
            inquiry = form.save()
            request.session["last_contact_submission"] = timezone.now().timestamp()
            send_mail(
                subject=f"Portfolio enquiry from {inquiry.name}",
                message=(
                    f"Name: {inquiry.name}\n"
                    f"Email: {inquiry.email}\n\n"
                    f"{inquiry.message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
            messages.success(request, "Your message has been sent. I’ll get back to you soon.")
            return redirect("home")
        messages.error(request, "Please check the form and try again.")

    return render(request, "portfolio/home.html", {
        "projects": Project.objects.filter(is_featured=True),
        "form": form,
    })


def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug, is_featured=True)
    technologies = [
        item.strip()
        for item in project.technology.replace("Â", "").split("·")
        if item.strip()
    ]
    return render(request, "portfolio/project_detail.html", {
        "project": project,
        "screenshots": [
            static(f"images/projects/{filename}")
            for filename in SCREENSHOTS.get(project.slug, [])
        ],
        "technologies": technologies,
    })


def robots_txt(request):
    content = "\n".join([
        "User-agent: *",
        "Allow: /",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}",
    ])
    return HttpResponse(content, content_type="text/plain")
