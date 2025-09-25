from faker import Faker
from ..extensions import db
from ..models.upload import Upload
from ..models.user import User
import random

fake = Faker()

def seed_uploads(num_uploads=10):
    users = User.query.all()
    if not users:
        print("No users found. Seed users first.")
        return

    for _ in range(num_uploads):
        user = random.choice(users)
        upload = Upload(
            filename=fake.file_name(extension=random.choice(['pdf', 'jpg', 'docx', 'mp4'])),
            size=round(random.uniform(0.5, 100.0), 2),  # Size in MB
            user_id=user.id
        )
        db.session.add(upload)
        print(f"Created upload '{upload.filename}' ({upload.size}MB) for user {user.id}")

    try:
        db.session.commit()
        print(f"Seeded {num_uploads} uploads.")
    except Exception as e:
        db.session.rollback()
        print(f"Upload seeding failed: {e}")
