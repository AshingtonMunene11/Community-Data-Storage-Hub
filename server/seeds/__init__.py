from .seed_uploads import seed_uploads
from .seed_allocations import seed_allocations
from .seed_storage_nodes import seed_storage_nodes

def run_all_seeders():
    seed_storage_nodes()
    seed_uploads()
    seed_allocations()

