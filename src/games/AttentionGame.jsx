import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Star, Clock, Zap } from 'lucide-react'

const EMOJI_SETS = [
  ['🐶', '🐱', '🐰', '🐻'],
  ['🍎', '🍊', '🍋', '🍇'],
  ['🚗', '🚌', '🚀', '🚁'],
  ['⭐', '❤️', '🔵', '🟢'],
  ['🌸', '🌻', '🌺', '🍀'],
]

function generateRound(level) {
  const setIndex = Math.floor(Math.random() * EMOJI_SETS.length)
  const emojiSet = EMOJI_SETS[setIndex]
  const gridSize = level <= 2 ? 4 : level <= 4 ? 6 : 9
  const baseEmoji = emojiSet[0]
  const oddEmoji = emojiSet[Math.floor(Math.random() * (emojiSet.length - 1)) + 1]

  const grid = Array(gridSize).fill(baseEmoji)
  const oddIndex = Math.floor(Math.random() * gridSize)
  grid[oddIndex] = oddEmoji

  return { grid, oddIndex, baseEmoji, oddEmoji }
}

export default function AttentionGame() {
  const [level, setLevel] = useState(1)
  const [round, setRound] = useState(() => generateRound(1))
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [feedback, setFeedback] = useState(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [totalRounds, setTotalRounds] = useState(0)
  const [correctRounds, setCorrectRounds] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    if (!isTimerActive || gameOver) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, isTimerActive, gameOver])

  const handleTimeout = () => {
    setLives(l => {
      const newLives = l - 1
      if (newLives <= 0) {
        setGameOver(true)
        setFeedback({ type: 'timeout', message: 'Süre doldu! ⏰' })
      } else {
        setFeedback({ type: 'timeout', message: 'Süre doldu! Bir hakkın gitti ⏰' })
        setTimeout(() => nextRound(), 1500)
      }
      return newLives
    })
    setTotalRounds(r => r + 1)
  }

  const handleClick = (index) => {
    if (gameOver || feedback) return
    setIsTimerActive(false)
    setTotalRounds(r => r + 1)

    if (index === round.oddIndex) {
      // Correct
      setScore(s => s + (level * 10) + (timeLeft * 2))
      setCorrectRounds(r => r + 1)
      setFeedback({ type: 'success', message: 'Doğru buldun! 🎉' })
      setTimeout(() => {
        if ((totalRounds + 1) % 3 === 0) setLevel(l => Math.min(l + 1, 6))
        nextRound()
      }, 1000)
    } else {
      // Wrong
      setLives(l => {
        const newLives = l - 1
        if (newLives <= 0) {
          setGameOver(true)
        }
        return newLives
      })
      setFeedback({ type: 'error', message: 'Bu değildi! Tekrar bak 👀' })
      setTimeout(() => {
        if (lives > 1) setFeedback(null)
        setIsTimerActive(true)
      }, 1000)
    }
  }

  const nextRound = () => {
    const newRound = generateRound(level)
    setRound(newRound)
    setFeedback(null)
    setTimeLeft(Math.max(5, 12 - level))
    setIsTimerActive(true)
  }

  const reset = () => {
    setLevel(1)
    setScore(0)
    setLives(3)
    setFeedback(null)
    setTimeLeft(10)
    setGameOver(false)
    setTotalRounds(0)
    setCorrectRounds(0)
    setIsTimerActive(true)
    setRound(generateRound(1))
  }

  const gridCols = level <= 2 ? 'grid-cols-2' : level <= 4 ? 'grid-cols-3' : 'grid-cols-3'

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/20 via-white to-kid-purple/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cocuk" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Oyunlara Dön
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display text-gray-900 mb-2">
            🔍 Farklı Olanı Bul
          </h1>
          <p className="text-gray-600">
            Diğerlerinden farklı olan emojiye tıkla!
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-900">{score}</span>
            <span className="text-gray-500 text-sm">Puan</span>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="font-bold text-gray-900">Seviye {level}</span>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100 flex items-center space-x-2">
            <span className="text-lg">{'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
          </div>
          <div className={`bg-white rounded-2xl px-5 py-3 shadow-sm border flex items-center space-x-2 ${
            timeLeft <= 3 ? 'border-red-300 bg-red-50' : 'border-gray-100'
          }`}>
            <Clock className={`w-5 h-5 ${timeLeft <= 3 ? 'text-red-500' : 'text-gray-500'}`} />
            <span className={`font-bold ${timeLeft <= 3 ? 'text-red-600' : 'text-gray-900'}`}>{timeLeft}s</span>
          </div>
          <button
            onClick={reset}
            className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100 flex items-center space-x-2 hover:bg-gray-50 transition"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Sıfırla</span>
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center mb-6 p-4 rounded-2xl animate-bounce-in font-semibold ${
              feedback.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : feedback.type === 'timeout'
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Game Over */}
        {gameOver ? (
          <div className="text-center p-10 bg-gradient-to-br from-kid-blue to-kid-purple rounded-3xl animate-bounce-in">
            <div className="text-6xl mb-4">{score >= 100 ? '🏆' : score >= 50 ? '⭐' : '💪'}</div>
            <h2 className="text-2xl font-black font-display text-gray-900 mb-2">Oyun Bitti!</h2>
            <p className="text-gray-700 mb-1">Toplam Puan: <strong>{score}</strong></p>
            <p className="text-gray-700 mb-1">Seviye: <strong>{level}</strong></p>
            <p className="text-gray-700 mb-4">
              Doğru: {correctRounds} / {totalRounds} ({totalRounds > 0 ? Math.round((correctRounds / totalRounds) * 100) : 0}%)
            </p>

            <div className="bg-white/60 rounded-2xl p-4 mb-6 max-w-sm mx-auto">
              <h3 className="font-bold text-sm text-gray-800 mb-2">Performans Değerlendirmesi</h3>
              <div className="space-y-2">
                {[
                  { label: 'Dikkat', value: Math.min(100, correctRounds * 20) },
                  { label: 'Hız', value: Math.min(100, score / 2) },
                  { label: 'Doğruluk', value: totalRounds > 0 ? Math.round((correctRounds / totalRounds) * 100) : 0 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{metric.label}</span>
                      <span>%{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full progress-animate"
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="px-8 py-3 bg-white rounded-xl font-bold text-primary-700 hover:bg-gray-50 transition shadow-md"
            >
              Tekrar Oyna
            </button>
          </div>
        ) : (
          /* Game Grid */
          <div className="flex justify-center">
            <div className={`grid ${gridCols} gap-4 max-w-md`}>
              {round.grid.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-primary-300 hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center text-5xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-cyan-800 mb-2">📊 Bu oyunda gözlemlenen gelişim alanları:</h3>
          <div className="flex flex-wrap gap-2">
            {['Görsel Dikkat', 'Algılama Hızı', 'Ayırt Etme', 'Konsantrasyon', 'Tepki Süresi'].map((s) => (
              <span key={s} className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
