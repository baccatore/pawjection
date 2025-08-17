import { dogBreeds } from '../../data/breeds'

interface BreedsExplorerModalProps {
  currentCode: string
  onClose: () => void
  onSelectBreed: (code: string) => void
}

function BreedsExplorerModal({ currentCode, onClose, onSelectBreed }: BreedsExplorerModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleBackdropClick}>
      <div className="modal-content modal-large">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>All Dog Breeds</h2>
        <div className="breeds-grid">
          {Object.entries(dogBreeds).map(([code, breed]) => (
            <div 
              key={code}
              className={`breed-card ${currentCode === code ? 'current-match' : ''}`}
              onClick={() => onSelectBreed(code)}
            >
              <img 
                src={breed.imageUrl} 
                alt={breed.name} 
                className="breed-card-image"
              />
              <h3 className="breed-card-name">{breed.name}</h3>
              <div className="breed-card-code">{code}</div>
              <p className="breed-card-description">
                {breed.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BreedsExplorerModal