from django import forms
from django.core import signing
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Inquiry


class InquiryForm(forms.ModelForm):
    website = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            "tabindex": "-1",
            "autocomplete": "off",
            "aria-hidden": "true",
        }),
    )
    started_at = forms.CharField(widget=forms.HiddenInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.is_bound:
            self.fields["started_at"].initial = signing.dumps(
                timezone.now().timestamp(),
                salt="portfolio-contact",
            )

    def clean_website(self):
        if self.cleaned_data.get("website"):
            raise ValidationError("Spam submission detected.")
        return ""

    def clean_started_at(self):
        token = self.cleaned_data.get("started_at", "")
        try:
            started = float(signing.loads(
                token,
                salt="portfolio-contact",
                max_age=7200,
            ))
        except (signing.BadSignature, TypeError, ValueError):
            raise ValidationError("Please refresh the page and try again.")
        if timezone.now().timestamp() - started < 3:
            raise ValidationError("Please take a moment before submitting.")
        return token

    def clean_message(self):
        message = self.cleaned_data["message"].strip()
        lower_message = message.lower()
        link_count = lower_message.count("http://") + lower_message.count("https://")
        if link_count > 2:
            raise ValidationError("Please include no more than two links.")
        if len(message) < 15 or len(set(lower_message)) < 6:
            raise ValidationError("Please write a little more about your message.")
        return message

    class Meta:
        model = Inquiry
        fields = ("name", "email", "message")
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Jane Smith"}),
            "email": forms.EmailInput(attrs={"placeholder": "jane@studio.com"}),
            "message": forms.Textarea(attrs={"rows": 2, "placeholder": "A few words about your idea..."}),
        }
