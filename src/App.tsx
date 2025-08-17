import { useState } from 'react'
import WelcomeScreen from './components/screens/WelcomeScreen'
import QuizScreen from './components/screens/QuizScreen'
import ResultsScreen from './components/screens/ResultsScreen'
import StatsModal from './components/modals/StatsModal'
import BreedsExplorerModal from './components/modals/BreedsExplorerModal'
import { QuizState, Screen } from './types/quiz.types'
import { dogBreeds } from './data/breeds'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    personalityCode: '',
    currentBreed: null
  })
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showBreedsModal, setShowBreedsModal] = useState(false)

  const startQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      personalityCode: '',
      currentBreed: null
    })
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = (personalityCode: string) => {
    const breed = dogBreeds[personalityCode]
    if (breed) {
      setQuizState(prev => ({
        ...prev,
        personalityCode,
        currentBreed: breed
      }))
      
      // Save to statistics
      saveQuizResult(personalityCode)
      setCurrentScreen('results')
    }
  }

  const saveQuizResult = (personalityCode: string) => {
    const stats = JSON.parse(localStorage.getItem('pawjectionStats') || '{"totalQuizzes": 0, "breedCounts": {}}')
    stats.totalQuizzes++
    
    if (!stats.breedCounts[personalityCode]) {
      stats.breedCounts[personalityCode] = 0
    }
    stats.breedCounts[personalityCode]++
    
    localStorage.setItem('pawjectionStats', JSON.stringify(stats))
  }

  const resetQuiz = () => {
    setCurrentScreen('welcome')
  }

  const viewBreedDetails = (personalityCode: string) => {
    const breed = dogBreeds[personalityCode]
    if (breed) {
      setQuizState(prev => ({
        ...prev,
        personalityCode,
        currentBreed: breed
      }))
      setShowBreedsModal(false)
      setCurrentScreen('results')
    }
  }

  return (
    <div className="app-container">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={startQuiz} />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizScreen 
          quizState={quizState}
          setQuizState={setQuizState}
          onComplete={handleQuizComplete}
        />
      )}
      
      {currentScreen === 'results' && quizState.currentBreed && (
        <ResultsScreen 
          breed={quizState.currentBreed}
          personalityCode={quizState.personalityCode}
          onRetake={resetQuiz}
          onShowStats={() => setShowStatsModal(true)}
          onExploreBreeds={() => setShowBreedsModal(true)}
        />
      )}

      {showStatsModal && (
        <StatsModal onClose={() => setShowStatsModal(false)} />
      )}

      {showBreedsModal && (
        <BreedsExplorerModal 
          currentCode={quizState.personalityCode}
          onClose={() => setShowBreedsModal(false)}
          onSelectBreed={viewBreedDetails}
        />
      )}
    </div>
  )
}

export default App