import { useEffect, useState } from 'react'
import { Statistics } from '../../types/quiz.types'
import { dogBreeds } from '../../data/breeds'

interface StatsModalProps {
  onClose: () => void
}

function StatsModal({ onClose }: StatsModalProps) {
  const [stats, setStats] = useState<Statistics>({
    totalQuizzes: 0,
    breedCounts: {}
  })

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = () => {
    const storedStats = localStorage.getItem('pawjectionStats')
    if (storedStats) {
      setStats(JSON.parse(storedStats))
    }
  }

  const clearStatistics = () => {
    if (confirm('Are you sure you want to clear all statistics?')) {
      localStorage.removeItem('pawjectionStats')
      setStats({
        totalQuizzes: 0,
        breedCounts: {}
      })
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const sortedBreeds = Object.entries(stats.breedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>Quiz Statistics</h2>
        <div className="stats-content">
          <p>
            Total quizzes taken: <span>{stats.totalQuizzes}</span>
          </p>
          <h3>Most Common Breeds:</h3>
          <ul className="breed-stats">
            {sortedBreeds.length === 0 ? (
              <li>No quiz results yet!</li>
            ) : (
              sortedBreeds.map(([code, count]) => {
                const breed = dogBreeds[code]
                if (!breed) return null
                const percentage = ((count / stats.totalQuizzes) * 100).toFixed(1)
                return (
                  <li key={code}>
                    {breed.name}: {count} times ({percentage}%)
                  </li>
                )
              })
            )}
          </ul>
          <button className="btn btn-secondary" onClick={clearStatistics}>
            Clear Statistics
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatsModal