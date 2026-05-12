import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Shield, AlertTriangle, CheckCircle, TrendingUp,
  Clock, Brain, MessageSquare, Users, Eye, Heart, Star,
  Phone, User, Calendar, ChevronDown, ChevronUp, Lock
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

// Demo data
const RISK_SCORE = 38
const RISK_LEVEL = 'Orta-Düşük'

const developmentData = [
  { area: 'Dikkat', score: 72, max: 100 },
  { area: 'Dil Gelişimi', score: 65, max: 100 },
  { area: 'Sosyal İletişim', score: 80, max: 100 },
  { area: 'Motor Beceri', score: 88, max: 100 },
  { area: 'Bilişsel', score: 70, max: 100 },
  { area: 'Davranışsal', score: 75, max: 100 },
]

const radarData = [
  { subject: 'Dikkat', A: 72 },
  { subject: 'Dil', A: 65 },
  { subject: 'Sosyal', A: 80 },
  { subject: 'Motor', A: 88 },
  { subject: 'Bilişsel', A: 70 },
  { subject: 'Davranış', A: 75 },
]

const screenTimeData = [
  { day: 'Pzt', sure: 45, limit: 60 },
  { day: 'Sal', sure: 70, limit: 60 },
  { day: 'Çar', sure: 35, limit: 60 },
  { day: 'Per', sure: 55, limit: 60 },
  { day: 'Cum', sure: 90, limit: 60 },
  { day: 'Cmt', sure: 120, limit: 60 },
  { day: 'Paz', sure: 80, limit: 60 },
]

const appUsageData = [
  { name: 'YouTube Kids', value: 35, color: '#EF4444' },
  { name: 'Eğitici Oyunlar', value: 25, color: '#22C55E' },
  { name: 'Çizgi Film', value: 20, color: '#3B82F6' },
  { name: 'Dijital Denge', value: 15, color: '#8B5CF6' },
  { name: 'Diğer', value: 5, color: '#9CA3AF' },
]

const weeklyTrend = [
  { week: 'Hafta 1', risk: 45, screen: 85 },
  { week: 'Hafta 2', risk: 42, screen: 75 },
  { week: 'Hafta 3', risk: 40, screen: 70 },
  { week: 'Hafta 4', risk: 38, screen: 65 },
]

const experts = [
  {
    type: 'Çocuk Psikoloğu',
    icon: Brain,
    reason: 'Dikkat süresi ve ekran bağımlılığı belirtileri için değerlendirme',
    priority: 'Önerilen',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    type: 'Dil ve Konuşma Terapisti',
    icon: MessageSquare,
    reason: 'Dil gelişimi alanında yaşa göre hafif gerileme',
    priority: 'Takip',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    type: 'Gelişim Uzmanı',
    icon: TrendingUp,
    reason: 'Genel nörogelişimsel değerlendirme',
    priority: 'Bilgi',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
]

export default function Dashboard() {
  const [showExpertDetails, setShowExpertDetails] = useState(false)

  const getRiskColor = (score) => {
    if (score < 25) return { bg: 'bg-green-500', text: 'text-green-700', light: 'bg-green-50' }
    if (score < 50) return { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-50' }
    if (score < 75) return { bg: 'bg-orange-500', text: 'text-orange-700', light: 'bg-orange-50' }
    return { bg: 'bg-red-500', text: 'text-red-700', light: 'bg-red-50' }
  }

  const riskColor = getRiskColor(RISK_SCORE)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black font-display text-gray-900 mb-1">
              📊 Risk Analizi Dashboard
            </h1>
            <p className="text-gray-500">Demo verilerle oluşturulmuş örnek rapor</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Efe (42 ay)</span>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">12 Mayıs 2026</span>
            </div>
          </div>
        </div>

        {/* Risk Score Card */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Risk Skoru</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={RISK_SCORE < 25 ? '#22C55E' : RISK_SCORE < 50 ? '#EAB308' : RISK_SCORE < 75 ? '#F97316' : '#EF4444'}
                  strokeWidth="10"
                  strokeDasharray={`${(RISK_SCORE / 100) * 314} 314`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-display text-gray-900">{RISK_SCORE}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
            </div>
            <div className={`text-center py-2 rounded-xl ${riskColor.light}`}>
              <span className={`text-sm font-bold ${riskColor.text}`}>{RISK_LEVEL}</span>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Dikkat Skoru', value: '72%', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Dil Gelişimi', value: '65%', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Sosyal İletişim', value: '80%', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Motor Beceri', value: '88%', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Günlük Ekran', value: '1.5 saat', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Oyun Performansı', value: '85%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-black font-display text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Development Radar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold font-display text-gray-900 mb-1">Gelişim Alanları Profili</h3>
            <p className="text-sm text-gray-500 mb-4">Çocuğun gelişim alanlarındaki performansı</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skor"
                  dataKey="A"
                  stroke="#0EA5E9"
                  fill="#0EA5E9"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Screen Time Bar Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold font-display text-gray-900 mb-1">Haftalık Ekran Süresi</h3>
            <p className="text-sm text-gray-500 mb-4">Günlük ekran kullanımı (dakika)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={screenTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  formatter={(value) => [`${value} dk`, '']}
                />
                <Bar dataKey="sure" name="Ekran Süresi" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="limit" name="Önerilen Limit" fill="#E5E7EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* App Usage Pie Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold font-display text-gray-900 mb-1">Uygulama Kullanım Dağılımı</h3>
            <p className="text-sm text-gray-500 mb-4">Ekran süresinin uygulamalara göre dağılımı</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={appUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {appUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`%${value}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold font-display text-gray-900 mb-1">Haftalık İlerleme</h3>
            <p className="text-sm text-gray-500 mb-4">Risk skoru ve ekran süresi trendi</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }} />
                <Line
                  type="monotone"
                  dataKey="risk"
                  name="Risk Skoru"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#EF4444' }}
                />
                <Line
                  type="monotone"
                  dataKey="screen"
                  name="Ekran (dk)"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3B82F6' }}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Development Bar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold font-display text-gray-900 mb-1">Gelişim Alanları Detay</h3>
          <p className="text-sm text-gray-500 mb-4">Her alandaki performans yüzdesi</p>
          <div className="space-y-4">
            {developmentData.map((item) => (
              <div key={item.area}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.area}</span>
                  <span className={`font-bold ${
                    item.score >= 80 ? 'text-green-600' :
                    item.score >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    %{item.score}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full progress-animate ${
                      item.score >= 80 ? 'bg-green-500' :
                      item.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Recommendations */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-display text-gray-900">Uzman Yönlendirme Önerileri</h3>
              <p className="text-sm text-gray-500">Risk analizine göre önerilen uzman görüşmeleri</p>
            </div>
            <button
              onClick={() => setShowExpertDetails(!showExpertDetails)}
              className="text-sm text-primary-600 font-medium flex items-center"
            >
              {showExpertDetails ? 'Gizle' : 'Detaylar'}
              {showExpertDetails ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {experts.map((expert, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${expert.color}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <expert.icon className="w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-sm">{expert.type}</h4>
                    <span className="text-xs font-medium opacity-80">{expert.priority}</span>
                  </div>
                </div>
                {showExpertDetails && (
                  <div className="animate-slide-up">
                    <p className="text-xs leading-relaxed mb-3">{expert.reason}</p>
                    <button className="w-full px-4 py-2 bg-white/60 rounded-xl text-xs font-semibold hover:bg-white transition flex items-center justify-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>Randevu Al</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold font-display text-gray-900 mb-4">📝 Kişiselleştirilmiş Öneriler</h3>
          <div className="space-y-3">
            {[
              { icon: '⏰', text: 'Günlük ekran süresini 1 saatin altına indirmeyi hedefleyin', priority: 'Yüksek' },
              { icon: '👁️', text: 'Ekran kullanımı sırasında çocuğunuzla birlikte olun', priority: 'Yüksek' },
              { icon: '🎮', text: 'Pasif izleme yerine etkileşimli içerikleri tercih edin', priority: 'Orta' },
              { icon: '📖', text: 'Günde en az 20 dakika birlikte kitap okuyun', priority: 'Orta' },
              { icon: '🏃', text: 'Günde en az 1 saat fiziksel aktivite yapmasını sağlayın', priority: 'Orta' },
              { icon: '🌙', text: 'Yatmadan 1 saat önce ekranları kapatın', priority: 'Yüksek' },
            ].map((rec, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xl">{rec.icon}</span>
                <span className="text-sm text-gray-700 flex-1">{rec.text}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  rec.priority === 'Yüksek' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {rec.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-emerald-800 rounded-3xl p-8 text-center">
          <Lock className="w-10 h-10 text-primary-200 mx-auto mb-4" />
          <h3 className="text-xl font-black font-display text-white mb-2">Premium Rapor</h3>
          <p className="text-primary-100 text-sm mb-6 max-w-md mx-auto">
            Detaylı gelişim analizi, kişiselleştirilmiş oyun planı, uzman görüşmesi ve
            aylık ilerleme raporu için Pro planına yükseltin.
          </p>
          <button className="px-8 py-3 bg-white text-primary-700 rounded-xl font-bold hover:bg-gray-50 transition shadow-md">
            Pro Planı Keşfet — ₺99/ay
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start space-x-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-amber-800 mb-1">Yasal Uyarı</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Bu rapor demo amaçlı oluşturulmuştur. Gerçek bir tıbbi teşhis veya değerlendirme içermez.
              Platform, bilimsel verilerle desteklenen bir ön değerlendirme ve risk tarama aracıdır.
              Herhangi bir endişe durumunda mutlaka bir sağlık profesyoneline başvurun.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
