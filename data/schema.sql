-- DROP DATABASE IF EXISTS list_db;

-- CREATE DATABASE list_db;

-- \c list_db


DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  Title text,
  Content text
); 

