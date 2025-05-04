import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaHeart } from "react-icons/fa";
import { getPetIcon } from "../utils/helpers";
import { PET_PERSONALITIES } from "../utils/constants";

const PersonalityQuiz = ({ pets, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    activity: null,
    space: null,
    noise: null,
    attention: null,
    schedule: null,
  });
  const [matchedPet, setMatchedPet] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const questions = [
    {
      id: "activity",
      question: "What s your activity level like?",
      options: [
        { value: "high", label: "Very active, I love exercising daily" },
        {
          value: "medium",
          label: "Moderately active, I enjoy regular movement",
        },
        { value: "low", label: "Relaxed, I prefer calm activities" },
      ],
    },
    {
      id: "space",
      question: "How much space do you have at home?",
      options: [
        { value: "large", label: "Large house with a yard" },
        { value: "medium", label: "Average apartment or condo" },
        { value: "small", label: "Small apartment or limited space" },
      ],
    },
    {
      id: "noise",
      question: "How do you feel about noise?",
      options: [
        { value: "love", label: "I don't mind noise at all" },
        { value: "some", label: "Some noise is fine, but not too much" },
        { value: "quiet", label: "I prefer a quiet environment" },
      ],
    },
    {
      id: "attention",
      question: "How much attention can you give to a pet?",
      options: [
        { value: "lots", label: "Lots, I'm home most of the time" },
        {
          value: "moderate",
          label: "Moderate, I can spend time in the evenings",
        },
        { value: "little", label: "Limited, I have a busy schedule" },
      ],
    },
    {
      id: "schedule",
      question: "What's your daily schedule like?",
      options: [
        { value: "consistent", label: "Very consistent and predictable" },
        {
          value: "flexible",
          label: "Somewhat flexible, but generally routine",
        },
        { value: "random", label: "Varies a lot, often unpredictable" },
      ],
    },
  ];

  const handleAnswerSelect = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      findMatch();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Algorithm to match personality traits with pet personalities
  const findMatch = () => {
    // Personality matching logic
    const personalityScores = {};

    // Initialize scores for each personality type
    PET_PERSONALITIES.forEach((personality) => {
      personalityScores[personality] = 0;
    });

    // Score based on activity level
    if (answers.activity === "high") {
      personalityScores["Energetic"] += 3;
      personalityScores["Playful"] += 2;
    } else if (answers.activity === "medium") {
      personalityScores["Friendly"] += 2;
      personalityScores["Curious"] += 2;
    } else {
      personalityScores["Calm"] += 3;
      personalityScores["Lazy"] += 2;
    }

    // Score based on space
    if (answers.space === "small") {
      personalityScores["Calm"] += 2;
      personalityScores["Independent"] += 2;
    } else if (answers.space === "large") {
      personalityScores["Energetic"] += 2;
      personalityScores["Playful"] += 2;
    }

    // Score based on noise preference
    if (answers.noise === "quiet") {
      personalityScores["Shy"] += 2;
      personalityScores["Calm"] += 2;
    } else if (answers.noise === "love") {
      personalityScores["Friendly"] += 2;
      personalityScores["Protective"] += 1;
    }

    // Score based on attention
    if (answers.attention === "lots") {
      personalityScores["Affectionate"] += 3;
      personalityScores["Friendly"] += 2;
    } else if (answers.attention === "little") {
      personalityScores["Independent"] += 3;
    }

    // Score based on schedule
    if (answers.schedule === "consistent") {
      personalityScores["Calm"] += 1;
    } else if (answers.schedule === "random") {
      personalityScores["Independent"] += 2;
      personalityScores["Adaptive"] += 1;
    }

    // Find highest scoring personality
    let highestScore = 0;
    let bestMatch = "";

    Object.entries(personalityScores).forEach(([personality, score]) => {
      if (score > highestScore) {
        highestScore = score;
        bestMatch = personality;
      }
    });

    // Find pet with matching personality
    const matchingPets = pets
      .filter((pet) => !pet.adopted && pet.personality === bestMatch)
      .sort((a, b) => a.age - b.age); // Sort by age (younger first)

    if (matchingPets.length > 0) {
      setMatchedPet(matchingPets[0]);
    } else {
      // If no exact match, find the closest one based on available personalities
      const availablePets = pets.filter((pet) => !pet.adopted);
      if (availablePets.length > 0) {
        // Just pick one for now - in a real app this would be more sophisticated
        setMatchedPet(availablePets[0]);
      }
    }

    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({
      activity: null,
      space: null,
      noise: null,
      attention: null,
      schedule: null,
    });
    setMatchedPet(null);
    setShowResults(false);
  };

  // Render results if we have completed the quiz
  if (showResults) {
    return (
      <motion.div
        className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Your Perfect Pet Match!
        </h2>

        {matchedPet ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="text-6xl">{getPetIcon(matchedPet.species)}</span>
            </div>

            <h3 className="mb-2 text-xl font-bold text-purple-700">
              {matchedPet.name}
            </h3>
            <p className="mb-2">
              {matchedPet.age} year-old {matchedPet.species.toLowerCase()} with
              a {matchedPet.personality.toLowerCase()} personality
            </p>

            <div className="p-4 my-4 text-left bg-purple-100 rounded-lg">
              <p>
                Based on your answers, we think {matchedPet.name} would be a
                great match for you! Their{" "}
                {matchedPet.personality.toLowerCase()} personality seems to
                align well with your lifestyle.
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Link
                to={`/pet/${matchedPet.id}`}
                className="flex items-center px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                <FaHeart className="mr-2" /> Meet {matchedPet.name}
              </Link>

              <button
                onClick={resetQuiz}
                className="px-6 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">
              Sorry, we couldn't find a perfect match for you at the moment.
            </p>
            <p className="mb-6">
              Try checking back later when we have more pets available!
            </p>

            <div className="flex justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Browse All Pets
              </Link>

              <button
                onClick={resetQuiz}
                className="px-6 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isAnswered = answers[currentQuestion.id] !== null;

  return (
    <motion.div
      className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Find Your Perfect Pet Match</h2>
        <button onClick={handleClose} className="close-button">
          ✕
        </button>
      </div>

      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 transition-all duration-300 ease-out bg-purple-600 rounded-full"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="mt-1 text-sm text-right text-gray-500">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>

      <h3 className="mb-4 text-xl font-medium">{currentQuestion.question}</h3>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              answers[currentQuestion.id] === option.value
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded ${
            currentStep === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-purple-700 hover:bg-purple-50"
          }`}
        >
          <FaArrowLeft className="mr-2" /> Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex items-center px-6 py-2 rounded ${
            isAnswered
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentStep === questions.length - 1 ? "See Results" : "Next"}{" "}
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default PersonalityQuiz;
