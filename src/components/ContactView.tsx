import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Youtube,
  Clock
} from 'lucide-react';

interface ContactViewProps {
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form validation
    if (!formData.name.trim()) {
      setErrorMessage(language === 'mr' ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा.' : 'Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage(language === 'mr' ? 'कृपया वैध ईमेल पत्ता प्रविष्ट करा.' : 'Please enter a valid email address.');
      return;
    }

    if (!formData.subject.trim()) {
      setErrorMessage(language === 'mr' ? 'कृपया विषय प्रविष्ट करा.' : 'Please specify a subject.');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage(language === 'mr' ? 'कृपया किमान १० अक्षरांचा संदेश लिहा.' : 'Please enter a message of at least 10 characters.');
      return;
    }

    const subject = encodeURIComponent(formData.subject.trim());
    const body = encodeURIComponent('Name: ' + formData.name.trim() + '\nEmail: ' + formData.email.trim() + '\n\n' + formData.message.trim());
    window.location.href = 'mailto:contact@motihealth.org?subject=' + subject + '&body=' + body;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
            {language === 'mr' ? 'आमच्याशी संवाद साधा' : 'Connect with MOTI'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div role="alert" className="p-3 rounded-xl bg-rose-50 text-rose-800 text-sm font-medium border border-rose-200">
                    {errorMessage}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-500 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
                  {language === 'mr' ? 'सबमिट केल्यावर तुमच्या ईमेल अॅपमध्ये संदेश तयार होईल. पाठवण्यासाठी तिथे Send दाबा.' : 'Submitting opens your email app with the message ready. Press Send there to email us.'}
                </p>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {t.contact.form.name} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full min-h-12 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.form.email} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full min-h-12 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.form.subject} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact.form.subjectPlaceholder}
                    className="w-full min-h-12 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.form.message} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full min-h-12 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-12 py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.form.submit}</span>
                </button>
              </form>
            </>
          </div>

          {/* Right: Info & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {t.contact.office}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{t.contact.officeAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>contact@motihealth.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{language === 'mr' ? 'सोमवार ते शनिवार: स. ९:०० ते सायं. ६:००' : 'Monday to Saturday: 9:00 AM – 6:00 PM IST'}</span>
                </div>
              </div>
            </div>

            {/* Social Media Link Placeholders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                {t.contact.socialTitle}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                {t.contact.socialSubtitle}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-20 p-3 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50 flex flex-col items-center justify-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">Instagram</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-20 p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 flex flex-col items-center justify-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors group"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">Facebook</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-20 p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 flex flex-col items-center justify-center gap-1.5 text-slate-700 hover:text-red-600 transition-colors group"
                >
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
