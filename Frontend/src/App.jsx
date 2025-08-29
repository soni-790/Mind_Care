import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HealthProvider } from "./context/HealthContext";
import { useEffect, useState } from "react";
import axios from "axios";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PWAPrompt from "./components/PWAPrompt";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ShareFloatingButton from "./components/ShareFloatingButton";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages") // Backend API
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  return (
    <AuthProvider>
      <HealthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <ProtectedRoute>
              <Navbar />

              {/* Example: show backend messages */}
              {messages.length > 0 ? (
                <div className="bg-white p-4 m-4 rounded shadow">
                  <h2 className="text-lg font-semibold mb-2">MindCare Messages</h2>
                  {messages.map((msg) => (
                    <p key={msg._id}>{msg.text}</p>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-4 m-4 rounded shadow">
                  <p>No messages found</p>
                </div>
              )}

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/assessment" element={<Assessment />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>

              <Footer />
              <PWAPrompt />
              <ShareFloatingButton />
            </ProtectedRoute>
          </div>
        </Router>
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;
