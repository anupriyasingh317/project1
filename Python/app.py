import csv
from datetime import datetime
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)

# Apply CORS to the entire app with default options
CORS(app)

# Function to create a database connection
def get_db_connection():
    conn = sqlite3.connect('connections.db')
    conn.row_factory = sqlite3.Row
    return conn

# Route to get started
@app.route('/')
def get_started():
    return ("WELCOME")

# Route to get all connection records
@app.route('/connections', methods=['GET'])
def get_connections():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM connections''')
    connections = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in connections])

# Route to get a specific connection record by ID
@app.route('/connections/<int:connection_id>', methods=['GET'])
def get_connection(connection_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM connections WHERE id = ?''', (connection_id,))
    connection = cursor.fetchone()
    conn.close()
    if connection is None:
        return jsonify({"message": "Connection not found"}), 404
    return jsonify(dict(connection))

@app.route('/api/chartData', methods=['GET'])
def get_chart_data():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get query parameters from the frontend (status and month)
    status = request.args.get('status', default='all', type=str)
    month = request.args.get('month', default='all', type=str)

    # Build the SQL query
    query = 'SELECT * FROM connections'
    if status != 'all':
        query += f" WHERE status = '{status}'"
    if month != 'all':
        query += f" AND month = '{month}'"

    # Execute the SQL query and fetch the data
    cursor.execute(query)
    connections = cursor.fetchall()

    conn.close()
    return jsonify([dict(row) for row in connections])

    # status = request.args.get('status', 'all')  # Get the 'status' query parameter from the request

    # connection_counts_by_month = {}

    # with open('connections_data.csv', newline='', encoding='utf-8') as csvfile:
    #     reader = csv.DictReader(csvfile)

    #     for row in reader:
    #         if status == 'all' or row["Status"] == status:
    #             date_of_application = datetime.strptime(row["Date_of_Application"], "%d-%m-%Y")
    #             month = date_of_application.strftime("%B %Y")  # E.g., "January 2022"

    #             connection_counts_by_month[month] = connection_counts_by_month.get(month, 0) + 1

    # months = list(connection_counts_by_month.keys())
    # connection_counts = list(connection_counts_by_month.values())

    # # Return the data in JSON format
    # return jsonify({"months": months, "counts": connection_counts})

if __name__ == '__main__':
    app.run(debug=True)
