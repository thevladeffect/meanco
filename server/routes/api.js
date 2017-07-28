const express = require('express');
const router = express.Router();

const Donor = require('../models/donor');

router.get('/', (req, res) => {
  res.send('Blood donor API');
});

router.get('/donors', (req, res) => Donor.find((err, donors) => res.send(donors)));

router.post('/donors', (req, res) => {

  let items = [];
  if(Array.isArray(req.body)) {
    items = req.body;
  } else {
    items.push(req.body);
  }

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

  Donor.findOneAndUpdate({ email: item.email }, item, (err, updated) => {
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

  Donor.findOneAndRemove({ email: item.email }, (err) => {
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
