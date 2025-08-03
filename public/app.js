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

// Placeholder Data (will be populated in Phase 2)
const questions = [
  // Questions will be added in Phase 2
];

const dogBreeds = {
  // Dog breed data will be added in Phase 2
};

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
  
  // Display question (placeholder for now)
  if (questions.length > 0) {
    const question = questions[QuizState.currentQuestion];
    // Question display logic will be implemented in Phase 2
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
  QuizState.answers[`question${QuizState.currentQuestion + 1}`] = answer;
  
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
  
  // Personality code calculation will be implemented in Phase 2
  // For now, just show results screen
  showResults();
}

// Results Display
function showResults() {
  console.log('Showing results...');
  showScreen('results');
  
  // Results display logic will be implemented in Phase 2
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