import { useState } from 'react';
import { ShoppingCart, Package, FileText, Star, TrendingUp } from 'lucide-react';
import { MOCK_PACKS, MOCK_DOCUMENTS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface ShopPageProps {
  onNavigate: (page: string) => void;
}

export default function ShopPage({ onNavigate }: ShopPageProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'packs' | 'documents'>('packs');

  const paidDocuments = MOCK_DOCUMENTS.filter(d => !d.is_free && d.is_active);

  const handlePurchase = (type: 'pack' | 'document', _id: string) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    alert(`Achat simulé (${type}) — intégration paiement à configurer.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre catalogue de documents RH
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez parmi nos packs avantageux ou sélectionnez les documents dont vous avez besoin
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('packs')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'packs'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="inline mr-2" size={20} />
              Packs
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'documents'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="inline mr-2" size={20} />
              Documents individuels
            </button>
          </div>
        </div>

        {activeTab === 'packs' && (
          <div>
            <div className="bg-purple-600 text-white rounded-xl p-6 mb-8 text-center">
              <TrendingUp className="inline-block mb-2" size={32} />
              <h2 className="text-2xl font-bold mb-2">
                Économisez jusqu'à 50% avec nos packs
              </h2>
              <p className="text-purple-100">
                Des collections de documents soigneusement sélectionnés pour répondre à vos besoins
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 ${
                    pack.is_featured ? 'ring-4 ring-purple-400' : ''
                  }`}
                >
                  {pack.is_featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-2">
                      <Star className="inline mr-1" size={16} />
                      <span className="font-bold text-sm text-gray-900">PACK POPULAIRE</span>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{pack.name}</h3>
                    <p className="text-gray-600 mb-4">{pack.description}</p>

                    {pack.documents && pack.documents.length > 0 && (
                      <div className="mb-4 bg-purple-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-purple-700 mb-2">
                          {pack.id === 'pack-005'
                            ? `${pack.documents.length} documents inclus`
                            : `${pack.documents.length} documents inclus :`}
                        </p>
                        {pack.id !== 'pack-005' && (
                          <ul className="space-y-1">
                            {pack.documents.slice(0, 4).map(doc => (
                              <li key={doc.id} className="text-xs text-gray-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                                {doc.title}
                              </li>
                            ))}
                            {pack.documents.length > 4 && (
                              <li className="text-xs text-purple-600 font-medium">
                                + {pack.documents.length - 4} autres documents
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="flex items-baseline space-x-3">
                        {pack.original_price && (
                          <span className="text-gray-400 line-through text-xl">
                            {pack.original_price.toFixed(2)}€
                          </span>
                        )}
                        <span className="text-4xl font-bold text-purple-600">
                          {pack.price.toFixed(2)}€
                        </span>
                      </div>
                      {pack.original_price && (
                        <div className="mt-2">
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Économisez {((1 - pack.price / pack.original_price) * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handlePurchase('pack', pack.id)}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={20} />
                      <span>Acheter ce pack</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Sélectionnez uniquement les documents dont vous avez besoin
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <FileText className="text-purple-600 flex-shrink-0" size={32} />
                      <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        {doc.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{doc.description}</p>

                    {doc.downloads_count > 0 && (
                      <p className="text-xs text-gray-400 mb-3">
                        {doc.downloads_count.toLocaleString('fr-FR')} téléchargements
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        {doc.price.toFixed(2)}€
                      </span>
                      <button
                        onClick={() => handlePurchase('document', doc.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                      >
                        Acheter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
            Notre équipe d'experts RH est là pour vous conseiller et vous aider à trouver les documents
            adaptés à votre situation
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
}
