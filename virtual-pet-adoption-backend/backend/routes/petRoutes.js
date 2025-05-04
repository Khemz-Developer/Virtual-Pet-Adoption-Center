const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

// Create a new pet
router.post('/', petController.createPet);

// Get all pets
router.get('/', petController.getAllPets);

// Filter pets by mood
router.get('/filter', petController.filterPetsByMood);

// Get a single pet
router.get('/:id', petController.getPetById);

// Update a pet
router.put('/:id', petController.updatePet);

// Adopt a pet
router.patch('/:id/adopt', petController.adoptPet);

// Delete a pet
router.delete('/:id', petController.deletePet);



module.exports = router;