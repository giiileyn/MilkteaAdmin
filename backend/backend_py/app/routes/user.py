from fastapi import APIRouter, HTTPException
from bson import ObjectId
from bson.errors import InvalidId
from app.crud import user as user_crud
from app.database import db  # make sure this import exists

router = APIRouter()

@router.get("/", summary="Get all users")
async def fetch_users():
    try:
        users = await user_crud.get_all_users()
        return {"success": True, "data": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", summary="Get user by ID")
async def fetch_user(user_id: str):
    try:
        user = await user_crud.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"success": True, "data": user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ========================
# DELETE USER ENDPOINT
# ========================
@router.delete("/{user_id}", summary="Delete user by ID")
async def delete_user(user_id: str):
    try:
        # Validate ObjectId
        try:
            obj_id = ObjectId(user_id)
        except InvalidId:
            raise HTTPException(status_code=400, detail="Invalid user ID format")

        # Delete user
        result = await db.users.delete_one({"_id": obj_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return {"success": True, "message": f"User {user_id} deleted successfully"}

    except Exception as e:
        print("Delete user error:", e)  # prints error to console for debugging
        raise HTTPException(status_code=500, detail=str(e))
