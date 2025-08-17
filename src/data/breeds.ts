import { DogBreed } from '../types/quiz.types'

export const dogBreeds: Record<string, DogBreed> = {
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
  // Easter Egg: This one's actually a cat breed
  'ILFE': {
    name: 'Chartreux',
    description: 'Quiet and intelligent with a gentle disposition. Independent yet loyal to their chosen person, they have bursts of playful energy between contemplative moments.',
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
}