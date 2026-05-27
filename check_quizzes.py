import requests
import json
from firebase_config import FIREBASE_CONFIG

API_KEY = FIREBASE_CONFIG['apiKey']
DB_URL = FIREBASE_CONFIG['databaseURL']

SIGN_IN_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
payload = {
    "email": "almas@kz.kz",
    "password": "password123",
    "returnSecureToken": True
}
res = requests.post(SIGN_IN_URL, json=payload)
data = res.json()
if 'idToken' in data:
    token = data['idToken']
    lecs = requests.get(f"{DB_URL}/lectures.json?auth={token}").json()
    quizzes = requests.get(f"{DB_URL}/quizzes.json?auth={token}").json()
    print("LECTURES:", lecs)
    print("QUIZZES:")
    for k, v in quizzes.items():
        print(f"Quiz ID: {k}, Title: {v.get('title')}")
else:
    print("Failed to sign in:", data)
