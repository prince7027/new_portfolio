'use strict';

/*-----------------------------------*\
  #DATA
  Single source of truth consumed by the
  card factories in script.js. Add a new
  project or certificate by adding an
  object here — no HTML editing needed.
\*-----------------------------------*/

const experienceData = [
    {
        role: "ML Engineer Intern",
        company: "Times of India (Times Network)",
        date: "April 2025 – August 2025",
        isCurrent: false,
        bullets: [
            "Developed scalable AI solutions using Python and Java.",
            "Built REST APIs using Spring Boot and Flask.",
            "Worked with MongoDB for high-performance data retrieval.",
            "Developed News Intelligence APIs for multilingual news processing.",
            "Improved backend performance and optimized database queries.",
            "Collaborated on debugging and deploying production-ready systems."
        ],
        certLink: "https://drive.google.com/file/d/14yQRqn3L5WUDtEe5HhZ2WVQQWmbEaSnc/view?usp=drive_link",
        companyLink: "#"
    }
];

const skillsData = [
    {
        category: "Languages",
        items: [
            { name: "Python", color: "blue" },
            { name: "Java", color: "red" },
            { name: "C++", color: "indigo" },
            { name: "SQL", color: "yellow" }
        ]
    },
    {
        category: "AI/ML",
        items: [
            { name: "Scikit-learn", color: "green" },
            { name: "TensorFlow", color: "orange" },
            { name: "PyTorch", color: "red" },
            { name: "Pandas", color: "blue" },
            { name: "NumPy", color: "indigo" }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Spring Boot", color: "green" },
            { name: "Flask", color: "blue" },
            { name: "FastAPI", color: "teal" },
            { name: "REST API", color: "purple" }
        ]
    },
    {
        category: "Database",
        items: [
            { name: "MongoDB", color: "green" },
            { name: "MySQL", color: "blue" }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Git", color: "red" },
            { name: "GitHub", color: "gray" },
            { name: "VS Code", color: "blue" },
            { name: "Postman", color: "orange" },
            { name: "Docker", color: "blue" }
        ]
    }
];

const projectsData = [
    {
        title: "AI Support Chatbot",
        created: "2026-01-10",
        updated: "2026-05-12",
        description: "Intelligent chatbot using LLMs and retrieval-augmented generation for accurate and context-aware responses.",
        github: "https://github.com/username/ai-chatbot",
        demo: "https://demo.example.com/ai-chatbot",
        thumbColor: "blue",
        icon: "chatbubble-ellipses-outline",
        tags: [
            { label: "Python", color: "purple" },
            { label: "Flask", color: "indigo" },
            { label: "NLP", color: "blue" }
        ]
    },
    {
        title: "Fraud Detection System",
        created: "2025-11-05",
        updated: "2026-02-20",
        description: "ML-based system to detect fraudulent transactions with high accuracy using advanced classification models.",
        github: "https://github.com/username/fraud-detection",
        demo: "https://demo.example.com/fraud-detection",
        thumbColor: "purple",
        icon: "shield-checkmark-outline",
        tags: [
            { label: "Python", color: "green" },
            { label: "XGBoost", color: "teal" },
            { label: "Sklearn", color: "blue" }
        ]
    },
    {
        title: "News Intelligence API",
        created: "2026-03-01",
        updated: "2026-06-10",
        description: "RESTful API that aggregates news from multiple sources and provides real-time intelligence.",
        github: "https://github.com/username/news-api",
        demo: "https://demo.example.com/news-api",
        thumbColor: "teal",
        icon: "newspaper-outline",
        tags: [
            { label: "Java", color: "blue" },
            { label: "Spring Boot", color: "indigo" },
            { label: "MongoDB", color: "green" }
        ]
    },
    {
        title: "Price Prediction Engine",
        created: "2025-08-15",
        updated: "2026-01-22",
        description: "Predictive analytics engine that forecasts prices using time series analysis and regression models.",
        github: "https://github.com/username/price-engine",
        demo: "https://demo.example.com/price-engine",
        thumbColor: "indigo",
        icon: "trending-up-outline",
        tags: [
            { label: "Python", color: "purple" },
            { label: "ML", color: "pink" },
            { label: "Pandas", color: "blue" }
        ]
    }
];

const certificatesData = [
    {
        displayTitle: "Improving Deep Neural Networks",
        title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
        org: "DeepLearning.AI | Coursera",
        orgShort: "DeepLearning.AI",
        date: "27 April 2024",
        issued: "Apr 2024",
        id: "DWQPL6E9ERQ5",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/DWQPL6E9ERQ5",
        description: "An intensive course by Andrew Ng covering hyperparameter tuning, regularization (L2, dropout), optimization algorithms (RMSprop, Adam), and batch normalization.",
        skills: ["Deep Learning", "Hyperparameter Tuning", "TensorFlow", "Optimization", "Regularization"],
        image: "./assets/images/deeplearning.ai.png"
    },
    {
        displayTitle: "Neural Networks and Deep Learning",
        title: "Neural Networks and Deep Learning",
        org: "DeepLearning.AI | Coursera",
        orgShort: "DeepLearning.AI",
        date: "25 April 2024",
        issued: "Apr 2024",
        id: "R3P2EJKB4X7U",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/R3P2EJKB4X7U",
        description: "Covered the foundations of deep learning, building and training fully connected deep neural networks, and understanding key parameters of network architecture.",
        skills: ["Deep Learning", "Neural Networks", "Python", "Backpropagation", "Forward Propagation"],
        image: "./assets/images/deeplearning.ai.png"
    },
    {
        displayTitle: "NLP with Classification & Vector Spaces",
        title: "Natural Language Processing with Classification and Vector Spaces",
        org: "DeepLearning.AI | Coursera",
        orgShort: "DeepLearning.AI",
        date: "9 April 2024",
        issued: "Apr 2024",
        id: "KJBGZGNZKTSU",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/KJBGZGNZKTSU",
        description: "Explored natural language processing applications including sentiment analysis, word embeddings, vector spaces, and machine translation models.",
        skills: ["NLP", "Classification", "Vector Spaces", "Machine Translation", "Sentiment Analysis"],
        image: "./assets/images/deeplearning.ai.png"
    },
    {
        displayTitle: "Geodata Processing using Python",
        title: "Geodata Processing using Python",
        org: "IIRS – Indian Institute of Remote Sensing, ISRO",
        orgShort: "IIRS, ISRO",
        date: "26 January 2024",
        issued: "Jan 2024",
        id: "2024233977776",
        issuedTo: "Prince Garg",
        credentialUrl: "https://drive.google.com/file/d/1WG7Lkk6q4i-MEgLn7usx4pt2J1Drn1J6/view?usp=drive_link",
        description: "An online course on geographic data processing techniques, spatial analysis, and processing GIS data sets using Python ecosystems.",
        skills: ["Python", "Geodata Processing", "GIS", "Spatial Data Analysis", "Remote Sensing"],
        image: "./assets/images/isro.png"
    },
    {
        displayTitle: "Intro to High-Performance & Parallel Computing",
        title: "Introduction to High-Performance and Parallel Computing",
        org: "University of Colorado Boulder | Coursera",
        orgShort: "University of Colorado Boulder",
        date: "1 November 2023",
        issued: "Nov 2023",
        id: "AD54TNS4QLMQ",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/AD54TNS4QLMQ",
        description: "Introduced core principles of high-performance computing, cluster architectures, multi-threading, and parallel programming techniques.",
        skills: ["High-Performance Computing", "Parallel Computing", "Multi-threading", "Cluster Architecture"],
        image: "./assets/images/gu.png"
    },
    {
        displayTitle: "Image and Video Processing",
        title: "Image and Video Processing: From Mars to Hollywood with a Stop at the Hospital",
        org: "Duke University | Coursera",
        orgShort: "Duke University",
        date: "12 August 2023",
        issued: "Aug 2023",
        id: "XKJYKUT6AGGE",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/XKJYKUT6AGGE",
        description: "Explored signal and image processing methodologies, covering compression, restoration, medical imaging, and computer vision utilities.",
        skills: ["Image Processing", "Video Processing", "Computer Vision", "Signal Processing", "MATLAB"],
        image: "./assets/images/duke.png"
    },
    {
        displayTitle: "Software Engineering: Design & Management",
        title: "Software Engineering: Software Design and Project Management",
        org: "The Hong Kong University of Science and Technology | Coursera",
        orgShort: "HKUST",
        date: "16 September 2022",
        issued: "Sep 2022",
        id: "TKCX7EEPUJXC",
        issuedTo: "Prince Garg",
        credentialUrl: "https://coursera.org/verify/TKCX7EEPUJXC",
        description: "Learned design principles, architecture styles, software life cycles, and key concepts of agile project management methodologies.",
        skills: ["Software Engineering", "Software Design", "Project Management", "Agile", "System Architecture"],
        image: "./assets/images/hkust.png"
    },
    {
        displayTitle: "Flutter & Dart - The Complete Guide",
        title: "Flutter & Dart - The Complete Guide [2022 Edition]",
        org: "Udemy",
        orgShort: "Udemy",
        date: "19 September 2022",
        issued: "Sep 2022",
        id: "UC-df831417-e59f-45e8-bf6e-0853d7408cfc",
        issuedTo: "Prince Garg",
        credentialUrl: "https://ude.my/UC-df831417-e59f-45e8-bf6e-0853d7408cfc",
        description: "A massive, comprehensive program building production-ready mobile applications for iOS and Android using Flutter SDK and the Dart programming language.",
        skills: ["Flutter", "Dart", "Mobile App Development", "Cross-Platform", "State Management"],
        image: "./assets/images/udemy.png"
    }
];