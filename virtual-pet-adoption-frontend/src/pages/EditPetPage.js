import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import apiService from '../services/api';
import PetForm from '../components/PetForm';
import { pageVariants } from '../utils/constants';

const EditPetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPetById(id);
        setPet(data);
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
        console.error('Error fetching pet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = async (petData) => {
    try {
      await apiService.updatePet(id, petData);
      toast.success('Pet updated successfully!');
      navigate(`/pet/${id}`);
    } catch (error) {
      toast.error('Failed to update pet. Please try again.');
      console.error('Error updating pet:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto my-8">
        {error}
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-700">Pet not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-2xl mx-auto py-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-700 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Edit Pet: {pet.name}</h1>
          <p className="text-purple-200">Update details for this pet</p>
        </div>
        
        <div className="p-6">
          <PetForm 
            onSubmit={handleSubmit} 
            initialData={{
              name: pet.name,
              species: pet.species,
              age: pet.age,
              personality: pet.personality
            }} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EditPetPage;