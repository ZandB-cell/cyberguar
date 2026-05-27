import requests
import json
import time
import random
from firebase_config import FIREBASE_CONFIG

API_KEY = FIREBASE_CONFIG['apiKey']
DB_URL = FIREBASE_CONFIG['databaseURL']

# Auth REST API endpoints
SIGN_UP_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}"
SIGN_IN_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"

first_names = [
    "Алмас", "Аружан", "Бекзат", "Динара", "Ерлан", "Айгерім", "Нұрлан", "Мәдина", "Дархан", "Жазира",
    "Азамат", "Гүлназ", "Руслан", "Сәбина", "Олжас", "Айбек", "Айдана", "Мұрат", "Зарина", "Тимур",
    "Бауыржан", "Жұлдыз", "Данияр", "Ақерке", "Мадияр", "Тоғжан", "Ерасыл", "Диана", "Темірлан", "Мөлдір",
    "Санжар", "Гүлсезім", "Асылжан", "Жанель", "Арман", "Айым", "Нұрсұлтан", "Камила", "Рүстем", "Дильназ"
]
last_names = [
    "Серіков", "Болатқызы", "Нұрланұлы", "Асқарқызы", "Қанатұлы", "Мұратқызы", "Жақыпов", "Омарова", "Талғатұлы", "Смағұлова",
    "Ермеков", "Ахметова", "Әлиев", "Маратқызы", "Ибраев", "Сүлейменов", "Қайратқызы", "Темірханов", "Исаева", "Бекболатов",
    "Нұрмаханов", "Әбдірахманова", "Қасымов", "Сәдуақасова", "Жұмабаев", "Нұрғалиева", "Бекболатұлы", "Мұхтарова", "Төлегенов", "Серікбаева",
    "Кәрімов", "Асқарова", "Сейдахметов", "Әлібекова", "Мұстафин", "Жақсылықова", "Бақытжанов", "Сұлтанбекова", "Ибрагимов", "Әлімжанова"
]
emails = [
    "almas", "aruzhan", "bekzat", "dinara", "yerlan", "aigerim", "nurlan", "madina", "darkhan", "zhazira",
    "azamat", "gulnaz", "ruslan", "sabina", "olzhas", "aibek", "aidana", "murat", "zarina", "timur",
    "bauyrzhan", "zhuldyz", "daniyar", "akerke", "madiyar", "togzhan", "erasyl", "diana", "temirlan", "moldir",
    "sanzhar", "gulsezim", "asylzhan", "zhanel", "arman", "aiym", "nursultan", "kamila", "rustem", "dilnaz"
]

students = []
for i in range(40):
    fn = first_names[i]
    ln = last_names[i]
    email_prefix = emails[i]
    students.append({
        "email": f"{email_prefix}@kz.kz",
        "password": "password123",
        "name": f"{fn} {ln}"
    })

# Load dynamic lectures from lectures.json
try:
    with open('data/lectures.json', 'r', encoding='utf-8') as f:
        dynamic_lectures = json.load(f)
except Exception:
    dynamic_lectures = []

print(f"Loaded {len(dynamic_lectures)} dynamic lectures from lectures.json")

print("--- STARTING DATABASE SEEDING ---")

for s in students:
    email = s["email"]
    password = s["password"]
    name = s["name"]
    
    # 1. Try to sign up the user
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    
    res = requests.post(SIGN_UP_URL, json=payload)
    data = res.json()
    
    uid = None
    id_token = None
    
    if "error" in data and data["error"]["message"] == "EMAIL_EXISTS":
        # If user exists, sign in
        res_signin = requests.post(SIGN_IN_URL, json=payload)
        data_signin = res_signin.json()
        if "localId" in data_signin:
            uid = data_signin["localId"]
            id_token = data_signin["idToken"]
            print(f"[OK] User {email} already exists, signed in.")
        else:
            print(f"[ERROR] Sign in failed for {email}: {data_signin}")
            continue
    elif "localId" in data:
        uid = data["localId"]
        id_token = data["idToken"]
        print(f"[OK] NEW User {email} created.")
    else:
        print(f"[ERROR] Sign up failed for {email}: {data}")
        continue

    # 2. Add profile data and display_name
    profile_url = f"{DB_URL}/users/{uid}/profile.json?auth={id_token}"
    requests.put(profile_url, json={"name": name, "email": email, "role": "student"})
    
    display_name_url = f"{DB_URL}/users/{uid}/display_name.json?auth={id_token}"
    requests.put(display_name_url, json=name)
    
    # 3. Add dynamic quiz results (for ALL lectures)
    quiz_results_url = f"{DB_URL}/users/{uid}/quizResults.json?auth={id_token}"
    num_quizzes = len(dynamic_lectures) if dynamic_lectures else 0
    quizzes_data = {}
    if dynamic_lectures:
        for lec in dynamic_lectures:
            score = random.choice([60, 80, 100])
            correct = int(10 * (score / 100))
            lec_key = lec["key"]
            quizzes_data[f"module_{lec_key}"] = {
                "moduleId": lec_key,
                "percent": score,
                "correct": correct,
                "total": 10,
                "completedAt": int(time.time() * 1000) - random.randint(10000, 500000),
                "dateStr": time.strftime("%d.%m.%Y")
            }
    requests.put(quiz_results_url, json=quizzes_data)
    
    # 4. Add dynamic viewed lectures (for ALL lectures)
    lectures_url = f"{DB_URL}/users/{uid}/lectures.json?auth={id_token}"
    num_lecs = len(dynamic_lectures) if dynamic_lectures else 0
    lecs_data = {}
    if dynamic_lectures:
        for l in dynamic_lectures:
            lec_key = l["key"]
            lecs_data[f"viewed_{lec_key}"] = {
                "title": l.get("title_kk", ""),
                "viewedAt": int(time.time() * 1000) - random.randint(1000, 100000)
            }
    requests.put(lectures_url, json=lecs_data)
    
    print(f"   - Tests completed: {num_quizzes}")
    print(f"   - Lectures viewed: {num_lecs}")

print("\n--- ALL DATA SEEDED SUCCESSFULLY! ---")
