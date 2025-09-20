'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';

export default function Proposal() {
  const [name, setName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false); // New state
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('proposalName');
    if (!storedName) {
      router.push('/');
      return;
    }
    setName(storedName);

    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const updateContainerDimensions = () => {
      const container = document.getElementById('button-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateWindowDimensions();
    updateContainerDimensions();

    window.addEventListener('resize', updateWindowDimensions);
    window.addEventListener('resize', updateContainerDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, [router]);

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowMessage(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const moveNoButton = () => {
    const buttonWidth = 120; // Approx. button width
    const buttonHeight = 48; // Approx. button height
    const margin = 20;

    const maxX = containerDimensions.width - buttonWidth - margin;
    const maxY = containerDimensions.height - buttonHeight - margin;

    const newX = Math.random() * Math.max(0, maxX);
    const newY = Math.random() * Math.max(0, maxY);

    setNoButtonPosition({ x: newX, y: newY });
  };

  // New handler for click events
  const handleNoClick = () => {
    if (isNoButtonMoved) {
      // If already moved, reset its position
      setIsNoButtonMoved(false);
    } else {
      // If not moved, move it and set the state
      moveNoButton();
      setIsNoButtonMoved(true);
    }
  };

  const handleBackToHome = () => {
    localStorage.removeItem('proposalName');
    localStorage.removeItem('proposalAge');
    router.push('/');
  };

  if (!name) {
    return null; // Will redirect to home
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#ec4899', '#8b5cf6', '#f97316', '#06b6d4', '#10b981']}
        />
      )}

      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90 z-10"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
              <Sparkles className="w-8 h-8 text-purple-500 animate-spin" />
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-pulse">
            {name} 💕
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-8">
            Mau ga jadian sama gua? 🥺
          </h2>
        </div>

        <div
        id="button-container"
        className="relative h-64 w-full max-w-md mx-auto flex items-center justify-center gap-4"
        >
        <button
          onClick={handleYesClick}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xl z-10"
        >
          Iya Dong! 💕
        </button>

        <button
          onClick={handleNoClick} // Updated onClick handler
          onMouseEnter={() => { if (!isNoButtonMoved) moveNoButton() }} // Updated onMouseEnter
          className="bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg text-lg hover:shadow-xl"
          style={isNoButtonMoved ? {
              position: 'absolute',
              left: noButtonPosition.x,
              top: noButtonPosition.y,
              transition: 'left 0.4s ease, top 0.4s ease',
          } : {
              transition: 'all 0.4s ease',
          }}
        >
          Tidak 😔
        </button>
        </div>

        {showMessage && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-200 animate-bounce">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-red-500 animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold text-pink-600 mb-2">
              Yeay! You&#39;ve made me the happiest person in the world! 🎉
            </p>
            <p className="text-lg text-gray-600">
              Aku udah ga sabar menjalani hari-hari indah bersamamu! 💖✨
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Coba deh hover ke tombol &quot;Tidak&quot;... 😏
          </p>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300 opacity-30 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
            size={20 + Math.random() * 20}
          />
        ))}
      </div>
    </div>
  );
}