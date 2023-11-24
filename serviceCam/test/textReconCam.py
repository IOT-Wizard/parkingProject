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

        # Corrected the order of dimensions
        x1, y1, w1, h1 = 0, 0, imgW, imgH  

        # Convert the frame to grayscale for better text detection
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Perform adaptive thresholding to binarize the image
        _, thresh = cv2.threshold(gray_frame, 150, 255, cv2.THRESH_BINARY)

        # Use the binarized image for text extraction
        imgchar = pytesseract.image_to_string(thresh)

        # Use the binarized image for box detection
        imgboxes = pytesseract.image_to_boxes(thresh)

        for boxes in imgboxes.splitlines():
            boxes = boxes.split(' ')
            x, y, w, h = int(boxes[1]), int(boxes[2]), int(boxes[3]), int(boxes[4])
            # Change the color parameter to None or another color (e.g., (255, 255, 255) for white)
            cv2.rectangle(frame, (x, imgH - y), (w, imgH - h), None, 3)

        cv2.putText(frame, imgchar, (x1 + int(w1 / 50), y1 + int(h1 / 50)), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

        cv2.imshow('Text Detection Tutorial', frame)

        # Print detected text to the console
        print("Detected Text:")
        print(imgchar)


        if cv2.waitKey(2) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
