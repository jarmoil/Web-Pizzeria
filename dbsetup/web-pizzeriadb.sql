-- phpMyAdmin SQL Dump
-- version 5.2.2-1.el9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 06, 2025 at 05:45 PM
-- Server version: 10.5.27-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web-pizzeriadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `pizza_id` int(11) NOT NULL,
  `pizza_name` text NOT NULL,
  `pizza_description` text NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image_url` text NOT NULL,
  `daily_weekday` enum('mon','tue','wed','thu','fri','sat','sun') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`pizza_id`, `pizza_name`, `pizza_description`, `price`, `image_url`, `daily_weekday`) VALUES
(26, 'Hawaii', 'Ananasta ja kinkkua', 10.00, 'https://images.unsplash.com/photo-1708649360542-db4f0762bd9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'mon'),
(36, 'Pepperoni', 'Pepperonimakkaraa, talon tomaattikastiketta, juustoa', 10.50, 'https://images.unsplash.com/photo-1692737580547-b45bb4a02356?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'fri'),
(37, 'Bolognese', 'Jauheliha, juusto, tomaattikastike', 9.00, 'https://images.unsplash.com/photo-1702716059239-385baacdabdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'wed'),
(38, 'Francescana', 'Kinkku, herkkusieni, juusto, tomaattikastike', 10.00, 'https://images.unsplash.com/photo-1692737580563-7ba2d896f0f6?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'thu'),
(39, 'Mozzarella', 'Mozzarella-juusto, basilika, tomaatti, tomaattikastike', 9.50, 'https://plus.unsplash.com/premium_photo-1723478407550-a4a3dacd77f4?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'sat'),
(40, 'Mexicana', 'Pepperoni, jalapeno, ananas, juusto, tomaattikastike', 10.50, 'https://images.unsplash.com/photo-1709392975966-6e76d0452436?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'sun'),
(41, 'Juustopizza', 'Aurajuustoa, Edamjuusto, Fetajuusto, Mozzarellajuusto, tomaattikastike', 9.99, 'https://images.unsplash.com/photo-1662805524663-7851d77cc133?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'tue');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_status` enum('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `total_price` decimal(6,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `address` text DEFAULT NULL,
  `is_pickup` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `pizza_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_per_unit` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `order_item_reviews`
--

CREATE TABLE `order_item_reviews` (
  `item_review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pizza_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `order_item_reviews`
--

INSERT INTO `order_item_reviews` (`item_review_id`, `user_id`, `pizza_id`, `rating`, `comment`, `created_at`) VALUES
(3, 3, 36, 5, 'Pepperoni pizza maistui', '2025-04-28 12:36:34'),
(4, 3, 36, 3, 'Ihan ok', '2025-04-28 12:37:29'),
(5, 3, 26, 5, 'Todella herkullista', '2025-04-29 11:09:15'),
(6, 3, 36, 1, 'Aivan liian suolaista', '2025-04-29 11:10:10'),
(15, 11, 26, 5, 'ananas kuuluu pitsaan', '2025-04-30 08:19:29'),
(16, 4, 39, 4, 'Aika hyvää!', '2025-05-05 11:39:57'),
(20, 3, 36, 5, 'ADWAD', '2025-05-05 17:58:52'),
(21, 3, 38, 5, 'testi', '2025-05-06 15:54:42'),
(22, 42, 38, 5, 'arvostelu', '2025-05-06 16:16:27'),
(23, 40, 41, 5, 'Rehti juustopitsa', '2025-05-06 16:18:37'),
(24, 43, 41, 5, 'missä minä olen??', '2025-05-06 16:20:32'),
(25, 43, 41, 5, 'anteeksi onko tämä se tekoäly chat??', '2025-05-06 16:20:50'),
(26, 43, 41, 5, 'haluaisin varata ajan hammaslääkäriin!', '2025-05-06 16:21:02'),
(27, 43, 41, 5, 'haloo onko siellä ketäään???', '2025-05-06 16:21:09'),
(28, 44, 40, 5, 'Ei hempskutti olipas hyvvöö pitsaa.', '2025-05-06 16:24:07'),
(29, 3, 36, 5, 'Hyvää', '2025-05-06 17:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_reviews`
--

CREATE TABLE `restaurant_reviews` (
  `restaurant_review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `restaurant_reviews`
--

INSERT INTO `restaurant_reviews` (`restaurant_review_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 2, 5, 'Parasta pizzaa', '2025-04-18 12:25:31'),
(4, 4, 5, 'Aivan mahtavaa palvelua!', '2025-05-05 11:38:19'),
(7, 40, 5, 'Hulluin pizzeria suomes, suosittelen.', '2025-05-06 16:14:27'),
(8, 41, 5, 'PARAS PIZZERIA KOKO SUOMESSA! NOPEA JA KOMEA KULJETUS! JUUSTOPIZZA BEST!', '2025-05-06 16:16:30'),
(9, 42, 5, 'PARAS PAIKKA !!', '2025-05-06 16:17:11'),
(10, 43, 1, 'Pizzat olivat kylmiä ja joku korsto alkoi huutamaan minulle kun valitin, että tekohampaani lohkeaa kun puraisen pizzan reunasta. Komeita olivat myyjät, mutta eihän täältä saanut edes täysmaitoa!', '2025-05-06 16:19:55');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_picture` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('customer','employee','admin') NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`pizza_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `pizza_id` (`pizza_id`);

--
-- Indexes for table `order_item_reviews`
--
ALTER TABLE `order_item_reviews`
  ADD PRIMARY KEY (`item_review_id`),
  ADD KEY `pizza_id` (`pizza_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `restaurant_reviews`
--
ALTER TABLE `restaurant_reviews`
  ADD PRIMARY KEY (`restaurant_review_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `pizza_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `order_item_reviews`
--
ALTER TABLE `order_item_reviews`
  MODIFY `item_review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurant_reviews`
--
ALTER TABLE `restaurant_reviews`
  MODIFY `restaurant_review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `menu` (`pizza_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_item_reviews`
--
ALTER TABLE `order_item_reviews`
  ADD CONSTRAINT `fk_order_item_reviews_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `menu` (`pizza_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_item_reviews_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `restaurant_reviews`
--
ALTER TABLE `restaurant_reviews`
  ADD CONSTRAINT `FK_restaurant_reviews` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
