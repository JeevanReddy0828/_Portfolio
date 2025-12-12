# Jeevan Bala Reddy Arlagadda - Portfolio Website

A professional, programmer-themed portfolio website built with Flask, featuring 3D elements, smooth scrolling, and responsive design.

![Portfolio Preview](preview.png)

## 🚀 Features

- **Programmer Theme**: Dark mode with code-inspired aesthetics
- **3D Interactive Cube**: Rotating code cube with mouse interaction
- **Matrix Rain Background**: Animated code rain effect
- **Smooth Scrolling**: Fluid navigation between sections
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Tilt effects, counters, and animations
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📋 Sections

1. **Hero**: Terminal-style introduction with 3D code cube
2. **About Me**: JSON-formatted summary with animated stats
3. **Experience**: Timeline of work history
4. **Tech Stack**: Categorized skills with icons
5. **Projects**: Featured projects with descriptions
6. **Education**: Academic background and certifications
7. **Contact**: Contact form and social links

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: JetBrains Mono, Inter
- **Icons**: Font Awesome 6
- **Effects**: Vanilla Tilt.js
- **Animations**: CSS Keyframes, Intersection Observer

## 📦 Installation

### Prerequisites
- Python 3.8+
- pip

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JeevanReddy0828/portfolio.git
   cd portfolio
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🎨 Customization

### Update Personal Information
Edit the `PORTFOLIO_DATA` dictionary in `app.py`:
- Update name, title, contact info
- Modify experience, skills, projects
- Add/remove sections as needed

### Styling
Modify CSS variables in `static/css/style.css`:
```css
:root {
    --accent-primary: #3b82f6;    /* Primary blue */
    --accent-secondary: #8b5cf6;   /* Purple */
    --bg-primary: #0a0e17;         /* Dark background */
    /* ... more variables */
}
```

### Colors Scheme
The default theme uses a blue-purple gradient. You can easily change to other colors by modifying the CSS variables.

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

## ⚡ Performance Tips

1. **Images**: Optimize images before uploading
2. **Fonts**: Currently using Google Fonts CDN
3. **Icons**: Font Awesome loaded from CDN
4. **Minification**: Consider minifying CSS/JS for production

## 🚀 Deployment

### Heroku
```bash
heroku create your-portfolio
git push heroku main
```

### Docker
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

### Static Export
For static hosting (GitHub Pages, Netlify), you can freeze the Flask app:
```bash
pip install frozen-flask
python freeze.py
```

## 📄 File Structure

```
portfolio/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── static/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   └── images/            # Image assets
└── templates/
    └── index.html         # Main HTML template
```

## 🔧 Environment Variables (Optional)

Create a `.env` file for configuration:
```
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=your-secret-key
```

## 📧 Contact Form Setup

The contact form currently logs to console. For production:
1. Integrate with email service (SendGrid, AWS SES)
2. Add form validation
3. Implement rate limiting
4. Add CAPTCHA for spam protection

## 🙏 Credits

- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - JetBrains Mono, Inter
- [Vanilla Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/) - Tilt effect

## 📄 License

MIT License - Feel free to use and modify for your own portfolio!

## 👨‍💻 Author

**Jeevan Bala Reddy Arlagadda**
- Email: arlagadda.jeevan@gmail.com
- LinkedIn: [balareddy177](https://www.linkedin.com/in/balareddy177/)
- GitHub: [JeevanReddy0828](https://github.com/JeevanReddy0828)

---

⭐ If you found this helpful, please give it a star!
