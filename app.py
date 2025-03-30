from flask import Flask, render_template, jsonify
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, 
            static_folder='app/static',
            template_folder='app/templates')

# Set secret key from environment variable
app.secret_key = os.getenv('SECRET_KEY', 'default-dev-key')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Use environment variables with fallbacks
    debug = os.getenv('FLASK_ENV', 'production') != 'production'
    port = int(os.getenv('PORT', 8080))
    app.run(debug=debug, host='0.0.0.0', port=port) 