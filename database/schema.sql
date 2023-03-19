DROP DATABASE IF EXISTS todo_list;
CREATE DATABASE todo_list;

USE todo_list;

CREATE TABLE todo (
    id INT NOT NULL AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);