import { Shield, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold font-display text-white">Dijital Denge</span>
            </div>
            <p className="text-sm leading-relaxed">
              0–6 yaş arası çocukların sağlıklı dijital alışkanlıklar geliştirmesini destekleyen,
              bilimsel temelli erken risk tarama ve yönlendirme platformu.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>Çocuk Etkileşim Paneli</li>
              <li>Ebeveyn Değerlendirme</li>
              <li>Risk Analizi</li>
              <li>Uzman Yönlendirme</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li>info@dijitaldenge.com</li>
              <li>Destek Merkezi</li>
              <li>Gizlilik Politikası</li>
              <li>Kullanım Koşulları</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">© 2026 Dijital Denge. Tüm hakları saklıdır.</p>
          <p className="text-sm flex items-center mt-2 sm:mt-0">
            <Heart className="w-4 h-4 text-red-400 mx-1" /> ile geliştirildi
          </p>
        </div>
      </div>
    </footer>
  )
}
