# Mishael Sellu Portfolio

A Django-based personal portfolio with SQLite project management and a contact inquiry database.

## Run locally

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open `http://127.0.0.1:8000/`. Use `/admin/` to manage featured projects and review contact inquiries.

## Environment variables

- `DJANGO_SECRET_KEY`: required for production.
- `DJANGO_DEBUG`: set to `False` in production.
- `DJANGO_ALLOWED_HOSTS`: comma-separated production hostnames.
