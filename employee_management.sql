-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2023 at 11:56 AM
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
-- Database: `employee_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `alogin`
--

CREATE TABLE `alogin` (
  `id` int(11) NOT NULL,
  `email` tinytext NOT NULL,
  `password` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `alogin`
--

INSERT INTO `alogin` (`id`, `email`, `password`) VALUES
(1, 'admin01@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `nid` int(20) NOT NULL,
  `Jdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `dept` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `pic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `firstName`, `lastName`, `email`, `password`, `birthday`, `gender`, `contact`, `nid`, `Jdate`, `address`, `dept`, `degree`, `pic`) VALUES
(101, 'Mehadi', 'Hassan', 'mehadi@xyz.com', '1234', '1997-08-13', 'Male', '0191901919', 12121, '2021-08-20', 'Razarbagh', 'Revenue', 'MCA', 'images/image1.jpeg'),
(102, 'Bhavya', 'Gandhi', 'rajivgandhi@gmail.com', '1234', '1995-01-01', 'Male', '0202002020', 303, '2020-09-07', 'Bhavnagar', 'Construction ', 'Civil Engineer', 'images/image2.jpeg'),
(103, 'Raj', 'Patel', 'rajpatel@xyz.com', '1234', '1990-02-02', 'Male', '5252525252', 6262, '2017-08-30', 'himmatnagar', 'Health', 'MBBs', 'images/image3.jpeg'),
(104, 'Guthrie', 'Govan', 'guthrie@xyz.com', '1234', '1971-12-01', 'Male', '9595959595', 5959, '2000-09-04', 'Bharuch', 'Education', 'Phd', 'images/image4.jpeg'),
(105, 'Mehul', 'Vasava', 'mehul@gmail.com', '1234', '1971-06-28', 'Male', '8585858585', 5858, '2001-08-22', 'Ankleshwar', 'Agriculture', 'BSc Agri.', 'images/image5.jpeg'),
(106, 'Jay', 'Patel', 'jaypatel@xyz.com', '1234', '1990-02-02', 'Male', '7575757575', 5757, '2018-09-06', 'Valsad', 'SocialWelfare', 'MA', 'images/image6.jpeg'),
(107, ' Mansi', 'Prajapati', 'mansi@xyz.com', '1234', '1993-03-03', 'Female', '4545454545', 5454, '2019-08-22', 'Surat', 'FamilyWelfare ', 'MA', 'images/image7.jpeg'),
(108, 'Sneh', 'Prajapati', 'sneh@xyz.com', '1234', '1976-04-16', 'Male', '7587587587', 857857, '2004-08-02', 'Modasa', 'Animal Husbandry', 'Veterinary', 'images/image9.jpeg'),
(109, 'Sahid', 'Mukdiwala', 'sahid@xyz.com', '1234', '1985-01-01', 'Male', '8528528528', 258258, '2018-01-18', 'Himmatnagar', 'Panchayat', 'B.Tech', 'images/image10.jpeg'),
(110, 'Matin', 'Imam', 'matin@xyz.com', '1234', '1985-09-18', 'Male', '1471471471', 741741, '2014-01-10', 'Ahmedabad', 'Accounting', 'MCom', 'images/image11.jpeg'),
(111, 'Krupa', 'Suthar', 'krupa@xyz.com', '1234', '1998-02-01', 'Female', '0187282651', 112233, '2022-01-20', 'Gandhinagar', 'Establishment', 'BSc.', 'images/image8.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `employee_leave`
--

CREATE TABLE `employee_leave` (
  `id` int(11) DEFAULT NULL,
  `token` int(11) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `reason` char(100) DEFAULT NULL,
  `leave` char(25) DEFAULT NULL,
  `CutSalary` int(7) DEFAULT NULL,
  `status` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `employee_leave`
--

INSERT INTO `employee_leave` (`id`, `token`, `start`, `end`, `reason`, `leave`, `CutSalary`, `status`) VALUES
(101, 301, '2022-04-07', '2022-04-08', 'Sick Leave', 'Medical', 0, 'Approved'),
(102, 305, '2022-04-07', '2022-04-08', 'Urgent Family Cause', 'Half Pay', 0, 'Approved'),
(103, 306, '2022-04-08', '2022-04-08', 'Concert Tour', 'Casual Full', 0, 'Approved'),
(101, 307, '2022-04-14', '2022-04-17', 'Want to see movie', 'LWP', 1879, 'Cancelled'),
(105, 308, '2022-04-26', '2022-04-30', 'Trip to Mountabu', 'Casual Full', 0, 'Pending'),
(111, 309, '2022-04-09', '2022-04-13', 'Visit to Kings Landing', 'Vacation', 0, 'Pending'),
(104, 310, '2022-04-08', '2022-04-09', 'Emergency Leave', 'Casual Full', 0, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `num` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `ysalary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`num`, `year`, `ysalary`) VALUES
(1, 2021, 192000),
(2, 2022, 233292),
(3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `monthlysalary`
--

CREATE TABLE `monthlysalary` (
  `No.` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `Month` text NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monthlysalary`
--

INSERT INTO `monthlysalary` (`No.`, `id`, `Month`, `salary`) VALUES
(1, 101, 'January', 19441),
(2, 101, 'February', 19441),
(3, 101, 'March', 19441),
(4, 101, 'April', 19441),
(7, 0, 'may', 20000);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `pid` int(11) NOT NULL,
  `eid` int(11) DEFAULT NULL,
  `pname` varchar(100) DEFAULT NULL,
  `duedate` date DEFAULT NULL,
  `subdate` date DEFAULT NULL,
  `mark` int(11) NOT NULL DEFAULT 0,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`pid`, `eid`, `pname`, `duedate`, `subdate`, `mark`, `status`) VALUES
(213, 101, 'Budget', '2022-04-07', '2022-04-04', 8, 'Submitted'),
(214, 102, 'Bridge Construction', '2022-04-10', '2022-04-10', 6, 'Due'),
(215, 105, 'Watershed Management', '2022-04-19', '2022-04-06', 10, 'Submitted'),
(216, 106, 'Housing Empowerment', '2022-05-04', '2022-04-05', 5, 'Submitted'),
(217, 111, 'Community Facility', '2022-04-02', '2022-04-01', 8, 'Submitted'),
(218, 105, 'Solar & Irrigation', '2022-04-03', '2023-01-31', 10, 'Submitted'),
(219, 101, 'Income Tax Raid', '2022-04-07', '2022-04-08', 6, 'Due'),
(220, 110, 'Financial Management', '2022-04-16', '2022-04-04', 8, 'Submitted'),
(221, 110, 'Banking', '2022-04-16', '2022-04-04', 7, 'Submitted'),
(222, 103, 'Blood Donation', '2022-04-19', '2022-04-04', 6, 'Submitted'),
(223, 108, 'Animal Treatment', '2022-04-09', '2022-04-02', 5, 'Submitted'),
(224, 107, 'Child Malnutrition', '2022-04-26', '2022-04-05', 9, 'Submitted'),
(225, 109, 'Rural Development', '2022-04-03', '2022-04-04', 6, 'Submitted');

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `eid` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`eid`, `points`) VALUES
(101, 14),
(102, 6),
(103, 6),
(104, 0),
(105, 20),
(106, 5),
(107, 9),
(108, 5),
(109, 6),
(110, 15),
(111, 8);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `base` int(11) NOT NULL,
  `DA` int(11) NOT NULL,
  `HRA` int(11) NOT NULL,
  `Medical` int(11) NOT NULL,
  `Vehicle` int(11) NOT NULL,
  `bonus` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `ProfessionalTax` int(11) NOT NULL,
  `GroupInsurance` int(11) NOT NULL,
  `IncomeTax` int(11) NOT NULL,
  `ProvidentFund` int(11) NOT NULL,
  `NetSalary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `base`, `DA`, `HRA`, `Medical`, `Vehicle`, `bonus`, `total`, `ProfessionalTax`, `GroupInsurance`, `IncomeTax`, `ProvidentFund`, `NetSalary`) VALUES
(101, 13500, 4590, 1350, 1000, 7200, 24, 23050, 200, 1600, 0, 1809, 17562),
(102, 13500, 4590, 1350, 1000, 7200, 6, 23050, 200, 1600, 0, 1809, 17562),
(103, 13500, 4590, 1350, 1000, 7200, 6, 23050, 200, 1600, 0, 1809, 17562),
(104, 13500, 4590, 1350, 1000, 7200, 0, 23050, 200, 1600, 0, 1809, 17562),
(105, 13500, 4590, 1350, 1000, 7200, 20, 23050, 200, 1600, 0, 1809, 17562),
(106, 15030, 1339, 1804, 1000, 7200, 5, 26373, 200, 1600, 0, 1637, 22936),
(107, 15460, 1377, 1855, 1000, 7200, 9, 26892, 200, 1600, 0, 1684, 23408),
(108, 15930, 1419, 1912, 1000, 7200, 5, 27461, 200, 1600, 0, 1735, 23926),
(109, 16400, 1461, 1968, 1000, 7200, 6, 28029, 200, 1600, 0, 1786, 24443),
(110, 16870, 1503, 2024, 1000, 7200, 15, 28597, 200, 1600, 0, 1837, 24960),
(111, 13500, 4590, 1350, 1000, 7200, 8, 23050, 200, 1600, 0, 1809, 17562);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alogin`
--
ALTER TABLE `alogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `employee_leave`
--
ALTER TABLE `employee_leave`
  ADD PRIMARY KEY (`token`),
  ADD KEY `employee_leave_ibfk_1` (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`num`);

--
-- Indexes for table `monthlysalary`
--
ALTER TABLE `monthlysalary`
  ADD PRIMARY KEY (`No.`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `project_ibfk_1` (`eid`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`eid`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alogin`
--
ALTER TABLE `alogin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `employee_leave`
--
ALTER TABLE `employee_leave`
  MODIFY `token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=326;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `monthlysalary`
--
ALTER TABLE `monthlysalary`
  MODIFY `No.` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee_leave`
--
ALTER TABLE `employee_leave`
  ADD CONSTRAINT `employee_leave_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rank`
--
ALTER TABLE `rank`
  ADD CONSTRAINT `rank_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
