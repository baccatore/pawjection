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
  resultsTitle: document.querySelector('.results-title'),
  breedName: document.getElementById('breed-name'),
  breedImage: document.getElementById('breed-image'),
  breedDescription: document.getElementById('breed-description'),
  traitsList: document.getElementById('traits-list'),
  
  // Share Elements
  shareTwitter: document.getElementById('share-twitter'),
  shareFacebook: document.getElementById('share-facebook'),
  shareCopy: document.getElementById('share-copy'),
  
  // Statistics Elements
  viewStatsButton: document.getElementById('view-stats'),
  statsModal: document.getElementById('stats-modal'),
  closeModal: document.getElementById('close-modal'),
  totalQuizzes: document.querySelector('#total-quizzes span'),
  breedStats: document.getElementById('breed-stats'),
  clearStatsButton: document.getElementById('clear-stats'),
  
  // Breeds Explorer Elements
  exploreBreedsButton: document.getElementById('explore-breeds'),
  breedsModal: document.getElementById('breeds-modal'),
  closeBreedsModal: document.getElementById('close-breeds-modal'),
  breedsGrid: document.getElementById('breeds-grid')
};

// Dog Breeds Data Structure - All 16 personality combinations
const dogBreeds = {
  'ASFC': {
    name: 'Cavalier King Charles Spaniel',
    description: "Gentle, affectionate companions who thrive on human interaction. They're social butterflies who enjoy meeting new friends but prefer a calm, relaxed lifestyle.",
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1611611158876-41699b77a059?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1596836587841-8b23eaeb5816?w=400&h=400&fit=crop',
    traits: {
      dependency: 'Independent - Aloof and self-contained',
      sociality: 'Loyal - One-person dogs',
      trainability: 'Free-spirited - Stubborn and strong-willed',
      energy: 'Calm - Low activity needs'
    }
  },
  // Easter Egg: This one's actually a cat breed - for those who read the code
  'ILFE': {
    name: 'Chartreux',
    description: 'Quiet, intelligent felines with a gentle disposition. Independent yet loyal to their chosen person, they have bursts of playful energy between their contemplative moments.',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1600887473729-f7f2ab602bc8?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop',
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
    question: "When you're feeling down, do you prefer to...",
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
  },
  {
    id: 5,
    axis: 'dependency',
    question: 'After a long day, you prefer to...',
    options: {
      A: {
        text: 'Call a friend or family member to chat',
        trait: 'A' // Affectionate
      },
      B: {
        text: 'Enjoy your own hobbies and personal space',
        trait: 'I' // Independent
      }
    }
  },
  {
    id: 6,
    axis: 'sociality',
    question: 'When making new friends, you...',
    options: {
      A: {
        text: 'Easily open up and trust new people',
        trait: 'S' // Social
      },
      B: {
        text: 'Take time to build deep, lasting connections',
        trait: 'L' // Loyal
      }
    }
  },
  {
    id: 7,
    axis: 'trainability',
    question: 'In a group project, you prefer to...',
    options: {
      A: {
        text: 'Bring creative ideas and think outside the box',
        trait: 'F' // Free-spirited
      },
      B: {
        text: 'Organize tasks and ensure everything gets done',
        trait: 'W' // Willing
      }
    }
  },
  {
    id: 8,
    axis: 'energy',
    question: 'Your perfect vacation would be...',
    options: {
      A: {
        text: 'Relaxing at a spa or quiet beach resort',
        trait: 'C' // Calm
      },
      B: {
        text: 'Hiking, skiing, or exploring new cities',
        trait: 'E' // Energetic
      }
    }
  }
];

// Screen Navigation Functions
function showScreen(screenName) {
  const currentScreen = document.querySelector('.screen.active');
  let targetScreen;
  
  // Determine target screen
  switch(screenName) {
    case 'welcome':
      targetScreen = elements.welcomeScreen;
      break;
    case 'quiz':
      targetScreen = elements.quizScreen;
      break;
    case 'results':
      targetScreen = elements.resultsScreen;
      break;
  }
  
  if (!targetScreen) return;
  
  // If no current screen, just show the target
  if (!currentScreen) {
    targetScreen.classList.add('active');
    return;
  }
  
  // Smooth transition between screens
  currentScreen.classList.add('fade-out');
  
  setTimeout(() => {
    currentScreen.classList.remove('active', 'fade-out');
    targetScreen.classList.add('active');
    
    // Scroll to top for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}

// Quiz Initialization
function initializeQuiz() {
  console.log('Initializing quiz...');
  QuizState.currentQuestion = 0;
  QuizState.answers = {};
  QuizState.personalityCode = '';
  QuizState.currentBreed = null;
  
  // Restore quiz content structure if it was replaced by loading state
  const quizContent = document.querySelector('.quiz-content');
  if (!document.getElementById('question-container')) {
    quizContent.innerHTML = `
      <!-- Progress Indicator -->
      <div class="progress-container">
        <div class="progress-bar">
          <div id="progress-fill" class="progress-fill"></div>
        </div>
        <p id="progress-text" class="progress-text">Question 1 of 8</p>
      </div>

      <!-- Question Container -->
      <div id="question-container" class="question-container">
        <h2 id="question-text" class="question-text"></h2>
        <div id="answers-container" class="answers-container">
          <button id="answer-a" class="btn btn-answer" data-answer="A"></button>
          <button id="answer-b" class="btn btn-answer" data-answer="B"></button>
        </div>
      </div>
    `;
    
    // Re-cache the restored elements
    elements.progressFill = document.getElementById('progress-fill');
    elements.progressText = document.getElementById('progress-text');
    elements.questionText = document.getElementById('question-text');
    elements.answerButtons.A = document.getElementById('answer-a');
    elements.answerButtons.B = document.getElementById('answer-b');
    
    // Re-attach event listeners to the new buttons
    elements.answerButtons.A.addEventListener('click', () => trackAnswer('A'));
    elements.answerButtons.B.addEventListener('click', () => trackAnswer('B'));
  }
  
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
  const totalQuestions = questions.length;
  const progress = ((QuizState.currentQuestion + 1) / totalQuestions) * 100;
  elements.progressFill.style.width = `${progress}%`;
  elements.progressText.textContent = `Question ${QuizState.currentQuestion + 1} of ${totalQuestions}`;
}

// Answer Tracking
function trackAnswer(answer) {
  console.log('Answer selected:', answer);
  
  // Visual feedback
  const button = elements.answerButtons[answer];
  button.classList.add('selected');
  
  // Disable buttons temporarily
  elements.answerButtons.A.disabled = true;
  elements.answerButtons.B.disabled = true;
  
  // Get the current question and store the trait letter
  const question = questions[QuizState.currentQuestion];
  const selectedTrait = question.options[answer].trait;
  
  // Store the answer
  QuizState.answers[`question${QuizState.currentQuestion + 1}`] = selectedTrait;
  
  // Small delay for visual feedback
  setTimeout(() => {
    // Re-enable buttons
    elements.answerButtons.A.disabled = false;
    elements.answerButtons.B.disabled = false;
    button.classList.remove('selected');
    
    // Move to next question or show results
    if (QuizState.currentQuestion < questions.length - 1) {
      QuizState.currentQuestion++;
      displayQuestion();
    } else {
      showLoadingState();
      setTimeout(() => {
        calculateResults();
      }, 1000);
    }
  }, 300);
}

// Loading State
function showLoadingState() {
  const quizContent = document.querySelector('.quiz-content');
  quizContent.innerHTML = `
    <div class="loading-container">
      <div class="paw-loader">
        <span class="paw-print">🐾</span>
        <span class="paw-print">🐾</span>
        <span class="paw-print">🐾</span>
      </div>
      <div class="loading-spinner"></div>
      <p class="loading-text">Analyzing your personality...</p>
      <p style="color: #999; font-size: 0.9rem; margin-top: 10px;">Finding your perfect match...</p>
    </div>
  `;
}

// Score Calculation
function calculateResults() {
  console.log('Calculating results...');
  console.log('Answers:', QuizState.answers);
  
  // Count traits for each axis (now we have 2 questions per axis)
  const traitCounts = {
    dependency: { A: 0, I: 0 },
    sociality: { S: 0, L: 0 },
    trainability: { F: 0, W: 0 },
    energy: { C: 0, E: 0 }
  };
  
  // Count answers for each axis
  questions.forEach((question, index) => {
    const answer = QuizState.answers[`question${index + 1}`];
    if (answer) {
      switch(question.axis) {
        case 'dependency':
          traitCounts.dependency[answer]++;
          break;
        case 'sociality':
          traitCounts.sociality[answer]++;
          break;
        case 'trainability':
          traitCounts.trainability[answer]++;
          break;
        case 'energy':
          traitCounts.energy[answer]++;
          break;
      }
    }
  });
  
  // Determine dominant trait for each axis
  const personalityCode = 
    (traitCounts.dependency.A >= traitCounts.dependency.I ? 'A' : 'I') +
    (traitCounts.sociality.S >= traitCounts.sociality.L ? 'S' : 'L') +
    (traitCounts.trainability.F >= traitCounts.trainability.W ? 'F' : 'W') +
    (traitCounts.energy.C >= traitCounts.energy.E ? 'C' : 'E');
  
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
    
    // Easter Egg: Update title and emoji for Chartreux (cat breed)
    if (elements.resultsTitle) {
      if (breed.name === 'Chartreux') {
        elements.resultsTitle.textContent = 'Your inner cat is...';
        const breedEmoji = document.querySelector('.breed-emoji');
        if (breedEmoji) breedEmoji.textContent = '🐱';
      } else {
        elements.resultsTitle.textContent = 'Your inner dog is...';
        const breedEmoji = document.querySelector('.breed-emoji');
        if (breedEmoji) breedEmoji.textContent = '🐕';
      }
    }
    
    // Display breed information
    elements.breedName.textContent = breed.name;
    elements.breedImage.src = breed.imageUrl;
    elements.breedImage.alt = breed.name;
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

// Share Functions
function shareOnTwitter() {
  const breed = QuizState.currentBreed;
  if (breed) {
    const text = `I just found out my inner dog breed is a ${breed.name}! 🐾 Take the Pawjection quiz to discover yours!`;
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  }
}

function shareOnFacebook() {
  const url = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function copyShareLink() {
  const breed = QuizState.currentBreed;
  if (breed) {
    const text = `I'm a ${breed.name}! 🐾 Discover your inner dog breed at ${window.location.href}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          const btn = elements.shareCopy;
          const originalText = btn.textContent;
          btn.textContent = '✅ Copied!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  }
}

// Statistics Functions
function getStatistics() {
  const stats = localStorage.getItem('pawjectionStats');
  if (stats) {
    return JSON.parse(stats);
  }
  return {
    totalQuizzes: 0,
    breedCounts: {}
  };
}

function saveQuizResult(personalityCode) {
  const stats = getStatistics();
  stats.totalQuizzes++;
  
  if (!stats.breedCounts[personalityCode]) {
    stats.breedCounts[personalityCode] = 0;
  }
  stats.breedCounts[personalityCode]++;
  
  localStorage.setItem('pawjectionStats', JSON.stringify(stats));
}

function displayStatistics() {
  const stats = getStatistics();
  
  if (elements.totalQuizzes) {
    elements.totalQuizzes.textContent = stats.totalQuizzes;
  }
  
  if (elements.breedStats) {
    elements.breedStats.innerHTML = '';
    
    const sortedBreeds = Object.entries(stats.breedCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    if (sortedBreeds.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No quiz results yet!';
      elements.breedStats.appendChild(li);
    } else {
      sortedBreeds.forEach(([code, count]) => {
        const breed = dogBreeds[code];
        if (breed) {
          const li = document.createElement('li');
          const percentage = ((count / stats.totalQuizzes) * 100).toFixed(1);
          li.innerHTML = `${breed.name}: ${count} times (${percentage}%)`;
          elements.breedStats.appendChild(li);
        }
      });
    }
  }
}

function clearStatistics() {
  if (confirm('Are you sure you want to clear all statistics?')) {
    localStorage.removeItem('pawjectionStats');
    displayStatistics();
  }
}

function showStatsModal() {
  displayStatistics();
  if (elements.statsModal) {
    elements.statsModal.style.display = 'block';
  }
}

function hideStatsModal() {
  if (elements.statsModal) {
    elements.statsModal.style.display = 'none';
  }
}

// Breeds Explorer Functions
function showBreedsExplorer() {
  displayAllBreeds();
  if (elements.breedsModal) {
    elements.breedsModal.style.display = 'block';
  }
}

function hideBreedsModal() {
  if (elements.breedsModal) {
    elements.breedsModal.style.display = 'none';
  }
}

function displayAllBreeds() {
  if (!elements.breedsGrid) return;
  
  elements.breedsGrid.innerHTML = '';
  
  Object.entries(dogBreeds).forEach(([code, breed]) => {
    const card = document.createElement('div');
    card.className = 'breed-card';
    if (QuizState.personalityCode === code) {
      card.classList.add('current-match');
    }
    
    card.innerHTML = `
      <img src="${breed.imageUrl}" alt="${breed.name}" class="breed-card-image">
      <h3 class="breed-card-name">${breed.name}</h3>
      <div class="breed-card-code">${code}</div>
      <p class="breed-card-description">${breed.description.substring(0, 100)}...</p>
    `;
    
    card.addEventListener('click', () => viewBreedDetails(code));
    elements.breedsGrid.appendChild(card);
  });
}

function viewBreedDetails(code) {
  const breed = dogBreeds[code];
  if (breed) {
    QuizState.currentBreed = breed;
    QuizState.personalityCode = code;
    hideBreedsModal();
    showResults();
  }
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
  
  // Share buttons
  if (elements.shareTwitter) elements.shareTwitter.addEventListener('click', shareOnTwitter);
  if (elements.shareFacebook) elements.shareFacebook.addEventListener('click', shareOnFacebook);
  if (elements.shareCopy) elements.shareCopy.addEventListener('click', copyShareLink);
  
  // Statistics buttons
  if (elements.viewStatsButton) elements.viewStatsButton.addEventListener('click', showStatsModal);
  if (elements.closeModal) elements.closeModal.addEventListener('click', hideStatsModal);
  if (elements.clearStatsButton) elements.clearStatsButton.addEventListener('click', clearStatistics);
  
  // Breeds Explorer buttons
  if (elements.exploreBreedsButton) elements.exploreBreedsButton.addEventListener('click', showBreedsExplorer);
  if (elements.closeBreedsModal) elements.closeBreedsModal.addEventListener('click', hideBreedsModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === elements.statsModal) {
      hideStatsModal();
    } else if (event.target === elements.breedsModal) {
      hideBreedsModal();
    }
  });
}

// Test Function - Verifies all 16 personality outcomes
function testAllPersonalities() {
  console.log('Testing all 16 personality combinations...');
  const allCodes = Object.keys(dogBreeds);
  let testResults = [];
  
  allCodes.forEach(code => {
    const breed = dogBreeds[code];
    if (breed && breed.name && breed.description && breed.imageUrl && breed.traits) {
      testResults.push({
        code: code,
        status: '✅ Valid',
        breed: breed.name
      });
    } else {
      testResults.push({
        code: code,
        status: '❌ Invalid',
        missing: []
      });
      if (!breed.name) testResults[testResults.length - 1].missing.push('name');
      if (!breed.description) testResults[testResults.length - 1].missing.push('description');
      if (!breed.imageUrl) testResults[testResults.length - 1].missing.push('imageUrl');
      if (!breed.traits) testResults[testResults.length - 1].missing.push('traits');
    }
  });
  
  console.table(testResults);
  
  // Test specific code combinations
  const testCombinations = [
    { answers: {1: 'A', 2: 'A', 3: 'A', 4: 'A'}, expected: 'ASFC' },
    { answers: {1: 'A', 2: 'A', 3: 'A', 4: 'B'}, expected: 'ASFE' },
    { answers: {1: 'A', 2: 'A', 3: 'B', 4: 'A'}, expected: 'ASWC' },
    { answers: {1: 'A', 2: 'A', 3: 'B', 4: 'B'}, expected: 'ASWE' },
    { answers: {1: 'A', 2: 'B', 3: 'A', 4: 'A'}, expected: 'ALFC' },
    { answers: {1: 'A', 2: 'B', 3: 'A', 4: 'B'}, expected: 'ALFE' },
    { answers: {1: 'A', 2: 'B', 3: 'B', 4: 'A'}, expected: 'ALWC' },
    { answers: {1: 'A', 2: 'B', 3: 'B', 4: 'B'}, expected: 'ALWE' },
    { answers: {1: 'B', 2: 'A', 3: 'A', 4: 'A'}, expected: 'ISFC' },
    { answers: {1: 'B', 2: 'A', 3: 'A', 4: 'B'}, expected: 'ISFE' },
    { answers: {1: 'B', 2: 'A', 3: 'B', 4: 'A'}, expected: 'ISWC' },
    { answers: {1: 'B', 2: 'A', 3: 'B', 4: 'B'}, expected: 'ISWE' },
    { answers: {1: 'B', 2: 'B', 3: 'A', 4: 'A'}, expected: 'ILFC' },
    { answers: {1: 'B', 2: 'B', 3: 'A', 4: 'B'}, expected: 'ILFE' },
    { answers: {1: 'B', 2: 'B', 3: 'B', 4: 'A'}, expected: 'ILWC' },
    { answers: {1: 'B', 2: 'B', 3: 'B', 4: 'B'}, expected: 'ILWE' }
  ];
  
  console.log('\nTesting personality code calculation...');
  testCombinations.forEach(test => {
    QuizState.answers = test.answers;
    calculateResults();
    const result = QuizState.personalityCode === test.expected ? '✅' : '❌';
    console.log(`${result} Answers: ${JSON.stringify(test.answers)} => ${QuizState.personalityCode} (Expected: ${test.expected})`);
  });
  
  console.log('\nAll 16 personality outcomes have been tested!');
  return testResults;
}

// Initialize App
function init() {
  console.log('Pawjection app initialized');
  setupEventListeners();
  showScreen('welcome');
  
  // Add test command to console
  window.testPersonalities = testAllPersonalities;
  console.log('💡 Tip: Run testPersonalities() in the console to test all 16 outcomes');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);