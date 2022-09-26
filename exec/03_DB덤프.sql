-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment` (
  `cmt_seq` int NOT NULL AUTO_INCREMENT COMMENT '답변일련번호',
  `pst_seq` int NOT NULL COMMENT '게시판일련번호',
  `user_id` varchar(100) NOT NULL COMMENT '(userID)사용자아이디',
  `cmt_sub` int NOT NULL COMMENT '답변상세번호',
  `cmt_dt` varchar(200) NOT NULL COMMENT '등록일시',
  `cmt_ctnt` varchar(255) DEFAULT NULL COMMENT '내용',
  `cmt_dumy` varchar(255) DEFAULT '' COMMENT '더미',
  PRIMARY KEY (`cmt_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment`
--

LOCK TABLES `tb_comment` WRITE;
/*!40000 ALTER TABLE `tb_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_embedded`
--

DROP TABLE IF EXISTS `tb_embedded`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_embedded` (
  `emb_id` int NOT NULL COMMENT '임베디드아이디',
  `user_id` varchar(100) NOT NULL COMMENT '(userID)사용자아이디',
  `emb_full_tra` int NOT NULL COMMENT '쓰레기통양',
  `emb_full_cig` int NOT NULL COMMENT '꽁초 양',
  `emb_lat` varchar(100) NOT NULL COMMENT '위도',
  `emb_lng` varchar(100) NOT NULL COMMENT '경도',
  `emb_bat` int NOT NULL COMMENT '배터리 양',
  `emb_cnt` int DEFAULT '0' COMMENT '사용횟수',
  `emb_sta` enum('Y','N') DEFAULT 'N' COMMENT '고장여부',
  `emb_qr` enum('Y','N') DEFAULT 'N',
  `emb_dumy` varchar(255) DEFAULT '' COMMENT '더미',
  PRIMARY KEY (`emb_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='"userID" : "1"';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_embedded`
--

LOCK TABLES `tb_embedded` WRITE;
/*!40000 ALTER TABLE `tb_embedded` DISABLE KEYS */;
INSERT INTO `tb_embedded` VALUES (1,'kiki249',3049,2793,'3285','4313',111,111,'Y','N','bad'),(2,'test',2,3,'4','5',6,7,'N','N','bad'),(3,'test',22,2,'35.191276','126.8116548',222,2222,'N',NULL,'good'),(4,'test',22,2,'35.291276','126.9116548',222,2222,'N',NULL,'good'),(5,'test',22,2,'35.191276','126.9116548',222,2222,'N',NULL,'good'),(6,'test',22,2,'35.291276','126.8116548',222,2222,'N',NULL,'good'),(7,'test',22,2,'35.291276','126.7116548',222,2222,'N',NULL,'good'),(8,'test',22,2,'35.191276','126.6116548',222,2222,'N',NULL,'good');
/*!40000 ALTER TABLE `tb_embedded` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_notion`
--

DROP TABLE IF EXISTS `tb_notion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_notion` (
  `not_seq` int NOT NULL AUTO_INCREMENT COMMENT '알림키값',
  `user_id` varchar(50) NOT NULL COMMENT '사용자아이디',
  `not_dt` datetime NOT NULL COMMENT '시간',
  `not_ctnt` enum('포인트 적립','환전') NOT NULL COMMENT '내용 | (포인트, 환전)',
  `not_money` int NOT NULL COMMENT '금액',
  `not_check` enum('Y','N') DEFAULT NULL,
  PRIMARY KEY (`not_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_notion`
--

LOCK TABLES `tb_notion` WRITE;
/*!40000 ALTER TABLE `tb_notion` DISABLE KEYS */;
INSERT INTO `tb_notion` VALUES (1,'kiki249','2022-08-16 14:26:27','포인트 적립',25,'N');
/*!40000 ALTER TABLE `tb_notion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_payback`
--

DROP TABLE IF EXISTS `tb_payback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_payback` (
  `pb_seq` int NOT NULL AUTO_INCREMENT COMMENT '환전키값',
  `user_id` varchar(50) NOT NULL COMMENT '사용자아이디',
  `pb_dt` datetime NOT NULL COMMENT '등록일시',
  `pb_money` int NOT NULL COMMENT '포인트 금액',
  `pb_check` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '환전여부',
  PRIMARY KEY (`pb_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_payback`
--

LOCK TABLES `tb_payback` WRITE;
/*!40000 ALTER TABLE `tb_payback` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_payback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_post`
--

DROP TABLE IF EXISTS `tb_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_post` (
  `pst_seq` int NOT NULL AUTO_INCREMENT COMMENT '게시판일련번호',
  `user_id` varchar(100) NOT NULL COMMENT '사용자아이디',
  `pst_dt` varchar(255) DEFAULT NULL COMMENT '등록일시',
  `pst_title` varchar(255) NOT NULL COMMENT '타이틀',
  `pst_ctnt` varchar(255) NOT NULL COMMENT '내용',
  `pst_prop` varchar(255) NOT NULL COMMENT '속성',
  `pst_check` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '답변여부',
  `pst_img` varchar(255) DEFAULT '' COMMENT '이미지',
  `pst_dumy` varchar(255) DEFAULT '' COMMENT '더미',
  PRIMARY KEY (`pst_seq`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_post`
--

LOCK TABLES `tb_post` WRITE;
/*!40000 ALTER TABLE `tb_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_use`
--

DROP TABLE IF EXISTS `tb_use`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_use` (
  `use_cnt` int NOT NULL AUTO_INCREMENT COMMENT '이용cnt',
  `user_id` varchar(50) NOT NULL COMMENT '사용자아이디',
  `emb_id` int NOT NULL COMMENT '임베디드아이디',
  `use_check` enum('Y','N','X') NOT NULL COMMENT '담배판별',
  `use_time` datetime NOT NULL COMMENT '이용시간',
  `use_dumy` enum('Y','N') DEFAULT 'N' COMMENT '더미',
  PRIMARY KEY (`use_cnt`,`user_id`,`emb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_use`
--

LOCK TABLES `tb_use` WRITE;
/*!40000 ALTER TABLE `tb_use` DISABLE KEYS */;
INSERT INTO `tb_use` VALUES (1,'kiki249',1,'Y','2022-08-16 14:26:27','Y');
/*!40000 ALTER TABLE `tb_use` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `user_id` varchar(50) NOT NULL COMMENT '사용자아이디',
  `user_pwd` varchar(50) NOT NULL COMMENT '비밀번호',
  `user_name` varchar(10) NOT NULL COMMENT '이름',
  `user_phone` varchar(15) NOT NULL COMMENT '핸드폰',
  `user_birth_day` varchar(255) NOT NULL COMMENT '생년월일',
  `user_account` varchar(45) NOT NULL,
  `user_email` varchar(50) NOT NULL COMMENT '이메일',
  `user_img` varchar(255) DEFAULT '' COMMENT '이미지',
  `user_admin` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '관리자 여부',
  `user_point` int NOT NULL DEFAULT '0' COMMENT '포인트',
  `user_cnt` int NOT NULL DEFAULT '0' COMMENT '담배cnt',
  `user_health` varchar(255) DEFAULT '' COMMENT '건강관리',
  `user_time` datetime DEFAULT NULL COMMENT '최근이용시간',
  `user_rt` varchar(255) DEFAULT '' COMMENT 'Refresh 토큰',
  `user_banknumber` varchar(255) DEFAULT '' COMMENT '더미',
  `user_dumy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES ('admin','l8zuOwSx8emcEEPNVTVYEuvsLbOvohsS','유승우','01056389909','Tue Nov 04 00:00:00 GMT+09:00 1997','국민 94450200079014','swyou1123@naver.com',NULL,'Y',0,0,NULL,'2022-01-01 00:00:00','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MTI3NTQzMn0.d73JWhk8jNCWQmfYpL9bo5cl1JYUnZMXB2ATipKLQ04','004',NULL),('kiki249','fgvMJEAyq37dUuL87uhzQLRvXSSjIUE+','김강현','01063504832','Thu Nov 18 00:00:00 GMT+09:00 1993','국민 59440204137083','kiki249@naver.com',NULL,'N',25,1,NULL,'2022-08-16 14:26:27','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraWtpMjQ5IiwiZXhwIjoxNjYxMjc1NTAxfQ.zoRyMbaSWANiyCBFqdBpsa-cKXsPeXocn2ouQEe8Rpo','004',NULL);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-16 14:31:12
