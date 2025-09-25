from ..models.storage_node import StorageNode
from ..extensions import db
from faker import Faker
import random

fake = Faker()

def seed_storage_nodes(num_nodes=5):
    locations = ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Kisii"]

    existing_names = {node.name for node in StorageNode.query.all()}

    created_count = 0
    while created_count < num_nodes:
        name=fake.word().capitalize() + "Node"
        if name in existing_names:
            continue

        node = StorageNode(
            name=name,
            capacity=round(random.uniform(50.0, 150), 2),
            location=random.choice(locations)
        )
        db.session.add(node)
        existing_names.add(name)
        created_count += 1
        print(f"Created storage node: {node.name} in {node.location} with {node.capacity}MB capacity")

    try:
        db.session.commit()
        print(f"Seeded {num_nodes} storage nodes successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Seeding storage nodes failed: {e}")
    
