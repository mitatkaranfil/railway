# Cosmofy - Telegram Mini App

Cosmofy, Telegram Mini App platformu üzerinde çalışan bir kripto madencilik simülasyon uygulamasıdır.

## Proje Yapısı

- `/telo-mini-backend` - Laravel API
- `/telo-mini-fronted` - React uygulaması

## Kurulum

### Geliştirme Ortamı

1. Backend kurulumu:
```bash
cd telo-mini-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

2. Frontend kurulumu:
```bash
cd telo-mini-fronted
npm install
npm start
```

### Railway Deployment

Bu proje Railway platformunda çalışacak şekilde yapılandırılmıştır.

1. Railway CLI'yi yükleyin:
```bash
npm i -g @railway/cli
```

2. Railway'e giriş yapın:
```bash
railway login
```

3. Projeyi Railway'e bağlayın:
```bash
railway link
```

4. Projeyi deploy edin:
```bash
railway up
```

## Özellikler

- Telegram kullanıcı kimlik doğrulama
- Madencilik simülasyonu
- Boost satın alma ve kullanma
- Liderlik tablosu
- Telegram ödemeleri entegrasyonu

## Teknoloji Yığını

- **Backend:** Laravel, PHP, Sanctum
- **Frontend:** React, JavaScript, Telegram Web App API
- **Veritabanı:** PostgreSQL (Railway)
- **Deployment:** Railway
