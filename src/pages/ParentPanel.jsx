import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'

const SECTIONS = [
  {
    id: 'child-info',
    title: 'Çocuk Bilgileri',
    icon: '👶',
    fields: [
      { id: 'childName', label: 'Çocuğun Adı', type: 'text', placeholder: 'Adı girin' },
      { id: 'childAge', label: 'Yaşı (ay olarak)', type: 'number', placeholder: 'Örn: 36' },
      { id: 'childGender', label: 'Cinsiyeti', type: 'select', options: ['Kız', 'Erkek'] },
      { id: 'birthOrder', label: 'Kaçıncı çocuk?', type: 'select', options: ['1.', '2.', '3.', '4+'] },
    ],
  },
  {
    id: 'screen-habits',
    title: 'Ekran Kullanım Alışkanlıkları',
    icon: '📱',
    questions: [
      {
        id: 'q1',
        text: 'Çocuğunuz günde ortalama ne kadar süre ekran (telefon, tablet, TV) kullanıyor?',
        options: [
          { value: 0, label: '30 dakikadan az' },
          { value: 1, label: '30 dakika - 1 saat' },
          { value: 2, label: '1 - 2 saat' },
          { value: 3, label: '2 - 3 saat' },
          { value: 4, label: '3 saatten fazla' },
        ],
      },
      {
        id: 'q2',
        text: 'Çocuğunuz ekranı genellikle hangi amaçla kullanıyor?',
        options: [
          { value: 0, label: 'Eğitici içerikler (öğrenme uygulamaları)' },
          { value: 1, label: 'Çizgi film/video izleme' },
          { value: 2, label: 'Oyun oynama' },
          { value: 3, label: 'Karışık (hepsi)' },
          { value: 4, label: 'Genellikle pasif izleme' },
        ],
      },
      {
        id: 'q3',
        text: 'Çocuğunuz ekran kullanırken yalnız mı kalıyor?',
        options: [
          { value: 0, label: 'Hayır, her zaman birlikte' },
          { value: 1, label: 'Genellikle birlikte' },
          { value: 2, label: 'Bazen yalnız' },
          { value: 3, label: 'Genellikle yalnız' },
          { value: 4, label: 'Neredeyse her zaman yalnız' },
        ],
      },
      {
        id: 'q4',
        text: 'Ekran kullanımı sonrası çocuğunuzun davranışlarında değişiklik gözlemliyor musunuz?',
        options: [
          { value: 0, label: 'Hayır, değişiklik yok' },
          { value: 1, label: 'Hafif huzursuzluk' },
          { value: 2, label: 'Sinirlilik/ağlama' },
          { value: 3, label: 'Agresiflik veya aşırı tepki' },
          { value: 4, label: 'Ciddi davranış değişikliği' },
        ],
      },
    ],
  },
  {
    id: 'attention',
    title: 'Dikkat ve Bilişsel Gelişim',
    icon: '🧠',
    questions: [
      {
        id: 'q5',
        text: 'Çocuğunuz bir etkinliğe (oyun, kitap vb.) ne kadar süre odaklanabiliyor?',
        options: [
          { value: 0, label: 'Yaşına uygun süre (10-15 dk)' },
          { value: 1, label: 'Biraz kısa (5-10 dk)' },
          { value: 2, label: 'Çok kısa (2-5 dk)' },
          { value: 3, label: 'Neredeyse hiç odaklanamıyor' },
          { value: 4, label: 'Sadece ekranda odaklanabiliyor' },
        ],
      },
      {
        id: 'q6',
        text: 'Çocuğunuz verilen yönergeleri takip edebiliyor mu?',
        options: [
          { value: 0, label: 'Evet, kolayca takip eder' },
          { value: 1, label: 'Genellikle takip eder' },
          { value: 2, label: 'Tekrar gerektirir' },
          { value: 3, label: 'Zorlanıyor' },
          { value: 4, label: 'Çok zorlanıyor' },
        ],
      },
      {
        id: 'q7',
        text: 'Çocuğunuz yaratıcı oyunlar (hayal kurma, rol yapma) oynuyor mu?',
        options: [
          { value: 0, label: 'Evet, sıklıkla' },
          { value: 1, label: 'Ara sıra' },
          { value: 2, label: 'Nadiren' },
          { value: 3, label: 'Çok nadir' },
          { value: 4, label: 'Hayır' },
        ],
      },
    ],
  },
  {
    id: 'language',
    title: 'Dil ve İletişim Gelişimi',
    icon: '💬',
    questions: [
      {
        id: 'q8',
        text: 'Çocuğunuzun konuşma gelişimi yaşıtlarıyla kıyaslandığında nasıl?',
        options: [
          { value: 0, label: 'Yaşına uygun veya ileri' },
          { value: 1, label: 'Hafif geride' },
          { value: 2, label: 'Belirgin geride' },
          { value: 3, label: 'Çok az kelime kullanıyor' },
          { value: 4, label: 'Henüz konuşmuyor (yaşa göre beklenenden geç)' },
        ],
      },
      {
        id: 'q9',
        text: 'Çocuğunuz göz teması kurabiliyor mu?',
        options: [
          { value: 0, label: 'Evet, rahatlıkla' },
          { value: 1, label: 'Genellikle evet' },
          { value: 2, label: 'Bazen zorlanıyor' },
          { value: 3, label: 'Nadiren' },
          { value: 4, label: 'Çok nadir / hiç' },
        ],
      },
      {
        id: 'q10',
        text: 'Çocuğunuz adı söylendiğinde tepki veriyor mu?',
        options: [
          { value: 0, label: 'Her zaman hemen döner' },
          { value: 1, label: 'Genellikle döner' },
          { value: 2, label: 'Bazen gecikmeli' },
          { value: 3, label: 'Nadiren tepki verir' },
          { value: 4, label: 'Ekrandayken hiç tepki vermez' },
        ],
      },
    ],
  },
  {
    id: 'social-behavior',
    title: 'Sosyal ve Davranışsal Gelişim',
    icon: '🤝',
    questions: [
      {
        id: 'q11',
        text: 'Çocuğunuz yaşıtlarıyla etkileşim kurabiliyor mu?',
        options: [
          { value: 0, label: 'Evet, kolayca arkadaşlık kurar' },
          { value: 1, label: 'Genellikle evet' },
          { value: 2, label: 'Zorlanıyor' },
          { value: 3, label: 'Genellikle yalnız kalmayı tercih eder' },
          { value: 4, label: 'Sosyal etkileşimden kaçınıyor' },
        ],
      },
      {
        id: 'q12',
        text: 'Çocuğunuzun uyku düzeni nasıl?',
        options: [
          { value: 0, label: 'Düzenli ve yeterli' },
          { value: 1, label: 'Hafif düzensiz' },
          { value: 2, label: 'Uykuya dalmada güçlük' },
          { value: 3, label: 'Sık sık uyku bozukluğu' },
          { value: 4, label: 'Ciddi uyku sorunları (ekranla bağlantılı)' },
        ],
      },
      {
        id: 'q13',
        text: 'Ekran alındığında çocuğunuzun tepkisi nasıl oluyor?',
        options: [
          { value: 0, label: 'Sakin kabul ediyor' },
          { value: 1, label: 'Hafif itiraz ediyor' },
          { value: 2, label: 'Ağlıyor ama sakinleşiyor' },
          { value: 3, label: 'Şiddetli ağlama/öfke nöbeti' },
          { value: 4, label: 'Kontrol edilemez tepkiler' },
        ],
      },
      {
        id: 'q14',
        text: 'Çocuğunuz fiziksel aktivitelerden (koşma, oynama, park) hoşlanıyor mu?',
        options: [
          { value: 0, label: 'Evet, çok seviyor' },
          { value: 1, label: 'Genellikle evet' },
          { value: 2, label: 'Bazen tercih ediyor' },
          { value: 3, label: 'Ekranı tercih ediyor' },
          { value: 4, label: 'Fiziksel aktiviteye ilgisiz' },
        ],
      },
    ],
  },
]

export default function ParentPanel() {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [childInfo, setChildInfo] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const section = SECTIONS[currentSection]
  const totalSections = SECTIONS.length

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleFieldChange = (fieldId, value) => {
    setChildInfo(prev => ({ ...prev, [fieldId]: value }))
  }

  const isSectionComplete = () => {
    if (section.fields) {
      return section.fields.every(f => childInfo[f.id])
    }
    if (section.questions) {
      return section.questions.every(q => answers[q.id] !== undefined)
    }
    return false
  }

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(s => s + 1)
    } else {
      setSubmitted(true)
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1)
    }
  }

  const totalQuestions = SECTIONS.filter(s => s.questions).reduce((sum, s) => sum + s.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = ((answeredQuestions + (Object.keys(childInfo).length > 0 ? 1 : 0)) / (totalQuestions + 1)) * 100

  if (submitted) {
    const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0)
    const maxScore = totalQuestions * 4
    const riskPercentage = Math.round((totalScore / maxScore) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center animate-bounce-in">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-black font-display text-gray-900 mb-4">
              Değerlendirme Tamamlandı!
            </h2>
            <p className="text-gray-600 mb-6">
              {childInfo.childName || 'Çocuğunuz'} için ön değerlendirme formu başarıyla tamamlandı.
              Risk analizi ve detaylı rapor için dashboard sayfasını ziyaret edin.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Ön Sonuç Özeti</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-500">Çocuk</span>
                  <p className="font-bold text-gray-900">{childInfo.childName || '-'}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-500">Yaş</span>
                  <p className="font-bold text-gray-900">{childInfo.childAge ? `${childInfo.childAge} ay` : '-'}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-500">Yanıtlanan Soru</span>
                  <p className="font-bold text-gray-900">{answeredQuestions}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-500">Risk İndeksi</span>
                  <p className={`font-bold ${
                    riskPercentage < 25 ? 'text-green-600' :
                    riskPercentage < 50 ? 'text-yellow-600' :
                    riskPercentage < 75 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    %{riskPercentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition shadow-md"
              >
                Detaylı Raporu Gör
              </Link>
              <button
                onClick={() => { setSubmitted(false); setCurrentSection(0); setAnswers({}); setChildInfo({}) }}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                Yeni Form
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display text-gray-900 mb-2">
            📋 Ebeveyn Değerlendirme Formu
          </h1>
          <p className="text-gray-600">
            Bilimsel temelli sorular ile çocuğunuzun gelişimini değerlendirin
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">İlerleme</span>
            <span className="text-sm font-bold text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Section navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {SECTIONS.map((s, i) => {
            const isComplete = i === 0
              ? s.fields.every(f => childInfo[f.id])
              : s.questions?.every(q => answers[q.id] !== undefined)

            return (
              <button
                key={s.id}
                onClick={() => setCurrentSection(i)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  i === currentSection
                    ? 'bg-primary-500 text-white shadow-md'
                    : isComplete
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.title}</span>
                {isComplete && i !== currentSection && <CheckCircle className="w-4 h-4" />}
              </button>
            )
          })}
        </div>

        {/* Section Content */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-slide-up" key={section.id}>
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">{section.icon}</span>
            <div>
              <h2 className="text-xl font-bold font-display text-gray-900">{section.title}</h2>
              <p className="text-sm text-gray-500">
                Bölüm {currentSection + 1} / {totalSections}
              </p>
            </div>
          </div>

          {/* Fields (child info) */}
          {section.fields && (
            <div className="space-y-5">
              {section.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <div className="flex flex-wrap gap-2">
                      {field.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleFieldChange(field.id, opt)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            childInfo[field.id] === opt
                              ? 'bg-primary-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={childInfo[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Questions */}
          {section.questions && (
            <div className="space-y-8">
              {section.questions.map((question, qi) => (
                <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <p className="font-medium text-gray-800 mb-4">
                    <span className="text-primary-500 font-bold mr-2">{qi + 1}.</span>
                    {question.text}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(question.id, option.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center ${
                          answers[question.id] === option.value
                            ? 'bg-primary-50 border-2 border-primary-400 text-primary-800 font-medium'
                            : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                          answers[question.id] === option.value
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[question.id] === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0}
            className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center transition ${
              currentSection === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Önceki
          </button>
          <button
            onClick={handleNext}
            disabled={!isSectionComplete()}
            className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center transition ${
              isSectionComplete()
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:from-primary-600 hover:to-primary-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentSection === totalSections - 1 ? 'Değerlendirmeyi Tamamla' : 'Sonraki'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start space-x-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-amber-800 mb-1">Önemli Not</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Bu form bir tıbbi teşhis aracı değildir. Bilimsel verilerle desteklenen bir ön değerlendirme ve risk tarama aracıdır.
              Risk tespit edilmesi durumunda mutlaka bir uzmanla görüşmeniz önerilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
