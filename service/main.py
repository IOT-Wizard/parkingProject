from flask import Flask, jsonify, request 
import mysql.connector
from tables import create_user_table , create_cars_table , create_parking_history_table , create_subscription_table
from flask_cors import CORS


mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="parking"
)

app = Flask(__name__)
CORS(app)
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





@app.route("/signin", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Perform authentication logic (compare with database, etc.)
    # For simplicity, let's assume you have a 'users' table in your database

    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    if user:
        # Authentication successful
        return jsonify({"message": "Login successful", "user_id": user[0]})
    else:
        # Authentication failed
        return jsonify({"message": "Invalid credentials"}), 401



@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    full_name = data.get("full_name")
    username = data.get("username")
    password = data.get("password")

    # Check if the username is already taken
    check_query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(check_query, (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "Username already taken"}), 400  # 400 Bad Request

    # Insert the new user into the database
    insert_query = "INSERT INTO users (full_name, username, password) VALUES (%s, %s, %s)"
    cursor.execute(insert_query, (full_name, username, password))
    mydb.commit()

    return jsonify({"message": "Signup successful"}), 201  # 201 Created


if __name__ == "__main__": 
    app.run(debug=True, host="0.0.0.0", port=5000)
