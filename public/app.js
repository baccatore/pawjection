/**
 * Pawjection Quiz Application
 * Discover your inner dog breed through personality questions
 */

// Quiz State Management
const QuizState = {
  currentQuestion: 0,
  answers: {},
  personalityCode: '',
  currentBreed: null
};

// DOM Elements
const elements = {
  // Screens
  welcomeScreen: document.getElementById('welcome-screen'),
  quizScreen: document.getElementById('quiz-screen'),
  resultsScreen: document.getElementById('results-screen'),
  
  // Buttons
  startButton: document.getElementById('start-button'),
  retakeButton: document.getElementById('retake-button'),
  answerButtons: {
    A: document.getElementById('answer-a'),
    B: document.getElementById('answer-b')
  },
  
  // Quiz Elements
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),
  questionText: document.getElementById('question-text'),
  
  // Results Elements
  breedName: document.getElementById('breed-name'),
  breedDescription: document.getElementById('breed-description'),
  traitsList: document.getElementById('traits-list')
};

// Dog Breeds Data Structure - All 16 personality combinations
const dogBreeds = {
  'ASFC': {
    name: 'Cavalier King Charles Spaniel',
    description: "Gentle, affectionate companions who thrive on human interaction. They're social butterflies who enjoy meeting new friends but prefer a calm, relaxed lifestyle.",
    traits: {
      dependency: 'Affectionate - Craves physical closeness and attention',
      sociality: 'Social - Friendly toward strangers and new environments',
      trainability: 'Free-spirited - Learns on their own terms',
      energy: 'Calm - Enjoys lounging and relaxed activities'
    }
  },
  'ASFE': {
    name: 'Beagle',
    description: 'Friendly, curious hounds who love everyone they meet. Independent thinkers with a nose for adventure, they need regular exercise to satisfy their hunting instincts.',
    traits: {
      dependency: 'Affectionate - Loves being part of the pack',
      sociality: 'Social - Gets along with everyone',
      trainability: 'Free-spirited - Follows their nose over commands',
      energy: 'Energetic - Needs regular exercise and play'
    }
  },
  'ASWC': {
    name: 'Basset Hound',
    description: 'Laid-back, gentle dogs who love their families and welcome strangers. Despite their stubborn streak, they\'re eager to please when motivated.',
    traits: {
      dependency: 'Affectionate - Devoted to their family',
      sociality: 'Social - Patient with children and strangers',
      trainability: 'Willing - Responds well to patient training',
      energy: 'Calm - Happy with moderate exercise'
    }
  },
  'ASWE': {
    name: 'Golden Retriever',
    description: 'The ultimate family dog - loving, outgoing, and eager to please. They excel at everything from therapy work to athletics, always with a wagging tail.',
    traits: {
      dependency: 'Affectionate - Lives for human companionship',
      sociality: 'Social - Friends with everyone',
      trainability: 'Willing - Highly trainable and eager',
      energy: 'Energetic - Loves swimming, fetching, and running'
    }
  },
  'ALFC': {
    name: 'Shih Tzu',
    description: 'Charming lap dogs bred for companionship. They bond closely with their families and can be selective about following commands, preferring comfort over activity.',
    traits: {
      dependency: 'Affectionate - Bred to be a companion',
      sociality: 'Loyal - Devoted to family, reserved with strangers',
      trainability: 'Free-spirited - Has their own agenda',
      energy: 'Calm - Content as a lap warmer'
    }
  },
  'ALFE': {
    name: 'Jack Russell Terrier',
    description: 'Small but mighty, these devoted terriers pack endless energy into a compact frame. They\'re intensely loyal to their families and march to their own drum.',
    traits: {
      dependency: 'Affectionate - Forms strong family bonds',
      sociality: 'Loyal - One-family dogs',
      trainability: 'Free-spirited - Independent and determined',
      energy: 'Energetic - Tireless and always ready to play'
    }
  },
  'ALWC': {
    name: 'Bulldog',
    description: 'Gentle, devoted companions who form unbreakable bonds with their families. Despite their tough appearance, they\'re sweet-natured and prefer lounging to athletics.',
    traits: {
      dependency: 'Affectionate - Loving and devoted',
      sociality: 'Loyal - Family-focused, wary of strangers',
      trainability: 'Willing - Eager to please their people',
      energy: 'Calm - Professional couch potatoes'
    }
  },
  'ALWE': {
    name: 'Labrador Retriever',
    description: 'America\'s favorite dog for good reason - loyal, loving, and endlessly enthusiastic. They live to please their families and need plenty of exercise.',
    traits: {
      dependency: 'Affectionate - Deeply bonded to family',
      sociality: 'Loyal - Family first, friendly second',
      trainability: 'Willing - Born to work and please',
      energy: 'Energetic - Needs lots of exercise and activities'
    }
  },
  'ISFC': {
    name: 'Afghan Hound',
    description: 'Elegant and aloof, these dignified dogs are selective with their affection. They enjoy socializing on their terms and prefer observing to participating.',
    traits: {
      dependency: 'Independent - Self-sufficient and dignified',
      sociality: 'Social - Polite with strangers when socialized',
      trainability: 'Free-spirited - Independent thinkers',
      energy: 'Calm - Graceful and composed indoors'
    }
  },
  'ISFE': {
    name: 'Siberian Husky',
    description: "Pack-oriented workers who are friendly but independent. They'll greet everyone enthusiastically but won't beg for attention, preferring adventure to cuddles.",
    traits: {
      dependency: 'Independent - Self-reliant and confident',
      sociality: 'Social - Enjoys pack activities',
      trainability: 'Free-spirited - Strong-willed and clever',
      energy: 'Energetic - Built for endurance'
    }
  },
  'ISWC': {
    name: 'Greyhound',
    description: 'Gentle, quiet dogs who are politely friendly with everyone. Despite their racing heritage, they\'re calm homebodies who appreciate routine and comfort.',
    traits: {
      dependency: 'Independent - Content alone or with company',
      sociality: 'Social - Gentle with all',
      trainability: 'Willing - Responds to gentle guidance',
      energy: 'Calm - Sprinters, not marathoners'
    }
  },
  'ISWE': {
    name: 'Australian Cattle Dog',
    description: 'Intelligent, driven workers who think independently but work cooperatively. They need a job to do and the energy to do it all day long.',
    traits: {
      dependency: 'Independent - Self-directed workers',
      sociality: 'Social - Works well in teams',
      trainability: 'Willing - Highly trainable for tasks',
      energy: 'Energetic - Incredible stamina and drive'
    }
  },
  'ILFC': {
    name: 'Chow Chow',
    description: "Dignified, cat-like dogs who bond with one person. They're naturally aloof and prefer to observe rather than participate, living life on their own terms.",
    traits: {
      dependency: 'Independent - Aloof and self-contained',
      sociality: 'Loyal - One-person dogs',
      trainability: 'Free-spirited - Stubborn and strong-willed',
      energy: 'Calm - Low activity needs'
    }
  },
  'ILFE': {
    name: 'Shiba Inu',
    description: 'The cat of the dog world - independent, loyal to their chosen person, and full of personality. They have energy to burn but only when they feel like it.',
    traits: {
      dependency: 'Independent - Self-sufficient and aloof',
      sociality: 'Loyal - Bonds with select few',
      trainability: 'Free-spirited - Does things their way',
      energy: 'Energetic - Bursts of playful energy'
    }
  },
  'ILWC': {
    name: 'Akita',
    description: 'Noble guardians who are deeply devoted to their families. They\'re naturally reserved but respond well to respectful training, preferring calm dignity.',
    traits: {
      dependency: 'Independent - Dignified and self-assured',
      sociality: 'Loyal - Utterly devoted to family',
      trainability: 'Willing - Responds to respectful training',
      energy: 'Calm - Composed and watchful'
    }
  },
  'ILWE': {
    name: 'German Shepherd',
    description: 'Versatile working dogs who combine independence with deep loyalty. They\'re highly trainable, protective of their families, and always ready for action.',
    traits: {
      dependency: 'Independent - Confident and self-assured',
      sociality: 'Loyal - Dedicated to their pack',
      trainability: 'Willing - Exceptionally trainable',
      energy: 'Energetic - Needs physical and mental exercise'
    }
  }
};

// Quiz Questions Data
const questions = [
  {
    id: 1,
    axis: 'dependency',
    question: 'When you\'re feeling down, do you prefer to...',
    options: {
      A: {
        text: 'Seek comfort and cuddles from loved ones',
        trait: 'A' // Affectionate
      },
      B: {
        text: 'Have some quiet time alone to recharge',
        trait: 'I' // Independent
      }
    }
  },
  {
    id: 2,
    axis: 'sociality',
    question: 'At a party, would you rather...',
    options: {
      A: {
        text: 'Mingle and meet as many new people as possible',
        trait: 'S' // Social
      },
      B: {
        text: 'Stick close to your best friend the whole time',
        trait: 'L' // Loyal
      }
    }
  },
  {
    id: 3,
    axis: 'trainability',
    question: 'When learning something new, do you prefer to...',
    options: {
      A: {
        text: 'Figure it out your own creative way',
        trait: 'F' // Free-spirited
      },
      B: {
        text: 'Follow clear instructions step by step',
        trait: 'W' // Willing
      }
    }
  },
  {
    id: 4,
    axis: 'energy',
    question: 'Your ideal weekend involves...',
    options: {
      A: {
        text: 'Cozy movie marathon on the couch',
        trait: 'C' // Calm
      },
      B: {
        text: 'Outdoor adventure and physical activities',
        trait: 'E' // Energetic
      }
    }
  }
];

// Screen Navigation Functions
function showScreen(screenName) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show requested screen
  switch(screenName) {
    case 'welcome':
      elements.welcomeScreen.classList.add('active');
      break;
    case 'quiz':
      elements.quizScreen.classList.add('active');
      break;
    case 'results':
      elements.resultsScreen.classList.add('active');
      break;
  }
}

// Quiz Initialization
function initializeQuiz() {
  console.log('Initializing quiz...');
  QuizState.currentQuestion = 0;
  QuizState.answers = {};
  QuizState.personalityCode = '';
  QuizState.currentBreed = null;
  
  showScreen('quiz');
  displayQuestion();
}

// Question Display
function displayQuestion() {
  console.log('Displaying question:', QuizState.currentQuestion + 1);
  
  // Update progress
  updateProgress();
  
  // Display current question
  if (questions.length > 0 && QuizState.currentQuestion < questions.length) {
    const question = questions[QuizState.currentQuestion];
    
    // Update question text
    elements.questionText.textContent = question.question;
    
    // Update answer buttons
    elements.answerButtons.A.textContent = question.options.A.text;
    elements.answerButtons.B.textContent = question.options.B.text;
  }
}

// Progress Update
function updateProgress() {
  const progress = ((QuizState.currentQuestion + 1) / 4) * 100;
  elements.progressFill.style.width = `${progress}%`;
  elements.progressText.textContent = `Question ${QuizState.currentQuestion + 1} of 4`;
}

// Answer Tracking
function trackAnswer(answer) {
  console.log('Answer selected:', answer);
  
  // Get the current question and store the trait letter
  const question = questions[QuizState.currentQuestion];
  const selectedTrait = question.options[answer].trait;
  
  // Store the answer
  QuizState.answers[`question${QuizState.currentQuestion + 1}`] = selectedTrait;
  
  // Move to next question or show results
  if (QuizState.currentQuestion < 3) {
    QuizState.currentQuestion++;
    displayQuestion();
  } else {
    calculateResults();
  }
}

// Score Calculation
function calculateResults() {
  console.log('Calculating results...');
  console.log('Answers:', QuizState.answers);
  
  // Build personality code from answers
  const personalityCode = 
    QuizState.answers.question1 + 
    QuizState.answers.question2 + 
    QuizState.answers.question3 + 
    QuizState.answers.question4;
  
  QuizState.personalityCode = personalityCode;
  console.log('Personality code:', personalityCode);
  
  // Look up corresponding dog breed
  const breed = dogBreeds[personalityCode];
  if (breed) {
    QuizState.currentBreed = breed;
    showResults();
  } else {
    console.error('No breed found for code:', personalityCode);
  }
}

// Results Display
function showResults() {
  console.log('Showing results...');
  showScreen('results');
  
  if (QuizState.currentBreed) {
    const breed = QuizState.currentBreed;
    
    // Display breed information
    elements.breedName.textContent = breed.name;
    elements.breedDescription.textContent = breed.description;
    
    // Clear and populate traits list
    elements.traitsList.innerHTML = '';
    
    // Add each trait to the list
    const traitDescriptions = [
      breed.traits.dependency,
      breed.traits.sociality,
      breed.traits.trainability,
      breed.traits.energy
    ];
    
    traitDescriptions.forEach(trait => {
      const li = document.createElement('li');
      li.textContent = trait;
      elements.traitsList.appendChild(li);
    });
  }
}

// Quiz Reset
function resetQuiz() {
  console.log('Resetting quiz...');
  showScreen('welcome');
}

// Event Listeners
function setupEventListeners() {
  // Start button
  elements.startButton.addEventListener('click', initializeQuiz);
  
  // Retake button
  elements.retakeButton.addEventListener('click', resetQuiz);
  
  // Answer buttons
  elements.answerButtons.A.addEventListener('click', () => trackAnswer('A'));
  elements.answerButtons.B.addEventListener('click', () => trackAnswer('B'));
}

// Initialize App
function init() {
  console.log('Pawjection app initialized');
  setupEventListeners();
  showScreen('welcome');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);