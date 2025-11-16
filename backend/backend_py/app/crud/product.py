# crud/product.py
from app.database import db
from bson import ObjectId
from typing import Optional, Dict
import datetime

async def create_product(product_data: Dict):
    """
    Inserts a new product into the 'products' collection.
    Example product_data:
    {
        "name": "Classic Milk Tea",
        "category": "Milk Tea",
        "flavor": "Original",
        "sizes": [{"name": "Regular", "price": 120}],
        "toppings": ["Pearls"],
        "image": "uploads/classic.jpg",
        "stock": 50,
        "status": "available",
        "createdAt": datetime.datetime.utcnow()
    }
    """
    product_data["createdAt"] = datetime.datetime.utcnow()
    result = await db.products.insert_one(product_data)
    product_data["_id"] = str(result.inserted_id)
    return product_data


async def get_all_products():
    cursor = db.products.find()
    products = [doc async for doc in cursor]
    for p in products:
        p["_id"] = str(p["_id"])
    return products


async def get_product(product_id: str):
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if product:
        product["_id"] = str(product["_id"])
    return product


async def update_product(product_id: str, update_data: Dict):
    await db.products.update_one({"_id": ObjectId(product_id)}, {"$set": update_data})
    return await get_product(product_id)


async def delete_product(product_id: str):
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    return {"deleted": result.deleted_count}
