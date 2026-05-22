import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Building, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    company_name: '',
    phone: '',
    user_type: 'entreprise' as 'entreprise' | 'particulier' | 'organisme_formation',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        onNavigate('dashboard');
      } else {
        await signUp(formData.email, formData.password, {
          full_name: formData.full_name,
          company_name: formData.company_name,
          phone: formData.phone,
          user_type: formData.user_type,
        });
        setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? 'Accédez à votre espace personnel'
              : 'Rejoignez plus de 5 000 professionnels RH'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                isLogin ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
              }`}
            >
              <LogIn className="inline mr-2" size={18} />
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                !isLogin ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
              }`}
            >
              <UserPlus className="inline mr-2" size={18} />
              Inscription
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Jean Dupont"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de profil
                  </label>
                  <select
                    id="user_type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required={!isLogin}
                  >
                    <option value="entreprise">Entreprise</option>
                    <option value="particulier">Particulier</option>
                    <option value="organisme_formation">Organisme de formation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise (optionnel)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ma société"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone (optionnel)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="jean.dupont@entreprise.fr"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 caractères
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading
                ? 'Traitement...'
                : isLogin
                ? 'Se connecter'
                : 'Créer mon compte'}
            </button>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                Pas encore de compte ?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Créez-en un gratuitement
                </button>
              </p>
            ) : (
              <p>
                Déjà inscrit ?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Connectez-vous
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="text-purple-600 hover:underline">
              conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-purple-600 hover:underline">
              politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
