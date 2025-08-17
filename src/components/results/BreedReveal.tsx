import { DogBreed } from '../../types/quiz.types'

interface BreedRevealProps {
  breed: DogBreed
  isChartreux: boolean
}

function BreedReveal({ breed, isChartreux }: BreedRevealProps) {
  return (
    <div className="breed-reveal">
      <h1 className="breed-name">{breed.name}</h1>
      <img 
        className="breed-image" 
        src={breed.imageUrl} 
        alt={breed.name}
      />
      <div className="breed-emoji">
        {isChartreux ? '🐱' : '🐕'}
      </div>
    </div>
  )
}

export default BreedReveal