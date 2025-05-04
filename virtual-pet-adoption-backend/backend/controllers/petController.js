const petService = require('../services/petService');


class PetController {
 
  //To create a new pet
  async createPet(req, res) {
    try {
      const { name, species, age, personality } = req.body;
      
     
      if (!name || !species || !age || !personality) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide name, species, age, and personality' 
        });
      }
      
      const pet = await petService.createPet(req.body);
      res.status(201).json({ success: true, data: pet });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //To get all pets
  async getAllPets(req, res) {
    try {
      const pets = await petService.getAllPets();
      res.status(200).json({ success: true, data: pets });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

 //To get a pet by ID
  async getPetById(req, res) {
    try {
      const pet = await petService.getPetById(req.params.id);
      if (!pet) {
        return res.status(404).json({ success: false, message: 'Pet not found' });
      }
      res.status(200).json({ success: true, data: pet });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //To update a pet
  async updatePet(req, res) {
    try {
      const { name, species, age, personality } = req.body;
      
      // Basic validation
      if (!name && !species && !age && !personality) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide at least one field to update' 
        });
      }
      
      const pet = await petService.updatePet(req.params.id, req.body);
      if (!pet) {
        return res.status(404).json({ success: false, message: 'Pet not found' });
      }
      res.status(200).json({ success: true, data: pet });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //To adopt a pet 
  async adoptPet(req, res) {
    try {
      const pet = await petService.adoptPet(req.params.id);
      if (!pet) {
        return res.status(404).json({ success: false, message: 'Pet not found' });
      }
      res.status(200).json({ 
        success: true, 
        message: `${pet.name} has been adopted!`,
        data: pet 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  
  //To delete a pet
  async deletePet(req, res) {
    try {
      const deleted = await petService.deletePet(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Pet not found' });
      }
      res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //To filter pets by mood
  async filterPetsByMood(req, res) {
    try {
      const { mood } = req.query;
      if (!mood) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide a mood to filter by' 
        });
      }
      
      // Validate mood
      if (!['Happy', 'Excited', 'Sad'].includes(mood)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Mood must be one of: Happy, Excited, Sad' 
        });
      }
      
      const pets = await petService.filterPetsByMood(mood);
      res.status(200).json({ success: true, data: pets });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PetController();