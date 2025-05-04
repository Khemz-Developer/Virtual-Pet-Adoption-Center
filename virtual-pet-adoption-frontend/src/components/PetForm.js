import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';
import { PET_SPECIES, PET_PERSONALITIES } from '../utils/constants';

const PetForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    species: initialData?.species || PET_SPECIES[0],
    age: initialData?.age || 1,
    personality: initialData?.personality || PET_PERSONALITIES[0]
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.species) {
      newErrors.species = 'Species is required';
      isValid = false;
    }

    if (formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
      isValid = false;
    }

    if (!formData.personality) {
      newErrors.personality = 'Personality is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Pet Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter pet name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
          Species
        </label>
        <select
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.species ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {PET_SPECIES.map(species => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
        {errors.species && <p className="mt-1 text-sm text-red-500">{errors.species}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age (years)
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min="0"
          step="1"
          value={formData.age}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="personality" className="block text-sm font-medium text-gray-700 mb-1">
          Personality
        </label>
        <select
          id="personality"
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.personality ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {PET_PERSONALITIES.map(personality => (
            <option key={personality} value={personality}>
              {personality}
            </option>
          ))}
        </select>
        {errors.personality && <p className="mt-1 text-sm text-red-500">{errors.personality}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center">
          <FaTimes className="mr-2" /> Cancel
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
        >
          <FaSave className="mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Pet'}
        </motion.button>
      </div>
    </form>
  );
};

export default PetForm;