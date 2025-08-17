import { Question } from '../types/quiz.types'

export const questions: Question[] = [
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
]