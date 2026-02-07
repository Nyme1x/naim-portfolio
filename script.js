// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }

    lastScrollPosition = currentScroll;
});

// 3D Code Blocks Mouse Tracking
const codeContainer = document.getElementById('codeContainer');
const code3d = document.querySelector('.code-3d');

if (codeContainer && code3d) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;

        // Calculate rotation based on mouse position
        const rotateY = (mouseX - 50) * 0.3;
        const rotateX = (50 - mouseY) * 0.3;

        code3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        code3d.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and experience items
document.querySelectorAll('.project-card, .experience-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Set up initial animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animation = `slideUp 0.8s ease ${index * 0.1}s backwards`;
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    html.classList.add('dark-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        
        // Save preference
        const theme = html.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

/* ===========================
   SKILL TAG DEFINITIONS
   =========================== */

const skillModal = document.getElementById('skillModal');
const skillModalClose = document.querySelector('.skill-modal-close');
const skillName = document.getElementById('skillName');
const skillDefinition = document.getElementById('skillDefinition');

// Add click listeners to all skill tags and project tech items
document.querySelectorAll('.tag[data-skill], .project-tech li[data-skill]').forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', (e) => {
        const skill = e.target.getAttribute('data-skill');
        const definition = e.target.getAttribute('data-definition');
        
        if (skill && definition) {
            skillName.textContent = skill;
            skillDefinition.textContent = definition;
            skillModal.classList.add('active');
        }
    });
});

// Close skill modal
skillModalClose.addEventListener('click', () => {
    skillModal.classList.remove('active');
});

// Close skill modal when clicking outside
skillModal.addEventListener('click', (e) => {
    if (e.target === skillModal) {
        skillModal.classList.remove('active');
    }
});

/* ===========================
   NAIMAI CHATBOT
   =========================== */

const naimaiButton = document.getElementById('naimaiButton');
const naimaiModal = document.getElementById('naimaiModal');
const closeChatbot = document.getElementById('closeChatbot');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

// Toggle chatbot modal
naimaiButton.addEventListener('click', () => {
    naimaiModal.classList.toggle('active');
    document.documentElement.classList.toggle('naimai-open');
    
    if (naimaiModal.classList.contains('active')) {
        userInput.focus();
        
        // Show welcome message if no messages yet
        if (chatMessages.children.length === 0) {
            addBotMessage('Hey there! 👋 I\'m NaimBot, your AI guide to all things Naim. Ask me anything—about his projects, skills, experience, vision, or just fun facts about him. I\'m here to help! 💡');
            addSuggestedQuestions();
        }
    }
});

// Close chatbot
closeChatbot.addEventListener('click', () => {
    naimaiModal.classList.remove('active');
    document.documentElement.classList.remove('naimai-open');
});

// Send message function
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addUserMessage(message);
        userInput.value = '';
        
        // Get AI response
        getAIResponse(message);
    }
}

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add user message to chat
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="message-bubble">${escapeHtml(message)}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `<div class="message-bubble">${escapeHtml(message)}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML special characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Add suggested questions
function addSuggestedQuestions() {
    const suggestedQuestions = [
        "Tell me about Naim's projects",
        "What's his favorite tech stack?",
        "What does Naim want to accomplish?",
        "What's he passionate about?"
    ];
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggested-questions';
    suggestionsDiv.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
        padding: 0 12px;
    `;
    
    suggestedQuestions.forEach(question => {
        const btn = document.createElement('button');
        btn.textContent = question;
        btn.style.cssText = `
            padding: 8px 16px;
            background: linear-gradient(135deg, #0066cc 0%, #00a8ff 100%);
            border: 1px solid #00d4ff;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        `;
        
        btn.addEventListener('mouseover', () => {
            btn.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.3)';
            btn.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('click', () => {
            userInput.value = question;
            sendMessage();
            suggestionsDiv.remove();
        });
        
        suggestionsDiv.appendChild(btn);
    });
    
    chatMessages.appendChild(suggestionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get AI response from ChatGPT API
function getAIResponse(userMessage) {
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.setAttribute('data-typing', 'true');
    typingDiv.innerHTML = '<div class="message-bubble">Thinking...</div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate thinking delay and call ChatGPT API
    setTimeout(() => {
        try {
            // Call Netlify Function
            fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    systemPrompt: `You are NaimBot, an AI assistant that represents Naim Albadawi. You have extensive knowledge about Naim from this biography:

Naim Albadawi is a highly motivated, reflective, and purpose-driven software engineer who approaches both technology and life with depth, discipline, and intentionality, consistently prioritizing understanding, impact, and long-term growth over shortcuts or surface-level success. He has hands-on experience across full-stack development, backend systems, databases, IT infrastructure, and applied artificial intelligence, and he is especially interested in building systems that are secure, scalable, and genuinely useful to real people.

Naim has worked on diverse projects including:
- 3D Body Scanning Capstone: A secure, privacy-aware pipeline for biometric data with computer vision algorithms
- Ongoing Living & Learning Project: React + MongoDB web app for children with disabilities
- Collectiverse Card Game: Full-stack card platform with MySQL and JWT authentication
- VitalityAI: AI health platform with Next.js, Python, ML models (Logistic Regression, SVMs), and NLP

Key traits: Python is his favorite language, soccer is his favorite sport, values security and privacy first, believes in continuous learning, treats failure as feedback, prioritizes meaningful work over quick wins.

Answer all questions as if you're representing Naim. Be friendly, use emojis, and provide detailed insights. If asked something outside your knowledge, stay in character and make educated guesses based on his values and philosophy.`
                })
            })
            .then(response => response.json())
            .then(data => {
                // Remove typing indicator
                const typingElement = chatMessages.querySelector('[data-typing="true"]');
                if (typingElement) {
                    typingElement.remove();
                }
                
                // Add bot response
                if (data.response) {
                    addBotMessage(data.response);
                } else {
                    addBotMessage("Sorry, something went wrong. Please try again!");
                }
            })
            .catch(error => {
                console.error('Error calling ChatGPT API:', error);
                
                // Remove typing indicator
                const typingElement = chatMessages.querySelector('[data-typing="true"]');
                if (typingElement) {
                    typingElement.remove();
                }
                
                // Show friendly error message
                addBotMessage("Oops! I'm having trouble connecting. Make sure your backend API is running and properly configured. 🚀");
            });
        } catch (error) {
            console.error('Error getting AI response:', error);
            
            // Remove typing indicator
            const typingElement = chatMessages.querySelector('[data-typing="true"]');
            if (typingElement) {
                typingElement.remove();
            }
            
            // Show friendly error message
            addBotMessage("Something went wrong. Please try again!");
        }
    }, 500);
}

