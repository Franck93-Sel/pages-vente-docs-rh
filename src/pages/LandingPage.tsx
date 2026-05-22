import { useState } from 'react';
import { FileText, CheckCircle, Download, Shield, Clock, Award } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    onNavigate('free-download', { email, name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simplifiez votre gestion RH avec des{' '}
            <span className="text-purple-600">documents professionnels</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez à une bibliothèque complète de contrats de travail, fiches de paie, et documents administratifs
            conformes à la législation française
          </p>
        </div>
        <img src="/images/code_du_travail.jpg" alt="code du travail" className="rounded-2xl shadow-xl w-full object-cover mb-10"></img>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-purple-100">
            <div className="mb-6">
              <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Offre de lancement
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Téléchargez gratuitement un modèle de contrat de travail
              </h2>
              <p className="text-gray-600">
                Recevez immédiatement un modèle professionnel de CDI conforme et personnalisable
              </p>
            </div>

            {message && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email professionnel
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="jean.dupont@entreprise.fr"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Traitement...' : 'Télécharger gratuitement'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                En téléchargeant, vous acceptez de recevoir nos communications. Pas de spam, désinscription à tout moment.
              </p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0">
                <CheckCircle className="text-purple-600" size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Documents conformes</h3>
                <p className="text-gray-600">
                  Tous nos documents sont validés par des experts juridiques et conformes à la législation en vigueur
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0">
                <Clock className="text-purple-600" size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Gain de temps immédiat</h3>
                <p className="text-gray-600">
                  Téléchargez et personnalisez vos documents en quelques minutes seulement
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0">
                <Shield className="text-purple-600" size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Sécurité garantie</h3>
                <p className="text-gray-600">
                  Vos données sont protégées et nous ne les partageons jamais avec des tiers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-12 text-center mb-20">
          <Award className="mx-auto mb-6" size={64} />
          <h2 className="text-3xl font-bold mb-4">
            Plus de 5 000 entreprises nous font confiance
          </h2>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Des TPE aux grandes entreprises, en passant par les organismes de formation Qualiopi,
            ils ont choisi MyRH pour leur gestion documentaire RH
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">+200 documents</h3>
            <p className="text-gray-600">Contrats, avenants, fiches, attestations...</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Téléchargement instantané</h3>
            <p className="text-gray-600">Formats Word et PDF disponibles</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Mise à jour régulière</h3>
            <p className="text-gray-600">Documents actualisés selon les évolutions légales</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-block px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all"
          >
            Découvrir tous nos documents
          </button>
        </div>
      </div>
    </div>
  );
}
