# Host: localhost  (Version 5.5.52)
# Date: 2017-12-31 08:01:04
# Generator: MySQL-Front 6.0  (Build 2.20)

drop database IF EXISTS estore;
CREATE DATABASE IF NOT EXISTS estore default character set utf8 COLLATE utf8_general_ci;
use estore;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `USERNAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(20) DEFAULT NULL,
  `ROLE_CODE` varchar(5) DEFAULT NULL,
  `FREEZED` varchar(2) DEFAULT NULL,
  `PASS2` varchar(20) DEFAULT NULL,
  `UNITID` int(11) DEFAULT NULL,
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('aa','11',NULL,NULL,NULL,NULL),('bb','22',NULL,NULL,NULL,NULL),('cc','33',NULL,'',NULL,NULL);
