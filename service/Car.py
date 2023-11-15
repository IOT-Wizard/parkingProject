from pydantic import BaseModel
from datetime import datetime

class Car(BaseModel):
    car_id: str
    car_owner_id: int
    created_at: datetime = None
