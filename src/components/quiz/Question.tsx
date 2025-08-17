import { useState } from 'react'
import { Question as QuestionType } from '../../types/quiz.types'

interface QuestionProps {
  question: QuestionType
  onAnswer: (answer: 'A' | 'B') => void
}

function Question({ question, onAnswer }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleAnswer = (answer: 'A' | 'B') => {
    setSelectedAnswer(answer)
    setIsDisabled(true)
    
    onAnswer(answer)
    setSelectedAnswer(null)
    setIsDisabled(false)
  }

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>
      <div className="answers-container">
        <button 
          className={`btn btn-answer ${selectedAnswer === 'A' ? 'selected' : ''}`}
          onClick={() => handleAnswer('A')}
          disabled={isDisabled}
        >
          {question.options.A.text}
        </button>
        <button 
          className={`btn btn-answer ${selectedAnswer === 'B' ? 'selected' : ''}`}
          onClick={() => handleAnswer('B')}
          disabled={isDisabled}
        >
          {question.options.B.text}
        </button>
      </div>
    </div>
  )
}

export default Question