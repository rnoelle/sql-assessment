SELECT * FROM vehicles
  WHERE ownerid IN (SELECT users.id FROM users
    WHERE firstname LIKE $1);
