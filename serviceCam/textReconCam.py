#text detection from a camera

"""
import cv2
from PIL import Image
from pytesseract import pytesseract

camera = cv2.VideoCapture(0)

while True:
    _,image = camera.read()
    cv2.imshow('Text detection', image)
    if cv2.waitKey(1) & 0xFF==ord('s'):
        cv2.imwrite('serviceCam/img/test1.jpg',image)
        break

camera.release()
cv2.destroyAllWindows()

def tesseract():
    Imagepath='serviceCam/img/test1.jpg'
    text=pytesseract.image_to_string(Imagepath)
    print(text[:-1])
tesseract()
"""
'''
import pytesseract
import cv2

font_scale = 1.5
font = cv2.FONT_HERSHEY_PLAIN

# Open the webcam
cap = cv2.VideoCapture(0)

counter = 0
while True:
    ret, frame = cap.read()
    counter += 1
    if (counter % 20) == 0:
        imgH, imgW, _ = frame.shape

        x1, y1, w1, h1 = 0, 0, imgW, imgH  # Corrected the order of dimensions

        imgchar = pytesseract.image_to_string(frame)

        imgboxes = pytesseract.image_to_boxes(frame)

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

cap.release()
cv2.destroyAllWindows()
'''

import cv2
import pytesseract

def preprocess_image(frame):
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to enhance text visibility
    _, thresholded = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

    # Optional: Apply additional image preprocessing steps as needed

    return thresholded

def recognize_text(frame):
    # Use Tesseract OCR for printed and handwritten text recognition
    text = pytesseract.image_to_string(frame, config='--psm 6')

    return text

# Open the webcam
cap = cv2.VideoCapture(0)

counter = 0
while True:
    # Read a frame from the webcam
    ret, frame = cap.read()

    # Check if the frame is successfully captured
    if not ret:
        print("Failed to capture frame")
        break

    # Increment counter
    counter += 1

    # Save the frame as an image
    image_filename = f'serviceCam/img/detected_text_image_{counter}.jpg'
    cv2.imwrite(image_filename, frame)

    # Preprocess the frame
    preprocessed_frame = preprocess_image(frame)

    # Recognize text using Tesseract
    detected_text = recognize_text(preprocessed_frame)

    # Print recognized text to the terminal
    print("Detected Text:")
    print(detected_text)

    # Display the frame with recognized text
    cv2.imshow('Text Recognition from Webcam', frame)

    # Check if text is detected, and if so, break out of the loop
    if detected_text.strip():
        print("Text detected. Stopping recording.")
        break

    # Check for key press (press 'q' to exit)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
