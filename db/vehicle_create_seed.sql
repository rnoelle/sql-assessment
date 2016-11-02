-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS vehicles;
CREATE TABLE Vehicles (
  id SERIAL PRIMARY KEY,
  make VARCHAR(50),
  model VARCHAR(50),
  year INTEGER,
  ownerid INTEGER references Users(id)
);

INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('Toyota', 'Camry', 1991, 1);
INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('Honda', 'Civic', 1995, 1);
INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('Ford', 'Focus', 2005, 1);
INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('Ford', 'Taurus', 2003, 2);
INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('VW', 'Bug', 2010, 2);
INSERT INTO Vehicles (make, model, year, ownerid) VALUES ('Mini', 'Coup', 2013, 3);
