from pydantic import BaseModel

class User(BaseModel):
    user_id: int  # You might want to remove this field when creating a new user, as it will be auto-incremented by the database
    full_name: str
    username: str
    password: str
