from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
import pytesseract
import cv2
from datetime import datetime
import mysql.connector

app = Flask(__name__)

# Configure your MySQL database connection
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '0802',
    'database': 'parking'
}

# Establish a MySQL connection
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Your text detection route
@app.route('/detect_text')
def detect_text():
    # Open the webcam
    cap = cv2.VideoCapture(0)

    counter = 0
    while True:
        ret, frame = cap.read()
        counter += 1
        if (counter % 20) == 0:
            imgH, imgW, _ = frame.shape

            x1, y1, w1, h1 = 0, 0, imgW, imgH
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray_frame, 150, 255, cv2.THRESH_BINARY)
            imgchar = pytesseract.image_to_string(thresh)

            # Insert the detected text into the 'cars' table
            query = "INSERT INTO cars (detected_text, car_owner_id) VALUES (%s, %s)"
            values = (imgchar, 1)  # Assuming car_owner_id is 1 for this example
            cursor.execute(query, values)
            conn.commit()

            
            # Use the binarized image for box detection
            imgboxes = pytesseract.image_to_boxes(thresh)
            
            for boxes in imgboxes.splitlines():
                boxes = boxes.split(' ')
                x, y, w, h = int(boxes[1]), int(boxes[2]), int(boxes[3]), int(boxes[4])
                cv2.rectangle(frame, (x, imgH - y), (w, imgH - h), (0, 0, 255), 3)

            cv2.putText(frame, imgchar, (x1 + int(w1 / 50), y1 + int(h1 / 50)), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

            cv2.imshow('Text Detection Tutorial', frame)
            
            # Print detected text to the console
            print("Detected Text:")
            print(imgchar)

            # Save the frame as an image
            cv2.imwrite('serviceCam/img/detected_text_image.jpg', frame)

            if cv2.waitKey(2) & 0xFF == ord('q'):
                break

    # Close the webcam, release the database connection, and shut down the app
    cap.release()
    cursor.close()
    conn.close()

    return "Text detection complete!"

if __name__ == "__main__": 
    app.run(debug=True, host="0.0.0.0", port=5000)