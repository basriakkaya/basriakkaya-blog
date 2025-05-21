---
title: Microsoft Defender'da Kritik Zafiyet Keşfedildi
date: 2024-03-20
excerpt: Microsoft'un güvenlik ürünü Defender'da kritik bir zafiyet keşfedildi. CVE-2024-21407 kodlu bu zafiyet, saldırganların sistem üzerinde yüksek yetkiler elde etmesine olanak sağlıyor.
---

# Microsoft Defender'da Kritik Zafiyet Keşfedildi

*20 Mart 2024*

Microsoft'un güvenlik ürünü Defender'da kritik bir zafiyet keşfedildi. CVE-2024-21407 kodlu bu zafiyet, saldırganların sistem üzerinde yüksek yetkiler elde etmesine olanak sağlıyor.

## Zafiyet Detayları

- **Etki Seviyesi**: Kritik (CVSS 9.8)
- **Etkilenen Sürümler**: Microsoft Defender 4.18.2403.x ve öncesi
- **Sömürü Zorluğu**: Düşük

## Nasıl Korunabiliriz?

1. Sistem güncellemelerini hemen yükleyin
2. Microsoft Defender'ı en son sürüme güncelleyin
3. Güvenlik duvarı kurallarınızı gözden geçirin
4. Şüpheli aktiviteleri izleyin

## Teknik Detaylar

Zafiyet, Defender'ın tarama motoru bileşeninde bulunuyor. Saldırgan, özel olarak hazırlanmış bir dosya aracılığıyla uzaktan kod çalıştırma imkanı elde edebiliyor:

```powershell
# Örnek sömürü kodu
MpCmdRun.exe -Scan -ScanType 3 -File "malicious.file"
```

## Alınması Gereken Önlemler

- Tüm sistemleri KB5025175 yaması ile güncelleyin
- EDR çözümlerini aktif tutun
- Kullanıcı yetkilerini sınırlayın
- Olay günlüklerini düzenli kontrol edin

Microsoft, bu zafiyeti "sıfırıncı gün" kategorisinde değerlendiriyor ve acil yama yayınladı. Kurumsal kullanıcıların en kısa sürede sistemlerini güncellemesi öneriliyor. 