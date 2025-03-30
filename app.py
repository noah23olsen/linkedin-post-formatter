from flask import Flask, render_template, jsonify
import os
from dotenv import load_dotenv

# Load environment variables if a .env file exists
try:
    load_dotenv()
except:
    pass  # No .env file, no problem

app = Flask(__name__, 
            static_folder='app/static',
            template_folder='app/templates')

# Secret key for Flask session (if used)
app.secret_key = os.getenv('SECRET_KEY', 'dev-key-for-local-only')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Set debug to True for development
    # Use port 3030 to avoid conflicts with other services
    app.run(debug=True, host='0.0.0.0', port=3030) 