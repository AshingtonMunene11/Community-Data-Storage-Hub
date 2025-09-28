from faker import Faker
from server.extensions import db
from server.models.user import User
import random

fake = Faker()

def seed_users(num_users=5):
    existing_user_count = User.query.count()
    if existing_user_count > 0:
        print(f"{existing_user_count} users already exist. Skipping user seeding.")
        return

    for _ in range(num_users):
        username = fake.unique.user_name()
        email = fake.unique.email()
        user = User(
            username=username,
            email=email,
            role=random.choice(["user", "admin"])
        )
        user.set_password("password123")
        db.session.add(user)
        print(f" Created user {user.username} ({user.email})")

    try:
        db.session.commit()
        print(f" Seeded {num_users} users successfully.")
    except Exception as e:
        db.session.rollback()
        print(f" User seeding failed: {e}")
