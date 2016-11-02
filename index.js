var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:Colour45@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    // app.set('db', db);
    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})

//GET
app.get('/api/users', function (req, res, next) {
  db.get_all_users(function (err, response) {
    err ? res.send(err) : res.json(response);
  })
});

app.get('/api/vehicles', function (req, res, next) {
  db.get_all_vehicles(function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})

app.get('/api/user/:userId/vehiclecount', function (req, res, next) {
    db.user_vehicle_count(req.params.userId, function (err, response) {
      err ? res.send(err) : res.json(response);
    })
})

app.get('/api/user/:userId/vehicle', function (req, res, next) {
  db.get_user_vehicles(req.params.userId, function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})

app.get('/api/vehicle', function (req, res, next) {
  if (req.query.UserEmail) {
    db.get_vehicle_by_owner_email(req.query.UserEmail, function (err, response) {
      err ? res.send(err) : res.json(response);
    })
  } else if (req.query.userFirstStart){
    db.get_vehicle_by_user_first_letters(req.query.userFirstStart + '%', function (err, response) {
      err ? res.send(err) : res.json(response);
    })
  }
})

app.get('/api/newervehiclesbyyear', function (req, res, next) {
  db.get_vehicles_sort_by_year(function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})



//POST
app.post('/api/users', function (req, res, next) {
  db.create_user([req.body.firstname, req.body.lastname,
      req.body.email], function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})

app.post('/api/vehicles', function (req, res, next) {
  db.vehicles.insert({make: req.body.make,
      model: req.body.model, year: Number(req.body.year),
      ownerid: Number(req.body.ownerid)}, function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})



//PUT
app.put('/api/vehicle/:vehicleId/user/:userId', function (req, res, next) {
  db.update_owner_by_id(req.params.userId, req.params.vehicleId, function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})

//delete
app.delete('/api/user/:userId/vehicle/:vehicleId', function (req, res, next) {
  db.remove_ownership(req.params.vehicleId, function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})

app.delete('/api/vehicle/:vehicleId', function (req, res, next) {
  db.delete_vehicle(req.params.vehicleId, function (err, response) {
    err ? res.send(err) : res.json(response);
  })
})


app.listen('5050', function(){
  console.log("Successfully listening on : 5050")
})

module.exports = app;
