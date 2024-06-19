# sevkiyat-docker

Docker mimarisi üzerinde frontend,backend ve mysql veritabanı bu projede plug&play mantığı ile yeniden bir araya getirildi.

Öncelikle docker konteynırı paketleri bağımlılıkları yüklemek için

docker-compose up -d komutu girilir.

Sevk-React frontend dizinine geçilip npm run build ile ana host dizinindeki www/public içine index.html ve diğer frontend js,css dosyaları otomatik taşır.

http://localhost/public/index.html url'inden proje yayına açılmış olur.
