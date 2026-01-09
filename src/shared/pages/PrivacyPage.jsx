import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
            {/* MOBILE: Back button */}
            <button
                onClick={() => navigate("/settings")}
                className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2 mb-4"
            >
                ← Geri
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-black">
                Gizlilik Politikası
            </h1>

            <div className="space-y-4 sm:space-y-6 text-black">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        1. Toplanan Veriler
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven olarak, hizmetlerimizi sunabilmek için aşağıdaki verileri topluyoruz:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>E-posta adresi (hesap oluşturma ve iletişim için)</li>
                        <li>Teknik veriler (IP adresi, tarayıcı bilgisi, cihaz türü)</li>
                        <li>Kullanım verileri (sayfa görüntülemeleri, tıklamalar)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        2. Verilerin Kullanım Amacı
                    </h2>
                    <p className="leading-relaxed">
                        Topladığımız veriler yalnızca şu amaçlarla kullanılır:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
                        <li>Kullanıcı deneyimini kişiselleştirmek</li>
                        <li>Teknik sorunları tespit etmek ve çözmek</li>
                        <li>Güvenlik ve dolandırıcılık önleme</li>
                        <li>Yasal yükümlülükleri yerine getirmek</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        3. Çerez (Cookie) Kullanımı
                    </h2>
                    <p className="leading-relaxed">
                        Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek
                        için çerezler kullanmaktadır. Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır.
                        Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda
                        bazı site özellikleri düzgün çalışmayabilir.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        4. Veri Güvenliği
                    </h2>
                    <p className="leading-relaxed">
                        Kişisel verilerinizin güvenliği bizim için önceliklidir. Verilerinizi yetkisiz erişime,
                        değişikliğe veya ifşaya karşı korumak için endüstri standardı güvenlik önlemleri
                        kullanıyoruz. Ancak, internet üzerinden yapılan hiçbir veri aktarımının %100
                        güvenli olmadığını unutmayın.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        5. Verilerin Paylaşımı
                    </h2>
                    <p className="leading-relaxed">
                        Kişisel verilerinizi üçüncü taraflarla <strong>satmıyoruz</strong>. Verileriniz
                        yalnızca aşağıdaki durumlarda paylaşılabilir:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Yasal zorunluluklar gereği</li>
                        <li>Hizmet sağlayıcılarımızla (veri işleme, hosting vb.)</li>
                        <li>Açık rızanız ile</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        6. Kullanıcı Hakları
                    </h2>
                    <p className="leading-relaxed">
                        KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                        <li>Kişisel verilerinizin düzeltilmesini isteme</li>
                        <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                        <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi
                            sonucu aleyhinize bir sonuç doğması halinde itiraz etme</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        7. İletişim
                    </h2>
                    <p className="leading-relaxed">
                        Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle
                        iletişime geçebilirsiniz:
                    </p>
                    <p className="mt-2">
                        <strong>E-posta:</strong>{" "}
                        <a
                            href="mailto:contact@newsdriven.com"
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            contact@newsdriven.com
                        </a>
                    </p>
                </section>

                <section className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-black">
                        Son güncelleme: {new Date().toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </section>
            </div>
        </div>
    );
}
