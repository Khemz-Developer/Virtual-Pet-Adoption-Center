

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import apiService from "../services/api";
import PetList from "../components/PetList";
import FilterBar from "../components/FilterBar";
import { pageVariants } from "../utils/constants";
import { toast } from "react-toastify";
import { PDFDocument, rgb } from "pdf-lib";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  // useCallback to avoid dependency warning
  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);

      if (currentFilter === "all") {
        const res = await apiService.getAllPets();
        setPets(res); // Already returns array
      } else {
        const res = await apiService.filterPetsByMood(currentFilter);
        setPets(res); // Already returns array
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch pets. Please try again later.");
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  }, [currentFilter]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleFilterChange = (mood) => {
    setCurrentFilter(mood);
  };

  // Helper function to safely create and trigger downloads
  const downloadPDF = (pdfBytes, fileName) => {
    try {
      console.log("Creating PDF download for:", fileName);
      
      // Create a blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      
      // Create a URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Create a download link element
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = fileName;
      downloadLink.setAttribute("download", fileName); // Ensure download attribute is set
      
      // Make link visible (can help with some browser security policies)
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      
      // Log before clicking
      console.log("Download link created, triggering click");
      
      // Trigger the download
      downloadLink.click();
      
      // Log after clicking
      console.log("Download triggered");
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(pdfUrl);
        console.log("Download cleanup complete");
      }, 1000); // Increased timeout to ensure download starts
      
      return true;
    } catch (error) {
      console.error("Error in downloadPDF function:", error);
      toast.error("Failed to download certificate. Please try again.");
      return false;
    }
  };

  const handleAdoptPet = async (petId) => {
    try {
      console.log("Starting adoption process for pet ID:", petId);
      
      // Call the API to adopt the pet
      await apiService.adoptPet(petId);
      console.log("API adoption successful");
      
      // Find the pet in the current state
      const pet = pets.find((p) => p._id === petId);
      if (!pet) {
        throw new Error("Pet not found in local state");
      }
      
      console.log("Found pet:", pet.name);
      
      // Update local state
      const updatedPets = pets.map((p) => 
        p._id === petId ? { ...p, adopted: true, adoption_date: new Date().toISOString() } : p
      );
      setPets(updatedPets);
      
      // Show success message
      toast.success(`${pet.name} adopted successfully!`);
      
      // Generate PDF Certificate
      console.log("Starting PDF generation");
      
      try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        console.log("PDF document created");
        
        // Add a page to the PDF
        const page = pdfDoc.addPage([612, 792]); // Standard letter size
        const { width, height } = page.getSize();
        console.log("Page added to PDF");
        
        // Add certificate title
        page.drawText("Certificate of Adoption", {
          x: width / 2 - 120,
          y: height - 100,
          size: 28,
          color: rgb(0.3, 0, 0.6), // Purple color
        });
        
        // Add decorative line
        page.drawLine({
          start: { x: 100, y: height - 120 },
          end: { x: width - 100, y: height - 120 },
          thickness: 2,
          color: rgb(0.5, 0.5, 0.5),
        });
        
        // Add pet name (larger and centered)
        page.drawText(`${pet.name}`, {
          x: width / 2 - (pet.name.length * 7),
          y: height - 200,
          size: 24,
          color: rgb(0, 0, 0),
        });
        
        // Add pet details
        const detailsY = height - 250;
        page.drawText(`Species: ${pet.species || "Unknown"}`, {
          x: width / 2 - 100,
          y: detailsY,
          size: 14,
          color: rgb(0, 0, 0),
        });
        
        if (pet.breed) {
          page.drawText(`Breed: ${pet.breed}`, {
            x: width / 2 - 100,
            y: detailsY - 30,
            size: 14,
            color: rgb(0, 0, 0),
          });
        }
        
        if (pet.age) {
          page.drawText(`Age: ${pet.age}`, {
            x: width / 2 - 100,
            y: detailsY - 60,
            size: 14,
            color: rgb(0, 0, 0),
          });
        }
        
        // Format date nicely
        const formattedDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        page.drawText(`Was adopted on: ${formattedDate}`, {
          x: width / 2 - 100,
          y: detailsY - 90,
          size: 14,
          color: rgb(0, 0, 0),
        });
        
        // Thank you message
        page.drawText(`Thank you for giving ${pet.name} a loving forever home!`, {
          x: width / 2 - 140,
          y: detailsY - 150,
          size: 14,
          color: rgb(0, 0, 0),
        });
        
        // Add signature line
        page.drawLine({
          start: { x: width / 2 - 100, y: detailsY - 220 },
          end: { x: width / 2 + 100, y: detailsY - 220 },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
        
        page.drawText("Adoption Center Director", {
          x: width / 2 - 70,
          y: detailsY - 240,
          size: 12,
          color: rgb(0, 0, 0),
        });
        
        // Add footer
        page.drawText("Virtual Pet Adoption Center", {
          x: width / 2 - 80,
          y: 50,
          size: 12,
          color: rgb(0.5, 0.5, 0.5),
        });
        
        console.log("Content added to PDF");
        
        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();
        console.log("PDF saved to bytes, length:", pdfBytes.length);
        
        // Try to show a browser save dialog
        const fileName = `${pet.name}_Adoption_Certificate.pdf`;
        
        // Use our helper function to download the PDF
        const downloadSuccess = downloadPDF(pdfBytes, fileName);
        
        if (downloadSuccess) {
          console.log("PDF download initiated");
        } else {
          console.error("Failed to initiate PDF download");
        }
        
      } catch (pdfError) {
        console.error("Error generating PDF:", pdfError);
        toast.error("Failed to generate adoption certificate. Please try again.");
      }
      
    } catch (err) {
      console.error("Error in adoption process:", err);
      toast.error("Failed to adopt pet. Please try again later.");
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await apiService.deletePet(petId);
      // Remove the pet from the list using _id
      setPets(pets.filter((pet) => pet._id !== petId));
      toast.success("Pet deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete pet. Please try again later.");
      console.error("Error deleting pet:", err);
    }
  };

  return (
    <motion.div
      className="py-6"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-purple-800">
          Virtual Pet Adoption Center
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          Find your perfect furry, feathery, or scaly companion! Browse through
          our available pets and give them a loving home.
        </p>
      </div>

      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
      />

      {error && (
        <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <PetList
          pets={pets}
          onAdoptPet={handleAdoptPet}
          onDeletePet={handleDeletePet}
        />
      )}
    </motion.div>
  );
};

export default HomePage;