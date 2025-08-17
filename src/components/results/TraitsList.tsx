interface TraitsListProps {
  traits: {
    dependency: string
    sociality: string
    trainability: string
    energy: string
  }
}

function TraitsList({ traits }: TraitsListProps) {
  const traitDescriptions = [
    traits.dependency,
    traits.sociality,
    traits.trainability,
    traits.energy
  ]

  return (
    <div className="traits-container">
      <h3>Your Personality Traits:</h3>
      <ul className="traits-list">
        {traitDescriptions.map((trait, index) => (
          <li key={index}>{trait}</li>
        ))}
      </ul>
    </div>
  )
}

export default TraitsList