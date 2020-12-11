import psycopg2
import pandas as pd
import sys

connection_info = {
    "host"      : "206.189.80.195",
    "database"  : "bootcamp",
    "user"      : "bootcamp",
    "password"  : "Bootcamp*123"
}
conn = None

try:
    print('Connecting to the PostgreSQL database...')
    conn = psycopg2.connect(**connection_info)

    cursor = conn.cursor()
    cursor.execute('SELECT "Country", "Year", max("AvgTemperature") AS "maxTemp", min("AvgTemperature") AS "minTemp"FROM bootcamp_test_ajat WHERE "Country" IN (\'Canada\',\'Malaysia\',\'Turkey\') AND "Year"=\'1997\' GROUP BY "Country","Year"')
    data = cursor.fetchall()
    cursor.close()

    column_names = ['Country', 'Year', 'MaxTemp', 'MinTemp']

    df = pd.DataFrame(data, columns=column_names)
    print(df)

except (Exception, psycopg2.DatabaseError) as error:
    print(error)
    sys.exit(1) 
print("Connection successful")