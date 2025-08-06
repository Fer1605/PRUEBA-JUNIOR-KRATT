const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  createProvider,
  getAllProviders,
  searchProviders,
  updateProvider,
  deleteProvider
} = require('../controllers/providerController');

// Todas las rutas protegidas con JWT
router.post('/', verifyToken, createProvider);
router.get('/', verifyToken, getAllProviders);
router.get('/search', verifyToken, searchProviders);
router.put('/:id', verifyToken, updateProvider);
router.delete('/:id', verifyToken, deleteProvider);

module.exports = router;