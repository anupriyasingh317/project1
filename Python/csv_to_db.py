import pandas as pd
import sqlite3

# Function to initialize the database
def init_db():
    conn = sqlite3.connect('connections.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS connections (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      Applicant_Name TEXT,
                      Gender TEXT,
                      District TEXT,
                      State TEXT,
                      Pincode INTEGER,
                      Ownership TEXT,
                      GovtID_Type TEXT,
                      ID_Number TEXT,
                      Category TEXT,
                      Load_Applied INTEGER,
                      Date_of_Application TEXT,
                      Date_of_Approval TEXT,
                      Modified_Date TEXT,
                      Status TEXT,
                      Reviewer_ID TEXT,
                      Reviewer_Name TEXT,
                      Reviewer_Comments TEXT
                      )''')
    conn.commit()
    conn.close()

def insert_data_from_csv():
    # Read the CSV file using pandas
    df = pd.read_csv('connections_data.csv')

    # Convert the DataFrame to a list of dictionaries (each dictionary represents a row)
    records = df.to_dict('records')

    # Insert the data into the SQLite database
    conn = sqlite3.connect('connections.db')
    cursor = conn.cursor()
    for record in records:
        cursor.execute('''INSERT INTO connections (Applicant_Name, Gender, District, State, Pincode, Ownership, GovtID_Type,
                          ID_Number, Category, Load_Applied, Date_of_Application, Date_of_Approval, Modified_Date, Status,
                          Reviewer_ID, Reviewer_Name, Reviewer_Comments)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                       (record['Applicant_Name'], record['Gender'], record['District'], record['State'],
                        record['Pincode'], record['Ownership'], record['GovtID_Type'], record['ID_Number'],
                        record['Category'], record['Load_Applied (in KV)'], record['Date_of_Application'],
                        record['Date_of_Approval'], record['Modified_Date'], record['Status'],
                        record['Reviewer_ID'], record['Reviewer_Name'], record['Reviewer_Comments']))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    insert_data_from_csv()
