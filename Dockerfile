FROM python:3.11-slim

# Sprečava pisanje .pyc fajlova i forsira ispis u konzolu bez bafera
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instaliraj sistemske zavisnosti neophodne za psycopg2 i druge pakete
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port (Coolify obično sluša na 8000 ili 80, podesićemo na 8000)
EXPOSE 8000

# Pokretanje servera
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]