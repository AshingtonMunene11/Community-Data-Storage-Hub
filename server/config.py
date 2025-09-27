import os

class Config:
    # Read DATABASE_URL from environment; default to local SQLite for development
    _db_url = os.getenv("DATABASE_URL", "sqlite:///app.db")
    # Render/Heroku often provide URLs starting with 'postgres://', but SQLAlchemy
    # expects the driver-qualified form 'postgresql+psycopg2://'
    if _db_url.startswith("postgres://"):
        _db_url = _db_url.replace("postgres://", "postgresql+psycopg2://", 1)
    SQLALCHEMY_DATABASE_URI = _db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")