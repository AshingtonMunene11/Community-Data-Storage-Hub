from faker import Faker
from ..extensions import db
from ..models.user import User
import random

fake = Faker()


def seed_users(num_users=10):
    roles = ["user", "admin"]

    # Tracks existing usernames and emails
    existing_usernames = {user.username for user in User.query.all()}
    existing_emails = {user.email for user in User.query.all()}

    created_count = 0
    while created_count < num_users:
        username = fake.user_name()
        email = fake.unique.email()

        # Skips if username or email already exists
        if username in existing_usernames or email in existing_emails:
            continue

        role = random.choice(roles)
        password = "password123"

        user = User(username=username, email=email, role=role)
        user.set_password(password)

        db.session.add(user)
        existing_usernames.add(username)
        existing_emails.add(email)
        created_count += 1
        print(f"Created user: {username} ({role})")

    try:
        db.session.commit()
        print(f"Seeded {num_users} users successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Seeding users failed: {e}")

