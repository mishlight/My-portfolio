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

## Deploy on Render

The repository includes a `render.yaml` Blueprint. In Render, create a new
Blueprint and connect this repository. Render installs dependencies, collects
static files, applies migrations, and starts Gunicorn automatically.

This deployment intentionally uses SQLite. On a free Render web service, the
filesystem is ephemeral, so new database records can reset after a restart or
redeploy. Attach a persistent disk and set `SQLITE_PATH` to a path on that disk
if long-term storage is required.

## Environment variables

- `DJANGO_SECRET_KEY`: required for production.
- `DJANGO_DEBUG`: set to `False` in production.
- `DJANGO_ALLOWED_HOSTS`: comma-separated production hostnames.
