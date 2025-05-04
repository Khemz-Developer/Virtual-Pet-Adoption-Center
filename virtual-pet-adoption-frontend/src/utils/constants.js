// Pet species options
export const PET_SPECIES = [
    'Dog',
    'Cat',
    'Bird',
    'Rabbit',
    'Hamster',
    'Guinea Pig',
    'Turtle',
    'Fish',
    'Other'
  ];
  
  // Pet personality options
  export const PET_PERSONALITIES = [
    'Friendly',
    'Shy',
    'Energetic',
    'Calm',
    'Playful',
    'Independent',
    'Curious',
    'Protective',
    'Affectionate',
    'Lazy'
  ];
  
  // Pet mood options
  export const PET_MOODS = [
    'Happy',
    'Excited',
    'Sad'
  ];
  
  // Colors for moods
  export const MOOD_COLORS = {
    'Happy': 'green',
    'Excited': 'yellow',
    'Sad': 'blue'
  };
  
  // Pet animations based on mood
  export const MOOD_ANIMATIONS = {
    'Happy': {
      scale: [1, 1.05, 1],
      transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
    },
    'Excited': {
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
    },
    'Sad': {
      y: [0, -3, 0],
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
    }
  };
  
  // Animation variants for list items
  export const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Animation variants for page transitions
  export const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    out: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };