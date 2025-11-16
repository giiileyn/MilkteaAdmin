from fastapi import APIRouter
from app.crud import product as product_crud


router = APIRouter()

@router.get("/products")
def get_products():
    return {"products": ["Milk Tea", "Taro", "Wintermelon"]}
