import sqlite3

connection = sqlite3.connect("fast_food.db")

cursor = connection.cursor()

tables = cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")

for table in tables.fetchall():
    cursor.execute("ALTER TABLE " + table[0] + " RENAME COLUMN charbs to carbs")
    connection.commit()