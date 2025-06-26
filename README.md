# ZenBOT  
# 🌿 ZenBot – Smart AI Wellness Companion

ZenBot is a personalized wellness web app powered by AI agents, designed specifically for students. It helps users manage their mood, fitness, diet, and daily habits — all in one sleek dashboard.

## 🧠 Features

### ✅ Mental Health Agent
- Input: Mood (e.g., "stressed", "happy")
- Output: Music suggestions + wellness tips

### ✅ Diet Agent
- Input: Health goal (e.g., "muscle gain", "glowing skin")
- Output: Customized diet recommendation

### ✅ Fitness Agent
- Input: Energy level (e.g., "low", "high")
- Output: Suggested workouts tailored to energy level

### ✅ Goal Tracker Agent
- Input: Water intake, sleep hours, focus hours
- Output: Daily lifestyle summary and improvement advice

---

## 🔐 Authentication

ZenBot includes secure login and registration with JWT token-based session handling.

- `Register`: Create a new account
- `Login`: Authenticate and receive token
- `Dashboard`: Token-protected, shows all agents and logout

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router
- JWT Auth

### Backend
- FastAPI (Python)
- Pydantic (Validation)
- CORS Middleware

---

## 🚀 How to Run Locally

1. npm install
2. npm run dev

## 🌐 API Endpoints

| Endpoint           | Method | Description                        |
|--------------------|--------|------------------------------------|
| `/register`        | POST   | Register user                      |
| `/login`           | POST   | User login with token              |
| `/mental-health`   | POST   | Mood analysis + music suggestion   |
| `/diet`            | POST   | Get personalized diet              |
| `/fitness`         | POST   | Get fitness plan                   |
| `/goal-tracker`    | POST   | Get daily habit summary            |

---

## 💡 Why ZenBot?

- Made by students, for students
- Fully agent-powered intelligent system
- Supports emotional, physical, and behavioral health
- Extendable & hackathon-ready

---

## 📃 License

This project is open source and available under the MIT License.

---

🏁 Built with ❤️ for the StartWell Student Wellness Hackathon
