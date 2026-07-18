from django import forms
from .models import Inquiry

class InquiryForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = ("name", "email", "message")
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Jane Smith"}),
            "email": forms.EmailInput(attrs={"placeholder": "jane@studio.com"}),
            "message": forms.Textarea(attrs={"rows": 2, "placeholder": "A few words about your idea..."}),
        }
