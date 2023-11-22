create_user_table = """
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user'
    )
"""

create_cars_table = """
    CREATE TABLE IF NOT EXISTS cars (
        car_id VARCHAR(50) PRIMARY KEY,
        car_owner_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_owner_id) REFERENCES users(user_id)
    )
"""
create_cars_table = """
    CREATE TABLE IF NOT EXISTS cars (
        car_id VARCHAR(50) PRIMARY KEY,
        car_owner_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_owner_id) REFERENCES users(user_id)
    )
"""


create_parking_history_table = """
    CREATE TABLE IF NOT EXISTS parking_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        car_id VARCHAR(50),
        event VARCHAR(10) CHECK (event IN ('enter', 'exit')),
        FOREIGN KEY (car_id) REFERENCES cars(car_id)
    )
"""

create_subscription_table = """
    CREATE TABLE IF NOT EXISTS subscription (
        subscription_id INT AUTO_INCREMENT PRIMARY KEY,
        car_id VARCHAR(50),
        idCard VARCHAR(122) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP,
        CONSTRAINT check_end_date_gt_start_date CHECK (end_date > created_at),
        FOREIGN KEY (car_id) REFERENCES cars(car_id)
    )
"""