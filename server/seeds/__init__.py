from seeds.seed_uploads import seed_uploads
from seeds.seed_allocations import seed_allocations
from seeds.seed_storage_nodes import seed_storage_nodes

def run_all_seeders():
    seed_storage_nodes()
    seed_uploads()
    seed_allocations()

