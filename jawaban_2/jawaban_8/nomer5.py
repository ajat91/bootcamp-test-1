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
    cursor.execute('SELECT "Region",COUNT(*) AS "TotalCountry" FROM bootcamp_test_ajat group by "Region","Country" LIMIT 10')
    data = cursor.fetchall()
    cursor.close()

    column_names = ['Region', 'TotalCountry']

    df = pd.DataFrame(data, columns=column_names)
    print(df)

except (Exception, psycopg2.DatabaseError) as error:
    print(error)
    sys.exit(1) 
print("Connection successful")