import { useState, useRef } from 'react';
import { Plus, Trash2, FileText, Tag, Euro, ToggleLeft, ToggleRight, Shield, AlertCircle, CheckCircle, X, Edit2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_DOCUMENTS } from '../data/mockData';
import { Document } from '../types';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

const CATEGORIES = ['contrat', 'avenant', 'reglementation', 'formation', 'fiche', 'autre'];

const emptyForm = {
  title: '',
  description: '',
  category: 'contrat',
  is_free: false,
  price: 0,
  file_type: 'pdf',
  is_active: true,
};

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const { profile } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([...MOCK_DOCUMENTS]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = profile?.role === 'admin';

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      showNotification('error', 'Le titre est obligatoire');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));

    const now = new Date().toISOString();

    if (editingId) {
      setDocuments(prev =>
        prev.map(d =>
          d.id === editingId
            ? { ...d, ...form, price: form.is_free ? 0 : Number(form.price), updated_at: now }
            : d
        )
      );
      showNotification('success', 'Document mis à jour !');
    } else {
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        ...form,
        price: form.is_free ? 0 : Number(form.price),
        downloads_count: 0,
        created_at: now,
        updated_at: now,
      };
      setDocuments(prev => [newDoc, ...prev]);
      showNotification('success', 'Document ajouté !');
    }

    resetForm();
    setSaving(false);
  };

  const handleEdit = (doc: Document) => {
    setEditingId(doc.id);
    setForm({
      title: doc.title,
      description: doc.description || '',
      category: doc.category,
      is_free: doc.is_free,
      price: doc.price,
      file_type: doc.file_type,
      is_active: doc.is_active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showNotification('success', 'Document supprimé');
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-2xl shadow-lg max-w-md">
          <Shield className="mx-auto mb-4 text-red-400" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-500 mb-6">Vous n'avez pas les droits administrateur.</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white transition-all ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)}><X size={16} /></button>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Supprimer ce document ?</h3>
            <p className="text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-xl">
              <Shield className="text-purple-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
              <p className="text-sm text-gray-500">Gestion des documents RH — mode démo (données en mémoire)</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            ← Dashboard
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {editingId
                    ? <><Edit2 size={18} className="text-purple-500" /> Modifier</>
                    : <><Plus size={18} className="text-purple-500" /> Nouveau document</>}
                </h2>
                {editingId && (
                  <button onClick={resetForm} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                    <X size={14} /> Annuler
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Ex: Contrat CDI conforme 2024"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Description du document..."
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Tag size={14} /> Catégorie
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Document gratuit</span>
                  <button
                    onClick={() => setForm({ ...form, is_free: !form.is_free })}
                    className={`transition-colors ${form.is_free ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    {form.is_free ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>

                {!form.is_free && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Euro size={14} /> Prix (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Document actif</span>
                  <button
                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                    className={`transition-colors ${form.is_active ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    {form.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  {saving ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Enregistrement...</>
                  ) : editingId ? (
                    <><Save size={18} /> Mettre à jour</>
                  ) : (
                    <><Plus size={18} /> Ajouter le document</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Documents <span className="text-sm font-normal text-gray-400 ml-1">({documents.length})</span>
              </h2>
            </div>

            {documents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                <FileText className="mx-auto mb-3 text-gray-300" size={40} />
                <p className="text-gray-400">Aucun document pour l'instant</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-all ${
                      editingId === doc.id ? 'border-purple-300 shadow-md' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="bg-purple-50 p-2.5 rounded-lg flex-shrink-0">
                      <FileText className="text-purple-500" size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">{doc.title}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(doc)}
                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(doc.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{doc.category}</span>
                        {doc.is_free ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Gratuit</span>
                        ) : (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{doc.price}€</span>
                        )}
                        {!doc.is_active && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Inactif</span>
                        )}
                      </div>

                      {doc.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{doc.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
