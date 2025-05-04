import React from 'react';
import { motion } from 'framer-motion';
import { PET_MOODS } from '../utils/constants';
import { getMoodEmoji } from '../utils/helpers';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = ['all', ...PET_MOODS];

  const filterLabels = {
    'all': 'All Pets',
    'Happy': 'Happy Pets',
    'Excited': 'Excited Pets',
    'Sad': 'Sad Pets'
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map(filter => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentFilter === filter
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter !== 'all' && (
              <span className="mr-2">{getMoodEmoji(filter)}</span>
            )}
            {filterLabels[filter]}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;