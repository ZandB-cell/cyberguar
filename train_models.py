import pandas as pd
import numpy as np
import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

def train_spam_model():
    print("Training Spam Model...")
    df = pd.read_csv('spam.csv', encoding='latin-1')
    # spam.csv has columns v1 (label) and v2 (text)
    df = df[['v1', 'v2']]
    df.columns = ['label', 'text']
    
    # Map labels: ham -> 0, spam -> 1
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})
    
    # Drop NaNs just in case
    df = df.dropna()

    # --- KAZAKH SYNTHETIC DATASET ---
    # Add some Kazakh spam and ham messages so the model can learn them.
    kazakh_data = [
        # SPAM (1)
        {'label': 1, 'text': 'Құттықтаймыз! Сіз 1000000 теңге жеңіп алдыңыз. Сыйлықты алу үшін сілтемеге өтіңіз.'},
        {'label': 1, 'text': 'Тегін интернет немесе смартфон ұтып алыңыз! Тез арада тіркеліңіз.'},
        {'label': 1, 'text': 'Сіздің банк картаңыз бұғатталды. Қауіпсіздік қызметіне хабарласыңыз: 8800123...'},
        {'label': 1, 'text': 'Акция! Үлкен жеңілдіктер, тек бүгін ғана. Click here to buy!'},
        {'label': 1, 'text': 'Сәлеметсіз бе, мен сізге инвестиция жасауды ұсынамын. Криптовалюта арқылы табыс табыңыз.'},
        {'label': 1, 'text': 'Сізге ақша аударымы келді. Қабылдау үшін мына сілтемені басыңыз.'},
        {'label': 1, 'text': 'Тегін криптовалюта! Күніне 50000 теңге табыс.'},
        {'label': 1, 'text': 'Шұғыл! Сіздің шотыңыздан ақша шешіліп жатыр. Растау кодын айтыңыз.'},
        {'label': 1, 'text': 'Жеңімпаз атандыңыз! Машина ұтып алу мүмкіндігі.'},
        {'label': 1, 'text': 'Лотереядан ұтыс шықты. Төлем жасап, сыйлықты алыңыз.'},
        # HAM (0)
        {'label': 0, 'text': 'Сәлем, қалайсың? Бүгін кешке кездесеміз бе?'},
        {'label': 0, 'text': 'Ертеңгі жиналыс сағат 10:00-де болады. Кешікпе.'},
        {'label': 0, 'text': 'Аға, мен үйге жеттім, бәрі жақсы.'},
        {'label': 0, 'text': 'Тапсырманы орындап, маған жібере аласың ба?'},
        {'label': 0, 'text': 'Рахмет, көмегіңе көп рахмет!'},
        {'label': 0, 'text': 'Дүкеннен нан мен сүт ала салшы.'},
        {'label': 0, 'text': 'Университетке бара жатырмын, кешігемін.'},
        {'label': 0, 'text': 'Сәлеметсіз бе! Кешегі құжаттарды поштаңызға жібердім.'},
        {'label': 0, 'text': 'Жақсы, ертең хабарласамыз.'},
        {'label': 0, 'text': 'Қайырлы таң! Күніңіз сәтті өтсін.'}
    ]
    # To increase the weight of Kazakh sentences in a mostly English dataset, we multiply them by a factor.
    kazakh_df = pd.DataFrame(kazakh_data * 50) 
    
    df = pd.concat([df, kazakh_df], ignore_index=True)
    
    # Create Pipeline
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', max_features=5000)),
        ('clf', MultinomialNB())
    ])
    
    pipeline.fit(df['text'], df['label'])
    
    # Save Model
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'spam_pipeline.pkl'))
    print("Spam Model saved successfully.")

def train_phish_model():
    print("Training Phishing URL Model...")
    df = pd.read_csv('malicious_phish.csv')
    
    # Sampling for speed
    if len(df) > 150000:
        df = df.sample(n=150000, random_state=42)
        
    # Map labels: benign -> 0, others -> 1
    df['is_phish'] = df['type'].apply(lambda x: 0 if x == 'benign' else 1)
    
    # --- KAZAKH / LOCAL SYNTHETIC PHISHING URLS ---
    kazakh_phish_data = [
        {'url': 'http://kaspi-bank-kz-login.com/auth', 'is_phish': 1},
        {'url': 'https://egov-kz-bonus.kz/get-money', 'is_phish': 1},
        {'url': 'http://halyk-bank-security.info/verify', 'is_phish': 1},
        {'url': 'https://kolesa.kz-pay.online/item/12345', 'is_phish': 1},
        {'url': 'http://post.kz.tracking-package.top/', 'is_phish': 1},
        {'url': 'https://salyq-kz-nalog.ru/', 'is_phish': 1},
        {'url': 'http://kaspi-red-limit.com/increase', 'is_phish': 1},
        {'url': 'https://halykbank.kz', 'is_phish': 0},
        {'url': 'https://kaspi.kz', 'is_phish': 0},
        {'url': 'https://egov.kz', 'is_phish': 0},
        {'url': 'https://kolesa.kz', 'is_phish': 0},
        {'url': 'https://post.kz', 'is_phish': 0}
    ]
    # Multiply to give it enough weight against 150k global URLs
    kazakh_phish_df = pd.DataFrame(kazakh_phish_data * 200) 
    
    # Combine original df and local df
    # the original df has 'url' and 'is_phish'
    df = df[['url', 'is_phish']]
    df = pd.concat([df, kazakh_phish_df], ignore_index=True)
    
    # Create Pipeline with character n-grams for URLs
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(analyzer='char', ngram_range=(2, 5), max_features=10000)),
        ('clf', LogisticRegression(max_iter=1000, n_jobs=-1))
    ])
    
    pipeline.fit(df['url'], df['is_phish'])
    
    # Save Model
    joblib.dump(pipeline, os.path.join(MODELS_DIR, 'phish_pipeline.pkl'))
    print("Phishing Model saved successfully.")

if __name__ == "__main__":
    train_spam_model()
    train_phish_model()
    print("All models trained and saved to /models directory!")
