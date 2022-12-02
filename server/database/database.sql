CREATE DATABASE gamesdb2022;
USE gamesdb2022;

CREATE TABLE games(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    favorite BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
