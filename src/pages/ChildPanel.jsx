import { Link } from 'react-router-dom'
import { ArrowLeft, Puzzle, Palette, Eye, Star, Lock } from 'lucide-react'

export default function ChildPanel() {
  const games = [
    {
      id: 'surukle-birak',
      title: 'Sürükle ve Bırak',
      description: 'Meyveleri doğru sepete koy! Motor beceri ve yönerge takibi.',
      emoji: '🍎',
      color: 'from-red-100 to-orange-100',
      borderColor: 'border-red-200',
      skills: ['Motor Beceri', 'Yönerge Takibi', 'Algılama'],
      ageRange: '2-6 yaş',
      available: true,
    },
    {
      id: 'boyama',
      title: 'Boyama Aktivitesi',
      description: 'Şekilleri renklendir! Yaratıcılık ve ince motor beceri.',
      emoji: '🎨',
      color: 'from-purple-100 to-pink-100',
      borderColor: 'border-purple-200',
      skills: ['Yaratıcılık', 'İnce Motor', 'Renk Algısı'],
      ageRange: '2-6 yaş',
      available: true,
    },
    {
      id: 'dikkat',
      title: 'Dikkat Oyunu',
      description: 'Farklı olanı bul! Dikkat ve görsel algı.',
      emoji: '🔍',
      color: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-200',
      skills: ['Dikkat', 'Görsel Algı', 'Bilişsel'],
      ageRange: '3-6 yaş',
      available: true,
    },
    {
      id: 'hafiza',
      title: 'Hafıza Kartları',
      description: 'Eşleşen kartları bul! Hafıza ve konsantrasyon.',
      emoji: '🃏',
      color: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-200',
      skills: ['Hafıza', 'Konsantrasyon', 'Eşleştirme'],
      ageRange: '3-6 yaş',
      available: false,
    },
    {
      id: 'ses',
      title: 'Ses Tanıma',
      description: 'Sesleri dinle ve eşleştir! Dil gelişimi desteği.',
      emoji: '🔊',
      color: 'from-yellow-100 to-amber-100',
      borderColor: 'border-yellow-200',
      skills: ['Dil Gelişimi', 'İşitsel Algı', 'Dikkat'],
      ageRange: '2-5 yaş',
      available: false,
    },
    {
      id: 'sayilar',
      title: 'Sayı Öğrenme',
      description: 'Sayıları öğren ve say! Temel matematik becerileri.',
      emoji: '🔢',
      color: 'from-indigo-100 to-violet-100',
      borderColor: 'border-indigo-200',
      skills: ['Matematik', 'Sayı Algısı', 'Sıralama'],
      ageRange: '3-6 yaş',
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-yellow/20 via-white to-kid-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-4xl">🎮</div>
            <h1 className="text-3xl lg:text-4xl font-black font-display text-gray-900">
              Çocuk Etkileşim Paneli
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Gelişim destekleyici oyunlar ve görevlerle çocuğunuzun becerilerini destekleyin.
            Her oyun, farklı gelişim alanlarını gözlemlemek için tasarlanmıştır.
          </p>
        </div>

        {/* Age selector */}
        <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-100 inline-flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">Yaş Grubu:</span>
          <div className="flex space-x-2">
            {['0-2', '2-4', '4-6'].map((age) => (
              <button
                key={age}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  age === '2-4'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {age} yaş
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="relative">
              {game.available ? (
                <Link to={`/cocuk/${game.id}`}>
                  <div className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 border ${game.borderColor} hover:shadow-xl transition-all duration-300 h-full group cursor-pointer`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl group-hover:scale-110 transition-transform">{game.emoji}</span>
                      <span className="text-xs font-medium bg-white/70 px-3 py-1 rounded-full text-gray-600">
                        {game.ageRange}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-gray-900 mb-2">{game.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {game.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary-700 group-hover:translate-x-1 transition-transform">
                      Oynamaya Başla →
                    </div>
                  </div>
                </Link>
              ) : (
                <div className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 border ${game.borderColor} h-full opacity-60 relative`}>
                  <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    Yakında
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{game.emoji}</span>
                    <span className="text-xs font-medium bg-white/70 px-3 py-1 rounded-full text-gray-600">
                      {game.ageRange}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-gray-900 mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {game.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start space-x-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-bold font-display text-gray-900 mb-1">Ebeveyn Notu</h3>
            <p className="text-sm text-gray-600">
              Bu oyunlar çocuğunuzun gelişim alanlarını desteklemek ve gözlemlemek amacıyla tasarlanmıştır.
              Oyun sırasında toplanan veriler, risk analizi panelinde kullanılarak size öneriler sunulacaktır.
              Oyun süresini günde 20-30 dakika ile sınırlandırmanız önerilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
