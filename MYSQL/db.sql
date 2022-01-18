CREATE DATABASE database_links;
USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(40) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
INSERT INTO users(username, password,fullname) VALUES ("drobles","robles123","Daniel Robles");
INSERT INTO users(username, password,fullname) VALUES ("equinde","quinde123","Erick Quinde");