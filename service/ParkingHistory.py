from pydantic import BaseModel
from datetime import datetime

class ParkingHistory(BaseModel):
    id: int
    timestamp: datetime = None
    car_id: str
    event: str
