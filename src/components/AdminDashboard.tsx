
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
} from 'lucide-react';

type ArticleStatus = 'draft' | 'published';

interface AdminArticle extends Article {
  status?: ArticleStatus;
}

interface AdminDashboardProps {
  articles: Article[];
  categories: Category[];
  onSaveArticle: (article: Article) => Promise<void>;
  onDeleteArticle: (articleId: string) => Promise<void>;
  language: Language;
}

const emptyForm = (categoryId: string) => ({
  categoryId,
  titleEn: '',
  titleMr: '',
  excerptEn: '',
  excerptMr: '',
  overviewEn: '',
  overviewMr: '',
  image: '',
  readTimeMinutes: 5,
  reviewerNameEn: 'MOTI Editorial Team',
  reviewerNameMr: 'MOTI संपादकीय टीम',
  reviewerRoleEn: 'Health Education Team',
  reviewerRoleMr: 'आरोग्य शिक्षण टीम',
  publishDate: new Date().toISOString().split('T')[0],
  lastReviewedDate: '',
  whenToSeeDoctorEn: '',
  whenToSeeDoctorMr: '',
  preventionEn: '',
  preventionMr: '',
  referencesText: '',
  status: 'draft' as ArticleStatus,
});

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
  const [checkingSession, setCheckingSession] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(() =>
    emptyForm(categories[0]?.id || 'general-health')
  );

  const t = translations[language];

  useEffect(() => {
    let active = true;

    const checkAdminSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (active) setCheckingSession(false);
        return;
      }

      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error || !admin) {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }

      setCheckingSession(false);
    };

    checkAdminSession();

    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });

    if (error || !data.user) {
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
    setPasswordInput('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsEditing(false);
  };

  const startCreate = () => {
    setEditingArticleId(null);
    setForm(emptyForm(categories[0]?.id || 'general-health'));
    setFormError('');
    setIsEditing(true);
  };

  const startEdit = (article: Article) => {
    const adminArticle = article as AdminArticle;

    setEditingArticleId(article.id);

    setForm({
      categoryId: article.categoryId,
      titleEn: article.title.en,
      titleMr: article.title.mr,
      excerptEn: article.excerpt.en,
      excerptMr: article.excerpt.mr,
      overviewEn: article.overview.en,
      overviewMr: article.overview.mr,
      image: article.image || '',
      readTimeMinutes: article.readTimeMinutes,
      reviewerNameEn: article.reviewer.name.en,
      reviewerNameMr: article.reviewer.name.mr,
      reviewerRoleEn: article.reviewer.role.en,
      reviewerRoleMr: article.reviewer.role.mr,
      publishDate: article.publishDate,
      lastReviewedDate: article.lastReviewedDate || '',
      whenToSeeDoctorEn: article.whenToSeeDoctor.en.join('\n'),
      whenToSeeDoctorMr: article.whenToSeeDoctor.mr.join('\n'),
      preventionEn: article.preventionTips.en.join('\n'),
      preventionMr: article.preventionTips.mr.join('\n'),
      referencesText: article.references
        .map((r) => `${r.source}: ${r.title}${r.url ? ` | ${r.url}` : ''}`)
        .join('\n'),
      status: adminArticle.status || 'draft',
    });

    setFormError('');
    setIsEditing(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.titleEn.trim() || !form.titleMr.trim()) {
      setFormError('कृपया मराठी आणि इंग्रजी दोन्ही शीर्षके भरा.');
      return;
    }

    const slugBase = form.titleEn
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const slug = slugBase || `health-article-${Date.now()}`;

    const references = form.referencesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(':');
        const source =
          separatorIndex >= 0
            ? line.slice(0, separatorIndex).trim()
            : 'Reference';
        const remaining =
          separatorIndex >= 0
            ? line.slice(separatorIndex + 1).trim()
            : line;

        const [title, url] = remaining.split('|').map((part) => part.trim());

        return {
          source,
          title: title || source,
          ...(url ? { url } : {}),
        };
      });

    const newArticle = {
      id: editingArticleId || `article-${Date.now()}`,
      slug,
      categoryId: form.categoryId,
      title: {
        en: form.titleEn.trim(),
        mr: form.titleMr.trim(),
      },
      excerpt: {
        en: form.excerptEn,
        mr: form.excerptMr,
      },
      overview: {
        en: form.overviewEn,
        mr: form.overviewMr,
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
            en: 'Detailed Health Information',
            mr: 'सविस्तर आरोग्य माहिती',
          },
          content: {
            en: form.overviewEn,
            mr: form.overviewMr,
          },
        },
      ],
      whenToSeeDoctor: {
        en: form.whenToSeeDoctorEn.split('\n').map((v) => v.trim()).filter(Boolean),
        mr: form.whenToSeeDoctorMr.split('\n').map((v) => v.trim()).filter(Boolean),
      },
      preventionTips: {
        en: form.preventionEn.split('\n').map((v) => v.trim()).filter(Boolean),
        mr: form.preventionMr.split('\n').map((v) => v.trim()).filter(Boolean),
      },
      references,
      isFeatured: false,
      status: form.status,
    } as AdminArticle;

    setSaving(true);

    try {
      await onSaveArticle(newArticle);
      setIsEditing(false);
      setStatusMessage(
        form.status === 'published'
          ? 'ब्लॉग Published झाला!'
          : 'ब्लॉग Draft म्हणून Save झाला!'
      );
    } catch (error) {
      console.error('Article save failed:', error);
      setFormError(
        error instanceof Error
          ? error.message
          : 'ब्लॉग Save झाला नाही. कृपया पुन्हा प्रयत्न करा.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.admin.confirmDelete)) return;

    setStatusMessage('');
    setFormError('');

    try {
      await onDeleteArticle(id);
      setStatusMessage(t.admin.deletedSuccess);
    } catch (error) {
      console.error('Article delete failed:', error);
      setStatusMessage('ब्लॉग Delete झाला नाही. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const filteredArticles = articles.filter((article) => {
    const q = searchTerm.toLowerCase();

    return (
      article.title.en.toLowerCase().includes(q) ||
      article.title.mr.toLowerCase().includes(q) ||
      article.categoryId.toLowerCase().includes(q)
    );
  });

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Admin session तपासत आहे...</p>
      </div>
    );
  }

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
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm"
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
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            {loginError && (
              <p role="alert" className="text-xs text-rose-600 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full min-h-11 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 text-white font-semibold text-sm"
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
              className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              {t.admin.createArticle}
            </button>

            <button
              onClick={handleLogout}
              className="min-h-11 px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              {t.admin.logout}
            </button>
          </div>
        </div>

        {statusMessage && (
          <div role="status" aria-live="polite" className="mb-6 p-4 rounded-xl bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {statusMessage}
          </div>
        )}

        {isEditing && (
          <div className="mb-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingArticleId ? t.admin.editArticle : t.admin.createArticle}
              </h2>

              <button
                onClick={() => setIsEditing(false)}
                aria-label="Close article editor"
                className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name.en} ({category.name.mr})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Read Time (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={form.readTimeMinutes}
                    onChange={(e) => setForm({ ...form, readTimeMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Publication Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as ArticleStatus })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  >
                    <option value="draft">Draft — फक्त Admin</option>
                    <option value="published">Published — सार्वजनिक</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">English Title</label>
                  <input
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">मराठी शीर्षक</label>
                  <input
                    required
                    value={form.titleMr}
                    onChange={(e) => setForm({ ...form, titleMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">English Excerpt</label>
                  <textarea
                    rows={2}
                    value={form.excerptEn}
                    onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">मराठी सारांश</label>
                  <textarea
                    rows={2}
                    value={form.excerptMr}
                    onChange={(e) => setForm({ ...form, excerptMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">English Overview</label>
                  <textarea
                    rows={5}
                    value={form.overviewEn}
                    onChange={(e) => setForm({ ...form, overviewEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">मराठी माहिती</label>
                  <textarea
                    rows={5}
                    value={form.overviewMr}
                    onChange={(e) => setForm({ ...form, overviewMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">When to See a Doctor (English)</label>
                  <textarea
                    rows={3}
                    value={form.whenToSeeDoctorEn}
                    onChange={(e) => setForm({ ...form, whenToSeeDoctorEn: e.target.value })}
                    placeholder="One point per line"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">डॉक्टरांचा सल्ला कधी घ्यावा (मराठी)</label>
                  <textarea
                    rows={3}
                    value={form.whenToSeeDoctorMr}
                    onChange={(e) => setForm({ ...form, whenToSeeDoctorMr: e.target.value })}
                    placeholder="प्रत्येक मुद्दा नवीन ओळीत"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Prevention Tips (English)</label>
                  <textarea
                    rows={3}
                    value={form.preventionEn}
                    onChange={(e) => setForm({ ...form, preventionEn: e.target.value })}
                    placeholder="One point per line"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">प्रतिबंधक उपाय (मराठी)</label>
                  <textarea
                    rows={3}
                    value={form.preventionMr}
                    onChange={(e) => setForm({ ...form, preventionMr: e.target.value })}
                    placeholder="प्रत्येक मुद्दा नवीन ओळीत"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Image URL (optional)</label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={form.publishDate}
                    onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Editorial Team Name</label>
                  <input
                    value={form.reviewerNameEn}
                    onChange={(e) => setForm({ ...form, reviewerNameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Editorial Team Role</label>
                  <input
                    value={form.reviewerRoleEn}
                    onChange={(e) => setForm({ ...form, reviewerRoleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Last Reviewed Date (optional)</label>
                <input
                  type="date"
                  value={form.lastReviewedDate}
                  onChange={(e) => setForm({ ...form, lastReviewedDate: e.target.value })}
                  className="w-full sm:w-1/2 px-3 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  References — one per line (Source: Title | URL)
                </label>
                <textarea
                  rows={3}
                  value={form.referencesText}
                  onChange={(e) => setForm({ ...form, referencesText: e.target.value })}
                  placeholder={'WHO: Health topic | https://...'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              {formError && (
                <p className="text-sm text-rose-700 bg-rose-50 p-3 rounded-lg">
                  {formError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="min-h-11 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 text-white text-xs font-semibold"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900">
              Blog Management ({filteredArticles.length})
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.admin.searchAdmin}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((article) => {
                  const status =
                    (article as AdminArticle).status || 'draft';

                  return (
                    <tr key={article.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{article.title.en}</div>
                        <div className="text-[11px] text-slate-500">{article.title.mr}</div>
                      </td>

                      <td className="py-3 px-4 uppercase text-emerald-800">
                        {article.categoryId}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={
                            status === 'published'
                              ? 'text-emerald-700 font-semibold'
                              : 'text-amber-700 font-semibold'
                          }
                        >
                          {status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => startEdit(article)}
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredArticles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      अजून ब्लॉग उपलब्ध नाहीत.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
