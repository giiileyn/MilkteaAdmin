# app/crud/order.py
from app.database import db
from bson import ObjectId

# Get all orders
async def get_all_orders():
    cursor = db.orders.find()
    orders = []
    async for o in cursor:
        o["_id"] = str(o["_id"])
        o["user"] = str(o["user"])
        # Convert product IDs to string if needed
        for p in o["products"]:
            if "productId" in p:
                p["productId"] = str(p["productId"])
        orders.append(o)
    return orders

# Get order by ID
async def get_order_by_id(order_id: str):
    order = await db.orders.find_one({"_id": ObjectId(order_id)})
    if order:
        order["_id"] = str(order["_id"])
        order["user"] = str(order["user"])
        for p in order["products"]:
            if "productId" in p:
                p["productId"] = str(p["productId"])
    return order
