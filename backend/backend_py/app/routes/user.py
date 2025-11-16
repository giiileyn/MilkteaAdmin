from fastapi import APIRouter, HTTPException
from app.crud import user as user_crud


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
