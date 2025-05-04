import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import apiService from '../services/api';
import PetForm from '../components/PetForm';
import { pageVariants } from '../utils/constants';

const AddPetPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (petData) => {
    try {
      await apiService.createPet(petData);
      toast.success('Pet added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add pet. Please try again.');
      console.error('Error adding pet:', error);
    }
  };

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
          <h1 className="text-2xl font-bold">Add a New Pet</h1>
          <p className="text-purple-200">Fill out the form to add a new pet for adoption</p>
        </div>
        
        <div className="p-6">
          <PetForm onSubmit={handleSubmit} />
        </div>
      </div>
    </motion.div>
  );
};

export default AddPetPage;