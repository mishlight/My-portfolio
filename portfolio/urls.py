from django.urls import path
from .views import home, project_detail, robots_txt


urlpatterns = [
    path("", home, name="home"),
    path("projects/<slug:slug>/", project_detail, name="project_detail"),
    path("robots.txt", robots_txt, name="robots_txt"),
]
