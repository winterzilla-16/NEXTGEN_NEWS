CREATE DATABASE news CHARACTER SET utf8;
CREATE USER 'news'@'localhost' IDENTIFIED BY '444555';
GRANT ALL PRIVILEGES ON news.* TO 'news'@'localhost';
SET GLOBAL transaction_isolation = 'READ-COMMITTED';
FLUSH PRIVILEGES;