from server.app import app
from . import run_all_seeders

if __name__ == "__main__":
    print("🌱 Starting database seeding...")
    with app.app_context():
        run_all_seeders()
    print("🎉 All seeders completed successfully!")
