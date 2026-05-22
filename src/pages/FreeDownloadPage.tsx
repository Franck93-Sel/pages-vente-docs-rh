import { useState } from 'react';
import { FileText, Download, CheckCircle, Eye } from 'lucide-react';
import { MOCK_DOCUMENTS } from '../data/mockData';

interface FreeDownloadPageProps {
  onNavigate: (page: string) => void;
  email?: string;
  name?: string;
}

const freeDocument = MOCK_DOCUMENTS.find(d => d.is_free)!;

export default function FreeDownloadPage({ onNavigate, email: _email, name }: FreeDownloadPageProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    onNavigate('thank-you');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <CheckCircle className="inline mr-2" size={18} />
            Inscription confirmée
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Merci {name || 'pour votre confiance'} !
          </h1>
          <p className="text-xl text-gray-600">
            Votre document gratuit est prêt à être téléchargé
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="bg-purple-600 text-white p-8">
            <FileText className="mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-center">{freeDocument.title}</h2>
          </div>

          <div className="p-8">
            <p className="text-gray-700 text-lg mb-6">{freeDocument.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Contenu du document :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Clauses essentielles du contrat CDI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Conformité légale garantie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Format personnalisable (.PDF et .DOCX)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Guide d'utilisation inclus</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Idéal pour :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>TPE et PME</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Responsables RH</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Entrepreneurs individuels</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Organismes de formation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                <Eye size={20} />
                <span>{showPreview ? 'Masquer l\'aperçu' : 'Voir un aperçu'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                <span>Télécharger maintenant</span>
              </button>
            </div>

            {showPreview && (
              <div className="mt-8 p-6 bg-gray-100 rounded-lg border-2 border-gray-300">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">Aperçu du document</h4>
                <div className="bg-white p-6 rounded shadow-inner text-sm text-gray-700 max-h-96 overflow-y-auto">
                  <p className="text-center font-bold mb-4">CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE</p>
                  <p className="mb-4">Entre les soussignés :</p>
                  <p className="mb-2"><strong>L'EMPLOYEUR :</strong></p>
                  <p className="mb-4">[Nom de l'entreprise], [Forme juridique], au capital de [montant], dont le siège social est situé [adresse complète]...</p>
                  <p className="mb-2"><strong>LE SALARIÉ :</strong></p>
                  <p className="mb-4">[Prénom NOM], né(e) le [date] à [ville], de nationalité [nationalité], demeurant [adresse complète]...</p>
                  <p className="text-gray-500 italic text-center mt-6">... [Contenu complet dans le document téléchargé]</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 text-lg">
            <strong>Besoin de plus de documents ?</strong> Découvrez notre catalogue complet de modèles professionnels
          </p>
        </div>
      </div>
    </div>
  );
}
