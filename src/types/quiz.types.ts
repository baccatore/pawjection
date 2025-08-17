export type Screen = 'welcome' | 'quiz' | 'results'

export type Trait = 'A' | 'I' | 'S' | 'L' | 'F' | 'W' | 'C' | 'E'

export type Axis = 'dependency' | 'sociality' | 'trainability' | 'energy'

export interface QuizOption {
  text: string
  trait: Trait
}

export interface Question {
  id: number
  axis: Axis
  question: string
  options: {
    A: QuizOption
    B: QuizOption
  }
}

export interface QuizState {
  currentQuestion: number
  answers: Record<string, Trait>
  personalityCode: string
  currentBreed: DogBreed | null
}

export interface DogBreed {
  name: string
  description: string
  imageUrl: string
  traits: {
    dependency: string
    sociality: string
    trainability: string
    energy: string
  }
}

export interface Statistics {
  totalQuizzes: number
  breedCounts: Record<string, number>
}