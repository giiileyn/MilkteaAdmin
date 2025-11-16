from fastapi import APIRouter, HTTPException
from typing import List
from app.crud import order as order_crud
from main import db

router = APIRouter(tags=["orders"])

# Get all orders
@router.get("/")
async def list_orders():
    return await order_crud.get_orders(db)

# Create an order
@router.post("/")
async def create_order(order: dict):
    created = await order_crud.create_order(db, order)
    return {"message": "Order created successfully", "order": created}

# Get order by ID
@router.get("/{order_id}")
async def get_order(order_id: str):
    order = await order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# Update order
@router.put("/{order_id}")
async def update_order(order_id: str, order_update: dict):
    updated = await order_crud.update_order(db, order_id, order_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order updated successfully", "order": updated}

# Delete order
@router.delete("/{order_id}")
async def delete_order(order_id: str):
    deleted_count = await order_crud.delete_order(db, order_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted successfully"}
