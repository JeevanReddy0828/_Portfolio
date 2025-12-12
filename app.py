from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Skill icon mapping for Jinja template
SKILL_ICONS = {
    'Python': 'fab fa-python',
    'C': 'fas fa-code',
    'C++': 'fas fa-code',
    'JavaScript': 'fab fa-js-square',
    'SQL': 'fas fa-database',
    'AWS Lambda': 'fab fa-aws',
    'API Gateway': 'fab fa-aws',
    'EC2': 'fab fa-aws',
    'CloudWatch': 'fab fa-aws',
    'Docker': 'fab fa-docker',
    'Podman': 'fas fa-cube',
    'Git': 'fab fa-git-alt',
    'CI/CD': 'fas fa-sync-alt',
    'Linux': 'fab fa-linux',
    'MongoDB': 'fas fa-leaf',
    'MySQL': 'fas fa-database',
    'PostgreSQL': 'fas fa-database',
    'DynamoDB': 'fab fa-aws',
    'Oracle': 'fas fa-database',
    'FastAPI': 'fas fa-bolt',
    'Flask': 'fas fa-pepper-hot',
    'Django': 'fas fa-layer-group',
    'REST API': 'fas fa-plug',
    'Microservices': 'fas fa-cubes',
    'Kafka': 'fas fa-stream',
    'Event Bus': 'fas fa-exchange-alt',
    'Event-Driven Architecture': 'fas fa-sitemap',
    'Message Queues': 'fas fa-envelope',
    'Pytest': 'fas fa-vial',
    'Unit Testing': 'fas fa-check-circle',
    'Integration Testing': 'fas fa-link',
    'Postman': 'fas fa-paper-plane',
    'Bruno': 'fas fa-terminal',
    'Scikit-learn': 'fas fa-brain',
    'TensorFlow': 'fas fa-project-diagram',
    'Keras': 'fas fa-network-wired',
    'PyTorch': 'fas fa-fire',
    'XGBoost': 'fas fa-rocket',
    'LLMs': 'fas fa-robot',
    'GenAI': 'fas fa-wand-magic-sparkles',
    'NLTK': 'fas fa-language',
    'SpaCy': 'fas fa-spell-check',
    'BERT': 'fas fa-comments',
    'Hugging Face': 'fas fa-face-smile',
    'LangChain': 'fas fa-link',
    'RAG': 'fas fa-search',
    'NER': 'fas fa-tag',
    'Pandas': 'fas fa-table',
    'NumPy': 'fas fa-calculator',
    'Matplotlib': 'fas fa-chart-line',
    'Seaborn': 'fas fa-chart-area',
    'Power BI': 'fas fa-chart-pie',
    'Tableau': 'fas fa-chart-bar'
}

def get_skill_icon(skill):
    return SKILL_ICONS.get(skill, 'fas fa-code')

app.jinja_env.globals.update(get_skill_icon=get_skill_icon)

# Portfolio Data
PORTFOLIO_DATA = {
    "name": "Bala Showri Jeevan Reddy Arlagadda",
    "title": "Software Engineer",
    "tagline": "Building Scalable Systems & Intelligent Solutions",
    "email": "arlagadda.jeevan@gmail.com",
    "phone": "+1 (352) 871-8270",
    "location": "Dallas, TX",
    "linkedin": "https://www.linkedin.com/in/balareddy177/",
    "github": "https://github.com/JeevanReddy0828",
    
    "summary": "Software Engineer with hands-on experience building scalable, distributed backend systems, high-volume APIs, and event-driven microservices. Strong in Python, JavaScript, data structures, algorithms, and cloud-native design. Experienced in async architectures, containerization, CI/CD pipelines, and end-to-end API development for user-centric applications. Passionate about reliable software, performance optimization, and engineering best practices.",
    
    "experience": [
        {
            "title": "Python Developer",
            "company": "Apple Inc",
            "employer": "Slesha",
            "location": "Sunnyvale, California",
            "period": "Aug 2025 – Present",
            "highlights": [
                "Designed and developed scalable API endpoints with FastAPI to handle paginated user conversations, message retrieval with attachment metadata, linked ticket details, soft deletes, and ticket updates",
                "Integrated MongoDB for efficient data modeling and optimized query performance across multiple microservices",
                "Designed services using async and sync patterns, making architectural trade-offs for fault tolerance, distributed execution, and scalability",
                "Worked with Kafka-based services, utilizing Kafka event bus and topics for communication among event-driven microservices",
                "Implemented comprehensive unit and integration tests using Pytest, achieving 90%+ code coverage",
                "Containerized applications using Podman for local development and testing, aligning with DevOps CI/CD standards",
                "Conducted thorough code reviews for team members, ensuring code quality and adherence to best practices"
            ],
            "tech": ["FastAPI", "MongoDB", "Kafka", "Pytest", "Podman", "Kubernetes"]
        },
        {
            "title": "Python Developer",
            "company": "Slesha Inc",
            "location": "Irving, Texas",
            "period": "Feb 2025 – Jul 2025",
            "project": "Serverless Payroll System for Contract Workers",
            "highlights": [
                "Developed a serverless payroll system using Lambda functions to execute backend logic for API calls and scheduled events",
                "Implemented Amazon API Gateway to expose RESTful endpoints, enabling secure and scalable access to backend services",
                "Utilized Amazon DynamoDB, a fully managed NoSQL database, to store and retrieve contract worker attendance and payroll data",
                "Processed structured/unstructured worker input data and automated email summaries using SES",
                "Applied AWS IAM to implement fine-grained role-based security for resource access",
                "Used Postman to test REST APIs and implemented logging and monitoring with Amazon CloudWatch Logs"
            ],
            "tech": ["AWS Lambda", "API Gateway", "DynamoDB", "SES", "CloudWatch", "IAM"]
        },
        {
            "title": "AI Intern",
            "company": "Planet E-Com Solutions",
            "collaboration": "Microsoft",
            "location": "Noida, India",
            "period": "May 2022 – Jul 2022",
            "project": "Overseas Education Consultant Software",
            "highlights": [
                "Built recommendation engine pipelines using collaborative filtering with structured + unstructured data ingestion",
                "Designed preprocessing workflows and automated ingestion using BeautifulSoup + Scrapy",
                "Improved model quality by 25% via feature engineering and evaluation",
                "Delivered dashboards and architectural diagrams supporting analytics-driven product decisions"
            ],
            "tech": ["Python", "BeautifulSoup", "Scrapy", "Machine Learning"]
        }
    ],
    
    "skills": {
        "Languages": ["Python", "C", "C++", "JavaScript", "SQL"],
        "Cloud & DevOps": ["AWS Lambda", "API Gateway", "EC2", "CloudWatch", "Docker", "Podman", "Git", "CI/CD", "Linux"],
        "Databases": ["MongoDB", "MySQL", "PostgreSQL", "DynamoDB", "Oracle"],
        "Web & APIs": ["FastAPI", "Flask", "Django", "REST API", "Microservices"],
        "Backend & Messaging": ["Kafka", "Event Bus", "Event-Driven Architecture", "Message Queues"],
        "Testing": ["Pytest", "Unit Testing", "Integration Testing", "Postman", "Bruno"],
        "ML & AI": ["Scikit-learn", "TensorFlow", "Keras", "PyTorch", "XGBoost", "LLMs", "GenAI"],
        "NLP": ["NLTK", "SpaCy", "BERT", "Hugging Face", "LangChain", "RAG", "NER"],
        "Data & Viz": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau"]
    },
    
    "projects": [
        {
            "name": "Facially Expressive GenAI Mental Health Avatar",
            "type": "Master's Research Project",
            "institution": "University of Florida",
            "period": "Jan 2024 – May 2024",
            "github": "https://github.com/JeevanReddy0828/Facially-Expressive-GenAI-Mental-Health-Avatar",
            "description": "A GenAI-powered mental health avatar integrating GPT-3.5, LangChain, and emotional analysis for empathetic, context-aware conversations.",
            "highlights": [
                "Trained Variational Autoencoders (VAE) using PyTorch/TensorFlow on 3D facial data to generate expressions",
                "Built a retrieval-augmented generation (RAG) pipeline leveraging emotional and historical cues",
                "Synchronized lip movement with Eleven Labs TTS for lifelike speech engagement",
                "Conducted user study (n=20) to assess engagement and perceived empathy via two-way ANOVA"
            ],
            "tech": ["GPT-3.5", "LangChain", "PyTorch", "TensorFlow", "RAG", "VAE"]
        },
        {
            "name": "Virtual Cricket Coach Chatbot",
            "github": "https://github.com/JeevanReddy0828/Virtual-Cricket-Coach-chatbot",
            "description": "An AI-powered virtual cricket coach chatbot that generates personalized training plans based on user goals and performance.",
            "highlights": [
                "Built using NLTK framework for natural language processing",
                "Implemented NLP-based intent recognition for answering user queries",
                "Deployed on AWS EC2, ensuring scalability and availability"
            ],
            "tech": ["Python", "NLTK", "AWS EC2", "NLP"]
        },
        {
            "name": "MediMate",
            "github": "https://github.com/JeevanReddy0828/medimate",
            "description": "A healthcare chatbot using advanced Named Entity Recognition (NER) techniques to extract and categorize medical entities.",
            "highlights": [
                "Led development using advanced NER techniques",
                "Improved work efficiency by 10% over BERT baseline model",
                "Optimized sequence labelling and contextual entity recognition"
            ],
            "tech": ["Python", "NLP", "NER", "BERT"]
        },
        {
            "name": "Gator Taxi",
            "github": "https://github.com/JeevanReddy0828/GatorTaxi",
            "description": "A taxi dispatch system using Red-Black Trees and Heaps for efficient ride assignment and fair taxi allocation.",
            "highlights": [
                "Developed using Red-Black Trees and Heaps data structures",
                "Achieved O(log n) efficiency, reducing dispatch time by 20%"
            ],
            "tech": ["C++", "Red-Black Trees", "Heaps", "DSA"]
        }
    ],
    
    "education": [
        {
            "degree": "Master of Science",
            "field": "Computer Science and Engineering",
            "school": "University of Florida",
            "location": "Gainesville, Florida, USA",
            "period": "Aug 2023 – Dec 2024",
            "achievement": "Received scholarship of $4,500 to support master's program"
        },
        {
            "degree": "Bachelor of Technology",
            "field": "Artificial Intelligence",
            "school": "Amity University",
            "location": "Noida, India",
            "period": "Jul 2019 – May 2023"
        }
    ],
    
    "certifications": [
        {
            "name": "AWS Machine Learning - Associate (MLA-C01)",
            "issuer": "Amazon Web Services",
            "year": "2025",
            "link": "https://www.credly.com/badges/0a94e000-3e04-4c28-aeee-b2d0fcdaf047/public_url"
        },
        {
            "name": "REST API Certification",
            "issuer": "HackerRank",
            "year": "2025",
            "link": "https://www.hackerrank.com/certificates/iframe/0aca432695a2"
        },
        {
            "name": "Python Certification",
            "issuer": "HackerRank",
            "year": "2025",
            "link": "https://www.hackerrank.com/certificates/iframe/71d38be5e6b6"
        }
    ]
}

@app.route('/')
def index():
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # In production, you'd handle email sending here
    return jsonify({"status": "success", "message": "Message received!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
