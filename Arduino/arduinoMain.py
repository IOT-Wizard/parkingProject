import serial

import datetime
from flask import Flask, jsonify, request, session , make_response
import mysql.connector



mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="0802",
    database="parking"
)

app = Flask(__name__)
cursor = mydb.cursor()

#ser = serial.Serial('COM9', 9600) 

print("CTRL + C pour arrêter")

while True :
    Matricule = input('Matricule :  ')

    check_query = "SELECT car_id , end_date FROM subscription WHERE car_id= %s"
    cursor.execute(check_query, (Matricule,))
    car = cursor.fetchone()
      
    if car:
        car_data = {
             "car_id":  car[0],
             "end_date": car[1],
         }
        # Check the last event for the car

        if car_data['end_date'] > datetime.datetime.now():
            
                check_event_query = "SELECT event FROM parking_history WHERE car_id = %s ORDER BY timestamp DESC LIMIT 1"
                cursor.execute(check_event_query, (car_data['car_id'],))
                last_event = cursor.fetchone()
                
                if last_event and last_event[0] == 'enter':
                    # If the last event was 'enter', insert a new 'exit' event
                    insert_query = "INSERT INTO parking_history (car_id, event) VALUES (%s, 'exit')"
                    cursor.execute(insert_query, (car_data['car_id'],))
                    mydb.commit()
                    #ser.write(b'1')  # You might want to send a different signal here
                if last_event and (last_event[0] == 'exit' or last_event[0] == '' ):
                    # If the last event was 'exit' or there was no event, insert a new 'enter' event
                    insert_query = "INSERT INTO parking_history (car_id, event) VALUES (%s, 'enter')"
                    cursor.execute(insert_query, (car_data['car_id'],))
                    mydb.commit()
                    #ser.write(b'1')
                    
        else:
            #ser.write(b'-1')
            print("sans abb")

    else:
       # ser.write(b'0')
       print("does not exist")
       
    # if car:
    #     car_data = {
    #         "car_id":  car[0],
    #         "end_date": car[1],
    #     }
    #     insert_query = "INSERT INTO parking_history (car_id, event) VALUES (%s ,%s)"
    #     cursor.execute(insert_query, (car[0], "enter"))
    #     mydb.commit()
    #     ser.write(b'1')
    #     #ser.write(str(1).encode())
    # else:
    #     ser.write(b'0')
    #     #ser.write(str(0).encode())

