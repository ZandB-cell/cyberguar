import requests
from firebase_config import FIREBASE_CONFIG

DB_URL = FIREBASE_CONFIG['databaseURL']
res = requests.get(f"{DB_URL}/lectures.json")
print("LECTURES IN DB:")
print(res.json())
