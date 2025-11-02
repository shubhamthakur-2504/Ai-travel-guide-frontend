# 🌍 AI Trip Guide – Frontend

**AI Trip Guide** is a smart travel planning web app that generates personalized itineraries using AI.  
It helps users plan trips based on their destination, travel days, budget, journey type, and food preferences — complete with real-time location suggestions.

🧠 **Backend Repo:**  
👉 [AI Trip Guide Backend (Node.js + Express)](https://github.com/shubhamthakur-2504/Ai-travel-guide-backend)

---

## ✨ Features

- 🧭 **Live location autocomplete** (Geoapify Places API)
- ✈️ **AI-powered itinerary generation**
- 💸 Budget, food, and journey type preferences
- 👨‍👩‍👧‍👦 Adaptive UI for solo, couple, and family trips
- ⚡ Fast performance with **Vite + Tailwind + shadcn/ui**
- 🧭 Smooth navigation using **React Router DOM**
- 💫 Animated UI with **Framer Motion**

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Routing** | React Router DOM |
| **API** | Axios + Geoapify API |
| **Animation** | Framer Motion |

---

## ⚙️ Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-trip-guide-frontend.git
cd ai-trip-guide-frontend
2. Install Dependencies
npm install

Required Libraries
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 🧩 Setup shadcn/ui

### Initialize and add UI components:
```
npx shadcn@latest init
npx shadcn@latest add button card input select
```

## 🌍 Geoapify API Setup

Create a free account at https://www.geoapify.com/

Get your API key from the Geoapify dashboard.

Create a .env file in the frontend folder:
```
VITE_BACKEND_URL=https://ai-travel-guide-backend.onrender.com
VITE_GEOAPIFY_KEY=your_geoapify_api_key

If you're running the backend locally, set
VITE_BACKEND_URL=http://localhost:5000
```

### 🚀 Run the Project
```
npm run dev
```

Now open your browser and visit
👉 http://localhost:5173

### 💡 Usage

Start typing a location — autocomplete powered by Geoapify

Fill in preferences (days, budget, journey type, etc.)

Click "Generate Itinerary"

The frontend sends your input to the backend for trip generation

View your personalized AI-generated itinerary instantly!