from faker import Faker
from ..extensions import db
from ..models.allocation import Allocation
from ..models.upload import Upload
from ..models.storage_node import StorageNode
import random

fake = Faker()

def seed_allocations():
    uploads = Upload.query.all()
    nodes = StorageNode.query.all()

    if not uploads or not nodes:
        print("Missing uploads or storage nodes. Seed those first.")
        return

    for upload in uploads:
        num_chunks = random.randint(1, 3)
        chunk_size = round(upload.size / num_chunks, 2)

        for i in range(num_chunks):
            node = random.choice(nodes)
            allocation = Allocation(
                upload_id=upload.id,
                storage_node_id=node.id,
                allocated_size=chunk_size,
            )
            db.session.add(allocation)
            print(f"Allocated {chunk_size}MB of '{upload.filename}' to node {node.id} [chunk {i}]")

    try:
        db.session.commit()
        print("Seeded allocations for all uploads.")
    except Exception as e:
        db.session.rollback()
        print(f"Allocation seeding failed: {e}")
