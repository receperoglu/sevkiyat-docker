-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 15 Tem 2023, 13:46:39
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `sevk`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `SaleType` int(11) DEFAULT NULL,
  `CorpId` int(11) DEFAULT NULL,
  `ArticelName` varchar(255) DEFAULT NULL,
  `CustomerName` varchar(255) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `articles`
--

INSERT INTO `articles` (`id`, `SaleType`, `CorpId`, `ArticelName`, `CustomerName`, `CreatedDate`) VALUES
(62, 2, 3257, 'ENGBERS ART 15658 ENG-10 ORANGE MULINE', 'Firma 7', '2019-08-15 00:00:00'),
(101, 2, 3282, '248942 ZEYNEP 11/445', 'Firma 10', '2019-08-23 00:00:00'),
(4135, 2, 3271, 'RESAL TIKTAK', 'Firma 9', '2019-10-21 00:00:00'),
(5186, 2, 3247, 'OLI 28895', 'Firma 4', '2019-10-25 00:00:00'),
(8222, 2, 3247, 'OLI 28979', 'Firma 4', '2019-11-19 00:00:00'),
(8245, 2, 3261, 'BRUCE LACI', 'Fİrma 8', '2020-02-04 00:00:00'),
(8251, 2, 3247, 'OLİ 30117', 'Firma 4', '2020-09-03 00:00:00'),
(8254, 2, 3282, 'S09094 ORGANİK ESMA', 'Firma 10', '2020-11-27 00:00:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `corps`
--

CREATE TABLE `corps` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Adress` varchar(255) DEFAULT NULL,
  `VergiNo` varchar(255) DEFAULT NULL,
  `VergiDairesi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `corps`
--

INSERT INTO `corps` (`id`, `Name`, `Adress`, `VergiNo`, `VergiDairesi`) VALUES
(3223, 'Firma 1', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'ATISALANI'),
(3227, 'Fİrma 2', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'Esenyurt'),
(3231, 'Firma 3', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'm.kurumlar'),
(3247, 'Firma 4', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'M.KURUMLAR'),
(3253, 'Firma 5', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'BEYLIKDÜZÜ'),
(3254, 'Firma 6', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'AVCILAR'),
(3257, 'Firma 7', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'M.KURUMLAR'),
(3261, 'Fİrma 8', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'BEYLIKDÜZÜ'),
(3271, 'Firma 9', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'GÜNESLI'),
(3282, 'Firma 10', 'Secret Corp. Address', 'Secret Corp. Tax Number', 'HASAN TAHSIN');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `filelist`
--

CREATE TABLE `filelist` (
  `Id` int(11) NOT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `ArticelId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `FileName` varchar(255) DEFAULT NULL,
  `ext` varchar(10) NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `filelist`
--

INSERT INTO `filelist` (`Id`, `Path`, `Type`, `ArticelId`, `OrderId`, `FileName`, `ext`, `CreatedDate`) VALUES
(10, '1689350799_Teknolojik_Degisim_ve_Baskinin_Ustesinden_Gelmek.pdf', 'Document', 62, NULL, 'Teknolojik Degisim ve Baskinin Ustesinden Gelmek', 'pdf', '2023-07-14 16:06:39'),
(11, '1689350898_f7bb7e42-c625-4127-a791-2d0a7b5034c5.jpg', 'Picture', 62, NULL, 'f7bb7e42-c625-4127-a791-2d0a7b5034c5.jpg', 'png', '2023-07-14 16:08:18'),
(12, '1689362602_1689003436924.png', 'Picture', 62, NULL, '1689003436924', 'png', '2023-07-14 19:23:22'),
(13, '1689362609_110000039739050.jpg', 'Picture', 62, NULL, '110000039739050', 'jpg', '2023-07-14 19:23:29'),
(15, '1689362679_Ekran görüntüsü 2023-07-14 212711.png', 'Picture', 62, NULL, 'Ekran g  r  nt  s   2023-07-14 212711', 'png', '2023-07-14 19:24:39');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `metrics`
--

CREATE TABLE `metrics` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Metrics` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `ArticelId` int(11) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `notes`
--

INSERT INTO `notes` (`id`, `ArticelId`, `content`) VALUES
(1, 62, 'Bu ilk note alanıdırs\r\n\r\nasdasdasd');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `ArticelId` int(11) NOT NULL,
  `CorpId` int(11) DEFAULT NULL,
  `Dimensions` varchar(255) DEFAULT NULL,
  `ProductTypeName` varchar(255) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `Piece` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `SaleTypeName` varchar(255) DEFAULT NULL,
  `Metrics` varchar(255) DEFAULT NULL,
  `SaleTypeId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `ArticelId`, `CorpId`, `Dimensions`, `ProductTypeName`, `Color`, `Piece`, `CreatedDate`, `SaleTypeName`, `Metrics`, `SaleTypeId`) VALUES
(1, 62, 3271, '120x16', 'Katlamalı', 'Siyah Beyaz', 120, '2023-07-14 14:11:44', 'Satış', 'Mt', '1'),
(2, 62, 3271, '120x16', 'Katlamalı', 'Kırmızı Beyaz', 560, '2023-07-14 14:11:44', 'Satış', 'Mt', '1'),
(3, 101, 3271, '120x16', 'Katlamalı', 'Kırmızı Beyaz', 560, '2023-07-14 14:11:44', 'Satış', 'Mt', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `producttype`
--

CREATE TABLE `producttype` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Metrics` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `producttype`
--

INSERT INTO `producttype` (`id`, `Name`, `Metrics`) VALUES
(1, 'Tiktak', 'MT'),
(2, 'Resal Tiktak', 'MT'),
(3, 'Bant', 'AD'),
(4, 'Yaka', 'AD'),
(5, 'Katlamali Bant', 'AD'),
(6, 'LYC Bant', 'AD'),
(7, 'LYC Katlamali Bant', 'AD'),
(8, 'Intersie', 'AD'),
(9, 'Jakarli', 'AD'),
(10, 'KusGözü', 'AD'),
(11, 'Petek Örgü', 'AD'),
(12, 'Metraj', 'KG'),
(1001, 'Çift Yüzlü Yaka', 'AD'),
(1002, 'Çift Yüzlü Bant', 'AD');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `salestypes`
--

CREATE TABLE `salestypes` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `salestypes`
--

INSERT INTO `salestypes` (`id`, `Name`) VALUES
(1, 'Fason'),
(2, 'Satis'),
(3, 'Iade'),
(4, 'Alis Iade');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$10$AFWeA8OpTZy6TE.Xtij60OFXATsxnKtD7AV77q2uGmnqSs3l9o4dS', NULL, '2023-07-13 16:41:09', '2023-07-13 16:41:09');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `waybill`
--

CREATE TABLE `waybill` (
  `id` int(11) NOT NULL,
  `WayBillId` varchar(10) NOT NULL,
  `CorpId` int(11) DEFAULT NULL,
  `CorpName` varchar(255) DEFAULT NULL,
  `ArticelId` varchar(255) DEFAULT NULL,
  `ArticelName` varchar(255) DEFAULT NULL,
  `Dimensions` varchar(255) DEFAULT NULL,
  `ProductTypeName` varchar(255) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `Weight` int(11) NOT NULL,
  `ReelPiece` int(11) DEFAULT NULL,
  `SendEdPiece` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT current_timestamp(),
  `SaleTypeName` varchar(255) DEFAULT NULL,
  `Metrics` varchar(255) DEFAULT NULL,
  `SaleTypeId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `waybill`
--

INSERT INTO `waybill` (`id`, `WayBillId`, `CorpId`, `CorpName`, `ArticelId`, `ArticelName`, `Dimensions`, `ProductTypeName`, `Color`, `Weight`, `ReelPiece`, `SendEdPiece`, `OrderId`, `CreatedDate`, `SaleTypeName`, `Metrics`, `SaleTypeId`) VALUES
(13, '1233', 3271, NULL, '62', NULL, '120x16', 'Katlamalı', 'Siyah Beyaz', 20, NULL, 10, 1, '2023-07-14 22:17:52', NULL, NULL, NULL),
(14, '1233', 3271, NULL, '62', NULL, '120x16', 'Katlamalı', 'Kırmızı Beyaz', 30, NULL, 20, 2, '2023-07-14 22:17:52', NULL, NULL, NULL),
(15, '12999', 3271, NULL, '101', NULL, '120x16', 'Katlamalı', 'Kırmızı Beyaz', 1, NULL, 10, 3, '2023-07-15 01:16:29', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `waybillphoto`
--

CREATE TABLE `waybillphoto` (
  `id` int(11) NOT NULL,
  `WayBillId` varchar(11) NOT NULL,
  `ArticelId` int(11) NOT NULL,
  `path` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `waybillphoto`
--

INSERT INTO `waybillphoto` (`id`, `WayBillId`, `ArticelId`, `path`) VALUES
(17, '1233', 62, 'waybill1689372829_Ekrangörüntüsü2023-07-14212711.png');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `corps`
--
ALTER TABLE `corps`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Tablo için indeksler `filelist`
--
ALTER TABLE `filelist`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `metrics`
--
ALTER TABLE `metrics`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Tablo için indeksler `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Tablo için indeksler `producttype`
--
ALTER TABLE `producttype`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `salestypes`
--
ALTER TABLE `salestypes`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Tablo için indeksler `waybill`
--
ALTER TABLE `waybill`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `waybillphoto`
--
ALTER TABLE `waybillphoto`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8255;

--
-- Tablo için AUTO_INCREMENT değeri `corps`
--
ALTER TABLE `corps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3283;

--
-- Tablo için AUTO_INCREMENT değeri `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `filelist`
--
ALTER TABLE `filelist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `metrics`
--
ALTER TABLE `metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `producttype`
--
ALTER TABLE `producttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;

--
-- Tablo için AUTO_INCREMENT değeri `salestypes`
--
ALTER TABLE `salestypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `waybill`
--
ALTER TABLE `waybill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `waybillphoto`
--
ALTER TABLE `waybillphoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
