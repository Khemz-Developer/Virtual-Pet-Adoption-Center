import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "./services/api";

// Import pages
import HomePage from "./pages/HomePage";
import AddPetPage from "./pages/AddPetPage";
import EditPetPage from "./pages/EditPetPage";
import PetDetailPage from "./pages/PetDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import PersonalityQuiz from "./pages/PersonalityQuiz";
// Import components
import Navbar from "./components/Navbar";

// Import styles
import "./styles/global.css";

function App() {
  

  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from API or local data
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await apiService.getAllPets();
      setPets(data);
    } catch (err) {
      console.error("Error fetching pets:", err);
    } finally {
    }
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        
        <main className="container px-4 py-8 mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-pet" element={<AddPetPage />} />
            <Route path="/edit-pet/:id" element={<EditPetPage />} />
            <Route path="/pet/:id" element={<PetDetailPage />} />
            <Route
              path="/quiz"
              element={
                <PersonalityQuiz pets={pets}  />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
