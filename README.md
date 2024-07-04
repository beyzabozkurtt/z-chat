# ZChat

ZChat, React ve Firebase kullanılarak geliştirilmiş gerçek zamanlı bir mesajlaşma uygulamasıdır. Bu uygulama, kullanıcıların anlık olarak mesajlaşmasına olanak tanır.

## Proje Linki
[ZChat Uygulamasını Görüntüle](https://zchat-22.netlify.app)

## Özellikler
- Kullanıcı kimlik doğrulaması (Firebase Authentication)
- Gerçek zamanlı mesajlaşma (Firebase Firestore)
- Mesaj bildirimleri
- Kullanıcı dostu arayüz

## Kullanılan Teknolojiler
- **React:** Kullanıcı arayüzü oluşturmak için kullanıldı.
- **Firebase Authentication:** Kullanıcı kimlik doğrulaması için kullanıldı.
- **Firebase Firestore:** Gerçek zamanlı veritabanı olarak kullanıldı.
- **Netlify:** Uygulama barındırma için kullanıldı.

## Kurulum
Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**
   ```sh
   git clone https://github.com/kullanici-adi/zchat.git
   cd zchat
   npm install
2. **Firebase yapılandırmasını yapın:**
- Firebase projesi oluşturun ve yapılandırma bilgilerini alın.
- src/firebaseConfig.js dosyasını oluşturun ve yapılandırma bilgilerinizi ekleyin.
 ```sh
 const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
   

3. **Uygulamayı başlatın:**
```sh
npm start

