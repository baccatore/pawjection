function LoadingState() {
  return (
    <section className="screen active">
      <div className="quiz-content">
        <div className="loading-container">
          <div className="paw-loader">
            <span className="paw-print">🐾</span>
            <span className="paw-print">🐾</span>
            <span className="paw-print">🐾</span>
          </div>
          <div className="loading-spinner"></div>
          <p className="loading-text">Analyzing your personality...</p>
          <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '10px' }}>
            Finding your perfect match...
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoadingState