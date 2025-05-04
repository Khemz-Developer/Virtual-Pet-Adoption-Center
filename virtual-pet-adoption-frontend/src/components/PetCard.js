
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import { getMoodEmoji, getPetIcon, getMoodColorClass, getTimeSince } from '../utils/helpers';
import { MOOD_ANIMATIONS } from '../utils/constants';

const PetCard = ({ pet, onAdopt, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  // Use pet._id instead of pet.id
  const petId = pet._id;

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
    setShowConfirmDelete(false);
  };

  const handleDeleteCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmDelete(false);
  };

  const handleAdoptClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdopt();
  };

  const moodAnimation = pet.mood ? MOOD_ANIMATIONS[pet.mood] : {};
  const moodColorClass = getMoodColorClass(pet.mood);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${moodColorClass} px-4 py-3 flex justify-between items-center`}>
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">{getPetIcon(pet.species)}</span>
          {pet.name}
        </h2>
        <motion.div 
          className="text-2xl"
          animate={moodAnimation}
        >
          {getMoodEmoji(pet.mood)}
        </motion.div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            {pet.age} {pet.age === 1 ? 'year' : 'years'} old • {pet.species}
          </div>
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm inline-block">
            {pet.personality}
          </div>
          <div className="mt-2">
            <span className={`${pet.adopted ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'} px-2 py-1 rounded text-sm`}>
              {pet.adopted ? 'Adopted' : 'Available'}
            </span>
          </div>
          {pet.adopted && pet.adoption_date && (
            <div className="mt-2 text-sm text-gray-600">
              Adopted {getTimeSince(pet.adoption_date)}
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons - Guaranteed visible with correct IDs */}
      <div className="bg-gray-100 p-3 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link 
              to={`/pet/${petId}`} 
              className="bg-purple-500 text-white hover:bg-purple-600 p-2 rounded flex items-center"
              title="View details"
            >
              <FaInfoCircle size={18} />
            </Link>
            <Link 
              to={`/edit-pet/${petId}`} 
              className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded flex items-center" 
              title="Edit pet"
            >
              <FaEdit size={18} />
            </Link>
            <button 
              onClick={handleDeleteClick} 
              className="bg-red-500 text-white hover:bg-red-600 p-2 rounded flex items-center"
              title="Delete pet"
            >
              <FaTrash size={18} />
            </button>
          </div>
          
          {!pet.adopted && (
            <button 
              onClick={handleAdoptClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center font-medium"
              title="Adopt this pet"
            >
              <FaHeart className="mr-2" /> Adopt
            </button>
          )}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg p-6 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete {pet.name}? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PetCard;