import { CheckCircle, ShoppingBag, FileText, Package } from 'lucide-react';
import { MOCK_PACKS } from '../data/mockData';

interface ThankYouPageProps {
  onNavigate: (page: string) => void;
}

const featuredPacks = MOCK_PACKS.filter(p => p.is_featured).slice(0, 3);

export default function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Téléchargement réussi !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre document a été envoyé par email. Vérifiez votre boîte de réception (et vos spams).
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FileText className="text-purple-600 flex-shrink-0" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Que faire maintenant ?
              </h2>
              <p className="text-gray-600">
                Consultez votre email pour accéder à votre document gratuit. Vous pouvez le télécharger et le
                personnaliser selon vos besoins.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ouvrez l'email</h3>
              <p className="text-sm text-gray-600">Cliquez sur le lien de téléchargement</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personnalisez</h3>
              <p className="text-sm text-gray-600">Adaptez le document à votre situation</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Utilisez</h3>
              <p className="text-sm text-gray-600">Votre document est prêt à l'emploi</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <Package className="inline-block text-purple-600 mb-4" size={48} />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Allez plus loin avec nos packs premium
            </h2>
            <p className="text-lg text-gray-600">
              Économisez jusqu'à 50% en choisissant un pack adapté à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition-all transform hover:scale-105"
              >
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
                  <div className="flex items-baseline space-x-2">
                    {pack.original_price && (
                      <span className="text-purple-200 line-through text-lg">
                        {pack.original_price.toFixed(2)}€
                      </span>
                    )}
                    <span className="text-3xl font-bold">{pack.price.toFixed(2)}€</span>
                  </div>
                  {pack.original_price && (
                    <div className="inline-block bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold mt-2">
                      ÉCONOMISEZ {((1 - pack.price / pack.original_price) * 100).toFixed(0)}%
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6">{pack.description}</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Voir le pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg"
          >
            <ShoppingBag size={24} />
            <span>Découvrir tous nos documents</span>
          </button>
        </div>
      </div>
    </div>
  );
}
