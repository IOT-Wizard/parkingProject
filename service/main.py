from flask import Flask
import mysql.connector
from tables import create_user_table, create_cars_table, create_parking_history_table, create_subscription_table

# Database connection
mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",  # Remove this line if there's no password
    database="parking"
)

# Flask application (optional for database setup)
app = Flask(__name__)

# Get a cursor object from the connection
cursor = mydb.cursor()

# Execute table creation statements
cursor.execute(create_user_table)
cursor.execute(create_cars_table)
cursor.execute(create_parking_history_table)
cursor.execute(create_subscription_table)

# Commit the changes to the database
mydb.commit()

# Close the cursor and database connection
#cursor.close()
#mydb.close()
