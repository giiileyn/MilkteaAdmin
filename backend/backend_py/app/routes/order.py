# app/routes/order.py
from fastapi import APIRouter, HTTPException
from app.crud import order as order_crud

router = APIRouter()

@router.get("/")
async def fetch_orders():
    try:
        return await order_crud.get_all_orders()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{order_id}")
async def fetch_order(order_id: str):
    try:
        order = await order_crud.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
