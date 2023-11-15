from flask import Flask 
import mysql.connector
from tables import create_user_table , create_cars_table , create_parking_history_table , create_subscription_table

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="0802",
    database="parking"
)

app = Flask(__name__)

cursor = mydb.cursor()

cursor.execute(create_user_table)
cursor.execute(create_cars_table)
cursor.execute(create_parking_history_table)
cursor.execute(create_subscription_table)

mydb.commit()

# Members API Route
@app.route("/memebrers")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__": 
    app.run(debug=True, host="0.0.0.0", port=5000)
