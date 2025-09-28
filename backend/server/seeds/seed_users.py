from faker import Faker
from server.extensions import db
from server.models.user import User
import random

fake = Faker()

def seed_users(num_users=5):
    existing_user_count = User.query.count()
    if existing_user_count >= num_users:
        print(f"{existing_user_count} users already exist. Skipping user seeding.")
        return

    users_to_create = num_users - existing_user_count
    print(f"Creating {users_to_create} additional users...")

    for i in range(users_to_create):
        try:
            # Create unique username and email
            username = f"user_{existing_user_count + i + 1}_{fake.user_name()}"
            email = f"user{existing_user_count + i + 1}@example.com"
            
            user = User(
                username=username,
                email=email,
                role=random.choice(["user", "admin"])
            )
            user.set_password("password123")
            db.session.add(user)
            print(f"✅ Created user {user.username} ({user.email})")
            
        except Exception as e:
            print(f"❌ Failed to create user {i+1}: {e}")
            continue

    try:
        db.session.commit()
        print(f"✅ Seeded {users_to_create} users successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"❌ User seeding failed: {e}")
