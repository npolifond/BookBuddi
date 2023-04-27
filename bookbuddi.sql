-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 06:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookbuddi`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `firstname`, `lastname`, `username`, `email`, `password`) VALUES
(1, 'Jane', 'Doe', 'jdoe', 'jdoe@hotmail.com', ''),
(2, 'Luke', 'Pluto', 'lukko', 'luckP@gmail.com', ''),
(3, 'daya', 'jack', 'day', 'username2@email.com', 'dayday');

-- --------------------------------------------------------

--
-- Table structure for table `review_details`
--

CREATE TABLE `review_details` (
  `BookTitle` varchar(35) NOT NULL,
  `Description` text NOT NULL,
  `Rating` int(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review_details`
--

INSERT INTO `review_details` (`BookTitle`, `Description`, `Rating`, `user_id`, `id`) VALUES
('Pride and Prejudice', 'The book was great!', 4, 1, 1),
('Green ggs and Ham', 'Wonderful book! Very enjoyable! Recommend to everyone.', 5, 1, 7),
('Jungle Book', 'Terrible book, don\'t read!', 1, 2, 8),
('The magic school bus', 'Good Book! update: i read it again it was ok.', 4, 2, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_details`
--
ALTER TABLE `review_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review_details`
--
ALTER TABLE `review_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `review_details`
--
ALTER TABLE `review_details`
  ADD CONSTRAINT `review_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
