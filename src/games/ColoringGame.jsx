import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Palette } from 'lucide-react'

const COLORS = [
  { name: 'Kırmızı', value: '#EF4444' },
  { name: 'Mavi', value: '#3B82F6' },
  { name: 'Yeşil', value: '#22C55E' },
  { name: 'Sarı', value: '#EAB308' },
  { name: 'Mor', value: '#A855F7' },
  { name: 'Turuncu', value: '#F97316' },
  { name: 'Pembe', value: '#EC4899' },
  { name: 'Kahverengi', value: '#92400E' },
]

const SHAPES = [
  {
    id: 'house',
    name: 'Ev',
    parts: [
      { id: 'roof', d: 'M150 60 L250 140 L50 140 Z', label: 'Çatı' },
      { id: 'wall', d: 'M70 140 L230 140 L230 260 L70 260 Z', label: 'Duvar' },
      { id: 'door', d: 'M130 200 L170 200 L170 260 L130 260 Z', label: 'Kapı' },
      { id: 'window1', d: 'M90 165 L120 165 L120 195 L90 195 Z', label: 'Pencere' },
      { id: 'window2', d: 'M180 165 L210 165 L210 195 L180 195 Z', label: 'Pencere' },
    ],
  },
  {
    id: 'tree',
    name: 'Ağaç',
    parts: [
      { id: 'trunk', d: 'M135 200 L165 200 L165 280 L135 280 Z', label: 'Gövde' },
      { id: 'leaves1', d: 'M150 60 Q220 100 200 160 Q180 180 150 170 Q120 180 100 160 Q80 100 150 60 Z', label: 'Yaprak' },
      { id: 'leaves2', d: 'M150 90 Q200 120 190 170 Q170 185 150 175 Q130 185 110 170 Q100 120 150 90 Z', label: 'Yaprak' },
    ],
  },
  {
    id: 'fish',
    name: 'Balık',
    parts: [
      { id: 'body', d: 'M80 150 Q150 80 240 150 Q150 220 80 150 Z', label: 'Gövde' },
      { id: 'tail', d: 'M70 150 L30 110 L30 190 Z', label: 'Kuyruk' },
      { id: 'eye', d: 'M190 140 A8 8 0 1 1 190 141 Z', label: 'Göz' },
      { id: 'fin', d: 'M140 150 L160 190 L120 190 Z', label: 'Yüzgeç' },
    ],
  },
]

export default function ColoringGame() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value)
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
  const [partColors, setPartColors] = useState({})
  const [coloredCount, setColoredCount] = useState(0)

  const currentShape = SHAPES[currentShapeIndex]

  const handlePartClick = (partId) => {
    const key = `${currentShape.id}-${partId}`
    const isNew = !partColors[key]
    setPartColors(prev => ({
      ...prev,
      [key]: selectedColor,
    }))
    if (isNew) setColoredCount(c => c + 1)
  }

  const reset = () => {
    setPartColors({})
    setColoredCount(0)
  }

  const nextShape = () => {
    setCurrentShapeIndex((currentShapeIndex + 1) % SHAPES.length)
    setPartColors({})
    setColoredCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-pink/20 via-white to-kid-purple/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cocuk" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Oyunlara Dön
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display text-gray-900 mb-2">
            🎨 Boyama Zamanı
          </h1>
          <p className="text-gray-600">
            Bir renk seç ve şeklin parçalarına tıklayarak boya!
          </p>
        </div>

        {/* Shape selector */}
        <div className="flex justify-center gap-3 mb-6">
          {SHAPES.map((shape, i) => (
            <button
              key={shape.id}
              onClick={() => { setCurrentShapeIndex(i); reset() }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                i === currentShapeIndex
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {shape.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Color Palette */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold font-display text-gray-900">Renkler</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-full aspect-square rounded-xl transition-all duration-200 ${
                    selectedColor === color.value
                      ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
              <span className="text-xs text-gray-500">Seçili renk:</span>
              <div className="w-full h-8 rounded-lg mt-1" style={{ backgroundColor: selectedColor }}></div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
              >
                <RotateCcw className="w-3 h-3" /> Temizle
              </button>
              <button
                onClick={nextShape}
                className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-200 transition"
              >
                Sonraki →
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-center">
            <svg viewBox="0 0 300 320" className="w-full max-w-md">
              {/* Background */}
              <rect width="300" height="320" fill="#FAFAFA" rx="20" />

              {/* Shape parts */}
              {currentShape.parts.map((part) => {
                const key = `${currentShape.id}-${part.id}`
                return (
                  <path
                    key={part.id}
                    d={part.d}
                    fill={partColors[key] || '#E5E7EB'}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition-all duration-200"
                    onClick={() => handlePartClick(part.id)}
                  >
                    <title>{part.label}</title>
                  </path>
                )
              })}

              {/* Sun */}
              {currentShape.id === 'house' && (
                <circle
                  cx="260"
                  cy="40"
                  r="20"
                  fill={partColors[`${currentShape.id}-sun`] || '#E5E7EB'}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => handlePartClick('sun')}
                />
              )}

              {/* Ground line */}
              <line x1="0" y1="280" x2="300" y2="280" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Boyama İlerlemesi</span>
            <span className="text-sm font-bold text-primary-600">{coloredCount} parça boyanmış</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500 progress-animate"
              style={{ width: `${Math.min(100, (coloredCount / currentShape.parts.length) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-purple-800 mb-2">📊 Bu oyunda gözlemlenen gelişim alanları:</h3>
          <div className="flex flex-wrap gap-2">
            {['Yaratıcılık', 'Renk Algısı', 'İnce Motor Beceri', 'El-Göz Koordinasyonu', 'Karar Verme'].map((s) => (
              <span key={s} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
