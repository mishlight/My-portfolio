from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path
from portfolio.sitemaps import ProjectSitemap, StaticViewSitemap

urlpatterns = [
    path("admin/", admin.site.urls),
    path("sitemap.xml", sitemap, {"sitemaps": {
        "static": StaticViewSitemap,
        "projects": ProjectSitemap,
    }}, name="django.contrib.sitemaps.views.sitemap"),
    path("", include("portfolio.urls")),
]
