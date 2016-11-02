UPDATE vehicles
  SET ownerid = DEFAULT
  WHERE id = $1;
