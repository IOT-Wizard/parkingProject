import datetime
from flask import Flask, jsonify, request, session , make_response
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
app.secret_key = "key" 
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
        
        user_data = {
            "user_id": user[0],
            "full_name": user[1],
            "username": user[2],
        }
        session['user_id'] = user[0]
        # Authentication successful
        return jsonify({"message": "Login successful", "user": user_data})
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

'''@app.route('/test', methods=['GET'])
def test():
    return jsonify({"name" : "maroua"})'''

@app.route('/logout', methods=['POST'])
def logout():
    print("test")
     # Clear the session
    session.clear()
    return "User has been logged out."

# @app.route("/rapport/<int:user_id>", methods=["GET"])
# def rapport():
#     # Assurez-vous que l'utilisateur est connecté
#     if 'user_id' not in session:
#         return jsonify({"message": "Utilisateur non connecté"}), 401  # Unauthorized

#     user_id = session['user_id']

#     query = """
#         SELECT c.car_id, h.event, h.timestamp
#         FROM parking_history h
#         JOIN cars c ON h.car_id = c.car_id
#         JOIN users u ON c.car_owner_id = u.user_id
#         WHERE u.user_id = %s;
#     """
    
#     #cursor.execute(query, (user_id,))
#     # Exécutez la requête
#     cursor.execute(query, (user_id,))
#     result = cursor.fetchall()

#     # Transformez les résultats en un format JSON
#     rapport_json = [{"car_id": row[0], "event": row[1], "timestamp": row[2]} for row in result]

#     # Renvoyez la réponse JSON
#     return jsonify(rapport_json)

@app.route("/rapport/<int:user_id>", methods=["GET"])
def rapport(user_id):
    # Vérifiez si l'utilisateur est connecté
    # if 'user_id' not in session or session['user_id'] != user_id:
    #     return jsonify({"message": "Utilisateur non connecté ou accès non autorisé"}), 401  # Unauthorized

    query = """
        SELECT c.car_id, h.event, h.timestamp
        FROM parking_history h
        JOIN cars c ON h.car_id = c.car_id
        JOIN users u ON c.car_owner_id = u.user_id
        WHERE u.user_id = %s;
    """
    
    cursor.execute(query, (user_id,))
    result = cursor.fetchall()

    rapport_json = [{"car_id": row[0], "event": row[1], "timestamp": row[2]} for row in result]

    return jsonify(rapport_json)


@app.route("/subscribe/<int:user_id>", methods=["POST"])
def subscribe(user_id):
    data = request.get_json()
    car_id = data.get("car_id")
    end_date_str = data.get("end_date")

    # Check if the car already exists
    check_query = "SELECT * FROM cars WHERE car_id = %s"
    cursor.execute(check_query, (car_id,))
    existing_car = cursor.fetchone()

    if existing_car:
        return jsonify({"message": "Car already exists"}), 400  # Bad Request

    # Insert the car into the "cars" table
    insert_car_query = "INSERT INTO cars (car_id, car_owner_id) VALUES (%s, %s)"
    cursor.execute(insert_car_query, (car_id, user_id))

    # Parse the end_date string to a datetime object
    end_date = datetime.datetime.strptime(end_date_str, "%Y-%m-%d")

    # Insert the subscription into the "subscriptions" table
    insert_subscription_query = "INSERT INTO subscription (car_id, end_date) VALUES (%s, %s)"
    cursor.execute(insert_subscription_query, (car_id, end_date))

    mydb.commit()

    return jsonify({"message": "Subscription successful"}), 201  # Created


if __name__ == "__main__": 
    app.run(debug=True, host="0.0.0.0", port=5000)