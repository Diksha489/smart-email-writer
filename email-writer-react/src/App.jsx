/*
  Copyright (c) 2025 Diksha Pal
  All rights reserved.

  Unauthorized copying, modification, or redistribution is prohibited.
*/

import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Switch,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import MoodIcon from "@mui/icons-material/Mood";
import WorkIcon from "@mui/icons-material/Work";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ErrorIcon from "@mui/icons-material/Error";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SubjectIcon from "@mui/icons-material/Subject";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import axios from "axios";

export default function App() {

  // Inject CSS directly into document
  useEffect(() => {
    const css = `
      .app-container {
        min-height: 100vh;
        display: flex;
      }
      .app-container.light {
        background: linear-gradient(135deg, #dfe9f3, #ffffff);
        color: #000;
      }
      .app-container.dark {
        background: #1A1A1A;
        color: #E0E0E0;
      }
      .sidebar {
        width: 280px;
        padding: 16px;
        border-left: 1px solid #ccc;
        background: #ffffff;
      }
      .app-container.dark .sidebar {
        background: #242424;
        border-left: 1px solid #333;
      }
      .sidebar-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 14px;
        background: linear-gradient(90deg, #1976d2, #512da8);
        -webkit-background-clip: text;
        color: transparent;
      }
      .sidebar-item {
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .dark-item { background: #1A1A1A; color:white; }
      .light-item { background: #f4f4f4; color:black; }

      .main-area { padding-top: 40px; width:100%; }
      .main-title {
        font-size: 2.8rem;
        text-align: center;
        font-weight: 700;
        margin-bottom: 30px;
        background: linear-gradient(90deg, #1976d2, #512da8);
        -webkit-background-clip: text;
        color: transparent;
      }
      .main-card {
        border-radius: 18px;
        background: white;
      }
      .app-container.dark .main-card {
        background: #242424;
        color: white;
      }
      .tone-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tone-btn {
        text-transform: none;
        border-radius: 50px;
      }
      .generate-btn {
        padding: 14px;
        font-size: 1.1rem;
        font-weight: 600;
        background: linear-gradient(90deg, #1976d2, #512da8) !important;
        margin-top: 30px;
      }
      .reply-box {
        padding: 16px;
        min-height: 180px;
        border-radius: 12px;
        background: #f7f7f7;
        white-space: pre-wrap;
      }
      .app-container.dark .reply-box {
        background: #1E1E1E;
      }
    `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [typedReply, setTypedReply] = useState("");

  const templates = [
    { title: "Follow-up Email", content: "I hope you're doing well. I'm following up..." },
    { title: "Thank You Email", content: "Thank you so much for your support..." },
    { title: "Job Application Reply", content: "I wanted to express my gratitude..." },
    { title: "Interview Acknowledgement", content: "Thank you for the opportunity..." },
    { title: "Complaint / Support Request", content: "I'm writing to bring an issue..." },
    { title: "Apology Email", content: "I sincerely apologize for the inconvenience..." },
  ];

  const tones = [
    { label: "Friendly", icon: <MoodIcon /> },
    { label: "Professional", icon: <WorkIcon /> },
    { label: "Polite", icon: <HandshakeIcon /> },
    { label: "Positive", icon: <ThumbUpIcon /> },
    { label: "Formal", icon: <EmailIcon /> },
    { label: "Urgent", icon: <ErrorIcon /> },
    { label: "Short", icon: <FlashOnIcon /> },
    { label: "Detailed", icon: <SubjectIcon /> },
    { label: "Neutral", icon: <AcUnitIcon /> },
    { label: "Cheerful", icon: <EmojiEmotionsIcon /> },
    { label: "Academic", icon: <SchoolIcon /> },
    { label: "Corporate", icon: <BusinessCenterIcon /> },
  ];

  const generateReply = async () => {
    if (!emailContent.trim()) return;
    setLoading(true);
    setReply("");
    setTypedReply("");

    try {
      const res = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setReply(res.data);
    } catch (err) {
      setReply("⚠️ Error generating reply.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!reply) return;
    let i = 0;
    setTypedReply("");
    const interval = setInterval(() => {
      setTypedReply((prev) => prev + reply.charAt(i));
      i++;
      if (i >= reply.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [reply]);

  return (
    <Box className={`app-container ${darkMode ? "dark" : "light"}`}>
      
      {/* SIDEBAR */}
      <Box className="sidebar">
        <Typography className="sidebar-title">Quick Suggestions ⚡</Typography>

        <List>
          {templates.map((t, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => setEmailContent(t.content)}
              className={`sidebar-item ${darkMode ? "dark-item" : "light-item"}`}
            >
              <ListItemText primary={t.title} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography sx={{ flexGrow: 1 }}>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>
      </Box>

      {/* MAIN */}
      <Container maxWidth="md" className="main-area">
        <Typography className="main-title">✨ AI Email Assistant</Typography>

        <Card className="main-card">
          <CardContent sx={{ p: 4 }}>

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Original Email Content
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the email you received..."
              sx={{
                mb: 3,
                "& .MuiInputBase-input": { color: darkMode ? "#fff" : "#000" },
                "& .MuiInputBase-root": { background: darkMode ? "#1E1E1E" : "#fff" },
              }}
            />

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Tone
            </Typography>

            <Box className="tone-buttons">
              {tones.map((t) => (
                <Button
                  key={t.label}
                  variant={tone === t.label ? "contained" : "outlined"}
                  startIcon={t.icon}
                  onClick={() => setTone(t.label)}
                  className="tone-btn"
                  sx={{
                    borderRadius: 5,
                    background:
                      tone === t.label ? "linear-gradient(90deg, #1976d2, #512da8)" : "",
                  }}
                >
                  {t.label}
                </Button>
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={generateReply}
              className="generate-btn"
            >
              Generate Reply
            </Button>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Generated Reply:
              </Typography>

              <Paper
                className="reply-box"
                sx={{ color: darkMode ? "#fff" : "#000" }}
              >
                {loading ? "Generating reply..." : typedReply}
              </Paper>

              {reply && (
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => navigator.clipboard.writeText(reply)}
                >
                  Copy to Clipboard
                </Button>
              )}
            </Box>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
