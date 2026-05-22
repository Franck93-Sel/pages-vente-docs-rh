import { useState } from 'react';
import { Download, ShoppingBag, User, FileText, Package, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_ORDERS, MOCK_DOWNLOADS } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'downloads'>('overview');

  const orders = user ? MOCK_ORDERS.filter(o => o.user_id === user.id) : [];
  const downloads = user ? MOCK_DOWNLOADS.filter(d => d.user_id === user.id) : [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette page</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {profile?.full_name || 'cher utilisateur'}
          </h1>
          <p className="text-gray-600">Gérez vos documents et commandes depuis votre espace personnel</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="inline mr-2" size={18} />
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="inline mr-2" size={18} />
            Mes commandes
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'downloads'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download className="inline mr-2" size={18} />
            Mes téléchargements
          </button>
        </div>

        {profile?.role === 'admin' && (
          <button
            onClick={() => onNavigate('admin')}
            className="mb-8 px-6 py-3 rounded-lg font-semibold transition-all bg-gray-900 text-white hover:bg-gray-700 shadow-lg flex items-center"
          >
            <Shield className="inline mr-2" size={18} />
            Administration
          </button>
        )}

        <>
          {activeTab === 'overview' && (
            <div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Commandes</h3>
                    <ShoppingBag className="text-purple-600" size={32} />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{orders.length}</p>
                  <p className="text-sm text-gray-600 mt-2">Total des commandes</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Téléchargements</h3>
                    <Download className="text-purple-600" size={32} />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{downloads.length}</p>
                  <p className="text-sm text-gray-600 mt-2">Documents téléchargés</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profil</h3>
                    <User className="text-purple-600" size={32} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{profile?.user_type || 'Non défini'}</p>
                  <p className="text-sm text-gray-600 mt-2">{profile?.company_name || 'Aucune entreprise'}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Besoin de plus de documents ?</h2>
                <p className="text-purple-100 mb-6">
                  Découvrez notre catalogue complet de documents RH professionnels et nos packs avantageux
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Voir la boutique
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Informations du profil</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-semibold text-gray-900">{profile?.full_name || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-semibold text-gray-900">{profile?.company_name || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-semibold text-gray-900">{profile?.phone || 'Non renseigné'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <Package className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune commande</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez pas encore passé de commande</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Découvrir la boutique
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Commande du {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {order.total_amount.toFixed(2)}€
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {order.status === 'completed'
                              ? 'Complétée'
                              : order.status === 'pending'
                              ? 'En attente'
                              : 'Annulée'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'downloads' && (
            <div>
              {downloads.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun téléchargement</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez pas encore téléchargé de documents</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Découvrir la boutique
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {downloads.map((download) => (
                        <tr key={download.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="text-purple-600 mr-3" size={20} />
                              <span className="text-sm font-medium text-gray-900">
                                {download.documents?.title || 'Document'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(download.downloaded_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                              Télécharger à nouveau
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
