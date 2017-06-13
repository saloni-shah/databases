CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username CHAR(10)
);

CREATE TABLE rooms (
  roomID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  roomname CHAR(10)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  messageID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message CHAR(20),
  roomID int,
  userID int,
  FOREIGN KEY (roomID) REFERENCES rooms(roomID),
  FOREIGN KEY (userID) REFERENCES users(userID)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

