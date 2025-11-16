# app/crud/user.py
from app.database import db

async def get_users_count():
    """
    Return the total number of users in the database.
    """
    count = await db.users.count_documents({})
    return count
