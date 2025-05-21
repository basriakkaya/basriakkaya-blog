---
title: Cyber Kill Chain Modeli ve Siber Saldırı Metodolojisi
date: 2024-03-21
excerpt: Siber uzayda hızla değişen tehdit ortamı, karmaşıklık ve artan siber saldırı sıklığı, siber güvenlik uygulamalarının tespit, önleme ve müdahale süreçlerini içeren kapsamlı bir sisteme entegre edilmesine neden olmuştur.
---

# Cyber Kill Chain Modeli ve Siber Saldırı Metodolojisi

*21 Mart 2024*

Siber uzayda hızla değişen tehdit ortamı, karmaşıklık ve artan siber saldırı sıklığı, siber güvenlik uygulamalarının tespit, önleme ve müdahale süreçlerini içeren kapsamlı bir sisteme entegre edilmesine neden olmuştur.

## Cyber Kill Chain Nedir?

Cyber Kill Chain, askeri kökenli bir terimdir ve askeri terminolojide saldıran tarafın saldırı sırasında geçtiği aşamaları belirtmek için kullanılmıştır. 2011 yılında Locked Martin şirketi, bu aşamaları siber uzaya uygulayarak siber saldırganların saldırı metodolojilerini açıklayan bir makale yayınladı.

## Modelin Aşamaları

### 1. Keşif Aşaması (Reconnaissance)

Bu aşama hedef seçim aşaması olarak tanımlanabilir. Hedef organizasyon detayları, endüstri-dikey-yasal gereksinimler, teknoloji seçimleri hakkında bilgiler, sosyal ağ etkinlikleri veya posta listeleri araştırılan alanlardır.

Saldırganlar temel olarak şu sorulara yanıt ararlar:
- "Hangi saldırı yöntemleri en yüksek başarı derecesiyle çalışacak?"
- "Kaynak yatırımımız açısından hangisi en kolay uygulanabilir?"

### 2. Silahlandırma Aşaması (Weaponization)

Bu adım birçok şekilde gerçekleştirilebilir:
- Web uygulama exploiti
- Hazır veya özel malware
- Belge güvenlik açıklarından yararlanılarak oluşturulan kötü amaçlı dosyalar

### 3. İletim Aşaması (Delivery)

İki temel senaryo vardır:
1. Kötü amaçlı dosyaların kullanıcılara e-posta vb. yollarla gönderilmesi
2. SQL injection, PHP backdoor upload gibi aktif saldırı yöntemleri

### 4. Sömürme Aşaması (Exploitation)

Kötü amaçlı kod veya dosya hedefe ulaştıktan sonra, hedef sistem ortamında kendine yer bulmalıdır. Yamasız işletim sistemi, gerekli güvenlik önlemleriyle korunmayan web uygulaması ve güvenlik sorunlu kaynak kodu, kötü amaçlı dosya/kodun güvenlik açıklarını istismar ederek işlevsel hale gelmesine izin verecektir.

### 5. Kurulum Aşaması (Installation)

Bu aşama genellikle malware'in hedef bilgisayar işletim sistemine kurulmasıyla başlar. Malware çalıştırılabilir bir dosya ise veya kötü amaçlı kod enjeksiyonuna dayalı ise ya da içeriden tehdit söz konusu ise kurulum aşaması gerekli değildir.

### 6. Komuta ve Kontrol Aşaması (Command & Control)

Komuta ve kontrol ağları sunucular, eşler arası ağlar veya sosyal medya sunucuları olabilir. Ayrıca tespiti önlemek için birden fazla komuta ve kontrol ağı (örn. bot ağları) olabilir.

### 7. Hedef Üzerinde Eylemler (Actions on Target)

Bu, zincirin son aşamasıdır ve saldırının hedeflerini gerçekleştirmekten sorumludur. Bu aşamada malware hedef bilgisayara yerleştirilmişse, komuta ve kontrol sunucusundan gelen talimatlarla veya bağımsız olarak programlanmış işlevi gerçekleştirmeye başlar.

## Sonuç

Güvenlik analizlerinde geleneksel tek cyber kill chain modeline odaklanmamak çok önemlidir; tehditlere karşı önlem alırken çoklu cyber kill chain'ler (persistence) hakkında bütünsel bir yaklaşım benimsenmelidir.

Ayrıca, saldırının ne yaptığına bakmak yerine saldırganın niyetini anlamak önemli olmalıdır. Örneğin, saldırı motivasyonu sunuculardan finansal bilgi çalmak ise, ağ dışına giden komuta ve kontrol iletişimi olacaktır ve iyi kontrol edilen bir ağ güvenlik sisteminde tespit için izler bırakacaktır. 