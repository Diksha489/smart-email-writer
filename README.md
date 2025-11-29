📧 Smart Email Writer – AI-Powered Email Assistant  
Smart Email Writer is a full-stack AI application that automatically generates professional email replies using Google Gemini, React, and Spring Boot.
It supports tone customization, dark mode, animated AI typing, and quick templates.  

🚀 Features  
✨ AI Email Reply Generator  
Paste any email → AI generates a perfect reply.  
Uses Google Gemini (Vertex AI).  

🎭 Tone Customization  
Choose from multiple tones:  
Friendly  
Professional  
Polite  
Formal  
Academic  
Short  
Detailed  
Cheerful  
Corporate  
…and more.  

⚡ Animated AI Typing Effect  
AI writes the reply letter-by-letter like ChatGPT.  

🌓 Dark Mode Support  
Beautiful dark UI with theme-aware colors.  

📌 Quick Suggestions Panel   
Ready-made templates:  
Apology email  
Follow-up  
Job application  
Thank-you  
Interview response  
Support request  

🖥 Full-Stack Architecture  
Frontend: React + Material UI + Vite  
Backend: Spring Boot + WebClient  
AI Engine: Google Gemini 2.0 Flash (Vertex AI)  

🏗 Tech Stack  
Frontend  
React (Vite)  
Material UI  
Axios  
JavaScript (ES6)  

Backend  
Spring Boot (3.5)  
Java  
WebClient (Reactive)  
Maven  
AI Model  

Google Gemini 2.0 Flash (Vertex AI)  

📂 Folder Structure  
smart-email-writer/  
│── email-writer-react/         # React frontend  
│── src/main/java/...           # Spring Boot backend  
│── src/main/resources/  
│── pom.xml  
│── README.md  
│── LICENSE  
│── COPYRIGHT  

⚙️ Installation & Setup  
🟦 Backend (Spring Boot)  
cd email-writer-sb  
mvnw.cmd spring-boot:run  

🟩 Frontend (React)  
cd email-writer-react  
npm install  
npm run dev  

Backend runs on:  
👉 http://localhost:8080  

Frontend runs on:  
👉 http://localhost:5173  

🔑 Environment Setup  
In application.properties  
gemini.api.key=YOUR_ACCESS_TOKEN  
(Using OAuth access token from Google Cloud CLI)  

🧠 How It Works (Flow)  
1️⃣ User pastes email → chooses tone  
2️⃣ React sends request to Spring Boot  
3️⃣ Spring Boot calls Google Gemini API  
4️⃣ Gemini generates a reply  
5️⃣ Backend sends text to frontend  
6️⃣ AI typing animation displays response  

📜 License & Copyright  
Smart Email Writer   
Copyright (c) 2025   
Diksha Pal    
All rights reserved.  

This project is NOT open source.  
Copying or redistribution is prohibited.  

⭐ Support / Connect  
If you like this project, consider giving the repo a ⭐ star!
