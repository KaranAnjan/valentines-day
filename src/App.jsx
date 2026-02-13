import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const particleEmojis = ['✨', '💫', '⭐', '🌟', '💝', '💕', '🌹', '💖', '🦋', '🌸', '❤️', '💗'];
    const newParticles = [];
    
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 20,
        size: 10 + Math.random() * 30
      });
    }
    setParticles(newParticles);
    
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Countdown timer from proposal date
  useEffect(() => {
    const proposalDate = new Date('2019-07-23').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - proposalDate;
      
      const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      setYears(Math.floor(totalDays / 365));
      setMonths(Math.floor((totalDays % 365) / 30));
      setDays(Math.floor((totalDays % 365) % 30));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % carouselPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const carouselPhotos = [
    { 
      id: 1, 
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200", 
      caption: "Every moment with you feels like a beautiful dream",
      subtext: "Our Love Story Begins"
    },
    { 
      id: 2, 
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200", 
      caption: "You are the reason I believe in forever",
      subtext: "Together Always"
    },
    { 
      id: 3, 
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200", 
      caption: "In your arms, I found my home",
      subtext: "Pure Magic"
    },
    { 
      id: 4, 
      url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200", 
      caption: "Your smile lights up my entire universe",
      subtext: "Endless Joy"
    }
  ];

  const galleryPhotos = [
    { 
      id: 1, 
      url: "/image1.jpg", 
      caption: "The Day I Visit",
      description: "A memory I'll cherish forever"
    },
    { 
      id: 2, 
      url: "/image2.jpg", 
      caption: "Our Beautiful Date",
      description: "When two souls became one"
    },
    { 
      id: 3, 
      url: "/image3.jpg", 
      caption: "Adventures Together",
      description: "Every journey is better with you"
    },
    { 
      id: 4, 
      url: "/image4.jpg", 
      caption: "Endless Laughter",
      description: "You make every day brighter"
    },
    { 
      id: 5, 
      url: "/image5.jpeg", 
      caption: "Beautiful Moments",
      description: "Creating memories that last forever"
    },
    { 
      id: 6, 
      url: "/image6.jpeg", 
      caption: "Forever & Always",
      description: "My heart belongs to you"
    }
    
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % carouselPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + carouselPhotos.length) % carouselPhotos.length);
  };

  return (
    <div className="app">
      {/* Particle System */}
      <div className="particle-system">
        {particles.map(particle => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              fontSize: `${particle.size}px`
            }}
          >
            {particle.emoji}
          </span>
        ))}
      </div>

      {/* Hero Section */}
      <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div 
          className="hero-content"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
          }}
        >
          <div className="hero-heart-container">
            <div className="main-heart">
              <span className="heart-emoji">❤️</span>
              <div className="heart-pulse"></div>
              <div className="heart-pulse pulse-2"></div>
            </div>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Happy Valentine's Day</span>
            <span className="title-sparkle">✨</span>
          </h1>
          
          <h2 className="hero-subtitle">
            To My Beautiful Soulmate
            <span className="subtitle-hearts">
              <span>💕</span>
              <span>💖</span>
              <span>💝</span>
            </span>
          </h2>
          
          <p className="hero-message">
            From the moment you walked into my life, everything changed. You brought light to my darkest days, 
            joy to my saddest moments, and love beyond my wildest dreams. Every heartbeat whispers your name, 
            every breath is a reminder of how blessed I am to have you. You are not just my Valentine—you are 
            my forever, my always, my everything.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setShowLetter(true)}>
              <span className="btn-icon">💌</span>
              <span>Read My Love Letter</span>
              <span className="btn-shimmer"></span>
            </button>
            <a href="#gallery" className="btn btn-secondary">
              <span className="btn-icon">📸</span>
              <span>Our Memories</span>
            </a>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-text">Scroll to Explore</div>
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Proposal Anniversary Section */}
      <section className="proposal-section">
        <div className="rose-animation">
          <div className="rose-container">
            <span className="rose">🌹</span>
            <div className="rose-glow"></div>
            <div className="rose-petals">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="petal" style={{ '--i': i }}>🌸</span>
              ))}
            </div>
          </div>
        </div>

        <div className="proposal-content">
          <h2 className="proposal-title">
            <span className="date-highlight">Our Love Story</span>
          </h2>
          <p className="proposal-subtitle">The Journey That Changed Everything</p>
          
          <div className="proposal-text">
            <p>
              From the moment our hearts intertwined, every day has been a beautiful chapter in our story. 
              You walked into my life and transformed everything - making every sunrise brighter, 
              every sunset more romantic, and filling each moment with endless love and joy.
            </p>
          </div>

          {/* Love Counter */}
          <div className="love-counter">
            <p className="counter-label">We've been together for</p>
            <div className="counter-grid">
              <div className="counter-box">
                <span className="counter-value">{years}</span>
                <span className="counter-unit">Years</span>
              </div>
              <div className="counter-box">
                <span className="counter-value">{months}</span>
                <span className="counter-unit">Months</span>
              </div>
              <div className="counter-box">
                <span className="counter-value">{days}</span>
                <span className="counter-unit">Days</span>
              </div>
              <div className="counter-box">
                <span className="counter-value">{hours}</span>
                <span className="counter-unit">Hours</span>
              </div>
              <div className="counter-box">
                <span className="counter-value">{minutes}</span>
                <span className="counter-unit">Minutes</span>
              </div>
              <div className="counter-box">
                <span className="counter-value">{seconds}</span>
                <span className="counter-unit">Seconds</span>
              </div>
            </div>
            <p className="counter-footer">And every moment has been worth it</p>
          </div>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">
            <span className="title-decoration">✨</span>
            Our Love Story in Pictures
            <span className="title-decoration">✨</span>
          </h2>
          <p className="section-subtitle">Every photograph tells a story of our love</p>
        </div>

        <div className="carousel-container">
          <div className="carousel-main">
            <div className="carousel-image-wrapper">
              {carouselPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`carousel-slide ${index === currentPhotoIndex ? 'active' : ''}`}
                >
                  <img src={photo.url} alt={photo.caption} />
                  <div className="photo-glow"></div>
                </div>
              ))}
            </div>

            <button className="carousel-arrow prev-arrow" onClick={prevPhoto}>
              <span>❮</span>
            </button>
            <button className="carousel-arrow next-arrow" onClick={nextPhoto}>
              <span>❯</span>
            </button>

            <div className="carousel-caption">
              <div className="caption-content">
                <p className="caption-subtext">{carouselPhotos[currentPhotoIndex].subtext}</p>
                <h3 className="caption-main">{carouselPhotos[currentPhotoIndex].caption}</h3>
                <div className="caption-hearts">
                  <span>💕</span>
                  <span>💖</span>
                  <span>💕</span>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            {carouselPhotos.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentPhotoIndex ? 'active' : ''}`}
                onClick={() => setCurrentPhotoIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="gallery-header">
          <h2 className="section-title">
            <span className="title-decoration">📸</span>
            Captured Moments
            <span className="title-decoration">📸</span>
          </h2>
          <p className="section-subtitle">Every picture holds a thousand words of love</p>
        </div>

        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="gallery-item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="gallery-image-wrapper">
                <img src={photo.url} alt={photo.caption} />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <span className="gallery-icon">💝</span>
                    <h3 className="gallery-caption">{photo.caption}</h3>
                    <p className="gallery-description">{photo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPhoto(null)}>
              <span>✕</span>
            </button>
            <div className="photo-frame">
              <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
            </div>
            <div className="modal-caption">
              <h3>{selectedPhoto.caption}</h3>
              <p>{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Love Letter Modal */}
      {showLetter && (
        <div className="modal-overlay" onClick={() => setShowLetter(false)}>
          <div className="modal-content letter-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLetter(false)}>
              <span>✕</span>
            </button>
            <div className="letter-envelope">
              <div className="envelope-flap"></div>
            </div>
            <div className="letter-paper">
              <div className="letter-header">
                <span className="letter-seal">💌</span>
                <h2>My Dearest Love,</h2>
              </div>
              <div className="letter-body">
                <p>
                  Words can never fully express what you mean to me, but let me try. Since the day 
                  you became mine, my life has been a beautiful dream I never want to wake up from.
                </p>
                <p>
                  You are my sunrise and my sunset, my laughter and my tears of joy, my strength and my comfort. 
                  In your eyes, I see my future. In your smile, I find my happiness. In your arms, I discover home.
                </p>
                <p>
                  Every day with you is a gift I treasure. You've taught me what it means to truly love and be loved. 
                  You've shown me that fairy tales do exist, that soulmates are real, and that forever is not just a word—it's a promise.
                </p>
                <p>
                  Thank you for choosing me every single day. Thank you for your patience, your kindness, your unwavering love. 
                  Thank you for being you—the most amazing person I've ever known.
                </p>
                <p>
                  I promise to love you through every season, to hold your hand through every storm, to celebrate every joy, 
                  and to cherish you more with each passing moment. You are my today, my tomorrow, my forever.
                </p>
                <p className="letter-closing">
                  Happy Valentine's Day, my beautiful angel. I love you more than words can say, 
                  more than actions can show, and more than you'll ever know.
                </p>
                <p className="letter-signature">
                  Forever and always yours,<br/>
                  <span className="signature-name">Your Love ❤️</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promise Section */}
      <section className="promise-section">
        <div className="promise-content">
          <div className="promise-icon">
            <span className="ring-emoji">💍</span>
            <div className="ring-sparkle"></div>
          </div>
          
          <h2 className="promise-title">My Eternal Promise</h2>
          
          <div className="promise-text">
            <p className="promise-line">
              💖 To love you unconditionally, with every fiber of my being, every single day
            </p>
            <p className="promise-line">
              💖 To be your rock when the world feels too heavy to bear
            </p>
            <p className="promise-line">
              💖 To make you smile, even when tears threaten to fall
            </p>
            <p className="promise-line">
              💖 To stand by your side through every triumph and every challenge
            </p>
            <p className="promise-line">
              💖 To cherish every moment, from the extraordinary to the ordinary
            </p>
            <p className="promise-line">
              💖 To choose you, again and again, for all the days of my life
            </p>
            <p className="promise-line">
              💖 To be forever yours, in this life and every life after ❤️
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-aurora"></div>
        
        <div className="footer-content">
          <div className="footer-hearts">
            {['❤️', '💖', '💕', '💝', '💗'].map((heart, i) => (
              <span key={i} className="footer-heart" style={{ animationDelay: `${i * 0.2}s` }}>
                {heart}
              </span>
            ))}
          </div>
          
          <h3 className="footer-title">Made With Infinite Love</h3>
          
          <p className="footer-message">
            You are the love of my life, the beat of my heart, the breath in my lungs.
            <br/>
            Today, tomorrow, and for all eternity—I am yours.
          </p>
          
          <div className="footer-divider">
            <span>✨</span>
            <div className="divider-line"></div>
            <span>💕</span>
            <div className="divider-line"></div>
            <span>✨</span>
          </div>
          
          <p className="copyright">
            © Forever & Always - Our Love Story
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;