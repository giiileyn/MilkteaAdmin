from bson import ObjectId
from app.database import db

async def get_all_users():
    """
    Fetch all users from the 'users' collection.
    """
    cursor = db.users.find({}, {"name": 1, "email": 1, "avatar": 1, "createdAt": 1})
    users = []
    async for u in cursor:
        users.append({
            "id": str(u["_id"]),
            "name": u["name"],
            "email": u["email"],
            "avatar": u.get("avatar", None),
            "createdAt": u.get("createdAt")
        })
    return users

async def get_user_by_id(user_id: str):
    """
    Fetch a single user by its ID.
    """
    user = await db.users.find_one({"_id": ObjectId(user_id)}, {"name": 1, "email": 1, "avatar": 1, "createdAt": 1})
    if user:
        return {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "avatar": user.get("avatar", None),
            "createdAt": user.get("createdAt")
        }
    return None


async def update_user(user_id: str, name: str = None, email: str = None, avatar: str = None):
    """
    Update a user's details by ID.
    """
    update_fields = {}
    if name is not None:
        update_fields["name"] = name
    if email is not None:
        update_fields["email"] = email
    if avatar is not None:
        update_fields["avatar"] = avatar

    if not update_fields:
        return None  # Nothing to update

    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_fields}
    )

    if result.matched_count == 0:
        return None

    # Return updated user
    user = await db.users.find_one({"_id": ObjectId(user_id)}, {"name": 1, "email": 1, "avatar": 1, "createdAt": 1})
    if user:
        return {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "avatar": user.get("avatar"),
            "createdAt": user.get("createdAt")
        }
    return None
