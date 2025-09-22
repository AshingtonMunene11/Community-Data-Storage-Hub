from faker import Faker
from extensions import db
from server.models.allocation import Allocation
from server.models.upload import Upload
from server.models.storage_node import StorageNode
import random

fake = Faker()

def seed_allocations():
    uploads = Upload.query.all()
    nodes = StorageNode.query.all()

    if not uploads or not nodes:
        print("Missing uploads or storage nodes. Seed those first.")
        return

    for upload in uploads:
        node = random.choice(nodes)
        allocated_size = round(random.uniform(0.1, upload.size), 2)

        allocation = Allocation(
            upload_id=upload.id,
            node_id=node.id,
            allocated_size=allocated_size
        )
        db.session.add(allocation)

    db.session.commit()
    print("Seeded allocations for all uploads.")
