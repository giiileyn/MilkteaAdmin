from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from app.models.user import UserResponse
from app.crud.user import create_user
from app.utils.cloudinary_utils import upload_avatar

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    avatar: UploadFile = File(None),
):
    avatar_url = None
    if avatar:
        avatar_url = upload_avatar(avatar.file)

    user_data = {
        "name": name,
        "email": email,
        "password": password,
        "avatar": avatar_url,
    }

    created_user = create_user(user_data)
    return created_user
