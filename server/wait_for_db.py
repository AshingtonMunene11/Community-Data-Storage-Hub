import os
import sys
import time
from sqlalchemy import create_engine


def normalize_db_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+psycopg2://", 1)
    return url


def main():
    url = os.getenv("DATABASE_URL")
    if not url:
        # No DB configured, nothing to wait for
        print("No DATABASE_URL set; skipping DB wait.")
        return 0

    url = normalize_db_url(url)

    attempts = int(os.getenv("DB_WAIT_ATTEMPTS", "30"))
    delay = float(os.getenv("DB_WAIT_DELAY", "2"))

    for attempt in range(1, attempts + 1):
        try:
            engine = create_engine(url)
            with engine.connect() as conn:
                # SQLAlchemy 2.0: use exec_driver_sql to run raw SQL
                conn.exec_driver_sql("SELECT 1")
            print("Database is ready.")
            return 0
        except Exception as e:
            print(f"[{attempt}/{attempts}] Database not ready yet: {e}")
            time.sleep(delay)

    print("Database not ready after waiting. Exiting with error.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
