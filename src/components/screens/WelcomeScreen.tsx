interface WelcomeScreenProps {
  onStart: () => void
}

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <section className="screen active">
      <div className="welcome-content">
        <h1 className="app-title">🐾 Pawjection 🐾</h1>
        <p className="tagline">Discover your inner dog breed!</p>
        <p className="description">
          Answer 8 questions about your personality and find out which of 16 dog breeds matches your unique traits with better accuracy!
        </p>
        <button className="btn btn-primary" onClick={onStart}>
          Start Quiz
        </button>
      </div>
    </section>
  )
}

export default WelcomeScreen