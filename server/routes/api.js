const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Donor = require('../models/donor');

router.get('/', (req, res) => {
  res.send('Blood donor API');
});

router.get('/donors', (req, res) => Donor.find((err, donors) => {
  if (err) {
    console.log(`Error retrieving donors. ${err}`);
    res.send(err);
  } else {
    console.log(`Retrieved donors: ${JSON.stringify(donors)}`);
    res.send(donors);
  }
}));

router.get('/donors/:uid', (req, res) => Donor.find({ _id: ObjectId(req.params.uid) }, (err, donor) => {
  if (err) {
    console.log(`Error retrieving donor with id ${req.params.uid}: ${err}`);
    res.send(err);
  } else {
    console.log(`Retrieved donor: ${JSON.stringify(donor[0])}`);
    res.send(donor[0]);
  }
}));

router.post('/donors', (req, res) => {

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  let items = [];
  if(Array.isArray(req.body)) {
    items = req.body;
  } else {
    items.push(req.body);
  }

  items.forEach(item => {
    item.ipAddress = ip;
  });

  items.forEach(item => new Donor(item).save(err => {
    if (err) {
      console.log(`Donor creation failed. ${err}`);
      res.send(err);
    } else {
      console.log(`Created donor: ${JSON.stringify(item)}`);
      res.send('ok');
    }
  }));
});

router.put('/donors', (req, res) => {

  const item = req.body;

  if(Array.isArray(item)) {
    res.send('Error: Only update a single item at a time.');
  }

  Donor.findOneAndUpdate({ _id: ObjectId(item._id) }, item, (err, updated) => {
    if (err) {
      console.log(`Error updating: ${err}`);
      res.send(err);
    } else {
      console.log(`Updated successfully: ${updated}`);
      res.send(updated);
    }
  });
});

router.delete('/donors', (req, res) => {

  const item = req.body;

  if(Array.isArray(item)) {
    res.send('Error: Only delete a single item at a time.');
  }

  Donor.findOneAndRemove({ _id: ObjectId(item._id) }, (err) => {
    if (err) {
      console.log(`Error removing item: ${err}`);
      res.send(err);
    } else {
      console.log(`Item removed: ${JSON.stringify(item)}`);
      res.send('ok');
    }
  });
});

module.exports = router;
