import time
import cv2
from PIL import Image
from pytesseract import pytesseract
import serial
import datetime
from flask import Flask

import mysql.connector

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="0802",
    database="parking"
)

cursor = mydb.cursor()

app = Flask(__name__)

# Define 'ser' if you're using serial communication
# ser = serial.Serial('COM1', 9600)

try:
    camera = cv2.VideoCapture(1)
    while True:
        _, image = camera.read()

        # Check if the frame is not None
        if image is not None:
            cv2.imshow('Text detection', image)

            path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            img = Image.fromarray(image)
            pytesseract.tesseract_cmd = path
            text = pytesseract.image_to_string(img)
            Matricule = text.replace(" ", "")  # Remove spaces from Matricule
            if(Matricule != ""):
                print(f"Matricule: {Matricule}")

            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break

            time.sleep(2)

            if Matricule != '':
                try:
                    Matricule = Matricule.strip()
                    check_query = "SELECT car_id, end_date FROM subscription WHERE car_id = %s"
                    print(f"Executing query: {check_query} with parameters: ({Matricule},)")
                    cursor.execute(check_query, (Matricule,))
                    car = cursor.fetchone()

                    print(f"Result from database: {car}")

                    if car:
                        car_data = {
                            "car_id": car[0],
                            "end_date": car[1],
                        }

                        if car_data['end_date'] > datetime.datetime.now():
                            check_event_query = (
                                "SELECT event FROM parking_history WHERE car_id = %s ORDER BY timestamp DESC LIMIT 1"
                            )
                            cursor.execute(check_event_query, (car_data['car_id'],))
                            last_event = cursor.fetchone()

                            if last_event and last_event[0] == 'enter':
                                insert_query = "INSERT INTO parking_history (car_id, event) VALUES (%s, 'exit')"
                                cursor.execute(insert_query, (car_data['car_id'],))
                                mydb.commit()
                                # ser.write(b'1')  # You might want to send a different signal here
                            elif last_event and (last_event[0] == 'exit' or last_event[0] == ''):
                                insert_query = "INSERT INTO parking_history (car_id, event) VALUES (%s, 'enter')"
                                cursor.execute(insert_query, (car_data['car_id'],))
                                mydb.commit()
                                # ser.write(b'1')
                        else:
                            # ser.write(b'-1')
                            print("sans abb")
                    else:
                        # ser.write(b'0')
                        print("does not exist")

                except Exception as e:
                    print(f"Error: {e}")
                    mydb.rollback()

finally:
    camera.release()
    cv2.destroyAllWindows()
