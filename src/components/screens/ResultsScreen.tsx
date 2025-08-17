import { DogBreed } from '../../types/quiz.types'
import BreedReveal from '../results/BreedReveal'
import TraitsList from '../results/TraitsList'
import ShareButtons from '../results/ShareButtons'

interface ResultsScreenProps {
  breed: DogBreed
  personalityCode: string
  onRetake: () => void
  onShowStats: () => void
  onExploreBreeds: () => void
}

function ResultsScreen({ breed, onRetake, onShowStats, onExploreBreeds }: ResultsScreenProps) {
  const isChartreux = breed.name === 'Chartreux'
  
  return (
    <section className="screen active">
      <div className="results-content">
        <h2 className="results-title">
          {isChartreux ? 'Your inner cat is...' : 'Your inner dog is...'}
        </h2>
        
        <BreedReveal breed={breed} isChartreux={isChartreux} />
        
        <p className="breed-description">{breed.description}</p>
        
        <TraitsList traits={breed.traits} />
        
        <ShareButtons breedName={breed.name} />
        
        <button className="btn btn-primary" onClick={onRetake}>
          Take Quiz Again
        </button>
        
        <div className="options-section">
          <button className="btn btn-secondary" onClick={onShowStats}>
            View Statistics
          </button>
          <button className="btn btn-secondary" onClick={onExploreBreeds}>
            Explore All Breeds
          </button>
        </div>
      </div>
    </section>
  )
}

export default ResultsScreen