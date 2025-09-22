from faker import Faker
from extensions import db
from server.models.upload import Upload
from server.models.user import User
import random

fake = Faker()

def seed_uploads():
    users = User.query.all()
    if not users:
        print("No users found. Seed users first.")
        return

    for _ in range(10):
        user = random.choice(users)
        upload = Upload(
            filename=fake.file_name(extension=random.choice(['pdf', 'jpg', 'docx', 'mp4'])),
            size=round(random.uniform(0.5, 100.0), 2),  # Size in MB
            user_id=user.id
        )
        db.session.add(upload)

    db.session.commit()
    print("Seeded 10 uploads.")
