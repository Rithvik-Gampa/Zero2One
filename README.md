# 📚 Study Companion AI

An AI-powered full-stack web application that transforms traditional studying into an interactive and personalized learning experience.



---

## 🚀 Overview

Study Companion AI allows students to enter any concept and instantly receive:

- Multi-level explanations (Beginner, Exam-Ready, Real-Life)
- AI-generated examples
- Interactive quizzes with scoring
- Audio explanations (Text-to-Speech)
- User authentication with streak tracking
- Dashboard with history
- Dark/Light mode support

The goal is to make learning active, engaging, and structured rather than passive reading.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS (Custom styling)
- Web Speech API (Text-to-Speech)

### Backend
- FastAPI (Python)
- Uvicorn

### AI Integration
- LLaMA (running locally via Ollama)

### Storage
- LocalStorage (for authentication & streak tracking)

---

## 🏗️ Architecture Diagram

Below is the high-level system architecture:


        ┌──────────────────────────┐
        │        Frontend          │
        │       (React.js)         │
        │                          │
        │  - Concept Input         │
        │  - Tabs (Explain/Quiz)   │
        │  - Audio Controls        │
        │  - Login & Dashboard     │
        └─────────────┬────────────┘
                      │
                      │ REST API (JSON)
                      ▼
        ┌──────────────────────────┐
        │         Backend          │
        │      (FastAPI)           │
        │                          │
        │  - /generate endpoint    │
        │  - Prompt Structuring    │
        │  - JSON Formatting       │
        └─────────────┬────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │        AI Model          │
        │   (LLaMA via Ollama)     │
        │                          │
        │  - Explanation           │
        │  - Examples              │
        │  - Quiz Generation       │
        └──────────────────────────┘


        
### Flow:
1. User enters a concept in React frontend.
2. Frontend sends request to FastAPI backend.
3. Backend sends structured prompt to LLaMA model.
4. AI returns formatted explanation, examples, and quiz.
5. Backend sends JSON response to frontend.
6. Frontend renders content in separate tabs.

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Zero2One.git
cd Zero2One

### 2️⃣ Setup Backend

cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Mac/Linux

pip install -r requirements.txt
uvicorn main:app --reload

3️⃣ Setup Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173


---

## ✨ Key Features

- 📘 Multi-level AI explanations  
- 💡 Example generation  
- ❓ Interactive quiz with scoring  
- 🔊 Text-to-Speech audio explanation  
- 🔥 Streak tracking system  
- 🎨 Dark/Light theme toggle  
- 📊 Dashboard with concept history  

---

## 🎯 Key Highlights

- AI model runs locally (no external API keys required)
- Clean separation of frontend and backend
- Structured JSON formatting for reliable UI rendering
- Responsive modern UI design
- Built and debugged under hackathon time constraints

---

## 🔮 Future Improvements

- Cloud deployment (Vercel + Render)
- User database integration (MongoDB/PostgreSQL)
- Advanced analytics dashboard
- Adaptive quiz difficulty
- Real-time collaborative study mode
- Neural TTS upgrade for realistic voice

---

## 👨‍💻 Team

- Jampana Rithesh
- Geethanandan Pal
- Gampa Rithvik
- Korapole Abhijith

Built during **INNOQUEST #4 – Anurag University**

---

## 📄 License

This project is built for educational and hackathon purposes.

