import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Article, Category, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Lock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  FileText,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  articles: Article[];
  categories: Category[];
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  categories,
  onSaveArticle,
  onDeleteArticle,
  language,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPasswordInput] = useState('');
const [loginError, setLoginError] = useState('');
  useEffect(() => {
  const checkAdminSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return;

    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error || !admin) {
      await supabase.auth.signOut();
      return;
    }

    setIsAuthenticated(true);
  };

  checkAdminSession();
}, []);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Editable Form fields
  const [form, setForm] = useState({
    categoryId: 'general-health',
    titleEn: '',
    titleMr: '',
    excerptEn: '',
    excerptMr: '',
    overviewEn: '',
    overviewMr: '',
    image: '/src/assets/images/hero_wellness_lifestyle_1793352072364.jpg',
    readTimeMinutes: 5,
    reviewerNameEn: 'Dr. Rajesh Patil, MD (Cardiology), MBBS',
    reviewerNameMr: 'डॉ. राजेश पाटील, एमडी, एमबीबीएस',
    reviewerRoleEn: 'Senior Consultant & MOTI Medical Advisor',
    reviewerRoleMr: 'ज्येष्ठ सल्लागार व MOTI वैद्यकीय सल्लागार',
    publishDate: new Date().toISOString().split('T')[0],
    lastReviewedDate: new Date().toISOString().split('T')[0],
    whenToSeeDoctorEn: 'Severe persistent pain\nShortness of breath\nDizziness',
    whenToSeeDoctorMr: 'तीव्र व सतत दुखणे\nश्वास घेण्यास त्रास\nचकरा येणे',
    preventionEn: 'Maintain a balanced diet\nWalk 30 minutes daily\nStay hydrated',
    preventionMr: 'संतुलित आहार घ्या\nरोज ३० मिनिटे चाला\nभरपूर पाणी प्या',
    referencesText: 'WHO Guidelines 2024\nICMR Clinical Recommendations',
  });

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoginError('');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput,
    password: passwordInput,
  });

  if (error) {
    setLoginError('Email किंवा Password चुकीचा आहे.');
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    setLoginError('या खात्याला Admin परवानगी नाही.');
    return;
  }

  setIsAuthenticated(true);
};

  const startCreate = () => {
    setEditingArticleId(null);
    setForm({
      categoryId: categories[0]?.id || 'general-health',
      titleEn: '',
      titleMr: '',
      excerptEn: '',
      excerptMr: '',
      overviewEn: '',
      overviewMr: '',
      image: '/src/assets/images/hero_wellness_lifestyle_1793352072364.jpg',
      readTimeMinutes: 5,
      reviewerNameEn: 'Dr. Ananya Kulkarni, MBBS, MD',
      reviewerNameMr: 'डॉ. अनन्य कुलकर्णी, एमबीबीएस, एमडी',
      reviewerRoleEn: 'Clinical Nutritionist & MOTI Health Educator',
      reviewerRoleMr: 'क्लिनिकल आहारतज्ज्ञ आणि MOTI आरोग्य मार्गदर्शक',
      publishDate: new Date().toISOString().split('T')[0],
      lastReviewedDate: new Date().toISOString().split('T')[0],
      whenToSeeDoctorEn: 'Persistent fever or pain\nUnexplained weight loss\nChest discomfort',
      whenToSeeDoctorMr: 'सततचा ताप किंवा वेदना\nअचानक वजन कमी होणे\nछातीत अस्वस्थता',
      preventionEn: 'Drink 2.5L water daily\nExercise 150 mins per week\nSleep 7-8 hours',
      preventionMr: 'दररोज २.५ लिटर पाणी प्या\nआठवड्यातून १५० मिनिटे व्यायाम करा\n७-८ तास झोप घ्या',
      referencesText: 'WHO Guidelines 2024\nICMR Clinical Recommendations',
    });
    setIsEditing(true);
  };

  const startEdit = (article: Article) => {
    setEditingArticleId(article.id);
    setForm({
      categoryId: article.categoryId,
      titleEn: article.title.en,
      titleMr: article.title.mr,
      excerptEn: article.excerpt.en,
      excerptMr: article.excerpt.mr,
      overviewEn: article.overview.en,
      overviewMr: article.overview.mr,
      image: article.image,
      readTimeMinutes: article.readTimeMinutes,
      reviewerNameEn: article.reviewer.name.en,
      reviewerNameMr: article.reviewer.name.mr,
      reviewerRoleEn: article.reviewer.role.en,
      reviewerRoleMr: article.reviewer.role.mr,
      publishDate: article.publishDate,
      lastReviewedDate: article.lastReviewedDate,
      whenToSeeDoctorEn: article.whenToSeeDoctor.en.join('\n'),
      whenToSeeDoctorMr: article.whenToSeeDoctor.mr.join('\n'),
      preventionEn: article.preventionTips.en.join('\n'),
      preventionMr: article.preventionTips.mr.join('\n'),
      referencesText: article.references.map(r => `${r.source}: ${r.title}`).join('\n'),
    });
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle: Article = {
      id: editingArticleId || `article-${Date.now()}`,
      slug: (form.titleEn || 'health-article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: form.categoryId,
      title: {
        en: form.titleEn || 'Untitled Health Guide',
        mr: form.titleMr || form.titleEn || 'आरोग्य मार्गदर्शक',
      },
      excerpt: {
        en: form.excerptEn,
        mr: form.excerptMr || form.excerptEn,
      },
      overview: {
        en: form.overviewEn,
        mr: form.overviewMr || form.overviewEn,
      },
      image: form.image,
      readTimeMinutes: Number(form.readTimeMinutes) || 5,
      publishDate: form.publishDate,
      lastReviewedDate: form.lastReviewedDate,
      reviewer: {
        name: {
          en: form.reviewerNameEn,
          mr: form.reviewerNameMr,
        },
        role: {
          en: form.reviewerRoleEn,
          mr: form.reviewerRoleMr,
        },
      },
      sections: [
        {
          title: {
            en: 'Detailed Clinical Understanding',
            mr: 'सविस्तर वैद्यकीय स्पष्टीकरण',
          },
          content: {
            en: form.overviewEn,
            mr: form.overviewMr,
          },
        },
      ],
      whenToSeeDoctor: {
        en: form.whenToSeeDoctorEn.split('\n').filter(Boolean),
        mr: form.whenToSeeDoctorMr.split('\n').filter(Boolean),
      },
      preventionTips: {
        en: form.preventionEn.split('\n').filter(Boolean),
        mr: form.preventionMr.split('\n').filter(Boolean),
      },
      references: form.referencesText.split('\n').filter(Boolean).map(line => {
        const parts = line.split(':');
        return {
          source: parts[0]?.trim() || 'Medical Authority',
          title: parts[1]?.trim() || parts[0]?.trim() || 'Clinical Review',
          year: '2024',
        };
      }),
      isFeatured: false,
    };

    onSaveArticle(newArticle);
    setIsEditing(false);
    setStatusMessage(t.admin.savedSuccess);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      onDeleteArticle(id);
      setStatusMessage(t.admin.deletedSuccess);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.title.mr.includes(searchTerm) ||
    a.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-1">
            {t.admin.loginTitle}
          </h2>
          <p className="text-xs text-center text-slate-500 mb-6">
            {t.admin.loginSubtitle}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
          <div>
  <label className="block text-xs font-semibold text-slate-700 mb-1">
    Email
  </label>
  <input
    type="email"
    required
    value={emailInput}
    onChange={(e) => setEmailInput(e.target.value)}
    placeholder="Admin email"
    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
</div>

<div>
  <label className="block text-xs font-semibold text-slate-700 mb-1">
    Password
  </label>
  <input
    type="password"
    required
    value={passwordInput}
    onChange={(e) => setPasswordInput(e.target.value)}
    placeholder="Admin password"
    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
</div>

            {loginError && (
  <p className="text-xs text-rose-600 font-medium">
    {loginError}
  </p>
)}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors"
            >
              {t.admin.loginBtn}
            </button>
          </form>

         
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h1 className="text-2xl font-extrabold text-slate-900">
                {t.admin.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.createArticle}</span>
            </button>

            <button
              onClick={async () => {
  await supabase.auth.signOut();
  setIsAuthenticated(false);
}}
              className="px-3.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
            >
              {t.admin.logout}
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal / Section for Edit / Create */}
        {isEditing && (
          <div className="mb-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingArticleId ? t.admin.editArticle : t.admin.createArticle}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-6">
              {/* Category & Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.category}
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.en} ({c.name.mr})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.readTime}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={form.readTimeMinutes}
                    onChange={(e) => setForm({ ...form, readTimeMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.titleEn}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.titleMr}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleMr}
                    onChange={(e) => setForm({ ...form, titleMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Bilingual Excerpts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.excerptEn}
                  </label>
                  <textarea
                    rows={2}
                    value={form.excerptEn}
                    onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.excerptMr}
                  </label>
                  <textarea
                    rows={2}
                    value={form.excerptMr}
                    onChange={(e) => setForm({ ...form, excerptMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Detailed Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.overviewEn}
                  </label>
                  <textarea
                    rows={4}
                    value={form.overviewEn}
                    onChange={(e) => setForm({ ...form, overviewEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.overviewMr}
                  </label>
                  <textarea
                    rows={4}
                    value={form.overviewMr}
                    onChange={(e) => setForm({ ...form, overviewMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* When to Consult Doctor (Safety) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-800 mb-1">
                    {t.admin.fields.whenDoctorEn}
                  </label>
                  <textarea
                    rows={3}
                    value={form.whenToSeeDoctorEn}
                    onChange={(e) => setForm({ ...form, whenToSeeDoctorEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 bg-amber-50/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-amber-800 mb-1">
                    {t.admin.fields.whenDoctorMr}
                  </label>
                  <textarea
                    rows={3}
                    value={form.whenToSeeDoctorMr}
                    onChange={(e) => setForm({ ...form, whenToSeeDoctorMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 bg-amber-50/30"
                  />
                </div>
              </div>

              {/* Reviewer & References */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.reviewerName}
                  </label>
                  <input
                    type="text"
                    value={form.reviewerNameEn}
                    onChange={(e) => setForm({ ...form, reviewerNameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Review Date
                  </label>
                  <input
                    type="date"
                    value={form.lastReviewedDate}
                    onChange={(e) => setForm({ ...form, lastReviewedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.fields.references}
                  </label>
                  <input
                    type="text"
                    value={form.referencesText}
                    onChange={(e) => setForm({ ...form, referencesText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Articles Table & Management */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900">
              Published Health Knowledge ({filteredArticles.length})
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.admin.searchAdmin}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reviewer</th>
                  <th className="py-3 px-4">Last Reviewed</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{art.title.en}</div>
                      <div className="text-[11px] text-slate-500">{art.title.mr}</div>
                    </td>
                    <td className="py-3 px-4 uppercase font-medium text-emerald-800">
                      {art.categoryId}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {art.reviewer.name.en}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {art.lastReviewedDate}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => startEdit(art)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-emerald-700"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
