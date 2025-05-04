const calculateMood = (creationDate) => {
    if (!creationDate) return 'Happy';
    
    const now = new Date();
    const timeInSystem = now - new Date(creationDate);
    

    const daysInSystem = timeInSystem / (1000 * 60 * 60 * 24);
    
    if (daysInSystem < 1) {
      return 'Happy'; // green
    } else if (daysInSystem <= 3) {
      return 'Excited'; // yellow
    } else {
      return 'Sad'; // blue
    }
  };
  
  module.exports = {
    calculateMood
  };