# Satış Dashboard Projesi

Bu proje, MongoDB üzerinde saklanan satış verilerini kullanarak bir **vendor bazlı satış dashboard’u** sağlar. Dashboard’da:

- Aylık satış grafiği
- Vendor bazlı top ürün tablosu

görüntülenebilir.

---

## 🚀 Ön Koşullar

- Node.js >= 18  
- npm >= 9  
- MongoDB (lokal veya remote)  
- Git (opsiyonel)

---

## 📁 Proje Yapısı
project-root/  
│  
├─ backend/             # Node.js + Express backend  
│  ├─ src/  
│  ├─ package.json  
│  ├─ tsconfig.json  
│  └─ env.sample        # Backend environment örneği  
│  
└─ frontend/            # React frontend  
├─ src/  
├─ package.json  
└─ env.sample        # Frontend environment örneği  
  


## ⚙️ Kurulum ve Çalıştırma

1. Backend klasörüne girin:

```bash
cd backend
npm install
cp env.sample .env
```

env.sample örneği: 
```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/sales_dashboard
```

backend start:
```bash
npm run dev
```

2. Frontend klasörüne girin:

```bash
cd frontend
npm install
cp env.sample .env
```

env.sample örneği: 
```bash
REACT_APP_API_URL=http://localhost:4000
```

backend start:
```bash
npm start
```

🔗 Kullanım
1.	Tarayıcıyı açın ve frontend URL’sine gidin (örn. http://localhost:3000).
2.	Vendor seçim ekranından bir vendor seçin.
3.	Dashboard’da Aylık Satış Grafiği ve Ürün Bazlı Satış Tablosu görüntülenecek.

🛠️ Notlar
•	Backend: TypeScript + Express + MongoDB
•	Frontend: React + TypeScript + Chart.js
•	Environment değişkenleri .env dosyasından okunur
•	Backend ve frontend farklı portlarda çalışıyorsa CORS ayarlaması gerekebilir

