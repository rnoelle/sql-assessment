CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(75)
);

INSERT INTO Users (firstname, lastname, email) VALUES ( 'John', 'Smith', 'John@Smith.com');
INSERT INTO Users (firstname, lastname, email) VALUES ( 'Dave', 'Davis', 'Dave@Davis.com');
INSERT INTO Users (firstname, lastname, email) VALUES ( 'Jane', 'Janis', 'Jane@Janis.com');
