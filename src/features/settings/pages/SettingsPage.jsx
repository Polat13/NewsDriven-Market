import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { getMe, updateMe } from "../api/SettingsService";

export default function SettingsPage() {
  const { user } = useAuth();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("tr");
  const [theme, setTheme] = useState("light");

  // Loading, error, success state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ✅ Component mount: backend'den ayarları çek
  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      setError(null);
      const data = await getMe();

      // Backend response format defensive handling
      // Varsayılan: { user: {name, email}, settings: {language, theme} }
      // Fallback: { name, email, preferences: {language, theme} }
      const userData = data?.user || data?.profile || data || {};
      const settingsData = data?.settings || data?.preferences || {};

      setName(userData.name || "");
      setEmail(userData.email || "");
      setLanguage(settingsData.language || settingsData.lang || "tr");
      setTheme(settingsData.theme || "light");
    } catch (err) {
      setError(err.message || "Ayarlar yüklenirken hata oluştu");
      console.error("Settings fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Kaydet butonu: backend'e gönder
  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const payload = {
        name,
        settings: {
          language,
          theme,
        },
      };

      const response = await updateMe(payload);

      // Success feedback
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Optionally update form with response
      if (response?.user) {
        setName(response.user.name || "");
        setEmail(response.user.email || "");
      }
    } catch (err) {
      setError(err.message || "Ayarlar kaydedilirken hata oluştu");
      console.error("Settings save error:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600 mt-1">Profil ve uygulama ayarlarını yönetin</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex items-center justify-center">
          <p className="text-gray-600 font-medium">⏳ Ayarlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm text-red-800 font-medium">❌ {error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-sm text-green-800 font-medium">✅ Ayarlar başarıyla kaydedildi</p>
        </div>
      )}

      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-600 mt-1">Profil ve uygulama ayarlarını yönetin</p>
      </div>

      {/* Profil Bölümü */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            👤 Profil
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Profil Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {(name || email || "U").slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{name || "Kullanıcı"}</p>
              <p className="text-sm text-gray-600">{email || "e-mail@example.com"}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Profil Bilgileri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Ad Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">E-posta</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "⏳ Kaydediliyor..." : "💾 Değişiklikleri Kaydet"}
          </button>
        </div>
      </div>

      {/* Yasal Belgeler Bölümü */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📄 Yasal Belgeler
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <Link
            to="/privacy"
            className="w-full py-3 px-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-center"
          >
            🔒 Gizlilik Politikası
          </Link>
          <Link
            to="/terms"
            className="w-full py-3 px-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-center"
          >
            📋 Kullanım Şartları
          </Link>
        </div>
      </div>
    </div>
  );
}
