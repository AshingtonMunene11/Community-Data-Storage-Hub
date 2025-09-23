from seeds.seed_uploads import seed_uploads
from seeds.seed_allocations import seed_allocations

def run_all_seeders():
    seed_uploads()
    seed_allocations()
