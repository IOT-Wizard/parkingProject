from flask import request, jsonify

# Assuming 'cursor' and 'mydb' are defined earlier

@app.route("/historique/<string: idCard>", methods=["POST"])
def historique(card_id):
    # Check if the card_id exists in the history table
    check_query = "SELECT car_id , end_date FROM subscription WHERE idCard= %s"
    cursor.execute(check_query, (idCard,))
    car = cursor.fetchone()

    if car:
        car_data={
            "car_id":  car[0],
             "end_date":car[1],
        }
    insert_query  =" INSERT INTO parking_history (car_id, event) VALUES (%s ,%s)"
    cursor.execute(insert_query, (car[0], "enter"))
    mydb.commit()            
