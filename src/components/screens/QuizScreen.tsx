import { useState, useEffect } from 'react'
import { QuizState, Trait } from '../../types/quiz.types'
import { questions } from '../../data/questions'
import ProgressBar from '../quiz/ProgressBar'
import Question from '../quiz/Question'
import LoadingState from '../quiz/LoadingState'

interface QuizScreenProps {
  quizState: QuizState
  setQuizState: React.Dispatch<React.SetStateAction<QuizState>>
  onComplete: (personalityCode: string) => void
}

function QuizScreen({ quizState, setQuizState, onComplete }: QuizScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (answer: 'A' | 'B') => {
    const currentQuestion = questions[quizState.currentQuestion]
    const selectedTrait = currentQuestion?.options[answer].trait
    
    if (!selectedTrait) return
    
    // Store the answer
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [`question${quizState.currentQuestion + 1}`]: selectedTrait
      }
    }))
    
    // Move to next question or calculate results
    if (quizState.currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }))
      }, 300)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        calculateResults()
      }, 1000)
    }
  }

  const calculateResults = () => {
    // Count traits for each axis
    const traitCounts = {
      dependency: { A: 0, I: 0 },
      sociality: { S: 0, L: 0 },
      trainability: { F: 0, W: 0 },
      energy: { C: 0, E: 0 }
    }
    
    // Count answers for each axis
    questions.forEach((question, index) => {
      const answer = quizState.answers[`question${index + 1}`]
      if (answer) {
        switch(question.axis) {
          case 'dependency':
            if (answer === 'A' || answer === 'I') {
              traitCounts.dependency[answer as 'A' | 'I']++
            }
            break
          case 'sociality':
            if (answer === 'S' || answer === 'L') {
              traitCounts.sociality[answer as 'S' | 'L']++
            }
            break
          case 'trainability':
            if (answer === 'F' || answer === 'W') {
              traitCounts.trainability[answer as 'F' | 'W']++
            }
            break
          case 'energy':
            if (answer === 'C' || answer === 'E') {
              traitCounts.energy[answer as 'C' | 'E']++
            }
            break
        }
      }
    })
    
    // Determine dominant trait for each axis
    const personalityCode = 
      (traitCounts.dependency.A >= traitCounts.dependency.I ? 'A' : 'I') +
      (traitCounts.sociality.S >= traitCounts.sociality.L ? 'S' : 'L') +
      (traitCounts.trainability.F >= traitCounts.trainability.W ? 'F' : 'W') +
      (traitCounts.energy.C >= traitCounts.energy.E ? 'C' : 'E')
    
    onComplete(personalityCode)
  }

  if (isLoading) {
    return <LoadingState />
  }

  const currentQuestion = questions[quizState.currentQuestion]
  
  if (!currentQuestion) return null

  return (
    <section className="screen active">
      <div className="quiz-content">
        <ProgressBar 
          current={quizState.currentQuestion + 1}
          total={questions.length}
        />
        <Question 
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      </div>
    </section>
  )
}

export default QuizScreen