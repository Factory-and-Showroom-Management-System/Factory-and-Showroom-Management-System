-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 23, 2025 at 09:25 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pfmsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `additions`
--

DROP TABLE IF EXISTS `additions`;
CREATE TABLE IF NOT EXISTS `additions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `totalOT` float DEFAULT NULL,
  `totalAllowance` float DEFAULT NULL,
  `totalAddition` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `additions`
--

INSERT INTO `additions` (`id`, `userId`, `name`, `totalOT`, `totalAllowance`, `totalAddition`, `createdAt`, `updatedAt`) VALUES
(23, '2', 'K.D.P.M Siriwardhana ', 0, 2400, 2400, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(24, '3', 'G.W.M.D.Rupasinghe', 0, 1800, 1800, '2024-07-10 22:35:25', '2024-08-06 11:42:18'),
(25, '4', 'T.I.Bandara', 0, 600, 600, '2024-07-10 22:35:25', '2024-08-06 11:42:18'),
(26, '5', 'H.P.G.L.P.Jayathilake', 0, 2100, 2100, '2024-07-10 22:35:25', '2024-08-06 11:42:18'),
(27, '6', 'N.W.V.B.S.B..Weragoda', 0, 900, 900, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(28, '7', 'W.M.V.Apsara', 0, 1500, 1500, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(29, '8', 'K.W.A.P.Karunasinghe', 0, 3000, 3000, '2024-07-10 22:35:25', '2024-08-06 11:42:18');

-- --------------------------------------------------------

--
-- Table structure for table `allmonthsalarysheets`
--

DROP TABLE IF EXISTS `allmonthsalarysheets`;
CREATE TABLE IF NOT EXISTS `allmonthsalarysheets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `monthCurrentDate` datetime DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `allBasicSalary` float DEFAULT NULL,
  `allBaValue` float DEFAULT NULL,
  `allTotalEarning` float DEFAULT NULL,
  `allMonthLoan` float DEFAULT NULL,
  `allEpf8` float DEFAULT NULL,
  `allTotalDeduction` float DEFAULT NULL,
  `allTotalAllowance` float DEFAULT NULL,
  `allTotalOT` float DEFAULT NULL,
  `allTotalAddition` float DEFAULT NULL,
  `allNetTotal` float DEFAULT NULL,
  `allEpf12` float DEFAULT NULL,
  `allEtf3` float DEFAULT NULL,
  `allTotaNetPay` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `allmonthsalarysheets`
--

INSERT INTO `allmonthsalarysheets` (`id`, `monthCurrentDate`, `userId`, `name`, `role`, `allBasicSalary`, `allBaValue`, `allTotalEarning`, `allMonthLoan`, `allEpf8`, `allTotalDeduction`, `allTotalAllowance`, `allTotalOT`, `allTotalAddition`, `allNetTotal`, `allEpf12`, `allEtf3`, `allTotaNetPay`, `createdAt`, `updatedAt`) VALUES
(224, '2024-07-26 19:59:18', '2', 'K.D.P.M Siriwardhana ', 'Sales Manager', 12000, 3000, 15000, 0, 960, 960, 2400, 0, 2400, 16440, 1440, 360, 14640, '2024-07-10 22:35:25', '2024-07-26 19:59:18'),
(225, '2024-07-26 19:59:15', '3', 'G.W.M.D.Rupasinghe', 'Inventory Manager', 9000, 3000, 12000, 0, 720, 720, 1800, 150, 1950, 13230, 1080, 270, 11880, '2024-07-10 22:35:25', '2024-07-26 19:59:15'),
(226, '2024-07-26 19:59:18', '4', 'T.I.Bandara', 'Admin', 4000, 3000, 7000, 0, 320, 320, 600, 2400, 3000, 9680, 480, 120, 9080, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(227, '2024-07-26 19:59:18', '5', 'H.P.G.L.P.Jayathilake', 'Finance Manager', 10500, 3000, 13500, 0, 840, 840, 2100, 1650, 3750, 16410, 1260, 315, 14835, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(228, '2024-07-26 19:59:18', '6', 'N.W.V.B.S.B..Weragoda', 'HR Manager', 4500, 3000, 7500, 0, 360, 360, 900, 0, 900, 8040, 540, 135, 7365, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(229, '2024-07-26 19:59:18', '7', 'W.M.V.Apsara', 'Employee ', 5000, 3000, 8000, 0, 400, 400, 1500, 0, 1500, 9100, 600, 150, 8350, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(230, '2024-07-26 19:59:18', '8', 'K.W.A.P.Karunasinghe', 'Employee ', 10000, 3000, 13000, 0, 800, 800, 3000, 300, 3300, 15500, 1200, 300, 14000, '2024-07-10 22:35:39', '2024-08-06 11:35:51'),
(231, '2024-08-31 12:14:28', '2', 'K.D.P.M Siriwardhana ', 'Sales Manager', 12000, 3000, 15000, 0, 960, 960, 2400, 0, 2400, 16440, 1440, 360, 14640, '2024-08-06 11:35:51', '2024-08-31 12:14:28'),
(232, '2024-08-31 12:14:28', '3', 'G.W.M.D.Rupasinghe', 'Inventory Manager', 9000, 3000, 12000, 0, 720, 720, 1800, 0, 1800, 13080, 1080, 270, 11730, '2024-08-06 11:35:51', '2024-09-01 14:05:27'),
(233, '2024-08-31 12:14:28', '4', 'T.I.Bandara', 'Admin', 4000, 3000, 7000, 0, 320, 320, 600, 0, 600, 7280, 480, 120, 6680, '2024-08-06 11:42:18', '2024-09-01 14:05:27'),
(234, '2024-08-31 12:14:28', '6', 'N.W.V.B.S.B..Weragoda', 'HR Manager', 4500, 3000, 7500, 0, 360, 360, 900, 0, 900, 8040, 540, 135, 7365, '2024-08-06 11:42:18', '2024-09-01 14:05:27'),
(235, '2024-08-31 12:14:28', '7', 'W.M.V.Apsara', 'Employee ', 5000, 3000, 8000, 0, 400, 400, 1500, 0, 1500, 9100, 600, 150, 8350, '2024-08-06 11:42:18', '2024-09-01 14:05:27'),
(236, '2024-08-31 12:14:28', '8', 'K.W.A.P.Karunasinghe', 'Employee ', 10000, 3000, 13000, 0, 800, 800, 3000, 0, 3000, 15200, 1200, 300, 13700, '2024-08-06 11:42:18', '2024-09-01 14:05:27'),
(237, '2024-08-31 12:14:28', '5', 'H.P.G.L.P.Jayathilake', 'Finance Manager', 10500, 3000, 13500, 0, 840, 840, 2100, 0, 2100, 14760, 1260, 315, 13185, '2024-08-06 11:42:18', '2024-09-01 14:05:27'),
(238, '2024-09-07 05:00:35', '2', 'K.D.P.M Siriwardhana ', 'Sales Manager', 12000, 3000, 15000, 0, 960, 960, 2400, 0, 2400, 16440, 1440, 360, 14640, '2024-09-01 14:05:27', '2024-09-07 05:01:14'),
(239, '2024-09-07 05:00:35', '5', 'H.P.G.L.P.Jayathilake', 'Finance Manager', 10500, 3000, 13500, 0, 840, 840, 2100, 0, 2100, 14760, 1260, 315, 13185, '2024-09-01 14:05:29', '2024-09-07 05:01:14'),
(240, '2024-09-07 05:00:35', '3', 'G.W.M.D.Rupasinghe', 'Inventory Manager', 9000, 3000, 12000, 0, 720, 720, 1800, 0, 1800, 13080, 1080, 270, 11730, '2024-09-01 14:05:29', '2024-09-07 05:01:14'),
(241, '2024-09-07 05:00:35', '4', 'T.I.Bandara', 'Admin', 4000, 3000, 7000, 0, 320, 320, 600, 0, 600, 7280, 480, 120, 6680, '2024-09-01 14:05:29', '2024-09-07 05:01:14'),
(242, '2024-09-07 05:00:35', '6', 'N.W.V.B.S.B..Weragoda', 'HR Manager', 4500, 3000, 7500, 0, 360, 360, 900, 0, 900, 8040, 540, 135, 7365, '2024-09-01 14:05:29', '2024-09-07 05:01:14'),
(243, '2024-09-07 05:00:35', '7', 'W.M.V.Apsara', 'Employee ', 5000, 3000, 8000, 0, 400, 400, 1500, 0, 1500, 9100, 600, 150, 8350, '2024-09-01 14:05:29', '2024-09-07 05:01:14'),
(244, '2024-09-07 05:00:35', '8', 'K.W.A.P.Karunasinghe', 'Employee ', 10000, 3000, 13000, 0, 800, 800, 3000, 0, 3000, 15200, 1200, 300, 13700, '2024-09-01 14:05:29', '2024-09-07 05:01:14');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

DROP TABLE IF EXISTS `attendances`;
CREATE TABLE IF NOT EXISTS `attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `dateIn` datetime DEFAULT NULL,
  `timeIn` time DEFAULT NULL,
  `timeOut` time DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `name`, `userId`, `role`, `dateIn`, `timeIn`, `timeOut`, `status`, `createdAt`, `updatedAt`) VALUES
(76, 'K.D.P.M Siriwardhana ', '2', 'Inventory Manager', '2024-07-11 21:58:54', '09:00:00', '05:00:00', 'Absent', '2024-07-10 20:57:36', '2024-09-05 19:28:08'),
(77, 'G.W.M.D.Rupasinghe', '3', 'Inventory Manager', '2024-07-11 21:58:54', '09:00:00', '18:00:02', 'Present', '2024-07-10 21:03:53', '2024-07-10 22:12:02'),
(78, 'H.P.G.L.P.Jayathilake', '5', 'Finance Manager', '2024-07-11 21:58:54', '04:00:03', '23:00:04', 'Present', '2024-07-10 21:09:43', '2024-07-10 22:12:04'),
(79, 'N.W.V.B.S.B..Weragoda', '6', 'HR Manager', '2024-07-11 21:58:54', '09:00:05', '05:00:05', 'Present', '2024-07-10 21:13:49', '2024-07-10 22:12:05'),
(80, 'T.I.Bandara', '4', 'Admin', '2024-07-11 21:58:54', '01:00:01', '01:00:03', 'Present', '2024-07-10 21:18:08', '2024-09-05 19:30:03'),
(81, 'W.M.V.Apsara', '7', 'Employee', '2024-07-11 21:58:54', '09:00:11', '05:00:11', 'Present', '2024-07-10 21:23:00', '2024-07-10 22:12:11'),
(82, 'K.W.A.P.Karunasinghe', '8', 'Employee', '2024-07-11 21:58:54', '09:00:15', '20:00:15', 'Present', '2024-07-10 21:27:06', '2024-07-10 22:12:15'),
(83, 'sdsadsad', '10', 'Finance Manager', '2024-09-05 19:29:14', NULL, NULL, 'Absent', '2024-09-05 19:29:14', '2024-09-05 19:29:14');

-- --------------------------------------------------------

--
-- Table structure for table `basicsalaries`
--

DROP TABLE IF EXISTS `basicsalaries`;
CREATE TABLE IF NOT EXISTS `basicsalaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `attenCount` int(11) DEFAULT NULL,
  `dateIncome` float DEFAULT NULL,
  `basicSalary` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `basicsalaries`
--

INSERT INTO `basicsalaries` (`id`, `userId`, `name`, `roleId`, `attenCount`, `dateIncome`, `basicSalary`, `createdAt`, `updatedAt`) VALUES
(27, 2, 'K.D.P.M Siriwardhana ', 3, 8, 1500, 12000, '2024-07-10 22:34:52', '2024-07-17 13:59:14'),
(28, 3, 'G.W.M.D.Rupasinghe', 5, 6, 1500, 9000, '2024-07-10 22:34:52', '2024-07-17 16:51:54'),
(29, 4, 'T.I.Bandara', 1, 2, 2000, 4000, '2024-07-10 22:34:52', '2024-07-17 13:45:32'),
(31, 5, 'H.P.G.L.P.Jayathilake', 2, 7, 1500, 10500, '2024-07-10 22:34:52', '2024-07-17 13:47:34'),
(33, 6, 'N.W.V.B.S.B..Weragoda', 4, 3, 1500, 4500, '2024-07-10 22:34:52', '2024-07-17 13:47:34'),
(35, 7, 'W.M.V.Apsara', 6, 5, 1000, 5000, '2024-07-10 22:34:52', '2024-07-17 13:47:34'),
(37, 8, 'K.W.A.P.Karunasinghe', 6, 10, 1000, 10000, '2024-07-10 22:34:52', '2024-07-17 16:51:54');

-- --------------------------------------------------------

--
-- Table structure for table `biodata`
--

DROP TABLE IF EXISTS `biodata`;
CREATE TABLE IF NOT EXISTS `biodata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `nameWini` varchar(255) DEFAULT NULL,
  `nameWFull` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `bankNumber` varchar(15) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `imgSrc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `biodata`
--

INSERT INTO `biodata` (`id`, `userId`, `nameWini`, `nameWFull`, `birthdate`, `age`, `roleId`, `gender`, `address`, `email`, `bankNumber`, `phoneNumber`, `imgSrc`, `createdAt`, `updatedAt`) VALUES
(7, 2, 'K.D.P.M Siriwardhana ', 'Prageeth Siriwardhana ', '2000-01-02 00:00:00', 24, 3, 'Male', '100/2 pituwara Rd Alpitiya', 'prageethsriwardhana@gmail.com', '200100788234546', '0752020420', 'prageethsiriwardhana001.jpg', '2024-07-10 20:57:36', '2024-07-10 20:57:36'),
(8, 3, 'G.W.M.D.Rupasinghe', 'Dhananjaya Rupasinghe', '2000-05-15 00:00:00', 24, 5, 'Male', '27/3, Kalaweldeniya Rd, Norton Bridge, Hatton', 'dhananjayarupasinghe@gmail.com', '087200345700571', '0773476512', 'DPhoto.png', '2024-07-10 21:03:53', '2024-07-10 21:03:53'),
(9, 5, 'H.P.G.L.P.Jayathilake', 'Lahiru Prasad Jayathilake', '2000-04-07 00:00:00', 24, 2, 'Male', 'Danthure South, Peradeniya', 'lahiruprasad@gmail.com', '084187200456337', '0763491001', 'lprofilep.png', '2024-07-10 21:09:43', '2024-07-10 21:09:43'),
(10, 6, 'N.W.V.B.S.B..Weragoda', 'Buddhi Sampath Weragoda', '1999-08-23 00:00:00', 25, 4, 'Male', '27/1, Baddegama South, Baddegama', 'buddhisampathweragoda@gmail.com', '087200478644745', '0772678395', 'bp01.jpg', '2024-07-10 21:13:49', '2024-07-10 21:13:49'),
(11, 4, 'T.I.Bandara', 'Thisara Bandara', '2000-09-24 00:00:00', 24, 1, 'Male', '20/4, Pilimathalawa, Kandy ', 'thisarabandara@gmail.com', '788234347850100', '0782001890', 'thisarap.jpg', '2024-07-10 21:18:08', '2024-07-10 21:18:08'),
(12, 7, 'W.M.V.Apsara', 'Vindya Apsara', '2001-05-26 00:00:00', 23, 6, 'Female', 'Pirivena Rd., Kakanadura', 'vindyaapsara@gmail.com', '327800086721339', '0774502480', 'p_img.jpg', '2024-07-10 21:23:00', '2024-07-10 21:23:00'),
(13, 8, 'K.W.A.P.Karunasinghe', 'Ashen Pathum Karunasinghe', '2000-12-14 00:00:00', 24, 6, 'Male', '12/7, Main street, Galle', 'pathumkarunasinghe@gmail.com', '087200378276400', '0772457890', 'karunasingheph.png', '2024-07-10 21:27:06', '2024-07-10 21:27:06'),
(15, 10, 'sdsadsad', 'adasadasd', '2024-09-09 00:00:00', 0, 2, 'Male', '27/1, Baddegama South, Baddegama', 'lahiruprasad@gmail.com', '788234347850100', '0774502480', 'prageethsiriwardhana001.jpg', '2024-09-05 19:29:14', '2024-09-05 19:29:14');

-- --------------------------------------------------------

--
-- Table structure for table `budgetedallowances`
--

DROP TABLE IF EXISTS `budgetedallowances`;
CREATE TABLE IF NOT EXISTS `budgetedallowances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baDate` datetime DEFAULT NULL,
  `baValue` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `budgetedallowances`
--

INSERT INTO `budgetedallowances` (`id`, `baDate`, `baValue`, `createdAt`, `updatedAt`) VALUES
(1, '2021-01-01 18:13:34', 1000, '2024-04-26 20:07:12', '2024-05-20 18:13:34'),
(2, '2023-01-01 16:42:49', 2000, '2024-04-26 20:07:48', '2024-05-20 16:42:49'),
(3, '2024-01-01 18:25:09', 2500, '2024-04-26 20:07:48', '2024-04-27 18:25:09'),
(4, '2024-04-21 06:26:32', 3000, '2024-07-13 06:26:32', '2024-07-13 06:26:32');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `numberOf` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customerId`, `name`, `address`, `phone`, `numberOf`, `createdAt`, `updatedAt`) VALUES
(21, 'Customer1', 'Dhananjaya Rupasinghe', 'Kandy', '0775431227', 4, '2024-07-11 07:33:45', '2024-07-11 07:33:45'),
(22, 'Customer2', 'Prageeth Madhushan', 'Elpitiya, Galle', '0762234507', 10, '2024-07-11 07:34:37', '2024-07-11 07:34:37'),
(23, 'Customer3', 'Lahiru Prasad', 'Kandy', '0723456744', 4, '2024-07-11 07:35:22', '2024-07-11 07:35:22'),
(24, 'Customer4', 'Buddhi Sampath', 'Galle', '0764533211', 6, '2024-07-11 07:36:03', '2024-07-11 07:36:03');

-- --------------------------------------------------------

--
-- Table structure for table `deductions`
--

DROP TABLE IF EXISTS `deductions`;
CREATE TABLE IF NOT EXISTS `deductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `monthLoan` float DEFAULT NULL,
  `epf8` float DEFAULT NULL,
  `totalDeduction` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deductions`
--

INSERT INTO `deductions` (`id`, `userId`, `name`, `monthLoan`, `epf8`, `totalDeduction`, `createdAt`, `updatedAt`) VALUES
(17, 2, 'K.D.P.M Siriwardhana ', 0, 960, 960, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(18, 3, 'G.W.M.D.Rupasinghe', 0, 720, 720, '2024-07-10 22:43:07', '2024-07-17 16:51:58'),
(19, 4, 'T.I.Bandara', 0, 320, 320, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(20, 5, 'H.P.G.L.P.Jayathilake', 0, 840, 840, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(21, 6, 'N.W.V.B.S.B..Weragoda', 0, 360, 360, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(22, 7, 'W.M.V.Apsara', 0, 400, 400, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(23, 8, 'K.W.A.P.Karunasinghe', 0, 800, 800, '2024-07-10 22:43:07', '2024-07-17 16:51:58'),
(24, 8, 'K.W.A.P.Karunasinghe', 0, 80, 80, '2024-07-10 22:43:07', '2024-07-10 22:43:07');

-- --------------------------------------------------------

--
-- Table structure for table `earnings`
--

DROP TABLE IF EXISTS `earnings`;
CREATE TABLE IF NOT EXISTS `earnings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `basicSalary` float DEFAULT NULL,
  `baValue` float DEFAULT NULL,
  `totalEarning` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `earnings`
--

INSERT INTO `earnings` (`id`, `userId`, `name`, `basicSalary`, `baValue`, `totalEarning`, `createdAt`, `updatedAt`) VALUES
(25, '2', 'K.D.P.M Siriwardhana ', 12000, 3000, 15000, '2024-07-10 22:35:24', '2024-07-17 16:50:58'),
(26, '3', 'G.W.M.D.Rupasinghe', 9000, 3000, 12000, '2024-07-10 22:35:25', '2024-07-17 16:51:56'),
(27, '4', 'T.I.Bandara', 4000, 3000, 7000, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(28, '5', 'H.P.G.L.P.Jayathilake', 10500, 3000, 13500, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(29, '6', 'N.W.V.B.S.B..Weragoda', 4500, 3000, 7500, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(30, '7', 'W.M.V.Apsara', 5000, 3000, 8000, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(31, '8', 'K.W.A.P.Karunasinghe', 10000, 3000, 13000, '2024-07-10 22:35:25', '2024-07-17 16:51:56');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE IF NOT EXISTS `enrollments` (
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `foodallowances`
--

DROP TABLE IF EXISTS `foodallowances`;
CREATE TABLE IF NOT EXISTS `foodallowances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allowanceDate` datetime DEFAULT NULL,
  `allowance` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foodallowances`
--

INSERT INTO `foodallowances` (`id`, `allowanceDate`, `allowance`, `createdAt`, `updatedAt`) VALUES
(1, '2023-01-01 00:00:00', 50, '2024-05-01 07:53:31', '2024-05-21 16:59:12'),
(2, '2024-01-01 13:24:30', 100, '2024-05-01 07:54:30', '2024-05-01 07:54:30'),
(14, '2024-05-21 00:00:00', 300, '2024-05-20 17:06:01', '2024-05-21 16:59:28');

-- --------------------------------------------------------

--
-- Table structure for table `machines`
--

DROP TABLE IF EXISTS `machines`;
CREATE TABLE IF NOT EXISTS `machines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `machineId` varchar(255) DEFAULT NULL,
  `inputp` float DEFAULT NULL,
  `outputp` float DEFAULT NULL,
  `dateIn` datetime DEFAULT NULL,
  `timeIn` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`id`, `machineId`, `inputp`, `outputp`, `dateIn`, `timeIn`, `createdAt`, `updatedAt`) VALUES
(12, 'Machine1', 200, 160, '2024-07-05 00:00:00', '14:02:00', '2024-07-11 07:37:01', '2024-07-11 07:37:16'),
(13, 'Machine2', 150, 144, '2024-07-06 00:00:00', '15:10:00', '2024-07-11 07:38:10', '2024-07-11 07:38:10'),
(14, 'Machine3', 170, 160, '2024-07-07 00:00:00', '14:12:00', '2024-07-11 07:39:04', '2024-07-11 07:39:04'),
(15, 'Machine4', 250, 190, '2024-07-07 00:00:00', '09:14:00', '2024-07-11 07:42:27', '2024-07-11 07:42:27'),
(16, 'Machine5', 160, 158, '2024-07-07 00:00:00', '10:20:00', '2024-07-11 07:43:13', '2024-07-11 07:43:13');

-- --------------------------------------------------------

--
-- Table structure for table `monthattempcounts`
--

DROP TABLE IF EXISTS `monthattempcounts`;
CREATE TABLE IF NOT EXISTS `monthattempcounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `currentDate` datetime DEFAULT NULL,
  `attempCount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthattempcounts`
--

INSERT INTO `monthattempcounts` (`id`, `userId`, `name`, `role`, `currentDate`, `attempCount`, `createdAt`, `updatedAt`) VALUES
(147, '2', 'K.D.P.M Siriwardhana ', 'Sales Manager', '2024-07-11 21:58:54', 8, '2024-07-15 18:20:52', '2024-07-17 13:14:22'),
(148, '3', 'G.W.M.D.Rupasinghe', 'Inventory Manager', '2024-07-11 21:58:54', 6, '2024-07-15 18:20:52', '2024-07-17 13:14:22'),
(149, '5', 'H.P.G.L.P.Jayathilake', 'Finance Manager', '2024-07-11 21:58:54', 7, '2024-07-17 13:13:30', '2024-07-17 13:14:22'),
(150, '6', 'N.W.V.B.S.B..Weragoda', 'HR Manager', '2024-07-11 21:58:54', 3, '2024-07-17 13:13:30', '2024-07-17 13:14:22'),
(151, '4', 'T.I.Bandara', 'Admin', '2024-07-11 21:58:54', 2, '2024-07-17 13:13:30', '2024-07-17 13:14:22'),
(152, '7', 'W.M.V.Apsara', 'Employee', '2024-07-11 21:58:54', 5, '2024-07-17 13:13:30', '2024-07-17 13:14:22'),
(153, '8', 'K.W.A.P.Karunasinghe', 'Employee', '2024-07-11 21:58:54', 10, '2024-07-17 13:13:30', '2024-07-17 13:14:22');

-- --------------------------------------------------------

--
-- Table structure for table `monthepfetfs`
--

DROP TABLE IF EXISTS `monthepfetfs`;
CREATE TABLE IF NOT EXISTS `monthepfetfs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `basicSalary` float DEFAULT NULL,
  `epf8` float DEFAULT NULL,
  `epf12` float DEFAULT NULL,
  `totalEpf8Epf12` float DEFAULT NULL,
  `etf3` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthepfetfs`
--

INSERT INTO `monthepfetfs` (`id`, `userId`, `name`, `basicSalary`, `epf8`, `epf12`, `totalEpf8Epf12`, `etf3`, `createdAt`, `updatedAt`) VALUES
(21, 2, 'K.D.P.M Siriwardhana ', 12000, 960, 1440, 2400, 360, '2024-07-10 22:34:52', '2024-07-17 16:50:58'),
(22, 3, 'G.W.M.D.Rupasinghe', 9000, 720, 1080, 1800, 270, '2024-07-10 22:35:25', '2024-07-17 16:51:56'),
(23, 4, 'T.I.Bandara', 4000, 320, 480, 800, 120, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(24, 5, 'H.P.G.L.P.Jayathilake', 10500, 840, 1260, 2100, 315, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(25, 6, 'N.W.V.B.S.B..Weragoda', 4500, 360, 540, 900, 135, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(26, 7, 'W.M.V.Apsara', 5000, 400, 600, 1000, 150, '2024-07-10 22:35:25', '2024-07-17 16:50:58'),
(27, 8, 'K.W.A.P.Karunasinghe', 10000, 800, 1200, 2000, 300, '2024-07-10 22:35:25', '2024-07-17 16:51:56');

-- --------------------------------------------------------

--
-- Table structure for table `monthfoodallowances`
--

DROP TABLE IF EXISTS `monthfoodallowances`;
CREATE TABLE IF NOT EXISTS `monthfoodallowances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `attenCount` int(11) DEFAULT NULL,
  `allowance` float DEFAULT NULL,
  `totalAllowance` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthfoodallowances`
--

INSERT INTO `monthfoodallowances` (`id`, `userId`, `name`, `attenCount`, `allowance`, `totalAllowance`, `createdAt`, `updatedAt`) VALUES
(20, '2', 'K.D.P.M Siriwardhana ', 8, 300, 2400, '2024-07-17 13:57:38', '2024-07-17 13:59:29'),
(21, '3', 'G.W.M.D.Rupasinghe', 6, 300, 1800, '2024-07-17 13:57:38', '2024-07-17 16:51:56'),
(22, '4', 'T.I.Bandara', 2, 300, 600, '2024-07-17 13:57:38', '2024-07-17 13:57:38'),
(23, '5', 'H.P.G.L.P.Jayathilake', 7, 300, 2100, '2024-07-17 13:57:38', '2024-07-17 13:57:38'),
(24, '6', 'N.W.V.B.S.B..Weragoda', 3, 300, 900, '2024-07-17 13:57:38', '2024-07-17 13:57:38'),
(25, '7', 'W.M.V.Apsara', 5, 300, 1500, '2024-07-17 13:57:38', '2024-07-17 13:57:38'),
(26, '8', 'K.W.A.P.Karunasinghe', 10, 300, 3000, '2024-07-17 13:57:38', '2024-07-17 16:51:56');

-- --------------------------------------------------------

--
-- Table structure for table `monthots`
--

DROP TABLE IF EXISTS `monthots`;
CREATE TABLE IF NOT EXISTS `monthots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `extraTimeCount` int(11) DEFAULT NULL,
  `tIncome` float DEFAULT NULL,
  `totalOT` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthots`
--

INSERT INTO `monthots` (`id`, `userId`, `name`, `roleId`, `extraTimeCount`, `tIncome`, `totalOT`, `createdAt`, `updatedAt`) VALUES
(63, '2', 'K.D.P.M Siriwardhana ', 3, 0, 150, 0, '2024-07-10 22:34:52', '2024-07-10 22:34:52'),
(64, '3', 'G.W.M.D.Rupasinghe', 5, 0, 150, 0, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(65, '4', 'T.I.Bandara', 1, 0, 200, 0, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(66, '5', 'H.P.G.L.P.Jayathilake', 2, 0, 150, 0, '2024-07-10 22:35:25', '2024-08-06 11:35:51'),
(67, '6', 'N.W.V.B.S.B..Weragoda', 4, 0, 150, 0, '2024-07-10 22:35:25', '2024-07-10 22:35:25'),
(68, '7', 'W.M.V.Apsara', 6, 0, 100, 0, '2024-07-10 22:35:25', '2024-07-10 22:35:25'),
(69, '8', 'K.W.A.P.Karunasinghe', 6, 0, 100, 0, '2024-07-10 22:35:25', '2024-08-06 11:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `monthsalarysheets`
--

DROP TABLE IF EXISTS `monthsalarysheets`;
CREATE TABLE IF NOT EXISTS `monthsalarysheets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currentDate` datetime DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `basicSalary` float DEFAULT NULL,
  `baValue` float DEFAULT NULL,
  `totalEarning` float DEFAULT NULL,
  `monthLoan` float DEFAULT NULL,
  `epf8` float DEFAULT NULL,
  `totalDeduction` float DEFAULT NULL,
  `totalAllowance` float DEFAULT NULL,
  `totalOT` float DEFAULT NULL,
  `totalAddition` float DEFAULT NULL,
  `netTotal` float DEFAULT NULL,
  `epf12` float DEFAULT NULL,
  `etf3` float DEFAULT NULL,
  `totaNetPay` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthsalarysheets`
--

INSERT INTO `monthsalarysheets` (`id`, `currentDate`, `userId`, `name`, `role`, `basicSalary`, `baValue`, `totalEarning`, `monthLoan`, `epf8`, `totalDeduction`, `totalAllowance`, `totalOT`, `totalAddition`, `netTotal`, `epf12`, `etf3`, `totaNetPay`, `createdAt`, `updatedAt`) VALUES
(166, '2024-09-07 05:00:35', '2', 'K.D.P.M Siriwardhana ', 'Sales Manager', 12000, 3000, 15000, 0, 960, 960, 2400, 0, 2400, 16440, 1440, 360, 14640, '2024-07-10 22:34:52', '2024-09-07 05:00:35'),
(167, '2024-09-07 05:00:35', '3', 'G.W.M.D.Rupasinghe', 'Inventory Manager', 9000, 3000, 12000, 0, 720, 720, 1800, 0, 1800, 13080, 1080, 270, 11730, '2024-07-10 22:34:52', '2024-09-07 05:00:35'),
(168, '2024-09-07 05:00:35', '4', 'T.I.Bandara', 'Admin', 4000, 3000, 7000, 0, 320, 320, 600, 0, 600, 7280, 480, 120, 6680, '2024-07-10 22:34:52', '2024-09-07 05:00:35'),
(169, '2024-09-07 05:00:35', '5', 'H.P.G.L.P.Jayathilake', 'Finance Manager', 10500, 3000, 13500, 0, 840, 840, 2100, 0, 2100, 14760, 1260, 315, 13185, '2024-07-10 22:35:25', '2024-09-07 05:00:35'),
(170, '2024-09-07 05:00:35', '6', 'N.W.V.B.S.B..Weragoda', 'HR Manager', 4500, 3000, 7500, 0, 360, 360, 900, 0, 900, 8040, 540, 135, 7365, '2024-07-10 22:35:25', '2024-09-07 05:00:35'),
(171, '2024-09-07 05:00:35', '7', 'W.M.V.Apsara', 'Employee ', 5000, 3000, 8000, 0, 400, 400, 1500, 0, 1500, 9100, 600, 150, 8350, '2024-07-10 22:35:25', '2024-09-07 05:00:35'),
(172, '2024-09-07 05:00:35', '8', 'K.W.A.P.Karunasinghe', 'Employee ', 10000, 3000, 13000, 0, 800, 800, 3000, 0, 3000, 15200, 1200, 300, 13700, '2024-07-10 22:35:25', '2024-09-07 05:00:35');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(255) DEFAULT NULL,
  `customerId` varchar(255) DEFAULT NULL,
  `productId` varchar(255) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `unitPrice` float DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `customerId`, `productId`, `orderDate`, `quantity`, `unitPrice`, `status`, `createdAt`, `updatedAt`) VALUES
(25, 'Order1', 'Customer2', 'Product2', '2024-07-04 00:00:00', 100, 300, 'Delivered', '2024-07-11 07:27:40', '2024-07-11 07:27:40'),
(26, 'Order2', 'Customer3', 'Product1', '2024-07-04 00:00:00', 50, 400, 'Delivered', '2024-07-11 07:28:47', '2024-07-11 07:28:47'),
(27, 'Order3', 'Customer1', 'Product2', '2024-07-04 00:00:00', 60, 300, 'Delivered', '2024-07-11 07:29:41', '2024-07-11 07:29:41'),
(28, 'Order4', 'Customer2', 'Product3', '2024-07-05 00:00:00', 150, 300, 'Delivered', '2024-07-11 07:30:37', '2024-07-11 07:30:37'),
(29, 'Order5', 'Customer4', 'Product3', '2024-07-05 00:00:00', 50, 300, 'Delivered', '2024-07-11 07:32:12', '2024-07-11 07:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` varchar(255) DEFAULT NULL,
  `p_name` varchar(255) DEFAULT NULL,
  `available` float DEFAULT NULL,
  `unitPrice` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productId`, `p_name`, `available`, `unitPrice`, `createdAt`, `updatedAt`) VALUES
(14, 'Product1', 'Pre Opened Poly Bags On a Roll', 200, 400, '2024-07-11 07:46:56', '2024-07-11 07:46:56'),
(15, 'Product2', 'Poly Bag', 300, 300, '2024-07-11 07:47:25', '2024-07-11 07:47:25'),
(16, 'Product3', 'MTG Card Sleeves', 250, 300, '2024-07-11 07:48:31', '2024-07-11 07:48:31'),
(17, 'Product4', 'Auto Bag', 400, 200, '2024-07-11 07:49:24', '2024-07-11 07:49:24');

-- --------------------------------------------------------

--
-- Table structure for table `rawmaterials`
--

DROP TABLE IF EXISTS `rawmaterials`;
CREATE TABLE IF NOT EXISTS `rawmaterials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `materialid` varchar(255) DEFAULT NULL,
  `materialname` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rawmaterials`
--

INSERT INTO `rawmaterials` (`id`, `materialid`, `materialname`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(3, 'R01', 'Ethylene (C2H4)', 100, 20, '2024-07-10 17:29:38', '2024-07-10 17:29:38'),
(4, 'R02', 'Ziegler-Natta Catalysts', 1000, 15, '2024-07-10 17:29:38', '2024-07-10 17:29:38'),
(5, 'R03', 'Phillips Catalysts', 1500, 10, '2024-07-10 17:33:15', '2024-07-10 17:33:15'),
(6, 'R04', 'Hexane (solvent)', 900, 20, '2024-07-10 17:33:15', '2024-07-10 17:33:15');

-- --------------------------------------------------------

--
-- Table structure for table `roleincomes`
--

DROP TABLE IF EXISTS `roleincomes`;
CREATE TABLE IF NOT EXISTS `roleincomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `dateIncome` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roleincomes`
--

INSERT INTO `roleincomes` (`id`, `role`, `dateIncome`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 2000, '2024-04-26 19:05:01', '2024-04-27 18:13:33'),
(2, 'Finance Manager', 1500, '2024-04-26 19:05:01', '2024-05-18 20:03:57'),
(3, 'Sales Manager', 1500, '2024-04-26 19:05:36', '2024-04-26 19:05:36'),
(4, 'HR Manager', 1500, '2024-04-26 19:05:36', '2024-04-26 19:05:36'),
(5, 'Inventory Manager', 1500, '2024-04-26 19:06:31', '2024-05-18 22:23:39'),
(6, 'Employee', 1000, '2024-04-26 19:09:02', '2024-04-26 19:09:02');

-- --------------------------------------------------------

--
-- Table structure for table `roleotincomes`
--

DROP TABLE IF EXISTS `roleotincomes`;
CREATE TABLE IF NOT EXISTS `roleotincomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `timeIncome` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roleotincomes`
--

INSERT INTO `roleotincomes` (`id`, `role`, `timeIncome`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 200, '2024-05-01 07:56:46', '2024-05-19 20:24:32'),
(2, 'Finance Manager', 150, '2024-05-01 07:56:46', '2024-05-01 07:56:46'),
(3, 'Sales Manager', 150, '2024-05-01 07:56:46', '2024-05-01 07:56:46'),
(4, 'HR Manager', 150, '2024-05-01 07:56:46', '2024-05-01 07:56:46'),
(5, 'Inventory Manager', 150, '2024-05-01 07:56:46', '2024-05-01 07:56:46'),
(6, 'Employee', 100, '2024-05-01 07:58:14', '2024-05-01 07:58:14');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleName`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2024-04-28 15:57:29', '2024-04-28 15:57:29'),
(2, 'Finance Manager', '2024-04-28 15:57:29', '2024-04-28 15:57:29'),
(3, 'Sales Manager', '2024-04-28 15:58:12', '2024-04-28 15:58:12'),
(4, 'HR Manager', '2024-04-28 15:58:38', '2024-04-28 15:58:38'),
(5, 'Inventory Manager', '2024-04-28 16:00:36', '2024-04-28 16:00:36'),
(6, 'Employee ', '2024-04-28 16:01:01', '2024-04-28 16:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240329093216-create-user.js'),
('20240411193900-create-enrollment.js'),
('20240412200227-create-attendance.js'),
('20240413131501-create-role-income.js'),
('20240413173923-create-basic-salary.js'),
('20240414145006-create-budgeted-allowance.js'),
('20240414182645-create-earning.js'),
('20240415202637-create-user-total-loan.js'),
('20240415231703-create-user-monrh-loan.js'),
('20240417161812-create-deduction.js'),
('20240417185036-create-month-epf-etf.js'),
('20240417195648-create-food-allowance.js'),
('20240417202438-create-month-food-allowance.js'),
('20240417204111-create-role-ot-income.js'),
('20240417214718-create-month-ot.js'),
('20240418152134-create-addition.js'),
('20240418170004-create-user-net-pay.js'),
('20240419132755-create-month-salary-sheet.js'),
('20240419195122-create-sub-total-month-salary-sheet.js'),
('20240424122503-create-all-month-salary-sheet.js'),
('20240427171642-create-role.js'),
('20240427171643-create-bio-data.js'),
('20240429151558-create-users.js'),
('20240501102246-create-bio-data.js'),
('20240501105559-create-role.js'),
('20240501122321-create-product.js'),
('20240503164616-create-order.js'),
('20240503164637-create-customer.js'),
('20240503164719-create-product.js'),
('20240506170208-create-machine.js'),
('20240522024922-create-rawmaterial.js'),
('20240524183724-create-attendance.js'),
('20240713073732-create-month-attemp-count.js'),
('20240713083349-create-attendance.js'),
('20240713090841-create-attendance.js'),
('20240713173131-create-month-attemp-count.js');

-- --------------------------------------------------------

--
-- Table structure for table `subtotalmonthsalarysheets`
--

DROP TABLE IF EXISTS `subtotalmonthsalarysheets`;
CREATE TABLE IF NOT EXISTS `subtotalmonthsalarysheets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currentDate` datetime DEFAULT NULL,
  `totalbasicSalary` float DEFAULT NULL,
  `totalbaValue` float DEFAULT NULL,
  `fulltotalEarning` float DEFAULT NULL,
  `totalmonthLoan` float DEFAULT NULL,
  `totalepf8` float DEFAULT NULL,
  `fulltotalDeduction` float DEFAULT NULL,
  `fulltotalAllowance` float DEFAULT NULL,
  `fulltotalOT` float DEFAULT NULL,
  `fulltotalAddition` float DEFAULT NULL,
  `fullnetTotal` float DEFAULT NULL,
  `totalepf12` float DEFAULT NULL,
  `totaletf3` float DEFAULT NULL,
  `fulltotalNetPay` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subtotalmonthsalarysheets`
--

INSERT INTO `subtotalmonthsalarysheets` (`id`, `currentDate`, `totalbasicSalary`, `totalbaValue`, `fulltotalEarning`, `totalmonthLoan`, `totalepf8`, `fulltotalDeduction`, `fulltotalAllowance`, `fulltotalOT`, `fulltotalAddition`, `fullnetTotal`, `totalepf12`, `totaletf3`, `fulltotalNetPay`, `createdAt`, `updatedAt`) VALUES
(31, '2024-04-06 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 0, 0, 0, 12860, 960, 240, 11660, '2024-04-07 03:07:16', '2024-04-07 03:08:18'),
(32, '2024-04-30 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 0, 0, 0, 12860, 960, 240, 11660, '2024-05-01 04:44:29', '2024-05-01 04:44:29'),
(33, '2024-04-28 18:30:00', 9000, 12500, 21500, 10000, 720, 10720, 600, 1000, 1600, 12380, 1080, 270, 11030, '2024-04-29 08:10:49', '2024-04-28 20:44:35'),
(34, '2024-04-29 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-04-30 07:15:32', '2024-04-30 07:15:32'),
(35, '2024-04-26 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-04-27 17:21:30', '2024-04-27 18:26:38'),
(36, '2024-04-27 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-04-27 18:47:58', '2024-04-27 18:47:58'),
(37, '2024-05-02 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-05-03 15:01:16', '2024-05-03 15:01:16'),
(38, '2024-04-25 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-04-26 15:57:19', '2024-04-26 15:57:19'),
(39, '2024-05-05 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-05-06 04:32:49', '2024-05-06 04:32:49'),
(40, '2024-05-06 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-05-06 19:02:27', '2024-05-06 19:02:27'),
(41, '2024-05-07 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-05-07 18:36:13', '2024-05-07 18:36:13'),
(42, '2024-05-13 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 14360, 960, 240, 13160, '2024-05-14 12:52:32', '2024-05-14 12:52:32'),
(43, '2024-05-14 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 6360, 960, 240, 5160, '2024-05-14 19:40:51', '2024-05-15 06:28:20'),
(44, '2024-05-15 18:30:00', 8000, 7500, 15500, 10000, 640, 10640, 500, 1000, 1500, 6360, 960, 240, 5160, '2024-05-15 19:00:49', '2024-05-15 19:00:49'),
(45, '2024-05-16 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-05-16 20:23:57', '2024-05-17 08:43:03'),
(46, '2024-04-17 18:30:00', 9000, 12500, 14500, 0, 160, 160, 100, 200, 300, 14640, 240, 60, 14340, '2024-04-17 21:31:35', '2024-04-17 21:31:35'),
(47, '2024-05-17 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-05-17 18:30:53', '2024-05-17 18:30:53'),
(48, '2024-05-18 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-05-18 18:36:25', '2024-05-18 18:36:25'),
(49, '2024-05-19 18:30:00', 0, 2820, 2820, 0, 0, 0, 0, 0, 0, 2820, 0, 0, 2820, '2024-05-19 19:14:29', '2024-05-20 18:29:52'),
(50, '2024-05-20 18:30:00', 0, 15000, 15000, 10000, 0, 10000, 0, 0, 0, 5000, 0, 0, 5000, '2024-05-20 18:33:04', '2024-05-21 12:52:57'),
(51, '2024-05-21 18:30:00', 0, 12500, 12500, 10000, 0, 10000, 0, 0, 0, 2500, 0, 0, 2500, '2024-05-21 18:49:57', '2024-05-22 13:27:25'),
(52, '2024-05-22 18:30:00', 0, 12500, 12500, 10000, 0, 10000, 0, 0, 0, 2500, 0, 0, 2500, '2024-05-22 19:54:21', '2024-05-22 19:54:21'),
(53, '2024-06-05 18:30:00', 0, 12500, 12500, 10000, 0, 10000, 0, 0, 0, 2500, 0, 0, 2500, '2024-06-06 14:01:53', '2024-06-06 14:01:53'),
(54, '2024-06-10 18:30:00', 139000, 13000, 153000, 5000, 11200, 10000, 6000, 200, 10000, 156000, 16800, 8200, 171300, '2024-06-11 03:27:52', '2024-06-11 07:12:31'),
(55, '2024-04-10 18:30:00', 90000, 9000, 99000, 5000, 7200, 5000, 6000, 200, 5000, 104000, 10800, 4700, 113300, '2024-04-11 04:55:41', '2024-04-11 07:07:16'),
(56, '2024-06-13 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-06-14 13:26:13', '2024-06-14 13:26:13'),
(57, '2024-06-19 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-06-20 14:37:40', '2024-06-20 14:37:40'),
(58, '2024-06-22 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-06-23 06:33:26', '2024-06-23 06:33:26'),
(59, '2024-07-07 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-07-08 08:38:58', '2024-07-08 08:38:58'),
(60, '2024-07-08 18:30:00', 0, 12500, 12500, 0, 0, 0, 0, 0, 0, 12500, 0, 0, 12500, '2024-07-09 06:17:30', '2024-07-09 06:17:30'),
(61, '2024-07-10 18:30:00', 10000, 17500, 27500, 0, 800, 800, 2100, 3950, 6050, 32750, 1200, 300, 31250, '2024-07-10 19:24:36', '2024-07-11 12:52:02'),
(62, '2024-07-12 18:30:00', 10000, 21000, 31000, 0, 800, 800, 2100, 4500, 6600, 36800, 1200, 300, 35300, '2024-07-13 14:48:52', '2024-07-13 14:49:00'),
(63, '2024-07-16 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-17 16:50:58', '2024-07-17 16:52:13'),
(64, '2024-07-17 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-18 08:27:05', '2024-07-18 08:27:05'),
(65, '2024-07-18 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-18 18:43:52', '2024-07-18 18:43:52'),
(66, '2024-07-19 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-20 07:03:12', '2024-07-20 07:03:12'),
(67, '2024-07-20 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-21 07:56:02', '2024-07-21 07:56:02'),
(68, '2024-07-21 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-22 14:53:45', '2024-07-22 14:53:45'),
(69, '2024-07-22 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-23 09:01:06', '2024-07-23 09:01:06'),
(70, '2024-07-24 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-24 21:30:15', '2024-07-24 21:30:15'),
(71, '2024-07-26 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 4500, 16800, 88400, 6600, 1650, 80150, '2024-07-26 19:28:34', '2024-07-26 19:28:34'),
(72, '2024-08-05 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-08-06 11:35:51', '2024-08-06 11:42:23'),
(73, '2024-08-28 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-08-29 17:17:03', '2024-08-29 17:17:03'),
(74, '2024-08-29 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-08-29 18:31:03', '2024-08-29 18:31:03'),
(75, '2024-08-30 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-08-31 07:31:13', '2024-08-31 07:31:13'),
(76, '2024-08-31 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-09-01 14:05:27', '2024-09-01 14:05:27'),
(77, '2024-09-04 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-09-05 18:26:12', '2024-09-05 18:26:12'),
(78, '2024-09-05 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-09-05 19:25:56', '2024-09-05 19:25:56'),
(79, '2024-09-06 18:30:00', 55000, 21000, 76000, 0, 4400, 4400, 12300, 0, 12300, 83900, 6600, 1650, 75650, '2024-09-07 05:01:01', '2024-09-07 05:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `usermonrhloans`
--

DROP TABLE IF EXISTS `usermonrhloans`;
CREATE TABLE IF NOT EXISTS `usermonrhloans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `currentDate` datetime DEFAULT NULL,
  `monthLoan` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usermonrhloans`
--

INSERT INTO `usermonrhloans` (`id`, `userId`, `name`, `currentDate`, `monthLoan`, `createdAt`, `updatedAt`) VALUES
(384, 2, 'K.D.P.M Siriwardhana ', '2024-06-30 18:30:00', 0, '2024-07-10 22:43:01', '2024-07-10 22:43:01'),
(385, 3, 'G.W.M.D.Rupasinghe', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(386, 5, 'H.P.G.L.P.Jayathilake', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(387, 6, 'N.W.V.B.S.B..Weragoda', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(388, 4, 'T.I.Bandara', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(389, 7, 'W.M.V.Apsara', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(390, 8, 'K.W.A.P.Karunasinghe', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40'),
(391, 10, 'sdsadsad', NULL, 0, '2024-09-07 04:58:40', '2024-09-07 04:58:40');

-- --------------------------------------------------------

--
-- Table structure for table `usernetpays`
--

DROP TABLE IF EXISTS `usernetpays`;
CREATE TABLE IF NOT EXISTS `usernetpays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `netTotal` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usernetpays`
--

INSERT INTO `usernetpays` (`id`, `userId`, `name`, `netTotal`, `createdAt`, `updatedAt`) VALUES
(10, '2', 'K.D.P.M Siriwardhana ', 16440, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(11, '3', 'G.W.M.D.Rupasinghe', 13080, '2024-07-10 22:43:07', '2024-08-06 11:42:18'),
(12, '4', 'T.I.Bandara', 7280, '2024-07-10 22:43:07', '2024-08-06 11:42:18'),
(13, '5', 'H.P.G.L.P.Jayathilake', 14760, '2024-07-10 22:43:07', '2024-08-06 11:42:18'),
(14, '6', 'N.W.V.B.S.B..Weragoda', 8040, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(15, '7', 'W.M.V.Apsara', 9100, '2024-07-10 22:43:07', '2024-07-17 16:51:01'),
(16, '8', 'K.W.A.P.Karunasinghe', 15200, '2024-07-10 22:43:07', '2024-08-06 11:42:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(2, NULL, 'Prageeth', 'sales001', '$2a$10$LE868kbDBZEt8BAepzvrgekbW4CtVdFGgqJz.vLZPokPdF3QxjDVK', 'sales_manager', '2024-04-26 21:15:26', '2024-04-26 21:15:26'),
(3, NULL, 'dhananjaya', 'inventory001', '$2a$10$8yYID9nEhKS3MAHdiwwibewhAsKQMGrr.8aRuWda3nJBPg2hkXFmu', 'inventory_manager', '2024-04-26 22:24:06', '2024-04-26 22:24:06'),
(4, NULL, 'dhananjaya', 'admin001', '$2a$10$B9RVdp69OASEYmetlBsu4eXeEiZwKkjy42he2aUg/MgQvU1v5Ipda', 'admin', '2024-04-26 22:41:55', '2024-04-26 22:41:55'),
(5, NULL, 'lahiru', 'finance001', '$2a$10$r6jFnmqx5tl0l49yIPTi8OYGe6H3k11m/ZY1hlWO8.5lZYvodQCXK', 'finance_manager', '2024-04-28 07:58:46', '2024-04-28 07:58:46'),
(6, NULL, 'buddhi', 'hr001', '$2a$10$/mG5nv.EVHBdhN2ZczPybOJsaAeQWIBJHas5HexOGqPzNnN7C3h22', 'hr_manager', '2024-04-28 07:59:58', '2024-04-28 07:59:58');

-- --------------------------------------------------------

--
-- Table structure for table `usertotalloans`
--

DROP TABLE IF EXISTS `usertotalloans`;
CREATE TABLE IF NOT EXISTS `usertotalloans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `loanDate` datetime DEFAULT NULL,
  `loanAmount` float DEFAULT NULL,
  `toBePaid` float DEFAULT NULL,
  `loanRatePresentage` float DEFAULT NULL,
  `loanDuration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertotalloans`
--

INSERT INTO `usertotalloans` (`id`, `userId`, `name`, `loanDate`, `loanAmount`, `toBePaid`, `loanRatePresentage`, `loanDuration`, `createdAt`, `updatedAt`) VALUES
(15, 2, 'K.D.P.M Siriwardhana ', '2024-06-30 18:30:00', 0, 0, 5, '10', '2024-07-10 22:42:59', '2024-07-10 22:42:59'),
(16, 3, 'G.W.M.D.Rupasinghe', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(17, 5, 'H.P.G.L.P.Jayathilake', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(18, 6, 'N.W.V.B.S.B..Weragoda', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(19, 4, 'T.I.Bandara', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(20, 7, 'W.M.V.Apsara', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(21, 8, 'K.W.A.P.Karunasinghe', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29'),
(22, 10, 'sdsadsad', NULL, 0, 0, 0, NULL, '2024-09-07 04:58:29', '2024-09-07 04:58:29');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
