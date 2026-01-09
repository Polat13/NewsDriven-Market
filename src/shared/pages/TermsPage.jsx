import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
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
                Kullanım Şartları
            </h1>

            <div className="space-y-4 sm:space-y-6 text-black">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        1. Hizmetin Kullanım Amacı
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven, kullanıcılarına finansal haberler, hisse senedi analizleri ve
                        piyasa verileri sunmak amacıyla tasarlanmış bir platformdur. Bu hizmet,
                        yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz.
                    </p>
                    <p className="leading-relaxed mt-2">
                        Platformumuzu kullanarak, bu kullanım şartlarını kabul etmiş sayılırsınız.
                        Şartları kabul etmiyorsanız, lütfen hizmeti kullanmayınız.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        2. Kullanıcı Sorumlulukları
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven kullanıcısı olarak aşağıdaki sorumluluklara sahipsiniz:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Hesap bilgilerinizi güvenli tutmak ve kimseyle paylaşmamak</li>
                        <li>Platformu yalnızca yasal amaçlarla kullanmak</li>
                        <li>Doğru ve güncel bilgiler sağlamak</li>
                        <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                        <li>Platformun güvenliğini tehlikeye atacak eylemlerden kaçınmak</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        3. Yasaklı Davranışlar
                    </h2>
                    <p className="leading-relaxed">
                        Aşağıdaki davranışlar kesinlikle yasaktır ve hesabınızın askıya alınmasına
                        veya sonlandırılmasına neden olabilir:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Platformu otomatik araçlar (botlar, scraper'lar) ile kullanmak</li>
                        <li>Başkalarının hesaplarına yetkisiz erişim sağlamaya çalışmak</li>
                        <li>Yanıltıcı, yanlış veya aldatıcı bilgiler yaymak</li>
                        <li>Platformun altyapısına zarar verecek faaliyetlerde bulunmak</li>
                        <li>Telif hakkı veya fikri mülkiyet haklarını ihlal etmek</li>
                        <li>Spam, kötü amaçlı yazılım veya zararlı içerik paylaşmak</li>
                        <li>Diğer kullanıcıları taciz etmek veya rahatsız etmek</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        4. Hesabın Askıya Alınması veya Sonlandırılması
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven, kullanım şartlarını ihlal eden kullanıcıların hesaplarını
                        önceden bildirimde bulunmaksızın askıya alma veya kalıcı olarak sonlandırma
                        hakkını saklı tutar.
                    </p>
                    <p className="leading-relaxed mt-2">
                        Hesabınızın askıya alınması veya sonlandırılması durumunda, platformdaki
                        tüm verilerinize erişiminizi kaybedebilirsiniz. Hesap kapatma talebinde
                        bulunmak için bizimle iletişime geçebilirsiniz.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        5. Sorumluluk Reddi
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven platformu "olduğu gibi" sunulmaktadır. Aşağıdaki hususlarda
                        sorumluluk kabul etmemekteyiz:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>
                            <strong>Yatırım Kararları:</strong> Platformdaki bilgiler yatırım tavsiyesi
                            değildir. Yatırım kararlarınızdan tamamen siz sorumlusunuz.
                        </li>
                        <li>
                            <strong>Veri Doğruluğu:</strong> Sunulan verilerin doğruluğunu garanti
                            etmemekteyiz. Veriler gecikebilir veya hatalı olabilir.
                        </li>
                        <li>
                            <strong>Hizmet Kesintileri:</strong> Teknik sorunlar, bakım çalışmaları
                            veya diğer nedenlerle hizmet kesintileri yaşanabilir.
                        </li>
                        <li>
                            <strong>Üçüncü Taraf Bağlantılar:</strong> Platformumuzda yer alan üçüncü
                            taraf bağlantılarının içeriğinden sorumlu değiliz.
                        </li>
                        <li>
                            <strong>Mali Kayıplar:</strong> Platformun kullanımından kaynaklanan
                            herhangi bir mali kayıptan sorumlu tutulamayız.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        6. Fikri Mülkiyet Hakları
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven platformundaki tüm içerik, tasarım, logo, yazılım ve diğer
                        materyaller telif hakkı ve fikri mülkiyet yasaları ile korunmaktadır.
                        İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        7. Değişiklikler
                    </h2>
                    <p className="leading-relaxed">
                        NewsDriven, bu kullanım şartlarını herhangi bir zamanda değiştirme hakkını
                        saklı tutar. Önemli değişiklikler yapıldığında kullanıcılar bilgilendirilecektir.
                        Değişikliklerden sonra platformu kullanmaya devam etmeniz, yeni şartları
                        kabul ettiğiniz anlamına gelir.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-black">
                        8. İletişim
                    </h2>
                    <p className="leading-relaxed">
                        Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
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
