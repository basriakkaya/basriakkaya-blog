---
title: Örnek Blog Yazısı
date: 2024-03-21
excerpt: Bu bir örnek blog yazısıdır. Bu metin yazının kısa özetini gösterir.
---

# Örnek Blog Yazısı

Bu bir örnek blog yazısıdır. Markdown formatında yazılmıştır.

## Markdown Özellikleri

1. **Kalın yazı** kullanabilirsiniz
2. *İtalik yazı* kullanabilirsiniz
3. `Kod bloğu` kullanabilirsiniz

```python
# Kod örnekleri ekleyebilirsiniz
def merhaba():
    print("Merhaba Dünya!")
```

## Nasıl Yazı Eklersiniz?

1. Bu formatta bir markdown dosyası oluşturun
2. Dosyanın başına --- ile ayrılmış metadata bölümü ekleyin
3. Dosyayı `blog/posts` klasörüne kaydedin
4. `index.json` dosyasına dosya adını ekleyin
5. Tarayıcıda 'refresh' komutunu kullanarak blog yazılarını yenileyin

### Metadata Alanları

- `title`: Yazının başlığı
- `date`: Yazının tarihi (YYYY-MM-DD formatında)
- `excerpt`: Yazının kısa özeti (opsiyonel)

> Not: Eğer excerpt belirtmezseniz, yazının ilk paragrafı otomatik olarak özet olarak kullanılır. 