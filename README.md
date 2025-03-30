# LinkedIn Post Formatter

A web-based tool that helps you create eye-catching LinkedIn posts with special formatting options like bold text, italics, bullet points, arrows, and more.

## Features

- **Rich Text Formatting**: Add bold text, italics, bullet points, arrows, and separators to your LinkedIn posts
- **Emoji Picker**: Quickly insert emojis into your posts
- **Post Templates**: Choose from pre-designed templates for common LinkedIn post types
- **Real-time Preview**: See how your post will look on LinkedIn as you type
- **Character Counter**: Keep track of your post length (LinkedIn has a 3,000 character limit)
- **One-Click Copy**: Easily copy your formatted post to paste into LinkedIn

## How It Works

LinkedIn doesn't support rich text formatting natively, but this tool uses special Unicode characters to simulate formatting effects that will display correctly when pasted into LinkedIn.

## Getting Started

### Prerequisites

- Python 3.7+
- Flask

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/linkedin-post-formatter.git
cd linkedin-post-formatter
```

2. Install the required dependencies:
```
pip install -r requirements.txt
```

3. Run the application:
```
python app.py
```

4. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Type or paste your LinkedIn post content in the editor
2. Select text and apply formatting using the toolbar buttons
3. Use templates for common post structures
4. Preview how your post will look
5. Click "Copy to Clipboard" when you're satisfied
6. Paste directly into LinkedIn

## Deployment

### Deploying to Render

This application is ready to be deployed on [Render](https://render.com).

1. Fork or clone this repository to your GitHub account
2. Sign in to Render and create a new Web Service
3. Connect your GitHub repository
4. Use the following settings:
   - **Name**: Your choice (e.g., linkedin-post-formatter)
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn wsgi:app`
5. Click "Create Web Service" and Render will deploy your application

Alternatively, you can use the included `render.yaml` for [Blueprint deployment](https://render.com/docs/blueprint-spec):

1. Fork this repository
2. Create a new Blueprint instance on Render
3. Connect your forked repository
4. Render will automatically deploy your services as defined in the YAML

The application will be accessible at the URL provided by Render once deployment is complete.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
