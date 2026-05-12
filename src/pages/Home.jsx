import { Link } from 'react-router-dom'
import {
  Gamepad2, ClipboardList, BarChart3, ArrowRight,
  Brain, Eye, MessageSquare, Heart, Shield, Star,
  Sparkles, Users, TrendingUp, CheckCircle2
} from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-emerald-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-kid-blue rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-kid-yellow rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Erken Risk Tarama ve Yönlendirme Platformu
              </div>
              <h1 className="text-4xl lg:text-6xl font-black font-display text-gray-900 leading-tight mb-6">
                Çocuğunuzun{' '}
                <span className="bg-gradient-to-r from-primary-500 to-emerald-600 bg-clip-text text-transparent">
                  Dijital Dengesi
                </span>{' '}
                Elinizde
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                0–6 yaş arası çocukların nörogelişimsel risklerini erken dönemde analiz edin,
                ekran süresini sağlıklı hale getirin ve çocuğunuzun gelişimini destekleyin.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/ebeveyn"
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg shadow-primary-200 flex items-center"
                >
                  Değerlendirmeye Başla
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/cocuk"
                  className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md border border-gray-200 flex items-center"
                >
                  <Gamepad2 className="mr-2 w-5 h-5 text-primary-500" />
                  Oyunları Keşfet
                </Link>
              </div>

              <div className="mt-10 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {['bg-kid-pink', 'bg-kid-blue', 'bg-kid-green', 'bg-kid-yellow'].map((c, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                      {['👶', '👧', '👦', '🧒'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">1,200+ Aile</p>
                  <p className="text-xs text-gray-500">platformumuzu kullanıyor</p>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto">
                {/* Phone mockup */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">🧸</div>
                      <h3 className="font-bold font-display text-gray-800">Günlük Rapor</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Ekran Süresi</span>
                        <span className="text-sm font-bold text-green-600">45 dk ✓</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tamamlanan Oyun</span>
                        <span className="text-sm font-bold text-primary-600">3 oyun</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Gelişim Skoru</span>
                        <span className="text-sm font-bold text-purple-600">%87</span>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 text-center">
                        <span className="text-sm font-semibold text-green-700">✨ Risk seviyesi: Düşük</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -left-8 bg-kid-yellow rounded-2xl p-3 shadow-lg animate-float">
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="absolute -bottom-4 -right-8 bg-kid-green rounded-2xl p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-2xl">🧩</span>
                </div>
                <div className="absolute top-1/2 -left-12 bg-kid-pink rounded-2xl p-3 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '0–6', label: 'Yaş Aralığı', icon: '👶' },
              { value: '50+', label: 'Gelişim Sorusu', icon: '📋' },
              { value: '5+', label: 'Etkileşimli Oyun', icon: '🎮' },
              { value: '%94', label: 'Ebeveyn Memnuniyeti', icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black font-display text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Panels Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black font-display text-gray-900 mb-4">
              Üç Temel Panel, Tek Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Çocuk gelişimi, ebeveyn değerlendirmesi ve risk analizini bir arada sunan bütüncül yaklaşım
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Child Panel Card */}
            <Link to="/cocuk" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-kid-yellow to-kid-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-7 h-7 text-orange-700" />
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 mb-3">Çocuk Etkileşim Paneli</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Gelişim destekleyici oyunlar ve görevlerle çocuğunuzun dikkat, algı, motor beceri ve bilişsel süreçlerini gözlemleyin.
                </p>
                <ul className="space-y-2">
                  {['Sürükle-bırak görevleri', 'Boyama aktiviteleri', 'Dikkat oyunları', 'Sesli yönlendirmeler'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Oyunları Keşfet <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Parent Panel Card */}
            <Link to="/ebeveyn" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  ÖNERİLEN
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-kid-blue to-primary-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 mb-3">Ebeveyn Değerlendirme</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Bilimsel temelli gelişim formları ile çocuğunuzun dikkat, dil gelişimi, sosyal iletişim ve davranışlarını değerlendirin.
                </p>
                <ul className="space-y-2">
                  {['Yaşa uygun sorular', 'Ekran alışkanlık analizi', 'Davranışsal gözlem', 'Uyku düzeni takibi'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Formu Doldur <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Risk Analysis Card */}
            <Link to="/dashboard" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-kid-purple to-purple-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 mb-3">Risk Analizi ve Yönlendirme</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Toplanan verileri analiz ederek risk skoru oluşturun ve gerektiğinde doğru uzmanlara yönlendirilin.
                </p>
                <ul className="space-y-2">
                  {['Risk skoru hesaplama', 'Uzman yönlendirme', 'Detaylı raporlar', 'Ekran süresi takibi'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Raporu Gör <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black font-display text-gray-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dört basit adımda çocuğunuzun dijital sağlığını takip edin
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', icon: Users, title: 'Profil Oluşturun', desc: 'Çocuğunuzun yaş ve gelişim bilgilerini girin' },
              { step: '2', icon: ClipboardList, title: 'Formu Doldurun', desc: 'Bilimsel gelişim değerlendirme sorularını yanıtlayın' },
              { step: '3', icon: Gamepad2, title: 'Oyunları Oynayın', desc: 'Çocuğunuz etkileşimli oyunları tamamlasın' },
              { step: '4', icon: TrendingUp, title: 'Raporu İnceleyin', desc: 'Risk analizini ve uzman önerilerini görün' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
                  <item.icon className="w-8 h-8 text-primary-600" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-bold font-display text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Areas */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black font-display text-gray-900 mb-4">
              Takip Edilen Gelişim Alanları
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Brain, label: 'Dikkat', color: 'from-purple-400 to-purple-600' },
              { icon: MessageSquare, label: 'Dil Gelişimi', color: 'from-blue-400 to-blue-600' },
              { icon: Users, label: 'Sosyal İletişim', color: 'from-green-400 to-green-600' },
              { icon: Eye, label: 'Algılama', color: 'from-amber-400 to-amber-600' },
              { icon: Heart, label: 'Davranış', color: 'from-red-400 to-red-600' },
              { icon: Star, label: 'Motor Beceri', color: 'from-pink-400 to-pink-600' },
            ].map((area, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{area.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-6">
            Çocuğunuzun Gelişimini Bugün Desteklemeye Başlayın
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Ekranı yasaklamak yerine, sağlıklı dijital denge yaklaşımıyla çocuğunuzun gelişimini destekleyin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/ebeveyn"
              className="px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-xl"
            >
              Ücretsiz Başla
            </Link>
            <Link
              to="/cocuk"
              className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-400 transition-all duration-200 border-2 border-primary-400"
            >
              Demo Oyunları Dene
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
