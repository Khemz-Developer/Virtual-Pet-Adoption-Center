// Get mood icon based on mood 
export const getMoodEmoji = (mood) => {
    switch (mood) {
      case "Happy":
        return "😊";
      case "Excited":
        return "🤩";
      case "Sad":
        return "😢";
      default:
        return "😐";
    }
  };
  
  // Get color class based on mood 
  export const getMoodColorClass = (mood) => {
    switch (mood) {
      case "Happy":
        return "bg-green-500";
      case "Excited":
        return "bg-yellow-500";
      case "Sad":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Get pet icon based on species
  export const getPetIcon = (species) => {
    if (!species) return "🐾"; // Return a default icon if species is undefined or null
    
    switch (species.toLowerCase()) {
      case "dog":
        return "🐕";
      case "cat":
        return "🐈";
      case "bird":
        return "🐦";
      case "rabbit":
        return "🐇";
      case "hamster":
        return "🐹";
      case "guinea pig":
        return "🐹";
      case "turtle":
        return "🐢";
      case "fish":
        return "🐠";
      default:
        return "🐾";
    }
  };
     
  // Format date
  export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  
  // Format time since a date (e.g., "2 days ago")
  export const getTimeSince = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };