import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL,
    output TEXT NOT NULL
)
''')

conn.commit()
conn.close()