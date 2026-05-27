from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
import os
import json
import requests
import time
import joblib
from firebase_config import FIREBASE_CONFIG
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from openai import OpenAI

# Only this email can manage (add/delete) lectures and videos
ADMIN_EMAIL = "zhom05025@gmail.com"

# OpenAI API key used for all AI operations in the scenario section and quiz generation.
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "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")

app = Flask(__name__)

# Fixed secret key for development consistency (persists sessions across auto-restarts)
app.secret_key = "cybersecurity_super_secret_key_1337!_secure_and_robust"

@app.context_processor
def inject_firebase_config():
    """Injects the Firebase config dictionary into all templates as a JSON string."""
    return dict(firebase_config_json=json.dumps(FIREBASE_CONFIG))

@app.route("/")
def index():
    """Landing Page (Home). Redirect to lectures if already logged in."""
    if "user" in session:
        return redirect(url_for("lectures"))
    return render_template("index.html")

@app.route("/login")
def login():
    """Login Page. Redirects to /lectures if session is already active."""
    if "user" in session:
        return redirect(url_for("lectures"))
    return render_template("login.html")

@app.route("/register")
def register():
    """Registration Page. Redirects to /lectures if session is already active."""
    if "user" in session:
        return redirect(url_for("lectures"))
    return render_template("register.html")

@app.route("/student")
def student():
    """Legacy redirect to lectures dashboard."""
    return redirect(url_for("lectures"))

@app.route("/lectures")
def lectures():
    """Protected Lectures & Test Dashboard. Accessible only if 'user' is in session."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз / Пожалуйста, войдите, чтобы получить доступ к этой странице.", "danger")
        return redirect(url_for("login"))
    
    return render_template(
        "student.html",
        user_email=session["user"],
        user_uid=session.get("uid"),
        display_name=session.get("display_name", session["user"]),
        is_admin=(session["user"] == ADMIN_EMAIL)
    )

@app.route("/videos")
def videos():
    """Protected Video Lessons Page. Accessible only if 'user' is in session."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз.", "danger")
        return redirect(url_for("login"))
    return render_template("videos.html", is_admin=(session["user"] == ADMIN_EMAIL))

@app.route("/scenario")
def scenario():
    """Protected AI Cyber Incident / Scenario Chat Page. Accessible only if 'user' is in session."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз.", "danger")
        return redirect(url_for("login"))
    return render_template("scenario.html")

@app.route("/ml-lab")
def ml_lab():
    """Protected Machine Learning Laboratory Page. Accessible only if 'user' is in session."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз.", "danger")
        return redirect(url_for("login"))
    return render_template("ml_lab.html")

@app.route("/feedback")
def feedback():
    """Protected Feedback & Complaints Page. Accessible only if 'user' is in session."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз.", "danger")
        return redirect(url_for("login"))
    return render_template("feedback.html")

@app.route("/api/save-feedback", methods=["POST"])
def save_feedback():
    """Save user feedback/complaints to local JSON file."""
    if 'user' not in session:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    
    data = request.get_json() or {}
    subject = data.get('subject', 'Тақырыпсыз')
    message = data.get('message', '')
    rating = data.get('rating', 5)
    user_name = data.get('user_name', session.get('user', 'Белгісіз қолданушы'))
    
    if not message:
        return jsonify({'success': False, 'message': 'Хабарлама бос болмауы керек'}), 400
        
    feedback_entry = {
        'key': str(uuid.uuid4()),
        'user_name': user_name,
        'subject': subject,
        'message': message,
        'rating': rating,
        'timestamp': int(time.time())
    }
    
    try:
        feedbacks = _read_json(FEEDBACK_FILE)
        if not isinstance(feedbacks, list):
            feedbacks = []
        feedbacks.append(feedback_entry)
        _write_json(FEEDBACK_FILE, feedbacks)
    except Exception as e:
        print("Save feedback error:", e)
        return jsonify({'success': False, 'message': 'Сервер қателігі'}), 500
            
    return jsonify({'success': True, 'message': 'Feedback sent successfully'})

@app.route("/api/admin/get-feedback", methods=["GET"])
def get_feedback():
    """Admin: Get all feedback."""
    err = _require_admin()
    if err: return err
    return jsonify(_read_json(FEEDBACK_FILE))

@app.route("/api/admin/delete-feedback/<key>", methods=["DELETE"])
def delete_feedback(key):
    """Admin: Delete a feedback entry."""
    err = _require_admin()
    if err: return err
    
    feedbacks = _read_json(FEEDBACK_FILE)
    updated = [f for f in feedbacks if f.get('key') != key]
    _write_json(FEEDBACK_FILE, updated)
    return jsonify({'success': True})

@app.route("/mistakes")
def mistakes():
    """Render mistakes review page. Data is loaded from sessionStorage by the client."""
    if "user" not in session:
        flash("Бұл бетке кіру үшін алдымен жүйеге кіріңіз.", "danger")
        return redirect(url_for("login"))
    return render_template("mistakes.html")

@app.route("/api/login-session", methods=["POST"])
def login_session():
    """API endpoint to create a Flask session upon successful Firebase frontend login."""
    data = request.get_json()
    if not data or "email" not in data or "uid" not in data:
        return jsonify({"success": False, "message": "Invalid request payload"}), 400
    
    session["user"] = data["email"]
    session["uid"] = data["uid"]
    raw_name = data.get("display_name", data["email"])
    # If no real display name was provided, use the part of the email before @
    if "@" in raw_name:
        raw_name = raw_name.split("@")[0]
    session["display_name"] = raw_name
    session.permanent = True  # session persists based on configuration
    
    return jsonify({"success": True, "message": "Session created successfully"})

@app.route("/api/logout-session", methods=["POST"])
def logout_session():
    """API endpoint to clear Flask session upon logout."""
    session.clear()
    return jsonify({"success": True, "message": "Session cleared successfully"})

@app.route('/api/scenario-chat', methods=['POST'])
def scenario_chat():
    payload = request.get_json() or {}
    action = payload.get('action')
    level = payload.get('level', 'easy')
    user_message = payload.get('userMessage', '')
    conversation = payload.get('conversation', [])

    if action not in ('new', 'reply'):
        return jsonify({'success': False, 'message': 'Invalid action'}), 400

    system_prompt = (
        'Сіз киберқауіпсіздік бойынша тәжірибелі виртуалды тренер және жаттықтырушысыз. '
        'Бұл бөлімде сіз студентке фишингтік және спам хабарламалардан қалай сақтану керек екенін үйретесіз. '
        'Алғашқы хабарлама банк, төлем жүйесі немесе жеке ақпаратты сұраған спам ретінде қысқа және сенімді болуы керек. '
        'Студент жауап бергеннен кейін, студенттің күмәнді әрекеттерін көрсету үшін нақты талдау және келесі ұсыныс беруіңіз қажет. '
        'Сіздің мақсатыңыз — студентті әлеуметтік инженерлік шабуылдарды, фишингті және спамды дәл анықтауға үйрету.'
    )

    if action == 'new':
        user_prompt = (
            f'Деңгей: {level}. Студентке бірінші рет банктен немесе спамнан келгендей хабарлама жасаңыз. '
            'Мәтін нақты адамнан келгендей, уақытқа шектелген немесе шұғыл әрекетке шақыратын элементпен болсын. '
            'Хабарламаның соңында студенттің өз жауабын жазуы үшін қысқа сұрақ қойыңыз.'
        )
        messages = [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt}
        ]
    else:
        if not user_message:
            return jsonify({'success': False, 'message': 'User message is required for reply.'}), 400
        messages = [
            {'role': 'system', 'content': system_prompt}
        ]
        if isinstance(conversation, list):
            for item in conversation:
                if item.get('role') in ('user', 'assistant') and 'content' in item:
                    messages.append({'role': item['role'], 'content': item['content']})
        messages.append({'role': 'user', 'content': user_message})

    openai_url = 'https://api.openai.com/v1/chat/completions'
    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json'
    }
    body = {
        'model': 'gpt-3.5-turbo',
        'messages': messages,
        'temperature': 0.8,
        'max_tokens': 500
    }

    try:
        response = requests.post(openai_url, headers=headers, json=body, timeout=20)
        response.raise_for_status()
    except requests.RequestException as exc:
        return jsonify({'success': False, 'message': 'AI service error', 'details': str(exc)}), 502

    result = response.json()
    ai_text = ''
    try:
        ai_text = result['choices'][0]['message']['content'].strip()
    except (KeyError, IndexError, TypeError):
        return jsonify({'success': False, 'message': 'Invalid AI response'}), 502

    return jsonify({'success': True, 'message': ai_text})

@app.route('/api/save-stats', methods=['POST'])
def save_stats():
    """Save student stats to Firebase Realtime Database."""
    if 'user' not in session or 'uid' not in session:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    
    data = request.get_json() or {}
    tests_completed = data.get('testsCompleted', 0)
    xp = data.get('xp', 0)
    
    uid = session['uid']
    firebase_db_url = FIREBASE_CONFIG.get('databaseURL', '').rstrip('/')
    
    if not firebase_db_url:
        return jsonify({'success': False, 'message': 'Firebase config error'}), 500
    
    # Write to Firebase at /users/{uid}/stats
    endpoint = f'{firebase_db_url}/users/{uid}/stats.json'
    payload = {
        'testsCompleted': tests_completed,
        'xp': xp,
        'lastUpdated': int(time.time())
    }
    
    try:
        response = requests.put(endpoint, json=payload, timeout=10)
        response.raise_for_status()
        return jsonify({'success': True, 'message': 'Stats saved successfully'})
    except requests.RequestException as exc:
        return jsonify({'success': False, 'message': 'Database error', 'details': str(exc)}), 502

@app.route('/api/get-stats', methods=['GET'])
def get_stats():
    """Retrieve student stats from Firebase Realtime Database."""
    if 'user' not in session or 'uid' not in session:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    
    uid = session['uid']
    firebase_db_url = FIREBASE_CONFIG.get('databaseURL', '').rstrip('/')
    
    if not firebase_db_url:
        return jsonify({'success': False, 'message': 'Firebase config error'}), 500
    
    # Read from Firebase at /users/{uid}/stats
    endpoint = f'{firebase_db_url}/users/{uid}/stats.json'
    
    try:
        response = requests.get(endpoint, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if data is None:
            return jsonify({'testsCompleted': 0, 'xp': 0})
        
        return jsonify({
            'testsCompleted': data.get('testsCompleted', 0),
            'xp': data.get('xp', 0)
        })
    except requests.RequestException as exc:
        return jsonify({'success': False, 'message': 'Database error', 'details': str(exc)}), 502

@app.route('/api/get-lectures', methods=['GET'])
def get_lectures():
    """Retrieve student's lectures from Firebase."""
    if 'user' not in session or 'uid' not in session:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    
    uid = session['uid']
    firebase_db_url = FIREBASE_CONFIG.get('databaseURL', '').rstrip('/')
    
    if not firebase_db_url:
        return jsonify({'success': False, 'message': 'Firebase config error'}), 500
    
    endpoint = f'{firebase_db_url}/users/{uid}/lectures.json'
    
    try:
        response = requests.get(endpoint, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if data is None or not isinstance(data, dict):
            return jsonify([])
        
        # Convert Firebase object to array
        lectures = []
        for key, value in data.items():
            if isinstance(value, dict):
                value['firebaseKey'] = key
                lectures.append(value)
        
        return jsonify(lectures)
    except requests.RequestException as exc:
        return jsonify({'success': False, 'message': 'Database error', 'details': str(exc)}), 502

@app.route('/api/save-lectures', methods=['POST'])
def save_lectures():
    """Save lectures to Firebase for current student."""
    if 'user' not in session or 'uid' not in session:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    
    data = request.get_json() or {}
    lectures = data.get('lectures', [])
    
    uid = session['uid']
    firebase_db_url = FIREBASE_CONFIG.get('databaseURL', '').rstrip('/')
    
    if not firebase_db_url:
        return jsonify({'success': False, 'message': 'Firebase config error'}), 500
    
    endpoint = f'{firebase_db_url}/users/{uid}/lectures.json'
    
    try:
        response = requests.put(endpoint, json=lectures, timeout=10)
        response.raise_for_status()
        return jsonify({'success': True, 'message': 'Lectures saved successfully'})
    except requests.RequestException as exc:
        return jsonify({'success': False, 'message': 'Database error', 'details': str(exc)}), 502

@app.route("/logout")
def logout():
    """Standard logout route. Clears Flask session and redirects to Home."""
    session.clear()
    flash("Жүйеден сәтті шықтыңыз / Вы успешно вышли из системы.", "success")
    return redirect(url_for("index"))


# =========================================================
# ADMIN-ONLY: LECTURE & VIDEO MANAGEMENT (LOCAL JSON FILES)
# =========================================================

import uuid

DATA_DIR       = os.path.join(os.path.dirname(__file__), 'data')
LECTURES_FILE  = os.path.join(DATA_DIR, 'lectures.json')
VIDEOS_FILE    = os.path.join(DATA_DIR, 'videos.json')
QUIZZES_FILE   = os.path.join(DATA_DIR, 'quizzes.json')
FEEDBACK_FILE  = os.path.join(DATA_DIR, 'feedback.json')

def _ensure_data_dir():
    """Make sure the data/ directory and JSON files exist."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(LECTURES_FILE):
        with open(LECTURES_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
    if not os.path.exists(VIDEOS_FILE):
        with open(VIDEOS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
    if not os.path.exists(QUIZZES_FILE):
        with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
            json.dump({}, f) # dict mapping lecture_key -> quiz_data
    if not os.path.exists(FEEDBACK_FILE):
        with open(FEEDBACK_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)

def _read_json(path):
    _ensure_data_dir()
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []

def _write_json(path, data):
    _ensure_data_dir()
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def _require_admin():
    """Returns error JSON if current session is not admin, else None."""
    if 'user' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    if session['user'] != ADMIN_EMAIL:
        return jsonify({'success': False, 'message': 'Admin access required'}), 403
    return None


# ── LECTURES ──────────────────────────────────────────────

@app.route('/api/get-all-lectures', methods=['GET'])
def get_all_lectures():
    """Retrieve all lectures (local JSON file). Available to all logged-in users."""
    if 'user' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    return jsonify(_read_json(LECTURES_FILE))


@app.route('/api/admin/add-lecture', methods=['POST'])
def admin_add_lecture():
    """Admin: Add a new lecture to local JSON file."""
    err = _require_admin()
    if err: return err

    data     = request.get_json() or {}
    title_kk = data.get('title_kk', '').strip()
    body_kk  = data.get('body_kk', '').strip()

    if not title_kk:
        return jsonify({'success': False, 'message': 'Title is required'}), 400

    lectures = _read_json(LECTURES_FILE)
    new_lec  = {
        'key':      str(uuid.uuid4()),
        'title_kk': title_kk,
        'body_kk':  body_kk,
        'createdAt': int(time.time())
    }
    lectures.append(new_lec)
    _write_json(LECTURES_FILE, lectures)
    return jsonify({'success': True, 'key': new_lec['key']})


@app.route('/api/admin/delete-lecture/<key>', methods=['DELETE'])
def admin_delete_lecture(key):
    """Admin: Delete a lecture from local JSON file by its key."""
    err = _require_admin()
    if err: return err

    lectures = _read_json(LECTURES_FILE)
    updated  = [l for l in lectures if l.get('key') != key]
    if len(updated) == len(lectures):
        return jsonify({'success': False, 'message': 'Lecture not found'}), 404
    _write_json(LECTURES_FILE, updated)
    return jsonify({'success': True})


# ── VIDEOS ───────────────────────────────────────────────

@app.route('/api/get-all-videos', methods=['GET'])
def get_all_videos():
    """Retrieve all videos (local JSON file). Available to all logged-in users."""
    if 'user' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    return jsonify(_read_json(VIDEOS_FILE))


@app.route('/api/admin/add-video', methods=['POST'])
def admin_add_video():
    """Admin: Add a new video to local JSON file."""
    err = _require_admin()
    if err: return err

    data     = request.get_json() or {}
    title    = data.get('title', '').strip()
    category = data.get('category', '').strip()
    url      = data.get('url', '').strip()

    if not title or not url:
        return jsonify({'success': False, 'message': 'Title and URL are required'}), 400

    videos  = _read_json(VIDEOS_FILE)
    new_vid = {
        'key':       str(uuid.uuid4()),
        'title':     title,
        'category':  category or 'Өзге',
        'url':       url,
        'createdAt': int(time.time())
    }
    videos.append(new_vid)
    _write_json(VIDEOS_FILE, videos)
    return jsonify({'success': True, 'key': new_vid['key']})


@app.route('/api/admin/delete-video/<key>', methods=['DELETE'])
def admin_delete_video(key):
    """Admin: Delete a video from local JSON file by its key."""
    err = _require_admin()
    if err: return err

    videos  = _read_json(VIDEOS_FILE)
    updated = [v for v in videos if v.get('key') != key]
    if len(updated) == len(videos):
        return jsonify({'success': False, 'message': 'Video not found'}), 404
    _write_json(VIDEOS_FILE, updated)
    return jsonify({'success': True})

# ── QUIZZES & AI ───────────────────────────────────────────────

@app.route('/api/get-all-quizzes', methods=['GET'])
def get_all_quizzes():
    """Retrieve all quizzes linked to lectures."""
    if 'user' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    return jsonify(_read_json(QUIZZES_FILE))

@app.route('/api/admin/generate-quiz', methods=['POST'])
def admin_generate_quiz():
    """Admin: Generate a quiz using OpenAI and save it to quizzes.json."""
    err = _require_admin()
    if err: return err

    data = request.get_json() or {}
    lecture_key = data.get('lecture_key')
    lecture_text = data.get('lecture_text')

    if not lecture_key or not lecture_text:
        return jsonify({'success': False, 'message': 'lecture_key and lecture_text are required'}), 400

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        prompt = f"""
You are an expert in cybersecurity and education. Based on the following lecture text, generate a quiz with exactly 10 multiple-choice questions.
The language of the questions and answers must be in Kazakh. Ensure the questions are clear, unambiguous, and accurately written in Kazakh.

CRITICAL INSTRUCTION: The correct answers MUST be randomly and evenly distributed across all 4 options (index 0, 1, 2, or 3). Do NOT favor any option index. Make sure different questions have different correct answer options.

Lecture text:
{lecture_text}

Return ONLY a raw JSON object (no markdown, no backticks, just the braces) with this exact structure:
{{
    "title": "Quiz title (short)",
    "questions": [
        {{
            "q": "Question text in Kazakh",
            "opts": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "ans": 2, // MUST BE 0, 1, 2, or 3, randomly distributed
            "explanation": "Detailed explanation of why this answer is correct and others are wrong (in Kazakh)"
        }}
    ]
}}
"""
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        
        raw_content = response.choices[0].message.content.strip()
        if raw_content.startswith('```json'):
            raw_content = raw_content[7:-3].strip()
        elif raw_content.startswith('```'):
            raw_content = raw_content[3:-3].strip()
            
        quiz_data = json.loads(raw_content)

        # Shuffle options of each question to mathematically guarantee 100% random distribution of correct answers
        import random
        for q in quiz_data.get('questions', []):
            opts = q.get('opts', [])
            ans = q.get('ans', 0)
            if len(opts) > 0 and 0 <= ans < len(opts):
                indexed_opts = list(enumerate(opts))
                random.shuffle(indexed_opts)
                q['opts'] = [item[1] for item in indexed_opts]
                for new_idx, item in enumerate(indexed_opts):
                    if item[0] == ans:
                        q['ans'] = new_idx
                        break

        # Save to quizzes.json
        quizzes = _read_json(QUIZZES_FILE)
        if isinstance(quizzes, list): # Migrate from old logic if needed
            quizzes = {}
        quizzes[lecture_key] = quiz_data
        _write_json(QUIZZES_FILE, quizzes)

        return jsonify({'success': True, 'quiz': quiz_data})

    except Exception as e:
        print("OpenAI Error:", e)
        return jsonify({'success': False, 'message': str(e)}), 500
# ── MACHINE LEARNING ENDPOINTS ───────────────────────────────────────────────

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
spam_model = None
phish_model = None

def get_spam_model():
    global spam_model
    if spam_model is None:
        model_path = os.path.join(MODELS_DIR, 'spam_pipeline.pkl')
        print(f"[ML INFO] Loading spam model from: {model_path}")
        print(f"[ML INFO] Spam model file exists: {os.path.exists(model_path)}")
        if os.path.exists(model_path):
            try:
                spam_model = joblib.load(model_path)
                print("[ML SUCCESS] Spam model loaded successfully!")
            except Exception as e:
                print(f"[ML ERROR] Failed to load spam model: {e}")
        else:
            print("[ML WARNING] Spam model file not found on server!")
    return spam_model

def get_phish_model():
    global phish_model
    if phish_model is None:
        model_path = os.path.join(MODELS_DIR, 'phish_pipeline.pkl')
        print(f"[ML INFO] Loading phishing model from: {model_path}")
        print(f"[ML INFO] Phishing model file exists: {os.path.exists(model_path)}")
        if os.path.exists(model_path):
            try:
                phish_model = joblib.load(model_path)
                print("[ML SUCCESS] Phishing model loaded successfully!")
            except Exception as e:
                print(f"[ML ERROR] Failed to load phishing model: {e}")
        else:
            print("[ML WARNING] Phishing model file not found on server!")
    return phish_model

@app.route('/api/ml/predict-spam', methods=['POST'])
def predict_spam():
    data = request.get_json() or {}
    text = data.get('text', '')
    if not text:
        return jsonify({'success': False, 'message': 'Мәтін бос'})
        
    model = get_spam_model()
    if not model:
        return jsonify({'success': False, 'message': 'Модель әлі оқытылмаған (Server-side)'})
        
    try:
        prob = model.predict_proba([text])[0][1] # Probability of class 1 (spam)
        return jsonify({'success': True, 'score': round(prob * 100)})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/api/ml/predict-phish', methods=['POST'])
def predict_phish():
    data = request.get_json() or {}
    url_text = data.get('url', '')
    if not url_text:
        return jsonify({'success': False, 'message': 'URL бос'})
        
    model = get_phish_model()
    if not model:
        return jsonify({'success': False, 'message': 'Модель әлі оқытылмаған (Server-side)'})
        
    try:
        prob = model.predict_proba([url_text])[0][1] # Probability of class 1 (phishing/malicious)
        return jsonify({'success': True, 'score': round(prob * 100)})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)
