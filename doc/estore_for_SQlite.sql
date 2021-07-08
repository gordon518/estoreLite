CREATE TABLE `users` (
  `username` varchar(15) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `role_code` varchar(5) DEFAULT NULL,
  `freezed` varchar(2) DEFAULT NULL,
  `pass2` varchar(20) DEFAULT NULL,
  `unitid` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
);

INSERT INTO users(username,password) VALUES ('aa','11');
INSERT INTO users(username,password) VALUES ('bb','22');
INSERT INTO users(username,password) VALUES ('cc','33');
