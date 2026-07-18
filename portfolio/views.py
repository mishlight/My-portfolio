from django.contrib import messages
from django.shortcuts import redirect, render
from .forms import InquiryForm
from .models import Project

def home(request):
    form = InquiryForm()
    if request.method == "POST":
        form = InquiryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your message has been saved. I’ll get back to you soon.")
            return redirect("home")
        messages.error(request, "Please check the form and try again.")

    return render(request, "portfolio/home.html", {
        "projects": Project.objects.filter(is_featured=True),
        "form": form,
    })
