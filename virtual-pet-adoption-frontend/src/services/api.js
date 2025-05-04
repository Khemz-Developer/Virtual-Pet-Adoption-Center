import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define API services
const apiService = {
  // Get all pets
  getAllPets: async () => {
    try {
      const response = await api.get('/pets');
      return response.data.data;
    
    } catch (error) {
      throw error;
    }
  },

  // Get a single pet by ID
  getPetById: async (id) => {
    try {
      const response = await api.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new pet
  createPet: async (petData) => {
    try {
      const response = await api.post('/pets', petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a pet
  updatePet: async (id, petData) => {
    try {
      const response = await api.put(`/pets/${id}`, petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Adopt a pet
  adoptPet: async (id) => {
    try {
      const response = await api.patch(`/pets/${id}/adopt`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a pet
  deletePet: async (id) => {
    try {
      const response = await api.delete(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Filter pets by mood
  filterPetsByMood: async (mood) => {
    try {
      const response = await api.get(`/pets/filter?mood=${mood}`);
      return response.data.data;
     
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;