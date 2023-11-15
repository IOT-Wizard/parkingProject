from pydantic import BaseModel
from datetime import datetime

class Subscription(BaseModel):
    subscription_id: int
    car_id: str
    created_at: datetime = None
    end_date: datetime
