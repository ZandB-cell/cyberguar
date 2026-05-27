/**
 * CYBERSECURITY WEBSITE FRONTEND CONTROLLER (main.js)
 * Implements: i18n, Dark/Light Theme, Firebase Auth+DB,
 * Per-student Quiz System with Firebase persistence, Toast Notifications.
 */

// =============================================
// 1. DUAL-LANGUAGE DICTIONARY (KK / RU)
// =============================================
const translations = {
    kk: {
        nav_home: "Басты бет",
        nav_lectures: "Лекциялар",
        nav_videos: "Видео сабақтар",
        nav_scenario: "Кибержаядаят",
        nav_mllab: "ML лаборатория",
        nav_feedback: "Шағымдар",
        nav_login: "Кіру",
        nav_register: "Тіркелу",
        nav_logout: "Шығу",
        hero_badge: "САНДЫҚ ҚАУІПСІЗДІК ДӘУІРІ",
        hero_title_1: "Цифрлық әлеміңізді",
        hero_title_2: "сенімді қорғаңыз",
        hero_desc: "CyberShield - бұл сізді киберқауіптерден қорғауға арналған оқу порталы. Білім алыңыз, қорғаныңыз және қауіпсіз болыңыз.",
        hero_btn_start: "Бастау",
        hero_btn_login: "Кіру",
        hero_btn_dashboard: "Жұмыс үстелі",
        stat_attacks_prevented: "Шабуылдардан қорғау (%)",
        stat_active_students: "Белсенді оқушылар",
        stat_cyber_modules: "Оқу модульдері",
        stat_support_hours: "Тәулік бойы қолдау (24/7)",
        what_is_cyber_title_1: "Киберқауіпсіздік",
        what_is_cyber_title_2: "дегеніміз не?",
        what_is_cyber_p1: "Киберқауіпсіздік - бұл жүйелерді, желілерді және бағдарламаларды цифрлық шабуылдардан қорғау тәжірибесі.",
        what_is_cyber_p2: "Қазіргі қоғамда адамдарға қарағанда құрылғылар көбірек. Сондықтан, киберқауіпсіздік шараларын дұрыс іске асыру маңызды.",
        what_is_attack_title_1: "Кибершабуыл",
        what_is_attack_title_2: "дегеніміз не?",
        what_is_attack_p1: "Кибершабуыл - бұл бір немесе бірнеше компьютерлерге зиян келтіру мақсатында жасалған кез келген қасақана әрекет.",
        what_is_attack_p2: "Ең таралған кибершабуылдарға Фишинг, Зиянды бағдарламалар және DDoS жатады.",
        threats_title_1: "Ең таралған", threats_title_2: "Киберқауіптер",
        threats_subtitle: "Цифрлық кеңістікте жиі кездесетін қауіп-қатерлердің негізгі түрлері.",
        threat_phishing_title: "Фишинг (Phishing)",
        threat_phishing_desc: "Сенімді ұйымдардың атынан келетін жалған электрондық хаттар мен хабарламалар.",
        threat_malware_title: "Зиянды бағдарламалар",
        threat_malware_desc: "Компьютерге зиян келтіру үшін жасалған вирустар, бопсалаушы бағдарламалар (Ransomware).",
        threat_ddos_title: "DDoS шабуылдары",
        threat_ddos_desc: "Серверге бір уақытта миллиондаған сұраныстар жіберу арқылы оның жұмысын тоқтату.",
        tips_title_1: "Қауіпсіздікті қамтамасыз ету", tips_title_2: "кеңестері",
        tips_subtitle: "Күнделікті өмірде интернетті қауіпсіз пайдалану ережелері.",
        tip1_title: "Күрделі құпия сөздерді қолданыңыз",
        tip1_desc: "Әрбір аккаунт үшін бөлек, күрделі құпия сөз орнатыңыз.",
        tip2_title: "Екі факторлы аутентификацияны (2FA) қосыңыз",
        tip2_desc: "2FA аккаунтыңызға қосымша қауіпсіздік деңгейін қосады.",
        tip3_title: "Күмәнді сілтемелерге баспаңыз",
        tip3_desc: "Бейтаныс жіберушілерден келген күмәнді сілтемелерді ашпаңыз.",
        tip4_title: "Бағдарламалық жасақтаманы үнемі жаңартыңыз",
        tip4_desc: "Жаңартулар жүйедегі осалдықтарды жауып, қорғанысты күшейтеді.",
        form_name_label: "Аты-жөніңіз",
        form_email_label: "Электрондық пошта (Email)",
        form_password_label: "Құпия сөз",
        form_confirm_password_label: "Құпия сөзді растау",
        register_title_1: "Жаңа", register_title_2: "Аккаунт",
        register_subtitle: "Киберқауіпсіздік порталына тіркеліңіз.",
        register_btn: "Тіркелу",
        register_footer_text: "Аккаунтыңыз бар ма?",
        register_footer_link: "Жүйеге кіру",
        login_title_1: "Жүйеге", login_title_2: "Кіру",
        login_subtitle: "Порталға кіріп, оқуыңызды жалғастырыңыз.",
        login_btn: "Кіру",
        login_footer_text: "Жаңа пайдаланушысыз ба?",
        login_footer_link: "Тіркелу",
        dash_welcome_1: "Қош келдіңіз,",
        dash_subtitle: "Сіздің киберқауіпсіздік бойынша жеке оқу бөлмеңіз.",
        dash_logout_btn: "Жүйеден шығу",
        dash_modules_title: "Оқу модульдері мен тесттер",
        dash_mod_btn: "Тест тапсыру",
        dash_mod1_level: "Жеңіл", dash_mod1_title: "Киберқауіпсіздік негіздері",
        dash_mod1_desc: "CIA триадасы туралы негізгі түсінік.",
        dash_mod2_level: "Жеңіл", dash_mod2_title: "Қауіпсіз пошта және Фишинг",
        dash_mod2_desc: "Фишингтік хаттарды тану тәсілдері.",
        dash_mod3_level: "Орташа", dash_mod3_title: "Пароль менеджменті және 2FA",
        dash_mod3_desc: "Парольдерді қауіпсіз басқару және 2FA.",
        dash_mod4_level: "Қиын", dash_mod4_title: "Веб-қосымшалар қауіпсіздігі (OWASP Top 10)",
        dash_mod4_desc: "SQL Injection, XSS, CSRF — негізгі осалдықтар.",
        dash_widget_title: "Қауіпсіздік ережелері",
        dash_widget_tip1: "Жеке деректеріңізді ешқашан ешкімге жарияламаңыз.",
        dash_widget_tip2: "Қоғамдық Wi-Fi-да VPN қолданыңыз.",
        dash_widget_tip3: "Маңызды файлдардың сақтық көшірмесін жасаңыз.",
        dash_history_title: "Нәтижелер тарихы",
        dash_no_results: "Тесттер әлі тапсырылмаған.",
        stat_completed_tests: "Тапсырылған тесттер",
        stat_total_score: "Жалпы ұпай",
        stat_avg_score: "Орташа нәтиже",
        stat_rank: "Дәрежесі",
        loading_text: "Жүктелуде...",
        loading_auth: "Сәйкестендіру жүруде...",
        loading_saving: "Деректер сақталуда...",
        toast_success_reg: "Тіркелу сәтті аяқталды! Өту жүзеге асырылуда...",
        toast_success_login: "Жүйеге кіру сәтті аяқталды!",
        toast_err_empty: "Барлық өрістерді толтырыңыз!",
        toast_err_passwords_match: "Құпия сөздер сәйкес келмейді!",
        toast_err_password_len: "Құпия сөз кемінде 6 таңбадан тұруы керек!",
        toast_err_invalid_email: "Электрондық пошта пішімі қате!",
        quiz_next: "Келесі",
        quiz_retry: "Қайталау",
        quiz_finish: "Жабу",
        footer_desc: "CyberShield - заманауи киберқауіпсіздік білім беру платформасы.",
        footer_links_title: "Пайдалы сілтемелер",
        footer_contacts_title: "Байланыс",
        footer_rights: "Барлық құқықтар қорғалған.",
        footer_made_by: "Жоба Flask және Firebase негізінде жасалған",
        leaderboard_title: "Студенттер рейтингі мен белсенділігі",
        leaderboard_search_placeholder: "Студенттерді іздеу...",
        leaderboard_rank: "Орын",
        leaderboard_student: "Студент",
        leaderboard_tests: "Тапсырылған тесттер",
        leaderboard_total_score: "Жалпы ұпай",
        leaderboard_avg_score: "Орташа нәтиже",
        leaderboard_no_data: "Студенттер дерегі табылмады.",
        leaderboard_no_tests: "Тесттер тапсырылмаған"
    },
    ru: {
        nav_home: "Главная страница",
        nav_lectures: "Лекции",
        nav_videos: "Видеоуроки",
        nav_scenario: "Киберситуация",
        nav_mllab: "ML лаборатория",
        nav_feedback: "Жалобы и отзывы",
        nav_login: "Войти",
        nav_register: "Регистрация",
        nav_logout: "Выйти",
        hero_badge: "ЭПОХА ЦИФРОВОЙ БЕЗОПАСНОСТИ",
        hero_title_1: "Надежно защитите",
        hero_title_2: "ваш цифровой мир",
        hero_desc: "CyberShield - образовательный портал для защиты от киберугроз. Учитесь, защищайтесь и будьте в безопасности.",
        hero_btn_start: "Начать",
        hero_btn_login: "Войти",
        hero_btn_dashboard: "Панель управления",
        stat_attacks_prevented: "Предотвращение атак (%)",
        stat_active_students: "Активные студенты",
        stat_cyber_modules: "Учебные модули",
        stat_support_hours: "Круглосуточная поддержка (24/7)",
        what_is_cyber_title_1: "Что такое", what_is_cyber_title_2: "кибербезопасность?",
        what_is_cyber_p1: "Кибербезопасность — практика защиты систем, сетей и программ от цифровых атак.",
        what_is_cyber_p2: "В современном обществе устройств больше, чем людей. Поэтому кибербезопасность крайне важна.",
        what_is_attack_title_1: "Что такое", what_is_attack_title_2: "кибератака?",
        what_is_attack_p1: "Кибератака — любое преднамеренное действие с целью нанесения вреда компьютерам или сетям.",
        what_is_attack_p2: "Наиболее распространённые типы: фишинг, вредоносное ПО и DDoS-атаки.",
        threats_title_1: "Популярные", threats_title_2: "Киберугрозы",
        threats_subtitle: "Основные виды угроз в цифровом пространстве.",
        threat_phishing_title: "Фишинг (Phishing)",
        threat_phishing_desc: "Поддельные письма от имени доверенных организаций.",
        threat_malware_title: "Вредоносное ПО",
        threat_malware_desc: "Вирусы, программы-вымогатели (Ransomware) и шпионское ПО.",
        threat_ddos_title: "DDoS-атаки",
        threat_ddos_desc: "Миллионы запросов на сервер одновременно для остановки работы.",
        tips_title_1: "Советы по обеспечению", tips_title_2: "безопасности",
        tips_subtitle: "Простые правила для безопасного использования Интернета.",
        tip1_title: "Используйте сложные пароли",
        tip1_desc: "Создавайте уникальный сложный пароль для каждой учётной записи.",
        tip2_title: "Включите двухфакторную аутентификацию (2FA)",
        tip2_desc: "2FA добавляет дополнительный уровень защиты.",
        tip3_title: "Не нажимайте на подозрительные ссылки",
        tip3_desc: "Не открывайте ссылки от незнакомых отправителей.",
        tip4_title: "Регулярно обновляйте ПО",
        tip4_desc: "Обновления устраняют уязвимости и усиливают защиту.",
        form_name_label: "Имя и Фамилия",
        form_email_label: "Электронная почта (Email)",
        form_password_label: "Пароль",
        form_confirm_password_label: "Подтверждение пароля",
        register_title_1: "Новый", register_title_2: "Аккаунт",
        register_subtitle: "Зарегистрируйтесь на портале кибербезопасности.",
        register_btn: "Зарегистрироваться",
        register_footer_text: "Уже есть аккаунт?",
        register_footer_link: "Войти в систему",
        login_title_1: "Вход в", login_title_2: "Систему",
        login_subtitle: "Войдите, чтобы продолжить обучение.",
        login_btn: "Войти",
        login_footer_text: "Новый пользователь?",
        login_footer_link: "Зарегистрироваться",
        dash_welcome_1: "Добро пожаловать,",
        dash_subtitle: "Ваш личный кабинет обучения кибербезопасности.",
        dash_logout_btn: "Выйти из системы",
        dash_modules_title: "Учебные модули и тесты",
        dash_mod_btn: "Пройти тест",
        dash_mod1_level: "Легко", dash_mod1_title: "Основы кибербезопасности",
        dash_mod1_desc: "Базовые концепции: триада CIA.",
        dash_mod2_level: "Легко", dash_mod2_title: "Безопасная почта и фишинг",
        dash_mod2_desc: "Методы распознавания фишинговых писем.",
        dash_mod3_level: "Средне", dash_mod3_title: "Управление паролями и 2FA",
        dash_mod3_desc: "Безопасное управление паролями и 2FA.",
        dash_mod4_level: "Сложно", dash_mod4_title: "Безопасность веб-приложений (OWASP Top 10)",
        dash_mod4_desc: "SQL Injection, XSS, CSRF — основные уязвимости.",
        dash_widget_title: "Правила информационной безопасности",
        dash_widget_tip1: "Никогда не сообщайте свои личные данные посторонним.",
        dash_widget_tip2: "Используйте VPN при подключении к публичному Wi-Fi.",
        dash_widget_tip3: "Регулярно делайте резервные копии важных файлов.",
        dash_history_title: "История результатов",
        dash_no_results: "Тесты ещё не пройдены.",
        stat_completed_tests: "Пройденные тесты",
        stat_total_score: "Общий балл",
        stat_avg_score: "Средний результат",
        stat_rank: "Уровень",
        loading_text: "Загрузка...",
        loading_auth: "Проверка подлинности...",
        loading_saving: "Сохранение данных...",
        toast_success_reg: "Регистрация успешно завершена!",
        toast_success_login: "Вход выполнен успешно!",
        toast_err_empty: "Заполните все поля!",
        toast_err_passwords_match: "Пароли не совпадают!",
        toast_err_password_len: "Пароль должен быть не менее 6 символов!",
        toast_err_invalid_email: "Неверный формат электронной почты!",
        quiz_next: "Далее",
        quiz_retry: "Повторить",
        quiz_finish: "Закрыть",
        footer_desc: "CyberShield — современная образовательная платформа по кибербезопасности.",
        footer_links_title: "Полезные ссылки",
        footer_contacts_title: "Контакты",
        footer_rights: "Все права защищены.",
        footer_made_by: "Проект создан на основе Flask и Firebase",
        leaderboard_title: "Рейтинг и активность студентов",
        leaderboard_search_placeholder: "Поиск студентов...",
        leaderboard_rank: "Место",
        leaderboard_student: "Студент",
        leaderboard_tests: "Пройденные тесты",
        leaderboard_total_score: "Общий балл",
        leaderboard_avg_score: "Средний результат",
        leaderboard_no_data: "Данные студентов не найдены.",
        leaderboard_no_tests: "Тесты не пройдены"
    }
};

// =============================================
// 2. QUIZ DATA (LEGACY REMOVED)
// =============================================
const quizData = {};
const moduleNames = { kk: {}, ru: {} };

// =============================================
// 3. FIREBASE INITIALIZATION
// =============================================
let authInstance = null;
let databaseInstance = null;

try {
    if (typeof firebase !== 'undefined' && firebaseConfig) {
        firebase.initializeApp(firebaseConfig);
        authInstance = firebase.auth();
        databaseInstance = firebase.database();
        console.log("Firebase initialized.");
    }
} catch (e) {
    console.error("Firebase init error:", e);
}

// =============================================
// 4. TOAST ENGINE
// =============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'danger') icon = 'fa-triangle-exclamation';
    if (type === 'warning') icon = 'fa-circle-exclamation';
    toast.innerHTML = `
        <span class="toast-icon"><i class="fa-solid ${icon}"></i></span>
        <span class="toast-text">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// =============================================
// 5. PASSWORD TOGGLE
// =============================================
function togglePasswordVisibility(fieldId, iconEl) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        iconEl.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        input.type = 'password';
        iconEl.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
}

// =============================================
// 6. QUIZ STATE & SYSTEM
// =============================================
let activeModuleId = null;
let activeQuestions = [];
let currentQIndex = 0;
let selectedAnswer = null;
let quizScores = {};  // local cache of this session's results
let _quizCorrectCount = 0;
let _quizMistakes = [];
let userQuizResults = {}; // Global cache of all quiz results for the student

function openQuiz(moduleId) {
    _quizCorrectCount = 0;
    _quizMistakes = [];
    const lang = localStorage.getItem('lang') || 'kk';

    // Only check dynamic quizzes (no hardcoded fallback)
    let moduleData = dynamicQuizzes[moduleId];

    if (!moduleData) return;

    // Check if the user has already completed this quiz
    if (userQuizResults && (userQuizResults[`module_${moduleId}`] || userQuizResults[moduleId])) {
        showToast(lang === 'ru' ? 'Вы уже сдали этот тест!' : 'Сіз бұл тестті тапсырып қойғансыз!', 'warning');
        return;
    }

    activeModuleId = moduleId;
    activeQuestions = moduleData.questions;
    currentQIndex = 0;
    selectedAnswer = null;

    // Set header
    document.getElementById('quizModuleTitle').textContent = moduleData.title;
    document.getElementById('quizTotalQ').textContent = activeQuestions.length;

    // Show overlay, hide result
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizBody').style.display = 'flex';
    document.getElementById('quizNav').style.display = 'flex';
    document.getElementById('quizOverlay').classList.add('active');

    renderQuestion();
}

function renderQuestion() {
    const q = activeQuestions[currentQIndex];
    const total = activeQuestions.length;

    document.getElementById('quizCurrentQ').textContent = currentQIndex + 1;
    document.getElementById('quizQuestion').textContent = q.q;

    // Progress bar
    const pct = ((currentQIndex) / total) * 100;
    document.getElementById('quizProgressFill').style.width = pct + '%';

    // Options
    const letters = ['1.', '2.', '3.', '4.'];
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    q.opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'cg-quiz-option';
        btn.innerHTML = `<span class="quiz-option-letter" style="margin-right: 0.5rem; color: #2e7d32;">${letters[idx]}</span> ${opt}`;
        btn.onclick = () => selectOption(idx, btn);
        optionsContainer.appendChild(btn);
    });

    // Disable next until selected
    document.getElementById('quizNextBtn').disabled = true;

    // Update next button label
    const lang = localStorage.getItem('lang') || 'kk';
    const isLast = currentQIndex === activeQuestions.length - 1;
    document.getElementById('quizNextBtn').innerHTML = isLast
        ? `<span>${lang === 'kk' ? 'Аяқтау' : 'Завершить'}</span> <i class="fa-solid fa-flag-checkered"></i>`
        : `<span data-i18n="quiz_next">${translations[lang].quiz_next}</span> <i class="fa-solid fa-arrow-right"></i>`;
}

function selectOption(idx, btnEl) {
    // Clear selections
    document.querySelectorAll('.cg-quiz-option').forEach(b => b.classList.remove('selected'));
    btnEl.classList.add('selected');
    selectedAnswer = idx;
    document.getElementById('quizNextBtn').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null) return;

    const q = activeQuestions[currentQIndex];
    const isCorrect = selectedAnswer === q.ans;

    if (isCorrect) {
        _quizCorrectCount++;
    } else {
        const lang = localStorage.getItem('lang') || 'kk';
        _quizMistakes.push({
            question: q.q,
            selected: q.opts[selectedAnswer],
            correct: q.opts[q.ans],
            explanation: q.explanation || (lang === 'kk' ? 'Берілген сұрақтың дұрыс жауабы нұсқада көрсетілген.' : 'Правильный ответ указан в варианте.')
        });
    }

    // Highlight correct / wrong
    const optBtns = document.querySelectorAll('.cg-quiz-option');
    optBtns.forEach((btn, idx) => {
        btn.onclick = null; // disable re-selection
        if (idx === q.ans) btn.classList.add('correct');
        else if (idx === selectedAnswer && !isCorrect) btn.classList.add('wrong');
    });
    document.getElementById('quizNextBtn').disabled = true;

    // Move forward after brief pause
    setTimeout(() => {
        currentQIndex++;
        selectedAnswer = null;

        if (currentQIndex < activeQuestions.length) {
            renderQuestion();
        } else {
            finishQuiz();
        }
    }, 700);
}

function finishQuiz() {
    const lang = localStorage.getItem('lang') || 'kk';
    const correct = _quizCorrectCount;
    const total = activeQuestions.length;
    const pct = Math.round((correct / total) * 100);

    // Save to Firebase
    saveQuizResult(activeModuleId, correct, total, pct);

    // Save mistakes to sessionStorage for "mistakes.html"
    sessionStorage.setItem('lastMistakes', JSON.stringify({
        mistakes: _quizMistakes,
        total: total,
        correctCount: correct
    }));

    // Show result screen
    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('quizNav').style.display = 'none';
    document.getElementById('quizProgressFill').style.width = '100%';

    const resultEl = document.getElementById('quizResult');
    resultEl.style.display = 'flex';

    // Icon + title + score
    let icon, titleText, descText;
    if (pct >= 80) {
        icon = '🏆'; titleText = lang === 'kk' ? 'Керемет нәтиже!' : 'Отличный результат!';
        descText = lang === 'kk' ? 'Тамаша! Сіз бұл модульді жақсы меңгердіңіз.' : 'Прекрасно! Вы отлично усвоили этот модуль.';
    } else if (pct >= 60) {
        icon = '👍'; titleText = lang === 'kk' ? 'Жақсы нәтиже!' : 'Хороший результат!';
        descText = lang === 'kk' ? 'Жаман емес! Бірнеше тақырыпты қайталасаңыз жетеді.' : 'Неплохо! Повторите несколько тем.';
    } else {
        icon = '📚'; titleText = lang === 'kk' ? 'Қайталап оқыңыз' : 'Нужно повторить';
        descText = lang === 'kk' ? 'Ұайтпаңыз! Материалды қайталаңыз және тест тапсырыңыз.' : 'Не беспокойтесь! Повторите материал и попробуйте снова.';
    }

    document.getElementById('quizResultIcon').textContent = icon;
    document.getElementById('quizResultTitle').textContent = titleText;
    document.getElementById('quizScoreDisplay').textContent = `${correct}/${total} — ${pct}%`;
    document.getElementById('quizResultDesc').textContent = descText;

    const mistakesBtn = document.getElementById('quizMistakesBtn');
    if (mistakesBtn) {
        if (_quizMistakes.length > 0) {
            mistakesBtn.style.display = 'inline-block';
        } else {
            mistakesBtn.style.display = 'none';
        }
    }
}

function retryQuiz() {
    openQuiz(activeModuleId);
}

function closeQuiz() {
    document.getElementById('quizOverlay').classList.remove('active');
    // Refresh results display
    if (typeof currentUserUID !== 'undefined' && currentUserUID && databaseInstance) {
        loadUserResults(currentUserUID);
        loadLeaderboard();
    }
}


// =============================================
// 7. FIREBASE QUIZ RESULT SAVING & LOADING
// =============================================
async function saveQuizResult(moduleId, correct, total, pct) {
    if (!databaseInstance || typeof currentUserUID === 'undefined' || !currentUserUID) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('kk-KZ', { day: '2-digit', month: '2-digit', year: 'numeric' });

    try {
        await databaseInstance.ref(`users/${currentUserUID}/quizResults/module_${moduleId}`).set({
            moduleId: moduleId,
            correct: correct,
            total: total,
            percent: pct,
            completedAt: firebase.database.ServerValue.TIMESTAMP,
            dateStr: dateStr
        });
        console.log(`Quiz result saved: module ${moduleId}, score ${pct}%`);
    } catch (e) {
        console.error("Error saving quiz result:", e);
    }
}

async function loadUserResults(uid) {
    if (!databaseInstance || !uid) return;

    try {
        const snapshot = await databaseInstance.ref(`users/${uid}/quizResults`).once('value');
        const results = snapshot.val() || {};
        displayUserResults(results);
    } catch (e) {
        console.error("Error loading quiz results:", e);
    }
}

function displayUserResults(results) {
    userQuizResults = results || {};
    const lang = localStorage.getItem('lang') || 'kk';
    let completed = 0;
    let totalScore = 0;
    let totalPossible = 0;

    // Reset all status badges first (targeting dynamic lectures)
    if (allFirebaseLectures && allFirebaseLectures.length > 0) {
        allFirebaseLectures.forEach(lec => {
            const badge = document.getElementById(`lec-score-${lec.key}`);
            const title = document.getElementById(`module-title-${lec.key}`);
            if (badge) {
                badge.className = 'cg-status-pill pending';
                badge.textContent = lang === 'kk' ? 'Тест тапсырылмаған' : 'Тест не сдан';
            }
            if (title) {
                title.className = 'cg-module-title uncompleted';
            }
        });
    }

    // Update with completed results
    Object.keys(results).forEach(key => {
        const r = results[key];
        const modId = r.moduleId;

        // Skip legacy module IDs (1, 2, 3, 4)
        if ([1, 2, 3, 4, '1', '2', '3', '4'].includes(modId) || ['module_1', 'module_2', 'module_3', 'module_4'].includes(key)) {
            return;
        }

        completed++;
        totalScore += r.correct;
        totalPossible += r.total;

        const badge = document.getElementById(`lec-score-${modId}`);
        const title = document.getElementById(`module-title-${modId}`);
        if (badge) {
            badge.className = 'cg-status-pill completed';
            badge.textContent = lang === 'kk' ? `Тапсырылған (${r.correct}/${r.total})` : `Пройдено (${r.correct}/${r.total})`;
        }
        if (title) {
            title.className = 'cg-module-title completed';
        }
    });

    // Update summary stats
    const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    let rank = '1';
    if (avgPct >= 80) rank = '3';
    else if (avgPct >= 50) rank = '2';
    else rank = '1';

    const statCompleted = document.getElementById('statCompleted');
    const statTotalScore = document.getElementById('statTotalScore');
    const statRank = document.getElementById('statRank');

    if (statCompleted) statCompleted.textContent = completed;
    if (statTotalScore) statTotalScore.textContent = totalScore * 30; // 30 XP per correct answer matches screens
    if (statRank) statRank.textContent = rank;

    // Results history widget
    const historyWidget = document.getElementById('resultsHistoryWidget');
    if (historyWidget) {
        const filteredResults = Object.values(results).filter(r => ![1, 2, 3, 4, '1', '2', '3', '4'].includes(r.moduleId));
        if (filteredResults.length === 0) {
            historyWidget.innerHTML = `<p style="color:var(--text-secondary);font-size:.9rem;" data-i18n="dash_no_results">${translations[lang].dash_no_results}</p>`;
        } else {
            historyWidget.innerHTML = filteredResults.map(r => {
                let pclass = r.percent >= 80 ? 'score-excellent' : r.percent >= 60 ? 'score-good' : r.percent >= 40 ? 'score-average' : 'score-poor';
                const targetLec = allFirebaseLectures.find(l => l.key === r.moduleId);
                let name = 'Модуль ' + r.moduleId;
                if (targetLec) {
                    name = lang === 'ru' ? (targetLec.title_ru || targetLec.title_kk) : (targetLec.title_kk || targetLec.title_ru);
                }
                return `<div class="history-item">
                    <span class="history-module-name">${name}</span>
                    <span class="history-score-pill ${pclass}">${r.correct}/${r.total} (${r.percent}%)</span>
                </div>`;
            }).join('');
        }
    }
}

let allLeaderboardData = []; // Global cache for search filtering

async function loadLeaderboard() {
    if (!databaseInstance) return;

    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;

    try {
        const snapshot = await databaseInstance.ref('users').once('value');
        const users = snapshot.val() || {};

        const lang = localStorage.getItem('lang') || 'kk';
        allLeaderboardData = [];

        Object.keys(users).forEach(uid => {
            const u = users[uid];
            const profile = u.profile || {};
            const email = u.email || profile.email || '';

            // Exclude admin from leaderboard
            if (email.toLowerCase() === 'zhom05025@gmail.com') return;

            const display_name = u.display_name || profile.name || u.name || email || 'Аноним';
            const quizResults = u.quizResults || {};

            let completedCount = 0;
            let totalScore = 0;
            let totalPossible = 0;
            const completedTestsList = [];

            Object.keys(quizResults).forEach(key => {
                const r = quizResults[key];

                // Skip legacy module IDs (1, 2, 3, 4)
                if ([1, 2, 3, 4, '1', '2', '3', '4'].includes(r.moduleId) || ['module_1', 'module_2', 'module_3', 'module_4'].includes(key)) {
                    return;
                }

                completedCount++;
                totalScore += r.correct;
                totalPossible += r.total;

                const targetLec = allFirebaseLectures.find(l => l.key === r.moduleId);
                let name = (lang === 'kk' ? 'Модуль ' : 'Модуль ') + r.moduleId;
                if (targetLec) {
                    name = lang === 'ru' ? (targetLec.title_ru || targetLec.title_kk) : (targetLec.title_kk || targetLec.title_ru);
                }

                let pclass = r.percent >= 80 ? 'score-excellent' : r.percent >= 60 ? 'score-good' : r.percent >= 40 ? 'score-average' : 'score-poor';
                completedTestsList.push({
                    name: name,
                    percent: r.percent,
                    correct: r.correct,
                    total: r.total,
                    pclass: pclass
                });
            });

            const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

            allLeaderboardData.push({
                uid: uid,
                name: display_name,
                email: email,
                completedCount: completedCount,
                totalScore: totalScore,
                totalPossible: totalPossible,
                avgPct: avgPct,
                completedTestsList: completedTestsList
            });
        });

        // Sort students: highest average percentage first, then by total score
        allLeaderboardData.sort((a, b) => {
            if (b.avgPct !== a.avgPct) return b.avgPct - a.avgPct;
            return b.totalScore - a.totalScore;
        });

        renderLeaderboardRows(allLeaderboardData);

    } catch (e) {
        console.error("Error loading leaderboard:", e);
        leaderboardBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--color-danger); padding:2rem;">Деректерді жүктеу қатесі / Ошибка загрузки данных</td></tr>`;
    }
}

function renderLeaderboardRows(data) {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;

    const lang = localStorage.getItem('lang') || 'kk';

    if (data.length === 0) {
        leaderboardBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary); padding:2rem;" data-i18n="leaderboard_no_data">${translations[lang].leaderboard_no_data}</td></tr>`;
        return;
    }

    leaderboardBody.innerHTML = data.map((student, idx) => {
        const rank = idx + 1;
        let rankClass = '';
        let medal = '';

        if (rank === 1) { rankClass = 'rank-gold'; medal = '🥇 '; }
        else if (rank === 2) { rankClass = 'rank-silver'; medal = '🥈 '; }
        else if (rank === 3) { rankClass = 'rank-bronze'; medal = '🥉 '; }

        const testsHtml = student.completedTestsList.length > 0
            ? `<div class="leaderboard-tests-list">${student.completedTestsList.map(t =>
                `<span class="leaderboard-test-pill ${t.pclass}">${t.name}: ${t.percent}%</span>`
            ).join('')}</div>`
            : `<span class="leaderboard-no-tests" data-i18n="leaderboard_no_tests">${translations[lang].leaderboard_no_tests}</span>`;

        return `
            <tr>
                <td class="leaderboard-rank-cell ${rankClass}" style="padding: 1rem;">${medal}${rank}</td>
                <td style="padding: 1rem;">
                    <span class="leaderboard-student-name" style="font-weight: 700; color: #1c281c;">${student.name}</span>
                </td>
                <td style="padding: 1rem;">${testsHtml}</td>
                <td class="leaderboard-total-score-val" style="padding: 1rem;">${student.totalScore}/${student.totalPossible}</td>
                <td class="leaderboard-avg-pct" style="padding: 1rem;">${student.avgPct}%</td>
            </tr>
        `;
    }).join('');
}

function filterLeaderboard() {
    const query = document.getElementById('leaderboardSearch').value.toLowerCase().trim();
    if (!query) {
        renderLeaderboardRows(allLeaderboardData);
        return;
    }

    const filtered = allLeaderboardData.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );

    renderLeaderboardRows(filtered);
}

// =============================================
// 8. DOMContentLoaded — SETUP ALL CONTROLLERS
// =============================================
document.addEventListener('DOMContentLoaded', () => {

    // A. MOBILE MENU
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('mobile-open');
            const icon = navbarToggle.querySelector('i');
            icon.className = navbarMenu.classList.contains('mobile-open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }

    // B. THEME TOGGLE — works for both sidebar capsule and guest moon button
    const themeToggle = document.getElementById('themeToggle');
    // guest layout uses a dedicated icon element; sidebar layout uses the button's inner icon
    const themeIcon = document.getElementById('themeIcon');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Guest layout: update standalone icon
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        // Sidebar layout: update icon inside the header capsule button
        const sidebarThemeIcon = document.querySelector('.header-theme-toggle-btn i');
        if (sidebarThemeIcon) {
            sidebarThemeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    };

    // Always default to dark if nothing saved
    applyTheme(localStorage.getItem('theme') || 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'light' ? 'dark' : 'light');
        });
    }

    // C. LANGUAGE TOGGLE — works for both sidebar two-span capsule and guest single button
    // Sidebar layout: langToggle is a div with two child spans: #langKKBtn and #langRUBtn
    // Guest layout: langToggle is a button whose textContent is set to "KK" or "RU"
    const langToggle = document.getElementById('langToggle');
    const langKKBtn = document.getElementById('langKKBtn');
    const langRUBtn = document.getElementById('langRUBtn');

    const applyLanguage = (lang) => {
        localStorage.setItem('lang', lang);

        // Guest layout: single button shows current language
        if (langToggle && !langKKBtn) {
            langToggle.textContent = lang === 'kk' ? 'ҚАЗ' : 'РУС';
        }

        // Sidebar layout: toggle active class on spans
        if (langKKBtn && langRUBtn) {
            if (lang === 'kk') {
                langKKBtn.classList.add('active');
                langRUBtn.classList.remove('active');
            } else {
                langRUBtn.classList.add('active');
                langKKBtn.classList.remove('active');
            }
        }

        // Apply all data-i18n translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang]?.[key]) {
                if (el.tagName === 'INPUT') el.placeholder = translations[lang][key];
                else el.textContent = translations[lang][key];
            }
        });
    };

    // Always default to Kazakh
    applyLanguage(localStorage.getItem('lang') || 'kk');

    // Sidebar layout: click on KK span
    if (langKKBtn) {
        langKKBtn.addEventListener('click', (e) => { e.stopPropagation(); applyLanguage('kk'); });
    }
    // Sidebar layout: click on RU span
    if (langRUBtn) {
        langRUBtn.addEventListener('click', (e) => { e.stopPropagation(); applyLanguage('ru'); });
    }
    // Guest layout: clicking the whole button toggles between kk and ru
    if (langToggle && !langKKBtn) {
        langToggle.addEventListener('click', () => {
            const next = (localStorage.getItem('lang') || 'kk') === 'kk' ? 'ru' : 'kk';
            applyLanguage(next);
        });
    }

    // D. HOME STATS COUNTER ANIMATION
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                let current = 0;
                const step = target / 80;
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + (target === 99 ? '%' : '+');
                        clearInterval(interval);
                    } else {
                        el.textContent = Math.floor(current) + '+';
                    }
                }, 15);
                observer.unobserve(el);
            });
        }, { threshold: 0.1 });
        statNumbers.forEach(el => observer.observe(el));
    }

    // E. LOAD USER QUIZ RESULTS (student page only)
    if (typeof currentUserUID !== 'undefined' && currentUserUID && databaseInstance) {
        loadUserResults(currentUserUID);
        loadLeaderboard();
    }

    // F. REGISTER FORM
    const registerForm = document.getElementById('registerForm');
    if (registerForm && authInstance) {
        const regEmail = document.getElementById('regEmail');
        const regPassword = document.getElementById('regPassword');
        const regConfirm = document.getElementById('regConfirmPassword');

        regConfirm.addEventListener('input', () => {
            regConfirm.className = regConfirm.value !== regPassword.value ? 'form-input is-invalid' : 'form-input is-valid';
        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const lang = localStorage.getItem('lang') || 'kk';
            const name = document.getElementById('regName').value.trim();
            const email = regEmail.value.trim();
            const password = regPassword.value.trim();
            const confirm = regConfirm.value.trim();

            if (!name || !email || !password || !confirm) { showToast(translations[lang].toast_err_empty, 'danger'); return; }
            if (password.length < 6) { showToast(translations[lang].toast_err_password_len, 'danger'); return; }
            if (password !== confirm) { showToast(translations[lang].toast_err_passwords_match, 'danger'); return; }

            const loader = document.getElementById('loaderOverlay');
            const loaderText = document.getElementById('loaderText');
            if (loader && loaderText) { loaderText.textContent = translations[lang].loading_auth; loader.classList.add('active'); }

            try {
                const cred = await authInstance.createUserWithEmailAndPassword(email, password);
                const user = cred.user;

                if (databaseInstance && loaderText) {
                    loaderText.textContent = translations[lang].loading_saving;
                    await databaseInstance.ref(`users/${user.uid}`).set({
                        email, display_name: name,
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        preferredLang: lang
                    });
                }

                const res = await fetch('/api/login-session', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, uid: user.uid, display_name: name })
                });
                const json = await res.json();
                if (json.success) {
                    showToast(translations[lang].toast_success_reg, 'success');
                    setTimeout(() => window.location.href = '/student', 1500);
                }
            } catch (err) {
                if (loader) loader.classList.remove('active');
                let msg = err.message;
                if (err.code === 'auth/email-already-in-use') msg = lang === 'kk' ? 'Бұл email тіркелген!' : 'Этот email уже зарегистрирован!';
                else if (err.code === 'auth/invalid-email') msg = translations[lang].toast_err_invalid_email;
                showToast(msg, 'danger');
            }
        });
    }

    // G. LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    if (loginForm && authInstance) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const lang = localStorage.getItem('lang') || 'kk';
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            if (!email || !password) { showToast(translations[lang].toast_err_empty, 'danger'); return; }

            const loader = document.getElementById('loaderOverlay');
            const loaderText = document.getElementById('loaderText');
            if (loader && loaderText) { loaderText.textContent = translations[lang].loading_auth; loader.classList.add('active'); }

            try {
                const cred = await authInstance.signInWithEmailAndPassword(email, password);
                const user = cred.user;

                // Fetch display_name / profile name from Firebase
                let displayName = email;
                if (databaseInstance) {
                    const snap = await databaseInstance.ref(`users/${user.uid}`).once('value');
                    const val = snap.val();
                    if (val) {
                        displayName = val.display_name || (val.profile && val.profile.name) || val.name || email;
                    }
                }

                const res = await fetch('/api/login-session', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, uid: user.uid, display_name: displayName })
                });
                const json = await res.json();
                if (json.success) {
                    showToast(translations[lang].toast_success_login, 'success');
                    setTimeout(() => window.location.href = '/student', 1200);
                }
            } catch (err) {
                if (loader) loader.classList.remove('active');
                let msg = err.message;
                if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(err.code)) {
                    msg = lang === 'kk' ? 'Қате email немесе құпия сөз!' : 'Неверный email или пароль!';
                } else if (err.code === 'auth/invalid-email') {
                    msg = translations[lang].toast_err_invalid_email;
                }
                showToast(msg, 'danger');
            }
        });
    }
});

/* ==========================================================================
   DYNAMIC LECTURES & VIDEOS — loaded from Firebase via Flask API
   ========================================================================== */

// Static quiz data (used for quiz questions per lecture index)
const lecturesData = {
    1: {
        kk: { title: "Киберқылмыс туралы негізгі ережелер" },
        ru: { title: "Основные правила киберпреступности" }
    },
    2: {
        kk: { title: "Deepfake және AI қауіптері" },
        ru: { title: "Угрозы Deepfake и ИИ" }
    },
    3: {
        kk: { title: "Қауіпсіз пароль менеджменті және 2FA" },
        ru: { title: "Управление паролями и 2FA" }
    },
    4: {
        kk: { title: "Веб-қосымшалар қауіпсіздігі (OWASP Top 10)" },
        ru: { title: "Безопасность веб-приложений (OWASP Top 10)" }
    }
};

let allFirebaseLectures = [];
let allFirebaseVideos = [];
let dynamicQuizzes = {};

// ─── LECTURE LOADING & RENDERING ──────────────────────────────────────────

async function loadAndRenderLectures() {
    const listEl = document.getElementById('lectureList');
    if (!listEl) return;

    try {
        const [resLec, resQuiz] = await Promise.all([
            fetch('/api/get-all-lectures'),
            fetch('/api/get-all-quizzes')
        ]);
        const dataLec = await resLec.json();
        const dataQuiz = await resQuiz.json();

        allFirebaseLectures = Array.isArray(dataLec) ? dataLec : [];
        dynamicQuizzes = dataQuiz || {};
    } catch (e) {
        allFirebaseLectures = [];
        dynamicQuizzes = {};
    }

    renderLectureList();

    // AFTER rendering lectures, load user results to update status badges
    if (typeof currentUserUID !== 'undefined' && currentUserUID) {
        loadUserResults(currentUserUID);
    }
}

function renderLectureList() {
    const listEl = document.getElementById('lectureList');
    if (!listEl) return;
    const lang = localStorage.getItem('lang') || 'kk';
    const isAdmin = typeof IS_ADMIN !== 'undefined' && IS_ADMIN;

    if (allFirebaseLectures.length === 0) {
        listEl.innerHTML = `<div style="text-align:center;padding:2.5rem;color:#94a3b8;">
            <i class="fa-solid fa-book-open" style="font-size:2rem;opacity:0.4;"></i>
            <p style="margin-top:0.75rem;">Лекциялар әлі қосылмаған</p>
        </div>`;
        return;
    }

    listEl.innerHTML = allFirebaseLectures.map((lec, idx) => {
        const title = lang === 'ru' ? (lec.title_ru || lec.title_kk) : (lec.title_kk || lec.title_ru);
        const delBtn = isAdmin
            ? `<button onclick="adminDeleteLecture(event,'${lec.key}')"
                style="background:none;border:none;cursor:pointer;color:#c62828;font-size:1rem;padding:0.3rem 0.5rem;border-radius:6px;transition:background 0.2s;"
                title="Жою"
                onmouseenter="this.style.background='#ffebee'"
                onmouseleave="this.style.background='none'">
                <i class="fa-solid fa-trash-can"></i>
               </button>`
            : '';

        return `<div class="cg-module-card" id="lec-card-${lec.key}" onclick="openFirebaseLectureModal('${lec.key}')">
            <div style="display:flex;align-items:center;gap:0.75rem;flex:1;min-width:0;">
                <span style="font-size:1.05rem;font-weight:800;color:#2e7d32;min-width:28px;">${idx + 1}.</span>
                <span class="cg-module-title uncompleted" id="module-title-${lec.key}">${title}</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0;">
                <span class="cg-status-pill pending" id="lec-score-${lec.key}">Тест тапсырылмаған</span>
                ${delBtn}
            </div>
        </div>`;
    }).join('');
}

function openFirebaseLectureModal(key) {
    const lang = localStorage.getItem('lang') || 'kk';
    const lec = allFirebaseLectures.find(l => l.key === key);
    if (!lec) return;

    const title = lang === 'ru' ? (lec.title_ru || lec.title_kk) : (lec.title_kk || lec.title_ru);
    const body = lang === 'ru' ? (lec.body_ru || lec.body_kk) : (lec.body_kk || lec.body_ru);

    document.getElementById('topicModalTitle').textContent = title;
    document.getElementById('topicModalBody').innerHTML = body
        ? body
        : '<em style="color:#94a3b8;">Мазмұн қосылмаған</em>';

    document.getElementById('topicStartQuizBtn').onclick = () => {
        closeTopicModal();
        if (dynamicQuizzes[key] && typeof openQuiz === 'function') {
            openQuiz(key);
        } else {
            showToast(lang === 'ru'
                ? 'Тест для этой лекции пока не добавлен'
                : 'Бұл лекция үшін тест әлі қосылмаған', 'warning');
        }
    };

    // Hide or show the button based on whether a quiz exists and if it's already taken
    const btn = document.getElementById('topicStartQuizBtn');
    const isCompleted = userQuizResults && (userQuizResults[`module_${key}`] || userQuizResults[key]);

    if (dynamicQuizzes[key]) {
        btn.style.display = 'inline-flex';
        if (isCompleted) {
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${lang === 'ru' ? 'Тест сдан' : 'Тест тапсырылған'}</span>`;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
            btn.onclick = null;
        } else {
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-circle-play"></i> <span>${lang === 'ru' ? 'Пройти тест (+XP)' : 'Тест тапсыру (+XP)'}</span>`;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    } else {
        btn.style.display = 'none';
    }

    document.getElementById('topicModalOverlay').classList.add('active');
}

function openTopicModal(moduleId) {
    // Legacy compatibility
    const lec = allFirebaseLectures[Number(moduleId) - 1];
    if (lec) openFirebaseLectureModal(lec.key);
}

function closeTopicModal() {
    document.getElementById('topicModalOverlay').classList.remove('active');
}

// ─── ADMIN: LECTURE ADD / DELETE ────────────────────────────────────────────

function openAddLectureModal() {
    const overlay = document.getElementById('addLectureModalOverlay');
    if (overlay) { overlay.classList.add('active'); document.getElementById('newLecTitleKK').focus(); }
}

function closeAddLectureModal(e) {
    const overlay = document.getElementById('addLectureModalOverlay');
    if (!overlay) return;
    if (e && e.target !== overlay) return;
    overlay.classList.remove('active');
    ['newLecTitleKK', 'newLecBodyKK'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

async function adminSaveLecture() {
    const btn = document.getElementById('saveLecBtn');
    const titleKK = document.getElementById('newLecTitleKK').value.trim();
    const bodyKK = document.getElementById('newLecBodyKK').value.trim();

    if (!titleKK) { showToast('Тақырып атауы міндетті!', 'danger'); return; }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Сақталуда...';

    try {
        const res = await fetch('/api/admin/add-lecture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title_kk: titleKK, body_kk: bodyKK })
        });
        const json = await res.json();
        if (json.success) {
            const genQuiz = document.getElementById('generateQuizWithAI');
            if (genQuiz && genQuiz.checked) {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI Тест құрастыруда...';
                try {
                    const aiRes = await fetch('/api/admin/generate-quiz', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ lecture_key: json.key, lecture_text: bodyKK })
                    });
                    const aiJson = await aiRes.json();
                    if (aiJson.success) {
                        showToast('Лекция мен Тест сәтті қосылды! ✓', 'success');
                    } else {
                        showToast('Лекция қосылды, бірақ Тест қатесі: ' + aiJson.message, 'warning');
                    }
                } catch (e) {
                    showToast('Тест құрастыру кезінде қате кетті.', 'warning');
                }
            } else {
                showToast('Лекция сәтті қосылды! ✓', 'success');
            }
            closeAddLectureModal();
            await loadAndRenderLectures();
        } else {
            showToast(json.message || 'Қате!', 'danger');
        }
    } catch (e) {
        showToast('Желі қатесі!', 'danger');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Сақтау';
    }
}

async function adminDeleteLecture(e, key) {
    e.stopPropagation();
    const lang = localStorage.getItem('lang') || 'kk';
    const msg = lang === 'ru' ? 'Удалить эту лекцию?' : 'Бұл лекцияны жоюға сенімдісіз бе?';
    if (!confirm(msg)) return;

    try {
        const res = await fetch('/api/admin/delete-lecture/' + key, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
            showToast(lang === 'ru' ? 'Лекция удалена' : 'Лекция жойылды', 'success');
            await loadAndRenderLectures();
        } else {
            showToast(json.message || 'Қате!', 'danger');
        }
    } catch (e) {
        showToast('Желі қатесі!', 'danger');
    }
}

// ─── VIDEO LOADING & RENDERING ──────────────────────────────────────────────

async function loadAndRenderVideos() {
    const container = document.getElementById('videoListContainer');
    if (!container) return;

    try {
        const res = await fetch('/api/get-all-videos');
        const data = await res.json();
        allFirebaseVideos = Array.isArray(data) ? data : [];
    } catch (e) {
        allFirebaseVideos = [];
    }

    renderVideoList();
}

function renderVideoList() {
    const container = document.getElementById('videoListContainer');
    if (!container) return;
    const isAdmin = typeof IS_ADMIN !== 'undefined' && IS_ADMIN;

    if (allFirebaseVideos.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:2.5rem;color:#94a3b8;">
            <i class="fa-solid fa-video" style="font-size:2rem;opacity:0.4;"></i>
            <p style="margin-top:0.75rem;">Видеолар әлі қосылмаған</p>
        </div>`;
        return;
    }

    // Group by category
    const grouped = {};
    allFirebaseVideos.forEach(v => {
        const cat = v.category || 'Өзге';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(v);
    });

    container.innerHTML = Object.entries(grouped).map(([cat, vids]) => `
        <div>
            <h4 style="color:#2e7d32;font-weight:800;font-size:1.05rem;margin:0 0 0.75rem;">${cat}</h4>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
                ${vids.map(v => `
                <div style="background:#fff;border:1px solid #e0e6e0;border-radius:12px;padding:1.25rem 1.5rem;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.01);">
                    <a href="${v.url}" target="_blank" rel="noopener" style="text-decoration:none;display:flex;flex-direction:column;gap:0.2rem;flex:1;min-width:0;">
                        <strong style="color:#1c281c;font-size:1.05rem;">${v.title}</strong>
                        <span style="color:#2e7d32;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${v.url}</span>
                    </a>
                    <div style="display:flex;align-items:center;gap:0.75rem;margin-left:1rem;flex-shrink:0;">
                        <a href="${v.url}" target="_blank" rel="noopener"
                           style="background:#2e7d32;color:#fff;border-radius:8px;padding:0.45rem 1rem;font-size:0.85rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:0.4rem;">
                            <i class="fa-brands fa-youtube"></i> Көру
                        </a>
                        ${isAdmin ? `<button onclick="adminDeleteVideo(event,'${v.key}')"
                            style="background:none;border:none;cursor:pointer;color:#c62828;font-size:1rem;padding:0.3rem 0.5rem;border-radius:6px;"
                            onmouseenter="this.style.background='#ffebee'"
                            onmouseleave="this.style.background='none'">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>` : ''}
                    </div>
                </div>`).join('')}
            </div>
        </div>
    `).join('');
}

// ─── ADMIN: VIDEO ADD / DELETE ───────────────────────────────────────────────

function openAddVideoModal() {
    const overlay = document.getElementById('addVideoModalOverlay');
    if (overlay) { overlay.classList.add('active'); document.getElementById('newVidTitle').focus(); }
}

function closeAddVideoModal(e) {
    const overlay = document.getElementById('addVideoModalOverlay');
    if (!overlay) return;
    if (e && e.target !== overlay) return;
    overlay.classList.remove('active');
    ['newVidTitle', 'newVidCategory', 'newVidUrl'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

async function adminSaveVideo() {
    const btn = document.getElementById('saveVidBtn');
    const title = document.getElementById('newVidTitle').value.trim();
    const category = document.getElementById('newVidCategory').value.trim();
    const url = document.getElementById('newVidUrl').value.trim();

    if (!title) { showToast('Видео атауы міндетті!', 'danger'); return; }
    if (!url) { showToast('YouTube сілтемесі міндетті!', 'danger'); return; }
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        showToast('Тек YouTube сілтемелері рұқсат етілген!', 'warning'); return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Сақталуда...';

    try {
        const res = await fetch('/api/admin/add-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, url })
        });
        const json = await res.json();
        if (json.success) {
            showToast('Видео сәтті қосылды! ✓', 'success');
            closeAddVideoModal();
            await loadAndRenderVideos();
        } else {
            showToast(json.message || 'Қате!', 'danger');
        }
    } catch (e) {
        showToast('Желі қатесі!', 'danger');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Сақтау';
    }
}

async function adminDeleteVideo(e, key) {
    e.stopPropagation();
    const lang = localStorage.getItem('lang') || 'kk';
    const msg = lang === 'ru' ? 'Удалить это видео?' : 'Бұл видеоны жоюға сенімдісіз бе?';
    if (!confirm(msg)) return;

    try {
        const res = await fetch('/api/admin/delete-video/' + key, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
            showToast(lang === 'ru' ? 'Видео удалено' : 'Видео жойылды', 'success');
            await loadAndRenderVideos();
        } else {
            showToast(json.message || 'Қате!', 'danger');
        }
    } catch (e) {
        showToast('Желі қатесі!', 'danger');
    }
}

// ─── ADMIN: FEEDBACK MANAGEMENT ───────────────────────────────────────────────

function openAdminFeedbackModal() {
    const overlay = document.getElementById('adminFeedbackModalOverlay');
    if (overlay) {
        overlay.classList.add('active');
        loadAndRenderFeedback();
    }
}

function closeAdminFeedbackModal(e) {
    const overlay = document.getElementById('adminFeedbackModalOverlay');
    if (!overlay) return;
    if (e && e.target !== overlay) return;
    overlay.classList.remove('active');
}

async function loadAndRenderFeedback() {
    const listEl = document.getElementById('adminFeedbackList');
    if (!listEl) return;

    listEl.innerHTML = `<div style="text-align:center; padding:2rem; color:#667766;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:1.5rem;"></i>
        <p style="margin-top:0.75rem;">Жүктелуде...</p>
    </div>`;

    try {
        const res = await fetch('/api/admin/get-feedback');
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            listEl.innerHTML = `<div style="text-align:center; padding:2rem; color:#94a3b8;">
                <i class="fa-solid fa-box-open" style="font-size:2rem;opacity:0.4;"></i>
                <p style="margin-top:0.75rem;">Жаңа шағымдар жоқ</p>
            </div>`;
            return;
        }

        // Sort by timestamp descending
        data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        listEl.innerHTML = data.map((fb, idx) => {
            const date = fb.timestamp ? new Date(fb.timestamp * 1000).toLocaleString('kk-KZ') : 'Белгісіз уақыт';
            const ratingStars = '★'.repeat(fb.rating || 5) + '☆'.repeat(5 - (fb.rating || 5));

            return `
            <div style="background: #f8faf8; border: 1px solid #e0e6e0; border-radius: 12px; padding: 1.25rem; position: relative;">
                <button onclick="adminDeleteFeedback(event, '${fb.key}')" 
                    style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; color: #c62828; font-size: 1rem; padding: 0.3rem;"
                    title="Жою">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div style="font-size: 0.8rem; color: #667766; margin-bottom: 0.5rem; display: flex; gap: 1rem;">
                    <span><i class="fa-solid fa-clock"></i> ${date}</span>
                    <span style="color: #f59e0b; font-weight: bold;">${ratingStars}</span>
                </div>
                <h4 style="margin: 0 0 0.5rem 0; color: #1c281c; font-size: 1.1rem;">${fb.subject || 'Тақырыпсыз'}</h4>
                <div style="font-size: 0.9rem; font-weight: bold; color: #2e7d32; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-user"></i> ${fb.user_name || 'Белгісіз'}
                </div>
                <div style="font-size: 0.95rem; color: #334155; line-height: 1.5; white-space: pre-wrap; background: #fff; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">${fb.message || ''}</div>
            </div>`;
        }).join('');
    } catch (e) {
        listEl.innerHTML = `<div style="text-align:center; color:#c62828; padding: 1rem;">Желілік қателік орын алды.</div>`;
    }
}

async function adminDeleteFeedback(e, key) {
    e.stopPropagation();
    if (!confirm('Бұл шағымды жоюға сенімдісіз бе?')) return;

    try {
        const res = await fetch('/api/admin/delete-feedback/' + key, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
            showToast('Шағым жойылды!', 'success');
            await loadAndRenderFeedback();
        } else {
            showToast(json.message || 'Қате!', 'danger');
        }
    } catch (e) {
        showToast('Желі қатесі!', 'danger');
    }
}

// ─── BOOT: Auto-load on page ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lectureList')) loadAndRenderLectures();
    if (document.getElementById('videoListContainer')) loadAndRenderVideos();
});

// =============================================
// PROFILE: DROPDOWN TOGGLE
// =============================================
function toggleProfileDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('open');
}

// Close dropdown when clicking anywhere outside
document.addEventListener('click', (e) => {
    const pill = document.getElementById('profilePillBtn');
    const dropdown = document.getElementById('profileDropdown');
    if (!pill || !dropdown) return;
    if (!pill.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// =============================================
// PROFILE: MODAL OPEN / CLOSE
// =============================================
function openProfileModal() {
    const overlay = document.getElementById('profileModalOverlay');
    if (!overlay) return;
    // Clear inputs
    const old = document.getElementById('profileOldPass');
    const nw = document.getElementById('profileNewPass');
    const cf = document.getElementById('profileConfirmPass');
    if (old) old.value = '';
    if (nw) nw.value = '';
    if (cf) cf.value = '';
    overlay.classList.add('active');
    document.getElementById('profileDropdown')?.classList.remove('open');
}

function closeProfileModal(event) {
    // When called from X button: event is undefined → always close
    // When called from overlay onclick: close only if user clicked the backdrop (not the card)
    if (event && event.target !== document.getElementById('profileModalOverlay')) return;
    document.getElementById('profileModalOverlay')?.classList.remove('active');
}

// =============================================
// PROFILE: CHANGE PASSWORD
// =============================================
async function changePassword() {
    const oldPass = document.getElementById('profileOldPass')?.value.trim();
    const newPass = document.getElementById('profileNewPass')?.value.trim();
    const confPass = document.getElementById('profileConfirmPass')?.value.trim();

    if (!oldPass || !newPass || !confPass) {
        showToast('Барлық өрістерді толтырыңыз!', 'danger');
        return;
    }
    if (newPass !== confPass) {
        showToast('Жаңа құпия сөздер сәйкес келмейді!', 'danger');
        return;
    }
    if (newPass.length < 6) {
        showToast('Жаңа құпия сөз кемінде 6 таңбадан тұруы керек!', 'danger');
        return;
    }

    if (!authInstance) {
        showToast('Firebase инициализацияланмаған!', 'danger');
        return;
    }

    const user = authInstance.currentUser;
    if (!user || !user.email) {
        showToast('Пайдаланушы табылмады. Жүйеге қайта кіріңіз.', 'danger');
        return;
    }

    const btn = document.getElementById('changePassBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Жүктелуде...'; }

    try {
        // Re-authenticate with old password first
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);
        await user.reauthenticateWithCredential(credential);

        // Now update password
        await user.updatePassword(newPass);

        showToast('Құпия сөз сәтті өзгертілді! ✅', 'success');
        document.getElementById('profileModalOverlay')?.classList.remove('active');
    } catch (err) {
        console.error('Password change error:', err);
        let msg = 'Қате орын алды.';
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            msg = 'Ескі құпия сөз дұрыс емес!';
        } else if (err.code === 'auth/weak-password') {
            msg = 'Жаңа пароль тым оңай. Күрделілеу жасаңыз!';
        } else if (err.code === 'auth/too-many-requests') {
            msg = 'Тым көп сұраным. Кейінірек қайталаңыз.';
        } else if (err.code === 'auth/network-request-failed') {
            msg = 'Желі қатесі. Интернет байланысын тексеріңіз.';
        }
        showToast(msg, 'danger');
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-key"></i> Сақтау'; }
    }
}

// =============================================
// PROFILE: AVATAR UPLOAD & PERSISTENCE
// =============================================

// Resize image to max 256x256 and convert to base64
function resizeAndEncodeImage(file, maxSize = 256) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let w = img.width, h = img.height;
                if (w > maxSize || h > maxSize) {
                    if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
                    else { w = Math.round(w * maxSize / h); h = maxSize; }
                }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Apply avatar to all avatar images on the page
function applyAvatarToPage(dataUrl) {
    const targets = ['headerAvatarImg', 'dropdownAvatarImg', 'profileModalAvatar'];
    targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.src = dataUrl;
    });
}

// Save avatar to Firebase Realtime Database
async function saveAvatarToFirebase(dataUrl) {
    if (!databaseInstance || typeof currentUserUID === 'undefined' || !currentUserUID) return;
    try {
        await databaseInstance.ref(`users/${currentUserUID}/profile/avatar`).set(dataUrl);
        console.log('Avatar saved to Firebase.');
    } catch (e) {
        console.error('Error saving avatar:', e);
    }
}

// Load avatar from Firebase Realtime Database
async function loadAvatarFromFirebase(uid) {
    if (!databaseInstance || !uid) return;
    try {
        const snap = await databaseInstance.ref(`users/${uid}/profile/avatar`).once('value');
        const dataUrl = snap.val();
        if (dataUrl) {
            applyAvatarToPage(dataUrl);
        }
    } catch (e) {
        console.error('Error loading avatar:', e);
    }
}

// Handle avatar file input change
async function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Тек сурет файлдарын жүктеуге болады!', 'danger');
        return;
    }

    try {
        showToast('Сурет жүктелуде...', 'info');
        const dataUrl = await resizeAndEncodeImage(file);
        applyAvatarToPage(dataUrl);
        await saveAvatarToFirebase(dataUrl);
        showToast('Аватар сәтті сақталды! ✅', 'success');
    } catch (e) {
        console.error('Avatar upload error:', e);
        showToast('Суретті жүктеу кезінде қате орын алды.', 'danger');
    }

    // Reset input so the same file can be re-selected
    event.target.value = '';
}

// Hook avatar loading into auth state change
if (authInstance) {
    authInstance.onAuthStateChanged((user) => {
        if (user) {
            loadAvatarFromFirebase(user.uid);
        }
    });
}
