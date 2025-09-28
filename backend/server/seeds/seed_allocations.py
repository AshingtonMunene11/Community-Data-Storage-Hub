from faker import Faker
import random
from server.extensions import db
from server.models.allocation import Allocation
from server.models.upload import Upload
from server.models.storage_node import StorageNode

fake = Faker()

def seed_allocations():
    """
    Break each upload into 1–3 chunks and assign each chunk to a random storage node.
    """
    uploads = Upload.query.all()
    nodes = StorageNode.query.all()

    if not uploads or not nodes:
        print("Missing uploads or storage nodes. Seed those first.")
        return

    for upload in uploads:
        # decide how many chunks to split this upload into
        num_chunks = random.randint(1, 3)
        chunk_size = round(upload.size / num_chunks, 2)

        for i in range(num_chunks):
            node = random.choice(nodes)
            allocation = Allocation(
                upload_id=upload.id,
                storage_node_id=node.id,  
                allocated_size=chunk_size,
                chunk_index=i
            )
            db.session.add(allocation)
            print(
                f"Allocated {chunk_size} MB of '{upload.filename}' "
                f"to node {node.id} [chunk {i}]"
            )

    try:
        db.session.commit()
        print(" Seeded allocations for all uploads.")
    except Exception as e:
        db.session.rollback()
        print(f" Allocation seeding failed: {e}")
