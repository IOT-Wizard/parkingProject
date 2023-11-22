from flask import Flask
import pytesseract
import cv2
import threading
from datetime import datetime
import mysql.connector

app = Flask(__name__)

# Configure your MySQL database connection
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '',
    'database': 'parking'
}

# Function to handle text detection
def perform_text_detection():
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
            try:
                cursor.execute(query, values)
                conn.commit()
            except mysql.connector.Error as err:
                print(f"Error: {err}")

            # Use the binarized image for box detection
            imgboxes = pytesseract.image_to_boxes(thresh)

            for boxes in imgboxes.splitlines():
                boxes = boxes.split(' ')
                x, y, w, h = int(boxes[1]), int(boxes[2]), int(boxes[3]), int(boxes[4])
                cv2.rectangle(frame, (x, imgH - y), (w, imgH - h), (0, 0, 255), 3)

            cv2.putText(frame, imgchar, (x1 + int(w1 / 50), y1 + int(h1 / 50)), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        (255, 0, 0), 2)

            cv2.imshow('Text Detection Tutorial', frame)

            # Print detected text to the console
            print("Detected Text:")
            print(imgchar)

            # Save the frame as an image
            cv2.imwrite('serviceCam/img/detected_text_image.jpg', frame)

            if cv2.waitKey(2) & 0xFF == ord('q'):
                break

    # Close the webcam, release the database connection
    cap.release()
    cursor.close()
    conn.close()

# Your text detection route
@app.route('/detection')
def detect_text():
    # Start the text detection in a separate thread
    detection_thread = threading.Thread(target=perform_text_detection)
    detection_thread.start()

    return "Text detection started!"

if __name__ == "__main__":
    # Establish a MySQL connection
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Run the Flask app in debug mode on 0.0.0.0:5000
    app.run(debug=True, host="0.0.0.0", port=5000)
