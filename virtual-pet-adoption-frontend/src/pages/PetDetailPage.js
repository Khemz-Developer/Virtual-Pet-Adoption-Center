import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { getMoodEmoji, getPetIcon, getMoodColorClass } from '../utils/helpers';
import apiService from '../services/api';

const PetDetailsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('PetDetailsPage rendered with id:', id);
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
       
        const petData = await apiService.getPetById(id);
        setPet(petData.data);
        console.log('Fetched pet data:', petData.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pet details:', err);
        setError('Failed to load pet details. Please try again.');
        setLoading(false);
      }
    };

    if (id) {
      fetchPetDetails();
    }
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container p-6 mx-auto">
        <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <div className="mt-4">
          <Link to="/" className="flex items-center text-purple-600 hover:text-purple-800">
            <FaArrowLeft className="mr-2" /> Back to Pets
          </Link>
        </div>
      </div>
    );
  }

  // Handle case where pet data is not found
  if (!pet) {
    return (
      <div className="container p-6 mx-auto">
        <div className="relative px-4 py-3 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded" role="alert">
          <strong className="font-bold">Pet not found!</strong>
          <span className="block sm:inline"> Could not find the pet with ID: {id}</span>
        </div>
        <div className="mt-4">
          <Link to="/" className="flex items-center text-purple-600 hover:text-purple-800">
            <FaArrowLeft className="mr-2" /> Back to Pets
          </Link>
        </div>
      </div>
    );
  }

  const moodColorClass = getMoodColorClass(pet.mood);

  return (
    <div className="container p-6 mx-auto">
      <Link to="/" className="flex items-center mb-6 text-purple-600 hover:text-purple-800">
        <FaArrowLeft className="mr-2" /> Back to Pets
      </Link>

      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Pet Header */}
        <div className={`${moodColorClass} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <h1 className="flex items-center text-2xl font-bold text-white">
              <span className="mr-3 text-3xl">{getPetIcon(pet.species)}</span>
              {pet.name || 'Unnamed Pet'}
            </h1>
            <div className="text-3xl">
              {getMoodEmoji(pet.mood)}
            </div>
          </div>
        </div>

        {/* Pet Details */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Details</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-32 font-medium">Age:</span>
                  <span>{pet.age || 'Unknown'} {pet.age === 1 ? 'year' : 'years'}</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Species:</span>
                  <span>{pet.species || 'Unknown'}</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Personality:</span>
                  <span className="px-2 py-1 text-purple-800 bg-purple-100 rounded">
                    {pet.personality || 'Unknown'}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Mood:</span>
                  <span>
                    {getMoodEmoji(pet.mood)} {pet.mood || 'Unknown'}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Status:</span>
                  <span className={`${pet.adopted ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'} px-2 py-1 rounded`}>
                    {pet.adopted ? 'Adopted' : 'Available'}
                  </span>
                </li>
                {pet.adopted && pet.adoption_date && (
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Adopted on:</span>
                    <span>{new Date(pet.adoption_date).toLocaleDateString()}</span>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">About This Pet</h2>
              <p className="text-gray-700">
                {pet.description || `This pet is a ${pet.age || 'unknown age'}-year-old ${pet.species || 'unknown'} with a ${pet.personality ? pet.personality.toLowerCase() : 'unique'} personality.`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {!pet.adopted && (
              <button className="flex items-center px-6 py-3 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
                <FaHeart className="mr-2" /> Adopt This Pet
              </button>
            )}
            <Link 
              to={`/edit-pet/${pet._id}`}
              className="flex items-center px-6 py-3 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <FaEdit className="mr-2" /> Edit Pet Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;