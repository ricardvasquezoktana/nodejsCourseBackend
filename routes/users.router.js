const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Freddy Munive',
      age: 28,
    },
  ]);
});

module.exports = router;
