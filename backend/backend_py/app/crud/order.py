from app.database import db
from bson import ObjectId
from typing import Dict
import datetime

# Create order
async def create_order(db, order_data: Dict):
    order_data["createdAt"] = datetime.datetime.utcnow()
    order_data["updatedAt"] = datetime.datetime.utcnow()
    result = await db.orders.insert_one(order_data)
    order_data["_id"] = str(result.inserted_id)
    return order_data

# Get all orders with user info
async def get_orders(db):
    cursor = db.orders.find()
    orders = []
    async for o in cursor:
        o["_id"] = str(o["_id"])
        # Fetch user name
        user = await db.users.find_one({"_id": o["user"]}, {"name": 1})
        o["customerName"] = user["name"] if user else "Unknown"
        orders.append(o)
    return orders

# Get single order with user info
async def get_order(db, order_id: str):
    o = await db.orders.find_one({"_id": ObjectId(order_id)})
    if not o:
        return None
    o["_id"] = str(o["_id"])
    user = await db.users.find_one({"_id": o["user"]}, {"name": 1})
    o["customerName"] = user["name"] if user else "Unknown"
    return o

# Update order
async def update_order(db, order_id: str, update_data: Dict):
    update_data["updatedAt"] = datetime.datetime.utcnow()
    await db.orders.update_one({"_id": ObjectId(order_id)}, {"$set": update_data})
    return await get_order(db, order_id)

# Delete order
async def delete_order(db, order_id: str):
    result = await db.orders.delete_one({"_id": ObjectId(order_id)})
    return result.deleted_count
