import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PetCard from './PetCard';
import { listItemVariants } from '../utils/constants';

const PetList = ({ pets, onAdoptPet, onDeletePet }) => {
  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-600">No pets available at the moment</h2>
        <p className="text-gray-500 mt-2">Check back later or add a new pet for adoption.</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet, index) => (
          <motion.div
            key={pet._id} // Use _id instead of id
            custom={index}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <PetCard 
              pet={pet} 
              onAdopt={() => onAdoptPet(pet._id)} // Use _id instead of id
              onDelete={() => onDeletePet(pet._id)} // Use _id instead of id
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default PetList;