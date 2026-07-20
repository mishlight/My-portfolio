from django.contrib import admin
from .models import Inquiry, Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "technology", "year", "is_featured", "sort_order")
    list_editable = ("is_featured", "sort_order")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "technology", "description", "problem")

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at",)
