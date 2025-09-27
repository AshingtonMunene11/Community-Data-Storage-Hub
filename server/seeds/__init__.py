from .seed_uploads import seed_uploads
from .seed_allocations import seed_allocations
from .seed_storage_nodes import seed_storage_nodes
from .seed_users import seed_users

def run_all_seeders():
    print("➡️ Seeding storage nodes...")
    seed_storage_nodes()
    print("✅ Storage nodes seeded.")

    print("➡️ Seeding uploads...")
    seed_uploads()
    print("✅ Uploads seeded.")

    print("➡️ Seeding allocations...")
    seed_allocations()
    print("✅ Allocations seeded.")
