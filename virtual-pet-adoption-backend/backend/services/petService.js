const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

class PetService {
 
  async createPet(petData) {
    try {
      const pet = new Pet(petData);
      await pet.save();
      return pet;
    } catch (error) {
      throw new Error(`Error creating pet: ${error.message}`);
    }
  }

  
  async getAllPets() {
    try {
      const pets = await Pet.find();
      
      // Update the mood for each pet based on time in system
      return pets.map(pet => {
        const petObj = pet.toObject();
        petObj.mood = calculateMood(pet.creation_date);
        return petObj;
      });
    } catch (error) {
      throw new Error(`Error getting pets: ${error.message}`);
    }
  }

 
  async getPetById(id) {
    try {
      const pet = await Pet.findById(id);
      if (!pet) return null;
      
      // Update the mood based on time in system
      const petObj = pet.toObject();
      petObj.mood = calculateMood(pet.creation_date);
      return petObj;
    } catch (error) {
      throw new Error(`Error getting pet: ${error.message}`);
    }
  }


  async updatePet(id, petData) {
    try {
      const pet = await Pet.findByIdAndUpdate(
        id,
        petData,
        { new: true, runValidators: true }
      );
      if (!pet) return null;
      
      // Update the mood based on time in system
      const petObj = pet.toObject();
      petObj.mood = calculateMood(pet.creation_date);
      return petObj;
    } catch (error) {
      throw new Error(`Error updating pet: ${error.message}`);
    }
  }

 
  async adoptPet(id) {
    try {
      const pet = await Pet.findByIdAndUpdate(
        id,
        { 
          adopted: true,
          adoption_date: new Date()
        },
        { new: true }
      );
      if (!pet) return null;
      
      // For adopted pets, mood doesn't change
      return pet;
    } catch (error) {
      throw new Error(`Error adopting pet: ${error.message}`);
    }
  }

 
  async deletePet(id) {
    try {
      const result = await Pet.findByIdAndDelete(id);
      return !!result; // Convert to boolean
    } catch (error) {
      throw new Error(`Error deleting pet: ${error.message}`);
    }
  }

  
  async filterPetsByMood(mood) {
    try {
      const allPets = await this.getAllPets();
      return allPets.filter(pet => pet.mood === mood);
    } catch (error) {
      throw new Error(`Error filtering pets: ${error.message}`);
    }
  }
}

module.exports = new PetService();