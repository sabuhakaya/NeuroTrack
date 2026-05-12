import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Star, CheckCircle } from 'lucide-react'

const ITEMS = [
  { id: 1, emoji: '🍎', name: 'Elma', category: 'meyve' },
  { id: 2, emoji: '🥕', name: 'Havuç', category: 'sebze' },
  { id: 3, emoji: '🍌', name: 'Muz', category: 'meyve' },
  { id: 4, emoji: '🥦', name: 'Brokoli', category: 'sebze' },
  { id: 5, emoji: '🍇', name: 'Üzüm', category: 'meyve' },
  { id: 6, emoji: '🌽', name: 'Mısır', category: 'sebze' },
]

const BASKETS = [
  { id: 'meyve', label: 'Meyve Sepeti', emoji: '🧺', color: 'bg-red-50 border-red-200' },
  { id: 'sebze', label: 'Sebze Sepeti', emoji: '🧺', color: 'bg-green-50 border-green-200' },
]

export default function DragDropGame() {
  const [items, setItems] = useState(ITEMS.map(item => ({ ...item, placed: false })))
  const [basketItems, setBasketItems] = useState({ meyve: [], sebze: [] })
  const [draggedItem, setDraggedItem] = useState(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [highlightedBasket, setHighlightedBasket] = useState(null)
  const [completed, setCompleted] = useState(false)

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e, basketId) => {
    e.preventDefault()
    setHighlightedBasket(basketId)
  }

  const handleDragLeave = () => {
    setHighlightedBasket(null)
  }

  const handleDrop = (basketId) => {
    setHighlightedBasket(null)
    if (!draggedItem) return

    if (draggedItem.category === basketId) {
      // Correct
      setScore(s => s + 1)
      setFeedback({ type: 'success', message: `Harika! ${draggedItem.name} doğru sepete gitti! 🎉` })
      setItems(prev => prev.map(i => i.id === draggedItem.id ? { ...i, placed: true } : i))
      setBasketItems(prev => ({
        ...prev,
        [basketId]: [...prev[basketId], draggedItem],
      }))

      // Check if game is complete
      const remaining = items.filter(i => !i.placed && i.id !== draggedItem.id)
      if (remaining.length === 0) {
        setTimeout(() => setCompleted(true), 800)
      }
    } else {
      // Wrong
      setMistakes(m => m + 1)
      setFeedback({ type: 'error', message: `${draggedItem.name} bir ${draggedItem.category}. Tekrar dene! 💪` })
    }

    setDraggedItem(null)
    setTimeout(() => setFeedback(null), 2000)
  }

  const handleTouchStart = (e, item) => {
    setDraggedItem(item)
  }

  const handleBasketClick = (basketId) => {
    if (!draggedItem) return
    handleDrop(basketId)
  }

  const reset = () => {
    setItems(ITEMS.map(item => ({ ...item, placed: false })))
    setBasketItems({ meyve: [], sebze: [] })
    setScore(0)
    setMistakes(0)
    setFeedback(null)
    setCompleted(false)
    setDraggedItem(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-yellow/30 via-white to-kid-green/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cocuk" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Oyunlara Dön
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display text-gray-900 mb-2">
            🍎 Meyve ve Sebze Sepeti
          </h1>
          <p className="text-gray-600">
            {draggedItem
              ? `"${draggedItem.name}" seçildi — doğru sepete koy!`
              : 'Meyve ve sebzeleri sürükleyip doğru sepete bırak!'}
          </p>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-900">{score}</span>
            <span className="text-gray-500 text-sm">Doğru</span>
          </div>
          <div className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100 flex items-center space-x-2">
            <span className="text-red-500">✗</span>
            <span className="font-bold text-gray-900">{mistakes}</span>
            <span className="text-gray-500 text-sm">Yanlış</span>
          </div>
          <button
            onClick={reset}
            className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100 flex items-center space-x-2 hover:bg-gray-50 transition"
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
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Completion */}
        {completed && (
          <div className="text-center mb-8 p-8 bg-gradient-to-br from-kid-yellow to-kid-green rounded-3xl animate-bounce-in">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-black font-display text-gray-900 mb-2">Tebrikler!</h2>
            <p className="text-gray-700 mb-2">
              Tüm meyve ve sebzeleri doğru sepete koydun!
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Doğru: {score} | Yanlış: {mistakes}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-white rounded-xl font-bold text-primary-700 hover:bg-gray-50 transition shadow-md"
            >
              Tekrar Oyna
            </button>
          </div>
        )}

        {/* Items to drag */}
        {!completed && (
          <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-4 text-center">
              {draggedItem ? '👆 Şimdi aşağıdaki doğru sepete tıkla!' : '👇 Bir öğe seç (tıkla veya sürükle)'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {items.filter(i => !i.placed).map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onClick={() => setDraggedItem(item)}
                  className={`w-24 h-24 flex flex-col items-center justify-center rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-200 select-none ${
                    draggedItem?.id === item.id
                      ? 'bg-primary-100 border-2 border-primary-400 scale-110 shadow-lg'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:scale-105'
                  }`}
                >
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700 mt-1">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Baskets */}
        {!completed && (
          <div className="grid grid-cols-2 gap-6">
            {BASKETS.map((basket) => (
              <div
                key={basket.id}
                onDragOver={(e) => handleDragOver(e, basket.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(basket.id)}
                onClick={() => handleBasketClick(basket.id)}
                className={`rounded-3xl p-6 border-2 border-dashed transition-all duration-300 min-h-[200px] ${
                  basket.color
                } ${
                  highlightedBasket === basket.id
                    ? 'scale-105 shadow-xl border-solid !border-green-400 bg-green-50'
                    : draggedItem
                    ? 'hover:scale-102 hover:shadow-md cursor-pointer'
                    : ''
                }`}
              >
                <div className="text-center mb-4">
                  <span className="text-4xl">{basket.emoji}</span>
                  <h3 className="font-bold font-display text-gray-800 mt-2">{basket.label}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {basketItems[basket.id].map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-2 shadow-sm animate-bounce-in">
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills being observed */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-blue-800 mb-2">📊 Bu oyunda gözlemlenen gelişim alanları:</h3>
          <div className="flex flex-wrap gap-2">
            {['Yönerge Takibi', 'Motor Beceri', 'Sınıflandırma', 'Algılama', 'Dikkat'].map((s) => (
              <span key={s} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
