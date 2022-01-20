const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'category 1',
    products: [],
  });
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'orange',
    amount: 12,
    price: 5,
  });
});

module.exports = router;
